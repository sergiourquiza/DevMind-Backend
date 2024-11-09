const express = require('express');

/**
 * Express router to handle routes related to progress.
 */
const router = express.Router();

const progressController = require('../controllers/progressController');

/**
 * Middleware to get all progress.
 * @name getAll
 * @memberof module:routes/progressRoutes
 * @function
 * @inner
 */
router.get('/', progressController.getAll);

/**
 * Middleware to get progress by its ID.
 * @name getById
 * @memberof module:routes/progressRoutes
 * @function
 * @inner
 */
router.get('/:id', progressController.getById);

/**
 * Middleware to create new progress.
 * @name create
 * @memberof module:routes/progressRoutes
 * @function
 * @inner
 */
router.post('/', progressController.create);

/**
 * Middleware to update progress by its ID.
 * @name update
 * @memberof module:routes/progressRoutes
 * @function
 * @inner
 */
router.put('/:id', progressController.update);

/**
 * Middleware to delete progress by its ID.
 * @name delete
 * @memberof module:routes/progressRoutes
 * @function
 * @inner
 */
router.delete('/:id', progressController.delete);


/**
 * Middleware to get user progress in a module.
 * @name getUserProgressInModule
 * @memberof module:routes/progressRoutes
 * @function
 * @inner
 */
router.get('/progress/:userId/:moduleId', progressController.getUserProgressInModule);


module.exports = router;