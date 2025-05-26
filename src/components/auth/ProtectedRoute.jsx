import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
const ProtectedRoute = ({ element }) => {
    const { isLoggedIn, loadingAuth } = useAuth();
    const location = useLocation();

    if (loadingAuth) {
        return <div className="min-h-screen flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin" /></div>; // O un spinner más elegante
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location, promptLogin: true }} replace />;
    }
    return element;
};
export default ProtectedRoute;