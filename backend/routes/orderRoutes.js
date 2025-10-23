// backend/routes/orderRoutes.js

import express from 'express';
import { 
    createPaymentIntent, 
    addOrderItems,
    getOrderById 
} from '../controllers/orderController.js'; // <-- Note the .js extensions

const router = express.Router();

// Route for Stripe to get the client secret
// Sends a POST request with totalPrice in the body
router.post('/create-payment-intent', createPaymentIntent); 

// Route for saving the order after a successful payment
router.route('/').post(addOrderItems);

// Route for getting a specific order by ID
router.route('/:id').get(getOrderById);


export default router;