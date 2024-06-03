const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = passport.authenticate('google', { failureRedirect: '/' });

exports.googleRedirect = (req, res) => {
  res.redirect('/protected');
};

exports.protected = (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello ${req.user.username || req.user.displayName}`);
  } else {
    res.redirect('/auth/google');
  }
};
