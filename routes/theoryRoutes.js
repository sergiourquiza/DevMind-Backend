const express = require('express');
const router = express.Router();
const theoryController = require('../controllers/theoryController');



router.post('/', theoryController.create);
router.get('/', theoryController.findAll);
router.get('/:theoryId', theoryController.findOne);
router.put('/:theoryId', theoryController.update);
router.delete('/:theoryId', theoryController.delete);

module.exports = router;
