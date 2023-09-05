const sequelize = require('sequelize');
const { getVideogames, getVideogameFromDB, getVideogameById, getVideogameByNameFromDB, getVideogamesByName, createGameController } = require('../controladores/videogamecontroles');


const getVideogamesHandler = async (req, res) => {
  try {
    const respuesta = await getVideogames();
    res.status(201).json({ respuesta });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getVideogameDetailsHandler = async (req, res) => {
  const { idVideogame } = req.params;
  try {
    let result;
    if (isValidUUID(idVideogame)) {
      result = await getVideogameFromDB(idVideogame);
    } else {
      result = await getVideogameById(idVideogame); // Pasa el idVideogame como argumento
    }
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Videojuego no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


function isValidUUID(uuid) {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
}


const getVideogameByNameHandler = async (req, res) => {
  const { name } = req.query;

  try {
    // Intenta obtener el videojuego desde la base de datos
    const dbVideogame = await getVideogameByNameFromDB(name);

    if (dbVideogame) {
      // Si existe en la base de datos, devuelve ese resultado
      res.status(200).json(dbVideogame);
    } else {
      // Si no existe en la base de datos, busca en la función getVideogamesByName de la API
      const apiVideogames = await getVideogamesByName(name);

      if (apiVideogames.length > 0) {
        res.status(200).json(apiVideogames);
      } else {
        res.status(404).json({ message: 'Videojuego no encontrado' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const createGameHandler = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { name, description, genres, platforms, date, rating } = req.body;

    // Llama al controlador para crear el juego
    const newGame = await createGameController(name, description, genres, platforms, date, rating);

    // Si se crea exitosamente, responde con el nuevo juego
    res.status(201).json({ game: newGame });
  } catch (error) {
    // Maneja los errores adecuadamente
    res.status(500).json({ error: error.message });
  }
};


module.exports = {getVideogamesHandler,
  getVideogameDetailsHandler,
  getVideogameByNameHandler,
  createGameHandler}

