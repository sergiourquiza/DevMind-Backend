const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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

// En tu archivo de controlador de autenticación
exports.checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(200).json({ message: 'Email available' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkUsername = async (req, res) => {
  const { username } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    res.status(200).json({ message: 'Username available' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// En el archivo del controlador de autenticación (Node.js)

exports.googleSignin = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    
    const { id, googleId, email, fullName, username, phoneNumber } = req.body;
    const googleIdentifier = googleId || id;

    if (!googleIdentifier || !email) {
      return res.status(400).json({
        error: 'Datos incompletos',
        receivedData: req.body
      });
    }

    
    const existingUser = await User.findOne({
      where: {
        email,
        googleId: null 
      }
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'Este correo electrónico ya está registrado con una cuenta normal. Por favor, inicie sesión con su contraseña o use otro correo.',
        code: 'EMAIL_EXISTS'
      });
    }

    
    let user = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { googleId: googleIdentifier }
        ]
      }
    });

    if (!user) {
      // Crear nuevo usuario
      user = await User.create({
        googleId: googleIdentifier,
        fullName,
        username,
        email,
        phoneNumber: phoneNumber || null
      });
    } else {
      // Actualizar usuario existente
      await user.update({
        googleId: googleIdentifier,
        fullName: fullName || user.fullName,
        username: username || user.username,
        phoneNumber: phoneNumber || user.phoneNumber
      });
    }

    // Preparar respuesta
    const userResponse = user.toJSON();
    delete userResponse.password;

    return res.status(200).json(userResponse);

  } catch (error) {
    console.error('Error en googleSignin:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    });
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'developermind1x@gmail.com',
    pass: 'pbax tivl cqpm rmbq'
  },
});

exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'El correo electrónico no está registrado.' });
    }

    const resetToken = crypto.randomBytes(3).toString('hex').toUpperCase();
    const resetExpires = Date.now() + 3600000;

    await user.update({ resetToken, resetExpires });

    await transporter.sendMail({
      to: user.email,
      from: 'developermind1x@gmail.com',
      subject: 'Código para restablecer tu contraseña',
      text: `Usa este código para restablecer tu contraseña en la app: ${resetToken}. Este código expira en 1 hora.`,
    });

    res.status(200).json({ message: 'Correo de restablecimiento enviado.' });
  } catch (error) {
    console.error('Error en resetPassword:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

exports.confirmResetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'El token es inválido o ha expirado.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);


    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetExpires: null
    });

    res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
  } catch (error) {
    console.error('Error en confirmResetPassword:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};