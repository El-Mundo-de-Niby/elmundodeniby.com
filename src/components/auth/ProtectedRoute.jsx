// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, element }) => {
    const location = useLocation();

    if (!isLoggedIn) {
        // Añadimos promptLogin: true al estado
        return <Navigate to="/login" state={{ from: location, promptLogin: true }} replace />;
    }
    return element;
};
export default ProtectedRoute;