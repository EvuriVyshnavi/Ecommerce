// frontend/src/pages/PaymentMethodScreen.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../redux/slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentMethodScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Load existing data from Redux cart state
    const { shippingAddress, paymentMethod } = useSelector(state => state.cart);

    // If shipping address is missing, redirect back to shipping screen
    useEffect(() => {
        if (!shippingAddress || Object.keys(shippingAddress).length === 0) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    // Initialize state with stored payment method or default to Stripe
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethod || 'Stripe');

    const submitHandler = (e) => {
        e.preventDefault();
        // Dispatch the action to save the selected method to Redux/Local Storage
        dispatch(savePaymentMethod(selectedPaymentMethod));
        navigate('/placeorder'); // Go to the final order summary page
    };

    return (
        <div style={containerStyle}>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <form onSubmit={submitHandler} style={formStyle}>
                
                <div style={formGroupStyle}>
                    <label style={{ fontWeight: 'bold', marginBottom: '10px' }}>Select Method</label>
                    
                    {/* Option 1: Credit Card / Stripe */}
                    <div style={radioGroupStyle}>
                        <input
                            type="radio"
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe' // CRITICAL: This exact string is saved and checked in PlaceOrderScreen.jsx
                            checked={selectedPaymentMethod === 'Stripe'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <label htmlFor='Stripe'>Credit Card (via Stripe)</label>
                    </div>

                    {/* Option 2: Cash on Delivery (COD) */}
                    <div style={radioGroupStyle}>
                        <input
                            type="radio"
                            id='COD'
                            name='paymentMethod'
                            value='COD'
                            checked={selectedPaymentMethod === 'COD'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <label htmlFor='COD'>Cash On Delivery (COD)</label>
                    </div>

                </div>

                <button type='submit' style={buttonStyle}>
                    Continue
                </button>
            </form>
        </div>
    );
};

// --- Styles ---
const containerStyle = { maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
const formGroupStyle = { display: 'flex', flexDirection: 'column' };
const radioGroupStyle = { display: 'flex', alignItems: 'center', marginBottom: '10px' };
const buttonStyle = { padding: '10px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' };


export default PaymentMethodScreen;