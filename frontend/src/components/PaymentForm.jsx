// frontend/src/components/PaymentForm.jsx

import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// --- Pricing Calculation Functions (Required to get the correct total price) ---
const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

// --- Component Start ---
const PaymentForm = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    // --- Price Calculation for Payment (Ensures total price is correct) ---
    const itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    const shippingPrice = addDecimals(itemsPrice > 500 ? 0 : 50);
    const taxPrice = addDecimals(Number((0.18 * itemsPrice).toFixed(2)));
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);
    // --- End Price Calculation ---

    // State to hold the client secret retrieved from the backend
    const [clientSecret, setClientSecret] = useState(null);

    // 1. Fetch Client Secret from Backend on Component Load
    useEffect(() => {
        const fetchClientSecret = async () => {
            if (!totalPrice || Number(totalPrice) <= 0) {
                setError('Cart is empty or total price is zero.');
                return;
            }

            try {
                setLoading(true);
                // POST request to backend endpoint to create PaymentIntent
                const { data } = await axios.post(
                    '/api/orders/create-payment-intent',
                    { totalPrice: totalPrice }, 
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                setClientSecret(data.clientSecret);
            } catch (err) {
                console.error("Error fetching client secret:", err);
                const errMsg = err.response?.data?.message || 'Could not initialize payment. Check backend terminal.';
                setError(errMsg);
            } finally {
                setLoading(false);
            }
        };
        
        if (totalPrice && Number(totalPrice) > 0) {
            fetchClientSecret();
        }
    }, [totalPrice]); 

    // 2. Handle Payment Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        if (!stripe || !elements || !clientSecret) {
             setError('Stripe service not ready.');
             return;
        }
        
        setLoading(true);
        
        const cardElement = elements.getElement(CardElement);
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: 'Vyshnavi MERN User', 
                },
            },
        });

        if (result.error) {
            setError(`Payment failed: ${result.error.message}`);
            setLoading(false);
        } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
            setSuccess(true);
            
            // 3. Send successful payment details to the backend to create the Order
            try {
                const orderDetails = {
                    // Map items to correctly reference the Product _id in the database
                    orderItems: cart.cartItems.map(item => ({...item, product: item._id})), 
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    paymentResult: { 
                        id: result.paymentIntent.id, 
                        status: result.paymentIntent.status, 
                        update_time: new Date().toISOString() 
                    },
                    // Send the calculated prices to the backend
                    itemsPrice: itemsPrice, 
                    shippingPrice: shippingPrice,
                    taxPrice: taxPrice,
                    totalPrice: totalPrice,
                };

                const { data: createdOrder } = await axios.post('/api/orders', orderDetails);
                
                alert(`Payment Successful! Order ID: ${createdOrder._id}. (Redirecting to Order Screen)`);
                navigate(`/order/${createdOrder._id}`);
                
            } catch (apiError) {
                console.error("Error creating order after payment:", apiError);
                setError('Payment succeeded, but failed to create order record.');
                setLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2>Payment Details</h2>
            {error && <div style={errorStyle}>{error}</div>}
            {/* FIX: Removed the extra closing </div> tag */}
            {success && <div style={successStyle}>Payment successful! Redirecting...</div>} 
            
            {loading || !clientSecret ? (
                <div style={{textAlign: 'center', padding: '20px'}}>
                    {loading ? 'Loading Payment Form...' : 'Fetching client secret...'}
                </div>
            ) : (
                <>
                    <div style={cardElementContainerStyle}>
                        <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </div>
                    <button type="submit" disabled={!stripe || loading} style={buttonStyle}>
                        {loading ? 'Processing...' : `Pay ₹${totalPrice}`}
                    </button>
                </>
            )}
        </form>
    );
};

// --- Styles and Options ---
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const formStyle = { padding: '20px', border: '1px solid #ddd', borderRadius: '4px', background: '#fff' };
const cardElementContainerStyle = { marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' };
const buttonStyle = { width: '100%', padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const errorStyle = { color: 'red', border: '1px solid red', padding: '10px', marginBottom: '15px', borderRadius: '4px' };
const successStyle = { color: 'green', border: '1px solid green', padding: '10px', marginBottom: '15px', borderRadius: '4px' };


export default PaymentForm;