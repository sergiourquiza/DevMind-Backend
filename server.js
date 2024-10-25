/**
 * Module dependencies.
 * @module app
 */
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes');
require('./config/passport'); // Cargar configuración de Passport


const cors = require('cors');
app.use(cors());

// Middleware
app.use(express.json());

// Middleware de sesión (requerido por Passport para mantener la sesión entre solicitudes)
app.use(session({
  secret: '123', // Cambia esto por un secreto más seguro
  resave: false,
  saveUninitialized: true
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

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

// Use routes (aquí también se incluirán las rutas de autenticación)
app.use('/api', routes);

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
