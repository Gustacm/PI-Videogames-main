const { Router } = require('express');
const { getVideogamesHandler, getVideogameDetailsHandler, getVideogameByNameHandler, createGameHandler,   } = require('../handlers/handler_vg');


const videogamesRoutes = Router();


videogamesRoutes.get('/', getVideogamesHandler);
videogamesRoutes.get('/:idVideogame', getVideogameDetailsHandler);
videogamesRoutes.get('/name', getVideogameByNameHandler);
videogamesRoutes.post('/', createGameHandler)



module.exports = videogamesRoutes;