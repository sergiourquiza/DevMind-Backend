const express = require('express');

/**
 * Express router to handle authentication routes.
 */
const router = express.Router();

const contactController = require('../controllers/contactController');

/**
 * Middleware for user contact.
 * @name contact
 * @memberof module:routes/contactRoutes
 * @function
 * @inner
 */
router.post('/', contactController.contact);

module.exports = router;