const express = require('express');

/**
 * Express router to handle routes related to user exercises.
 */
const router = express.Router();

const userExerciseController = require('../controllers/userExerciseController');

/**
 * Middleware to get all user exercises.
 * @name getAll
 * @memberof module:routes/userExerciseRoutes
 * @function
 * @inner
 */
router.get('/', userExerciseController.getAll);

/**
 * Middleware to get a user exercise by its ID.
 * @name getById
 * @memberof module:routes/userExerciseRoutes
 * @function
 * @inner
 */
router.get('/:id', userExerciseController.getById);

/**
 * Middleware to create a new user exercise.
 * @name create
 * @memberof module:routes/userExerciseRoutes
 * @function
 * @inner
 */
router.post('/', userExerciseController.create);

/**
 * Middleware to update an existing user exercise by its ID.
 * @name update
 * @memberof module:routes/userExerciseRoutes
 * @function
 * @inner
 */
router.put('/:id', userExerciseController.update);

/**
 * Middleware to delete an existing user exercise by its ID.
 * @name delete
 * @memberof module:routes/userExerciseRoutes
 * @function
 * @inner
 */
router.delete('/:id', userExerciseController.delete);

/**
 * Middleware to delete existing user exercises by its userId, moduleId and difficultyId.
 * @name delete
 * @memberof module:routes/userExerciseRoutes
 * @function
 * @inner
 */
router.delete('/:userId/:moduleId/:difficultyId', userExerciseController.deleteByLevel);

module.exports = router;