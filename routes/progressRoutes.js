const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

// Rutas para dificultades
router.get('/', progressController.getAll);
router.get('/:id', progressController.getById);
router.post('/', progressController.create);
router.put('/:id', progressController.update);
router.delete('/:id', progressController.delete);

module.exports = router;