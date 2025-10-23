// frontend/src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            
            const { data } = await axios.post(
                'http://localhost:5000/api/auth/register',
                { name, email, password },
                config
            );

            // Registration also logs the user in and returns a token
            localStorage.setItem('userInfo', JSON.stringify(data));
            
            // Redirect to the home page after successful registration
            navigate('/'); 

        } catch (err) {
            setError(err.response.data.message || 'Registration failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={submitHandler}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                
                <button type="submit" style={{ padding: '10px 15px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Register
                </button>
            </form>
            
            <div style={{ marginTop: '15px' }}>
                Have an Account? <Link to="/login">Sign In</Link>
            </div>
        </div>
    );
};

export default RegisterPage;