import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;

