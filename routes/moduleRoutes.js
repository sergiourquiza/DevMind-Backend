const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

// Rutas para dificultades
router.get('/', moduleController.getAll);
router.get('/:id', moduleController.getById);
router.post('/', moduleController.create);
router.put('/:id', moduleController.update);
router.delete('/:id', moduleController.delete);

module.exports = router;