import { apiSlice } from "./apiSlice"; 
// Corrected path to target frontend/src/constants/apiConstants.js
import { ORDERS_URL, PAYPAL_URL } from "../../constants/apiConstants"; 

/**
 * Defines API endpoints for order management (create, details, payment).
 * This slice uses the base apiSlice and injects its order-specific endpoints.
 */
export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Endpoint for creating a new order (POST /api/orders)
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: order, // The structured order data payload
            }),
            // Use 'Product' tag invalidation to ensure UI reflects new stock count
            invalidatesTags: ['Product'], 
        }),

        // 2. Endpoint for fetching a single order by ID (GET /api/orders/:id)
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
            }),
            // Keep the data cached for a short period
            keepUnusedDataFor: 5,
        }),

        // 3. Endpoint for fetching PayPal client ID (GET /api/config/paypal)
        getPaypalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),

        // 4. Endpoint for marking an order as paid (PUT /api/orders/:id/pay)
        // This mutation takes the order ID and payment details as payload
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: details,
            }),
            // Force refetch of the order details after payment is successful
            invalidatesTags: ['Order'], 
        }),

        // 5. Endpoint for getting all logged-in user's orders (GET /api/orders/myorders)
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorders`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

// Export the generated hooks for use in components
export const { 
    useCreateOrderMutation, 
    useGetOrderDetailsQuery, 
    useGetPaypalClientIdQuery,
    usePayOrderMutation, // New hook for processing payment
    useGetMyOrdersQuery, // New hook for fetching user-specific order history
} = ordersApiSlice;


