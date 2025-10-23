import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';

// Image URL helper removed - using Vite proxy for consistency

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the cart state from Redux
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart; // Correctly extract the cartItems array
  // Read auth at top level (hooks must be used at top level)
  const { userInfo } = useSelector((state) => state.auth);

  // Handler to change the quantity of an item
  const updateQtyHandler = (item, qty) => {
    // Uses addToCart action to update quantity if item already exists
    // Ensure the payload contains _id (some code stores product id as `product`)
    const payload = { ...item, qty, _id: item._id || item.product };
    dispatch(addToCart(payload)); 
  };

  // Handler to remove an item completely
  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Handler for the Checkout button (for later, currently redirects)
  const checkoutHandler = () => {
    // Check if user is logged in (userInfo read at top-level)
    if (userInfo) {
      // If logged in, go directly to shipping
      navigate('/shipping');
    } else {
      // If not logged in, redirect to login with return to shipping
      navigate('/login?redirect=/shipping');
    }
  };

  // Calculate totals
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);


  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>

      {/* Conditional rendering based on whether cart has items */}
      {cartItems.length === 0 ? (
        <div style={emptyCartStyle}>
          Your cart is empty. <Link to="/">Go Back</Link>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontSize: '16px' }}>
              ← Continue Shopping
            </Link>
          </div>
            <div style={gridStyle}>
              {/* Cart Items Column (3/4 width) */}
              <div style={itemsContainerStyle}>
                {cartItems.map((item) => (
                  <div key={item._id} style={itemCardStyle}>
                    <div style={imageColStyle}>
                      {/* 🛑 CRITICAL FIX APPLIED HERE 🛑 */}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={itemImageStyle}
                        onError={(e) => { e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjZGRkIi8+Cjx0ZXh0IHg9IjI1IiB5PSIyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjEwIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4='; }}
                      />
                    </div>
                    <div style={nameColStyle}>
                      <Link to={`/product/${item._id || item.product}`}>{item.name}</Link>
                    </div>
                    <div style={priceColStyle}>₹{item.price.toFixed(2)}</div>
                    <div style={qtyColStyle}>
                      {/* Quantity Dropdown */}
                      <select
                        value={item.qty}
                        onChange={(e) => updateQtyHandler(item, Number(e.target.value))}
                        style={selectStyle}
                      >
                        {/* Generates options up to the stock limit */}
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={removeColStyle}>
                      <button onClick={() => removeItemHandler(item._id)} style={removeButtonStyle}>
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal Column (1/4 width) */}
              <div style={subtotalCardStyle}>
                <h2 style={{ fontSize: '1.5em' }}>Subtotal ({totalItems} items)</h2>
                <p style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                  ₹{totalPrice.toFixed(2)}
                </p>
                <button
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                    style={checkoutButtonStyle}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

// --- Styles ---
const containerStyle = { padding: '20px', maxWidth: '1200px', margin: '0 auto' };
const emptyCartStyle = { padding: '20px', border: '1px solid #ccc', textAlign: 'center' };
const gridStyle = { display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '30px' };
const itemsContainerStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const itemCardStyle = { 
    display: 'flex', 
    alignItems: 'center', 
    border: '1px solid #eee', 
    padding: '10px', 
    borderRadius: '4px',
    backgroundColor: '#fff'
};
const itemImageStyle = { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' };
const imageColStyle = { flex: '0 0 70px' };
const nameColStyle = { flex: 2 };
const priceColStyle = { flex: 1, fontWeight: 'bold' };
const qtyColStyle = { flex: 1 };
const removeColStyle = { flex: '0 0 50px', textAlign: 'right' };
const selectStyle = { padding: '5px', borderRadius: '4px', border: '1px solid #ccc' };
const removeButtonStyle = { 
    background: 'none', 
    border: 'none', 
    cursor: 'pointer', 
    fontSize: '1.2em' 
};
const subtotalCardStyle = { 
    padding: '20px', 
    border: '1px solid #ccc', 
    borderRadius: '4px', 
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    height: 'fit-content'
};
const checkoutButtonStyle = { 
    width: '100%', 
    padding: '10px', 
    marginTop: '15px', 
    background: '#007bff', 
    color: 'white', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer' 
};

export default CartScreen;
