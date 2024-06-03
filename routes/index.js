const express = require('express');
const router = express.Router();

// Importar todas las rutas
const difficultyRoutes = require('./difficultyRoutes');
const answerRoutes = require('./answerRoutes');
const moduleRoutes = require('./moduleRoutes');
const progressRoutes = require('./progressRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const theoryRoutes = require('./theoryRoutes');

// Usar las rutas
router.use('/difficulties', difficultyRoutes);
router.use('/answers', answerRoutes);
router.use('/modules', moduleRoutes);
router.use('/progresses', progressRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/theory', theoryRoutes);
module.exports = router;