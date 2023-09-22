// service/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  // Implement your authentication logic here
  const isAuthenticated = true; // Example: You need to replace this with your authentication logic

  if (isAuthenticated) {
    return <Route element={element} />;
  } else {
    // Redirect to login if not authenticated
    return <Navigate to="/Login" />;
  }
};

export default ProtectedRoute;
