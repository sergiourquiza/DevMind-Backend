const express = require('express');

/**
 * Express router to handle routes related to exercises.
 */
const router = express.Router();

const exerciseController = require('../controllers/exerciseController');

/**
 * Middleware to create a new exercise.
 * @name create
 * @memberof module:routes/exerciseRoutes
 * @function
 * @inner
 */
router.post('/', exerciseController.create);

/**
 * Middleware to get all exercises.
 * @name getAll
 * @memberof module:routes/exerciseRoutes
 * @function
 * @inner
 */
router.get('/', exerciseController.getAll);

/**
 * Middleware to get an exercise by its ID.
 * @name getById
 * @memberof module:routes/exerciseRoutes
 * @function
 * @inner
 */
router.get('/:id', exerciseController.getById);

/**
 * Middleware to get all exercises by its difficultyID.
 * @name getByModuleIdAndDifficultyId
 * @memberof module:routes/exerciseRoutes
 * @function
 * @inner
 */
router.get('/:moduleId/:difficultyId', exerciseController.getByModuleIdAndDifficultyId);

/**
 * Middleware to get all exercises by its userID, moduleID and difficultyID.
 * @name getPendingExercises
 * @memberof module:routes/exerciseRoutes
 * @function
 * @inner
 */
router.get('/:userId/:moduleId/:difficultyId', exerciseController.getPendingExercises);

/**
 * Middleware to update an existing exercise by its ID.
 * @name update
 * @memberof module:routes/exerciseRoutes
 * @function
 * @inner
 */
router.put('/:id', exerciseController.update);

/**
 * Middleware to delete an existing exercise by its ID.
 * @name delete
 * @memberof module:routes/exerciseRoutes
 * @function
 * @inner
 */
router.delete('/:id', exerciseController.delete);

module.exports = router;