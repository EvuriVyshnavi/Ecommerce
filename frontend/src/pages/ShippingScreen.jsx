// frontend/src/pages/ShippingScreen.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Load previous shipping address from Redux/Local Storage
    const { shippingAddress } = useSelector(state => state.cart);

    // Initialize state with stored data or empty strings
    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    // If cart is empty, redirect user back to cart page
    const { cartItems } = useSelector(state => state.cart);
    useEffect(() => {
      if (cartItems.length === 0) {
        navigate('/cart');
      }
    }, [cartItems, navigate]);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/paymentmethod'); // Go to the next step
    };

    return (
        <div style={containerStyle}>
            <CheckoutSteps step1 />
            <h1>Shipping</h1>
            <form onSubmit={submitHandler} style={formStyle}>
                
                <div style={formGroupStyle}>
                    <label>Address</label>
                    <input
                        type="text"
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                
                <div style={formGroupStyle}>
                    <label>City</label>
                    <input
                        type="text"
                        placeholder='Enter city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                
                <div style={formGroupStyle}>
                    <label>Postal Code</label>
                    <input
                        type="text"
                        placeholder='Enter postal code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                
                <div style={formGroupStyle}>
                    <label>Country</label>
                    <input
                        type="text"
                        placeholder='Enter country'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                        style={inputStyle}
                    />
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
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const formGroupStyle = { display: 'flex', flexDirection: 'column' };
const inputStyle = { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '5px' };
const buttonStyle = { padding: '10px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' };


export default ShippingScreen;