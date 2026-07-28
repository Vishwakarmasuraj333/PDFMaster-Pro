const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/auth');

router.get('/profile', verifyToken, userController.getProfile);
router.get('/dashboard-stats', verifyToken, userController.getDashboardStats);
router.get('/files', verifyToken, userController.getFiles);
router.get('/api-tokens', verifyToken, userController.getApiTokens);

module.exports = router;
