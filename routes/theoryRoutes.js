const express = require('express');

/**
 * Express router to handle routes related to theories.
 */
const router = express.Router();

const theoryController = require('../controllers/theoryController');

/**
 * Middleware to create a new theory.
 * @name create
 * @memberof module:routes/theoryRoutes
 * @function
 * @inner
 */
router.post('/', theoryController.create);

/**
 * Middleware to get all theories.
 * @name getAll
 * @memberof module:routes/theoryRoutes
 * @function
 * @inner
 */
router.get('/', theoryController.getAll);

/**
 * Middleware to get a theory by its ID.
 * @name getById
 * @memberof module:routes/theoryRoutes
 * @function
 * @inner
 */
router.get('/:id', theoryController.getById);

/**
 * Middleware to get a theory by its module ID.
 * @name getByModuleId
 * @memberof module:routes/theoryRoutes
 * @function
 * @inner
 */
router.get('/module/:moduleId', theoryController.getByModuleId);

/**
 * Middleware to update a theory by its ID.
 * @name update
 * @memberof module:routes/theoryRoutes
 * @function
 * @inner
 */
router.put('/:id', theoryController.update);

/**
 * Middleware to delete a theory by its ID.
 * @name delete
 * @memberof module:routes/theoryRoutes
 * @function
 * @inner
 */
router.delete('/:id', theoryController.delete);

module.exports = router;
