// frontend/src/actions/cartActions.js

import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

// Thunk action to add an item to the cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // 1. Fetch the product details from the server
  const { data } = await axios.get(`/api/products/${id}`);

  // 2. Dispatch the action to add the item to the Redux store
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty, // The quantity specified by the user
    },
  });

  // 3. Save the updated cart state to local storage (for persistence)
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Thunk action to remove an item from the cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // Update local storage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// You'll need additional actions (saveShippingAddress, savePaymentMethod, etc.) later.
