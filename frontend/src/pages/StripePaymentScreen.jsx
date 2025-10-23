// frontend/src/pages/StripePaymentScreen.jsx

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm'; // The component you built earlier

// NOTE: You must use your actual publishable key here.
// Replace 'YOUR_STRIPE_PUBLISHABLE_KEY' with the key you got from your Stripe dashboard.
const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY'); 

const StripePaymentScreen = () => {
    // You should retrieve the client secret from your backend in a real application.
    // For now, we will use a dummy one just to allow the form to render.
    // The actual payment will happen when we connect to the backend.
    const options = {
        clientSecret: 'pi_3P5d81H2iA324aSDwJ7a8cR0D_secret_EXAMPLE_SECRET_KEY',
    };
    
    // Check if Stripe key is provided
    if (!stripePromise) {
        return <div style={{textAlign: 'center', color: 'red'}}>
            <h2>Stripe Error</h2>
            <p>Stripe Publishable Key is missing or invalid. Please check StripePaymentScreen.jsx.</p>
        </div>
    }

    return (
        <div style={containerStyle}>
            <h1>Secure Payment</h1>
            <p>You will be charged ₹{/* Insert total price variable here later */}.00</p>
            <div style={{ marginTop: '30px' }}>
                <Elements stripe={stripePromise} options={options}>
                    {/* The actual payment form component */}
                    <PaymentForm /> 
                </Elements>
            </div>
        </div>
    );
};

const containerStyle = { maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' };

export default StripePaymentScreen;