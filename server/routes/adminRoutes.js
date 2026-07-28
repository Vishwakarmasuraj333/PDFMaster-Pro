const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, requireRole } = require('../middlewares/auth');

// Protected Private Admin Routes (Requires ADMIN Role)
router.use(verifyToken);
router.use(requireRole(['ADMIN']));

router.get('/metrics', adminController.getAdminMetrics);
router.get('/users', adminController.getUsersList);
router.get('/logs', adminController.getSystemLogs);
router.delete('/user/:id', adminController.deleteUser);
router.patch('/user/:id/status', adminController.updateUserStatus);

module.exports = router;
