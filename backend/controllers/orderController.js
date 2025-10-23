// backend/controllers/orderController.js

import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Stripe with the secret key from .env
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Needs auth implemented later)
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        paymentResult,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        // NOTE: userId should come from req.user after authentication is implemented
        const order = new Order({
            // TEMP: Using a static user ID for now (Replace later)
            user: '666d925d2524d7759881d587', // Replace with a valid ObjectId from your DB, or remove for now
            orderItems: orderItems.map((item) => ({
                ...item,
                product: item.product, // Use the product ID from the item
                _id: undefined, // Remove the temporary _id from the cart item
            })),
            shippingAddress,
            paymentMethod,
            paymentResult,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: true, // Mark as paid since we are using Stripe confirmation
            paidAt: Date.now(),
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});


// @desc    Create Stripe Payment Intent
// @route   POST /api/orders/create-payment-intent
// @access  Private (Needs auth implemented later)
const createPaymentIntent = asyncHandler(async (req, res) => {
    const { totalPrice } = req.body;

    if (!totalPrice || Number(totalPrice) <= 0) {
        res.status(400);
        throw new Error('Invalid or missing total price');
    }

    try {
        // Stripe expects amount in the smallest currency unit (e.g., cents/paise)
        const amountInPaise = Math.round(totalPrice * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInPaise,
            currency: 'inr', // Use your currency code
            automatic_payment_methods: { enabled: true },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.error('Stripe Error:', error.message);
        res.status(500).json({ message: 'Failed to create payment intent.', error: error.message });
    }
});


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (Needs auth implemented later)
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    // .populate('user', 'name email'); // Add populate after user auth is complete

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// Export all functions for use in orderRoutes.js
export { 
    addOrderItems, 
    createPaymentIntent, 
    getOrderById 
};