// frontend/src/components/ProductCard.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Hook to dispatch actions
import { addToCart } from '../redux/slices/cartSlice'; // The cart action
import WishlistButton from './WishlistButton';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1); // State for quantity input

    const addToCartHandler = () => {
        // Dispatch the action to add the item to Redux state/Local Storage
        dispatch(addToCart({
            ...product,
            qty: Number(qty), // Ensure quantity is a number
        }));

        // Show a brief success message instead of alert
        const notification = document.createElement('div');
        notification.textContent = `${qty} x ${product.name} added to cart!`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            z-index: 1000;
            font-size: 14px;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 2000);
    };

    return (
        <div style={cardStyle}>
            <WishlistButton productId={product._id} />
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={imageStyle}
                    onError={(e) => {
                        e.target.onerror = null;
                        // If the src ends with .jpg try the .svg variant (fallback to existing svg placeholders)
                        try {
                            const src = e.target.src || '';
                            if (src.endsWith('.jpg')) {
                                e.target.src = src.replace(/\.jpg$/i, '.svg');
                                return;
                            }
                        } catch (err) {
                            // ignore and fallback to embedded placeholder below
                        }
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZGRkIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE0Ij5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4=';
                    }}
                />
                <h3 style={titleStyle}>{product.name}</h3>
            </Link>
            <p style={priceStyle}>
                ₹{product.price.toFixed(2)}
            </p>
            
            {/* --- CART CONTROLS START --- */}
            <div style={controlsStyle}>
                <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    style={qtyInputStyle}
                />
                <button
                    onClick={addToCartHandler}
                    style={buttonStyle}
                    // Disable button if stock is 0 (optional check)
                    disabled={product.countInStock === 0} 
                >
                    {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
            {/* --- CART CONTROLS END --- */}
        </div>
    );
};

// --- Inline Styles (Adjust as necessary) ---
const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px',
    width: '200px',
    textAlign: 'center',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
};

const imageStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px',
};

const titleStyle = {
    fontSize: '1.1em',
    margin: '5px 0',
    fontWeight: 'normal',
};

const priceStyle = {
    fontSize: '1.2em',
    color: '#007bff',
    fontWeight: 'bold',
    margin: '10px 0',
};

const controlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
};

const qtyInputStyle = {
    width: '40px',
    padding: '5px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const buttonStyle = {
    padding: '8px 10px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9em',
};

export default ProductCard;