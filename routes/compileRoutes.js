const express = require('express');

/**
 * Express router to handle routes related to compiler.
 */
const router = express.Router();

const compileController = require('../controllers/compileController');

/**
 * Middleware to compile a exercise.
 * @name create
 * @memberof module:routes/compileRoutes
 * @function
 * @inner
 */
router.post('/', compileController.compileCode);

module.exports = router;