const express = require('express');

/**
 * Express router to handle routes related to answers.
 */
const router = express.Router();

const answerController = require('../controllers/answerController');

/**
 * Middleware to get all answers.
 * @name getAll
 * @memberof module:routes/answerRoutes
 * @function
 * @inner
 */
router.get('/', answerController.getAll);

/**
 * Middleware to get an answer by its ID.
 * @name getById
 * @memberof module:routes/answerRoutes
 * @function
 * @inner
 */
router.get('/:id', answerController.getById);

/**
 * Middleware to create a new answer.
 * @name create
 * @memberof module:routes/answerRoutes
 * @function
 * @inner
 */
router.post('/', answerController.create);

/**
 * Middleware to update an existing answer by its ID.
 * @name update
 * @memberof module:routes/answerRoutes
 * @function
 * @inner
 */
router.put('/:id', answerController.update);

/**
 * Middleware to delete an existing answer by its ID.
 * @name delete
 * @memberof module:routes/answerRoutes
 * @function
 * @inner
 */
router.delete('/:id', answerController.delete);

module.exports = router;