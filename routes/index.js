const express = require('express');
const router = express.Router();

// Importar todas las rutas
const difficultyRoutes = require('./difficultyRoutes');
const userRoutes = require('./userRoutes');
const theoryRoutes = require('./theoryRoutes');

// Usar las rutas
router.use('/difficulties', difficultyRoutes);
router.use('/users', userRoutes);
router.use('/theory', theoryRoutes);
module.exports = router;