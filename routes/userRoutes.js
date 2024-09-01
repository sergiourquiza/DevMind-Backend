const express = require('express');

/**
 * Express router to handle routes related to users.
 */
const router = express.Router();

const userController = require('../controllers/userController');

/**
 * Middleware to get all users.
 * @name getAll
 * @memberof module:routes/userRoutes
 * @function
 * @inner
 */
router.get('/', userController.getAll);

/**
 * Middleware to get a user by its ID.
 * @name getById
 * @memberof module:routes/userRoutes
 * @function
 * @inner
 */
router.get('/:id', userController.getById);

/**
 * Middleware to create a new user.
 * @name create
 * @memberof module:routes/userRoutes
 * @function
 * @inner
 */
router.post('/', userController.create);

/**
 * Middleware to update an existing user by its ID.
 * @name update
 * @memberof module:routes/userRoutes
 * @function
 * @inner
 */
router.put('/:id', userController.update);

/**
 * Middleware to delete an existing user by its ID.
 * @name delete
 * @memberof module:routes/userRoutes
 * @function
 * @inner
 */
router.delete('/:id', userController.delete);

module.exports = router;