const { Router } = require('express');
const videogamesRoutes = require('./videogameroute');
const genresRoutes = require('./genresRoutes');
const router = Router();


router.use("/videogames",videogamesRoutes)
router.use("/genres",genresRoutes)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




module.exports = router;
