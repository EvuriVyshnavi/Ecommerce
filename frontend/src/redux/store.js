import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice'; // 🛑 NEW PATH: Importing the new apiSlice file
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

// A utility function to combine all reducers (optional, but standard practice)
// Note: apiSlice.reducer is required for RTK Query to manage its state
const reducer = {
    [apiSlice.reducerPath]: apiSlice.reducer, // This is crucial for RTK Query state
    cart: cartReducer,
    auth: authReducer,
};

const store = configureStore({
    reducer,
    // Add the api middleware to enable caching, invalidation, polling, etc.
    // This must be appended, not overwritten.
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    
    // Disable dev tools in production (optional, but recommended)
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

