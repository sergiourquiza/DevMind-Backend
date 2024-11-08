const express = require('express');

/**
 * Express router to handle authentication routes.
 */
const router = express.Router();

const authController = require('../controllers/authController');

/**
 * Middleware for user signup.
 * @name signup
 * @memberof module:routes/authRoutes
 * @function
 * @inner
 */
router.post('/signup', authController.signup);

/**
 * Middleware for user login.
 * @name login
 * @memberof module:routes/authRoutes
 * @function
 * @inner
 */
router.post('/login', authController.login);

/**
 * Middleware for user logout.
 * @name logout
 * @memberof module:routes/authRoutes
 * @function
 * @inner
 */
router.get('/logout', authController.logout);

/**
 * Middleware for Google authentication initiation.
 * @name googleAuth
 * @memberof module:routes/authRoutes
 * @function
 * @inner
 */
router.get('/google', authController.googleAuth);

/**
 * Middleware for handling Google authentication callback.
 * @name googleCallback
 * @memberof module:routes/authRoutes
 * @function
 * @inner
 */
router.get('/google/callback', authController.googleCallback, authController.googleRedirect);

router.post('/google-signin', authController.googleSignin);

/**
 * Middleware for accessing protected resources.
 * @name protected
 * @memberof module:routes/authRoutes
 * @function
 * @inner
 */
router.get('/protected', authController.protected);

router.post('/check-email', authController.checkEmail);
router.post('/check-username', authController.checkUsername);

router.post('/reset-password', authController.resetPassword);
router.post('/confirm-reset-password', authController.confirmResetPassword);

module.exports = router;