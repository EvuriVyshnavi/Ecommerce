import { createSlice } from '@reduxjs/toolkit';

/**
 * Utility function to load user data from localStorage.
 * If data exists, it's parsed and returned; otherwise, null is returned.
 */
const loadUserInfoFromStorage = () => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('Error loading user info from localStorage:', error);
    return null;
  }
};

// Define the initial state for the auth slice
const initialState = {
  // Check localStorage on app load to persist login state
  userInfo: loadUserInfoFromStorage(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action dispatched upon successful login or registration
    setCredentials: (state, action) => {
      // 1. Update the state with user data (payload should contain the JWT and user details)
      state.userInfo = action.payload;
      
      // 2. Persist the user data in localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },

    // Action dispatched upon logout
    logout: (state) => {
      // 1. Clear the user info from the state
      state.userInfo = null;
      
      // 2. Remove the user data from localStorage
      localStorage.removeItem('userInfo');
      // Note: A cookie clearance on the backend is typically needed too,
      // handled via a `useLogoutMutation` call in the component.
    },
  },
});

// Export the actions for use in components (e.g., dispatch(setCredentials(...)))
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer for use in the store
export default authSlice.reducer;
