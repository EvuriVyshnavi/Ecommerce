/**
 * API Endpoints Constants (Separate from Cart or User actions)
 * Used by RTK Query slices to define endpoint URLs.
 */

// API Endpoint URLs
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders'; 
export const PAYPAL_URL = '/api/config/paypal'; // Used for fetching PayPal Client ID
// Add other API routes here (e.g., UPLOAD_URL)