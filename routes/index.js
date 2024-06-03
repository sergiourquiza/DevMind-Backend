const express = require('express');
const router = express.Router();

// Importar todas las rutas
const difficultyRoutes = require('./difficultyRoutes');

// Usar las rutas
router.use('/difficulties', difficultyRoutes);
module.exports = router;