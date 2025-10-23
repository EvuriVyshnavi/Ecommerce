import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * A private route component that checks for user authentication.
 * If the user is logged in (userInfo exists in Redux state), it renders the child routes (<Outlet>).
 * Otherwise, it redirects the user to the login page (/login).
 */
const PrivateRoute = () => {
  // 1. Get user info from the Redux auth slice
  // Assumes your user token/data is stored under state.auth.userInfo
  const { userInfo } = useSelector((state) => state.auth);

  // 2. Check if user is logged in
  // If userInfo exists, render the nested component (e.g., ShippingScreen)
  // If userInfo does not exist, redirect to the login page
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
