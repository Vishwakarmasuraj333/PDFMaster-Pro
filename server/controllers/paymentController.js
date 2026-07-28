const createCheckoutSession = async (req, res, next) => {
  try {
    const { planSlug, billingCycle } = req.body;
    res.status(200).json({
      success: true,
      sessionId: 'cs_test_mock_session_123',
      checkoutUrl: 'https://checkout.stripe.com/pay/mock_session_123',
    });
  } catch (error) {
    next(error);
  }
};

const handleStripeWebhook = async (req, res, next) => {
  try {
    res.status(200).json({ received: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCheckoutSession,
  handleStripeWebhook,
};
