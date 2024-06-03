const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.post('/', exerciseController.create);
router.get('/', exerciseController.getAll);
router.get('/:exerciseId', exerciseController.getById);
router.put('/:exerciseId', exerciseController.update);
router.delete('/:exerciseId', exerciseController.delete);

module.exports = router;
