/**
 * Module dependencies.
 * @module app
 */

const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware
app.use(express.json());

/**
 * Default route.
 * @name GET /
 * @function
 * @memberof module:app
 * @inner
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {void}
 */
app.get('/', (req, res) => {
  res.send('--- Welcome to the DEV|MIND API, ready to serve you 😊 ---');
});

// Use routes
app.use('/', routes);

// Port
const PORT = process.env.PORT || 3000;
/**
 * Start the server.
 * @name listen
 * @function
 * @memberof module:app
 * @param {number} PORT - Port number to listen on.
 * @param {Function} callback - Callback function to be executed once the server is started.
 * @returns {void}
 */
app.listen(PORT, () => {
  console.log(`Server is active on port ${PORT}`);
});