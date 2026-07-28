const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../middlewares/auth');

router.post('/create-checkout', verifyToken, paymentController.createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleStripeWebhook);

module.exports = router;
