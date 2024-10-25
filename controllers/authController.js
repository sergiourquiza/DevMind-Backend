const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');

/**
 * Controller function to sign up a new user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.signup = async (req, res) => {
  const { fullName, username, phoneNumber, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ fullName, username,phoneNumber, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Controller function to handle user login.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ error: info.message });
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json(user);
    });
  })(req, res, next);
};

/**
 * Controller function to log out the user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Maneja el error si ocurre
    }
    res.redirect('/'); // Redirige al usuario después de cerrar sesión
  });
};


/**
 * Controller function to initiate Google OAuth authentication.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

/**
 * Controller function to handle Google OAuth callback.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.googleCallback = passport.authenticate('google', { failureRedirect: '/' });

/**
 * Controller function to redirect after successful Google OAuth authentication.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.googleRedirect = (req, res) => {
  res.redirect('/protected');
};

/**
 * Controller function to access protected route.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.protected = (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello ${req.user.username || req.user.displayName}`);
  } else {
    res.redirect('/auth/google');
  }
};