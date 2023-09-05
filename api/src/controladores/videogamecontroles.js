const axios = require ("axios")
const { Videogame, Genre } = require("../db");
const {api_key} = process.env;

// todos los  juegos 
const getVideogames = async () => {
      const promises = [];
      for (let i = 1; i < 10; i++) {
        const promise = axios.get(
          `https://api.rawg.io/api/games?key=${api_key}&page=${i}`
        );
        promises.push(promise); //en este ciclo for itero 10 paginas trayendome un gran objeto
      }
        const responses = await Promise.all(promises); // en una variable cargo esperando todas las promesas
        const apiInfo = responses
          .map((response) => response.data.results)
          .flat()
          .map((el) => {
            return {
              name: el.name,
              id: el.id,
              description: el.description,
              genres: el.genres.map((genre) => genre.name),
              platforms: el.platforms.map((platform) => platform.platform.name),
              date: el.released,
              rating: el.rating,
              image: el.background_image,
              createInDb: "Api",
            };
          });
      
        return apiInfo;
      };
//juegos por id
const getVideogameById = async (id) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${api_key}`);
    const apiVideogame = response.data;

    return {
      name: apiVideogame.name,
      id: apiVideogame.id,
      description: apiVideogame.description,
      genres: apiVideogame.genres.map((genre) => genre.name),
      platforms: apiVideogame.platforms.map((platform) => platform.platform.name),
      date: apiVideogame.released,
      rating: apiVideogame.rating,
      image: apiVideogame.background_image,
      createInDb: "Api",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
// juegos por id db
      const getVideogameFromDB = async (idVideogame) => {
        try {
          return await Videogame.findByPk(idVideogame);
        } catch (error) {
          throw new Error(error.message);
        }
      };
// juegos por name
      const getVideogamesByName = async (name) => {
        try {
          const response = await axios.get(
            `https://api.rawg.io/api/games?key=${api_key}&search=${name}`
          );
          const apiVideogames = response.data.results;
      
          return apiVideogames.map((apiGame) => {
            return {
              name: apiGame.name,
              id: apiGame.id,
              description: apiGame.description,
              genres: apiGame.genres.map((genre) => genre.name),
              platforms: apiGame.platforms.map((platform) => platform.platform.name),
              date: apiGame.released,
              rating: apiGame.rating,
              image: apiGame.background_image,
              createInDb: "Api",
            };
          });
        } catch (error) {
          throw new Error(error.message);
        }
      };
// juegos db name
      const getVideogameByNameFromDB = async (name) => {
        try {
          const videogame = await Videogame.findOne({
            where: {
              name: name,
            },
          });
      
          return videogame;
        } catch (error) {
          throw new Error(error.message);
        }
      };

      const createGameController = async (name, description, genres, platforms, date, rating) => {
        try {
          // Crea el nuevo juego en la base de datos
          const newGame = await Videogame.create({
            name,
            description,
            platforms,
            date,
            rating: parseFloat(rating), // Convierte la cadena en un número decimal
          });
      
          // Busca los géneros en la base de datos o crea nuevos si no existen
          const genreModels = await Promise.all(
            genres.map(async (genreName) => {
              let genre = await Genre.findOne({ where: { name: genreName } });
      
              if (!genre) {
                genre = await Genre.create({ name: genreName });
              }
      
              return genre;
            })
          );
      
          // Asocia los géneros al nuevo juego
          await newGame.addGenres(genreModels);
      
          return newGame;
        } catch (error) {
          throw new Error(error.message);
        }
      };

  

      
      module.exports = {getVideogames,
        getVideogameFromDB,
        getVideogamesByName,
        getVideogameById,
        getVideogameByNameFromDB,createGameController, }
    
    




/*const CreateGameDB= async (name,description,platforms,image, rating)=>{
    return await videogame.create({name,description,platforms,image,rating})
    } */