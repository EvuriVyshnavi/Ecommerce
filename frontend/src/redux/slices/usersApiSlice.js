import { apiSlice } from './apiSlice'; // 🛑 FIXED PATH: Now importing from the adjacent file
// ⚠️ CRITICAL PATH FIX: Assumes constants.js is two levels up
import { USERS_URL } from '../../constants/cartConstants.js'; 

/**
 * RTK Query API Slice for User Authentication and Profile Operations.
 */
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // 1. Login Endpoint (POST /api/users/auth)
    login: builder.mutation({
      query: (data) => ({
        // This resolves to: /api/users + /auth
        url: `${USERS_URL}/auth`, 
        method: 'POST',
        body: data,
      }),
    }),

    // 2. Register Endpoint (POST /api/users)
    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL, 
        method: 'POST',
        body: data,
      }),
    }),

    // 3. Logout Endpoint (POST /api/users/logout)
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    
    // 4. Update Profile Endpoint (PUT /api/users/profile)
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

// Export hooks
export const { 
    useLoginMutation, 
    useLogoutMutation,
    useRegisterMutation,
    useUpdateProfileMutation 
} = usersApiSlice;
