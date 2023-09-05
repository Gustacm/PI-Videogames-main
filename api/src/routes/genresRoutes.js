const { Router } = require('express');
const {  getAllGenresHandler  } = require('../handlers/handler_gene');



const genresRoutes = Router();

genresRoutes.get('/', getAllGenresHandler );


module.exports = genresRoutes;

