import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create a payment intent and charge the user
// @route   POST /api/payment/create-payment-intent
export const createPaymentIntent = async (req, res) => {
    // Assume req.body sends the total amount from the frontend (in cents)
    const { amount, currency = 'usd' } = req.body;

    try {
        // 1. Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount: amount, // amount is in cents, e.g., $10.00 = 1000
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        // 2. Respond with the client secret needed by the frontend
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Stripe Error:', error.message);
        res.status(500).json({ message: 'Payment processing failed.' });
    }
};
