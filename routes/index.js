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
<<<<<<< HEAD
const excerciseRoutes = require('./exerciseRoutes'); 
=======
const userExerciseRoutes = require('./userExerciseRoutes');
>>>>>>> 6c7eabc79791c1920d5378be8138d7bce6e5311f

// Usar las rutas
router.use('/difficulties', difficultyRoutes);
router.use('/answers', answerRoutes);
router.use('/modules', moduleRoutes);
router.use('/progresses', progressRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
<<<<<<< HEAD
router.use('/theories', theoryRoutes);
router.use('/exercises', excerciseRoutes);
=======
router.use('/theory', theoryRoutes);
router.use('/userExercises', theoryRoutes);

>>>>>>> 6c7eabc79791c1920d5378be8138d7bce6e5311f
module.exports = router;