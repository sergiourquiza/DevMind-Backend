const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback, authController.googleRedirect);
router.get('/protected', authController.protected);

module.exports = router;