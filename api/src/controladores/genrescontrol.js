const axios = require("axios");
const { Genre } = require("../db");
const { api_key } = process.env;
const API_URL = `https://api.rawg.io/api/genres?key=${api_key}`; // Reemplaza esto con la URL real de la API





async function getGenresFromAPI() {
    try {
      const response = await axios.get(API_URL);
      return response.data.results;
    } catch (error) {
      console.error('Error al obtener géneros desde la API:', error);
      throw new Error('Error al obtener géneros desde la API');
    }
  }
  

async function saveGenresToDatabase() {
    try {
      const apiGenres = await getGenresFromAPI();
      
      // Verifica si la base de datos está vacía
      const isEmpty = await Genre.count() === 0;
  
      console.log('Antes de la comprobación de la base de datos vacio.');
  
      if (isEmpty) {
        await Genre.bulkCreate(apiGenres);
        console.log('Géneros guardados en la base de datos correctamente.');
      }
  
      console.log('Después de la comprobación de la base de datos vacía.');
  
      return apiGenres;
    } catch (error) {
      console.error('Error al guardar géneros en la base de datos:', error);
      throw new Error('Error al guardar géneros en la base de datos');
    }
  }
  

module.exports = {
    getGenresFromAPI,
    saveGenresToDatabase,
  };








  

      
      
      