const express = require('express');

/**
 * Express router to handle routes related to inputs.
 */
const router = express.Router();

const inputController = require('../controllers/inputController');

/**
 * Middleware to get all inputs.
 * @name getAll
 * @memberof module:routes/inputRoutes
 * @function
 * @inner
 */
router.get('/', inputController.getAll);

/**
 * Middleware to get an input by its ID.
 * @name getById
 * @memberof module:routes/inputRoutes
 * @function
 * @inner
 */
router.get('/:id', inputController.getById);

/**
 * Middleware to create a new input.
 * @name create
 * @memberof module:routes/inputRoutes
 * @function
 * @inner
 */
router.post('/', inputController.create);

/**
 * Middleware to update an existing input by its ID.
 * @name update
 * @memberof module:routes/inputRoutes
 * @function
 * @inner
 */
router.put('/:id', inputController.update);

/**
 * Middleware to delete an existing input by its ID.
 * @name delete
 * @memberof module:routes/inputRoutes
 * @function
 * @inner
 */
router.delete('/:id', inputController.delete);

module.exports = router;