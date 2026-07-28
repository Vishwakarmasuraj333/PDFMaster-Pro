const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, authorizeRoles } = require('../middlewares/auth');

router.get('/metrics', verifyToken, authorizeRoles('ADMIN', 'STAFF'), adminController.getAdminMetrics);
router.get('/users', verifyToken, authorizeRoles('ADMIN'), adminController.getUsersList);
router.get('/logs', verifyToken, authorizeRoles('ADMIN'), adminController.getSystemLogs);

module.exports = router;
