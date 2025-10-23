import { createSlice } from '@reduxjs/toolkit';

// Utility function to load initial state from localStorage
// Loads the entire cart object from local storage, if it exists.
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { 
      cartItems: [], 
      shippingAddress: {}, 
      paymentMethod: '', 
      // Initialize price values to '0.00' for consistency
      itemsPrice: '0.00', 
      shippingPrice: '0.00', 
      taxPrice: '0.00', 
      totalPrice: '0.00' 
    };

// Utility function to calculate prices and update local storage
// This function runs after every state change (add, remove, save address, etc.)
const updateCart = (state) => {
  // 1. Calculate Items Price
  // Calculates the sum of (item price * item quantity) for all items
  state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  // 2. Calculate Shipping Price (Example Logic)
  // Example: $10 shipping if items price is under $100, otherwise free.
  const itemsPriceNum = Number(state.itemsPrice);
  state.shippingPrice = (itemsPriceNum > 100 ? 0 : 10).toFixed(2);

  // 3. Calculate Tax Price (Example: 15% tax)
  state.taxPrice = (0.15 * itemsPriceNum).toFixed(2);

  // 4. Calculate Total Price
  state.totalPrice = (
    itemsPriceNum +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // 5. Save the updated state to Local Storage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; // Item payload includes product details and quantity

      // Check if item already exists in the cart (using the product ID, which is stored in the '_id' key)
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // If it exists, set the quantity to the provided value (replace)
        existItem.qty = item.qty;
      } else {
        // If it's a new item, add it to the cartItems array
        state.cartItems = [...state.cartItems, item];
      }

      // Update calculated prices and save to local storage
      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      // payload is the product ID (x._id) to remove
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    
    // Reducers for checkout process
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },

    clearCartItems: (state) => {
      // Clear cart items entirely
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

// Export the actions to be dispatched by components (e.g., dispatch(addToCart(item)))
export const { 
    addToCart, 
    removeFromCart, 
    saveShippingAddress, 
    savePaymentMethod,
    clearCartItems
} = cartSlice.actions;

// Export the reducer to be included in the store (e.g., reducer: { cart: cartReducer })
export default cartSlice.reducer;
