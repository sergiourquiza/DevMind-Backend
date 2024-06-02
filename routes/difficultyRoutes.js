const express = require('express');
const router = express.Router();
const difficultyController = require('../controllers/difficultyController');

// Rutas para dificultades
router.get('/', difficultyController.getAll);
router.get('/:id', difficultyController.getById);
router.post('/', difficultyController.create);
router.put('/:id', difficultyController.update);
router.delete('/:id', difficultyController.delete);

module.exports = router;