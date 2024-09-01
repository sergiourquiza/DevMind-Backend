const express = require('express');

/**
 * Express router to handle routes related to modules.
 */
const router = express.Router();

const moduleController = require('../controllers/moduleController');

/**
 * Middleware to get all modules.
 * @name getAll
 * @memberof module:routes/moduleRoutes
 * @function
 * @inner
 */
router.get('/', moduleController.getAll);

/**
 * Middleware to get a module by its ID.
 * @name getById
 * @memberof module:routes/moduleRoutes
 * @function
 * @inner
 */
router.get('/:id', moduleController.getById);

/**
 * Middleware to create a new module.
 * @name create
 * @memberof module:routes/moduleRoutes
 * @function
 * @inner
 */
router.post('/', moduleController.create);

/**
 * Middleware to update an existing module by its ID.
 * @name update
 * @memberof module:routes/moduleRoutes
 * @function
 * @inner
 */
router.put('/:id', moduleController.update);

/**
 * Middleware to delete an existing module by its ID.
 * @name delete
 * @memberof module:routes/moduleRoutes
 * @function
 * @inner
 */
router.delete('/:id', moduleController.delete);

module.exports = router;