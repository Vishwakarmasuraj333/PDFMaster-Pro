const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Authentication API Endpoints
router.post('/register', authController.register);
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/login-password', authController.loginPassword);
router.post('/google', authController.googleAuth);
router.post('/github', authController.githubAuth);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.post('/logout-all', authController.logoutAll);
router.get('/me', authController.getMe);

module.exports = router;
