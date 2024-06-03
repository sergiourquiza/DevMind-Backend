const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

// Rutas para dificultades
router.get('/', answerController.getAll);
router.get('/:id', answerController.getById);
router.post('/', answerController.create);
router.put('/:id', answerController.update);
router.delete('/:id', answerController.delete);

module.exports = router;