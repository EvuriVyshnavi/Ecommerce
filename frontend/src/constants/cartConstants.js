/**
 * Global Constants for the Frontend Application.
 * Define API base URLs and common route paths here.
 */

// API Base URL (used by RTK Query in apiSlice.js)
// In a production environment, this should be dynamically set using env variables.
// For local development, assuming your backend runs on port 5000.
export const BASE_URL = 'http://localhost:5000'; 

// API Endpoints
// These are the constants used by the RTK Query slices (e.g., productsApiSlice, ordersApiSlice)
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders'; 

// Add other API routes as needed, e.g.,
// export const UPLOAD_URL = '/api/upload';
// export const PAYPAL_URL = '/api/config/paypal';

