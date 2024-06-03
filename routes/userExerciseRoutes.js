const express = require('express');
const router = express.Router();
const userExerciseController = require('../controllers/userExerciseController');

// Rutas para dificultades
router.get('/', userExerciseController.getAll);
router.get('/:id', userExerciseController.getById);
router.post('/', userExerciseController.create);
router.put('/:id', userExerciseController.update);
router.delete('/:id', userExerciseController.delete);

module.exports = router;