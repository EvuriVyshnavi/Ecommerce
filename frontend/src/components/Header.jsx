// frontend/src/components/Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // <-- NEW: To get cart count
import { FaBars, FaTimes } from 'react-icons/fa';
import CategoryFilter from './CategoryFilter';

const Header = ({ onCategoryChange, selectedCategory }) => {
    // Get cart items from Redux state for the badge count
    const { cartItems } = useSelector(state => state.cart);

    // NOTE: User state (isLoggedIn) is assumed but not fully implemented here yet.
    const isLoggedIn = true; // Placeholder for now

    const [showCategories, setShowCategories] = useState(false);

    const logoutHandler = () => {
        // Implement actual logout logic here (e.g., dispatch logout action, clear token)
        alert('Logged out (placeholder)');
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    return (
        <>
            <header style={headerStyle}>
                <div style={leftSectionStyle}>
                    <button onClick={toggleCategories} style={menuButtonStyle}>
                        {showCategories ? <FaTimes /> : <FaBars />}
                    </button>
                    <div style={logoStyle}>
                        <Link to="/" style={logoLinkStyle}>
                            <span style={iconStyle}>🛒</span> Grocery App
                        </Link>
                    </div>
                </div>
                <nav style={navStyle}>
                    <Link to="/cart" style={navLinkStyle}>
                        Cart
                        {/* Display the total quantity of items in the cart */}
                        {cartItems.length > 0 && (
                            <span style={badgeStyle}>{cartItems.reduce((a, c) => a + c.qty, 0)}</span>
                        )}
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link to="/deliveryslots" style={navLinkStyle}>
                                Delivery Slots
                            </Link>
                            <Link to="/profile" style={navLinkStyle}>
                                Profile
                            </Link>
                            {/* Placeholder for user dropdown/welcome message */}
                            <span style={navLinkStyle}>Welcome, vyshnavi</span>
                            <button onClick={logoutHandler} style={logoutButtonStyle}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={navLinkStyle}>Login</Link>
                            <Link to="/register" style={navLinkStyle}>Register</Link>
                        </>
                    )}
                </nav>
            </header>

            {/* Categories dropdown */}
            {showCategories && (
                <div style={categoriesDropdownStyle}>
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onCategoryChange={(category) => {
                            onCategoryChange(category);
                            setShowCategories(false); // Close dropdown after selection
                        }}
                    />
                </div>
            )}
        </>
    );
};

// --- Styles ---
const headerStyle = {
    backgroundColor: '#343a40',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
};

const logoStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
};

const logoLinkStyle = {
    color: 'white',
    textDecoration: 'none',
};

const iconStyle = {
    marginRight: '5px',
};

const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
};

const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '5px 10px',
    transition: 'color 0.3s',
};

const logoutButtonStyle = {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const badgeStyle = {
    marginLeft: '5px',
    padding: '2px 6px',
    backgroundColor: '#f8c300',
    borderRadius: '10px',
    fontSize: '0.75em',
    color: '#333',
    fontWeight: 'bold'
};

const leftSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
};

const menuButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1.2em',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
};

const categoriesDropdownStyle = {
    position: 'absolute',
    top: '10px',
    left: '50px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    padding: '10px',
    minWidth: '200px',
};


export default Header;
