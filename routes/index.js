const express = require('express');
const router = express.Router();

// Importar todas las rutas
const difficultyRoutes = require('./difficultyRoutes');
const answerRoutes = require('./answerRoutes');
const moduleRoutes = require('./moduleRoutes');
const progressRoutes = require('./progressRoutes');
const authRoutes = require('./authRoutes');

// Usar las rutas
router.use('/difficulties', difficultyRoutes);
router.use('/answers', answerRoutes);
router.use('/modules', moduleRoutes);
router.use('/progresses', progressRoutes);
router.use('/auth', authRoutes);

module.exports = router;