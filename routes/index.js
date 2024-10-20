/**
 * Module defining the main routes of the application.
 * @module routes/index
 */

const express = require('express');
const router = express.Router();

// Import all routes
const difficultyRoutes = require('./difficultyRoutes'); // Routes related to difficulties
const answerRoutes = require('./answerRoutes'); // Routes related to answers
const moduleRoutes = require('./moduleRoutes'); // Routes related to modules
const progressRoutes = require('./progressRoutes'); // Routes related to progress
const authRoutes = require('./authRoutes'); // Routes related to authentication
const userRoutes = require('./userRoutes'); // Routes related to users
const theoryRoutes = require('./theoryRoutes'); // Routes related to theories
const exerciseRoutes = require('./exerciseRoutes'); // Routes related to exercises
const userExerciseRoutes = require('./userExerciseRoutes'); // Routes related to user exercises
const inputRoutes = require('./inputRoutes'); // Routes related to inputs
const compileRoutes = require('./compileRoutes'); // Routes related to compile

/**
 * Middleware that assigns routes to different URL segments.
 * @name router
 * @function
 * @memberof module:routes/index
 */
// Use the routes
router.use('/difficulties', difficultyRoutes); // Routes for difficulties
router.use('/answers', answerRoutes); // Routes for answers
router.use('/modules', moduleRoutes); // Routes for modules
router.use('/progresses', progressRoutes); // Routes for progress
router.use('/auth', authRoutes); // Routes for authentication
router.use('/users', userRoutes); // Routes for users
router.use('/theories', theoryRoutes); // Routes for theories
router.use('/exercises', exerciseRoutes); // Routes for exercises
router.use('/user-exercises', userExerciseRoutes); // Routes for user exercises
router.use('/inputs', inputRoutes); // Routes for inputs
router.use('/compile', compileRoutes); // Routes for compile

/**
 * Export the assigned routes.
 * @name module.exports
 * @type {object}
 * @memberof module:routes/index
 */
module.exports = router;