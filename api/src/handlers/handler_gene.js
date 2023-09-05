const sequelize = require('sequelize');
const { getGenresFromAPI, saveGenresToDatabase } = require("../controladores/genrescontrol");

const getAllGenresHandler = async (req, res) => {
    try {
      const genresDB = await saveGenresToDatabase(); // Usa la función directamente, no a través de genreController
      res.status(200).json({ genres: genresDB });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllGenresHandler };
