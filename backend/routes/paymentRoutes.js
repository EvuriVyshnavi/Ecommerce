import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController.js';
const router = express.Router();

// This route will be protected later, but we'll leave it public for initial testing
router.post('/create-payment-intent', createPaymentIntent);

export default router;
