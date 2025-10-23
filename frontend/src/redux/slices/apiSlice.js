import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Use a relative base URL so Vite's dev server proxy (configured in vite.config.js)
// forwards '/api' requests to the backend. This avoids CORS and host-mismatch issues
// during development.
const baseQuery = fetchBaseQuery({ baseUrl: '' });

// 2. Create the main API slice using RTK Query
export const apiSlice = createApi({
    // Defines where the state will be stored (e.g., store.getState().api)
    baseQuery,
    // Defines the tag types used for caching and invalidation
    tagTypes: ['Product', 'Order', 'User'], 
    endpoints: (builder) => ({
        // Define endpoints for your application
        // NOTE: Specific endpoints (like getProducts, login) are defined in other files 
        // that *inject* into this base slice (e.g., productsApiSlice.js).
    }),
});

// Export the base apiSlice. The other slices (products, users) will import this 
// and use `.injectEndpoints` on it.
export default apiSlice;
