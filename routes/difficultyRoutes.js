const express = require('express');

/**
 * Express router to handle routes related to difficulties.
 */
const router = express.Router();

const difficultyController = require('../controllers/difficultyController');

/**
 * Middleware to get all difficulties.
 * @name getAll
 * @memberof module:routes/difficultyRoutes
 * @function
 * @inner
 */
router.get('/', difficultyController.getAll);

/**
 * Middleware to get a difficulty by its ID.
 * @name getById
 * @memberof module:routes/difficultyRoutes
 * @function
 * @inner
 */
router.get('/:id', difficultyController.getById);

/**
 * Middleware to create a new difficulty.
 * @name create
 * @memberof module:routes/difficultyRoutes
 * @function
 * @inner
 */
router.post('/', difficultyController.create);

/**
 * Middleware to update an existing difficulty by its ID.
 * @name update
 * @memberof module:routes/difficultyRoutes
 * @function
 * @inner
 */
router.put('/:id', difficultyController.update);

/**
 * Middleware to delete an existing difficulty by its ID.
 * @name delete
 * @memberof module:routes/difficultyRoutes
 * @function
 * @inner
 */
router.delete('/:id', difficultyController.delete);

module.exports = router;