// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Si hay roles permitidos y el usuario no tiene uno de ellos
        return <Navigate to="/" replace />; // O a una página de "Acceso Denegado"
    }

    return <Outlet />;
};

export default PrivateRoute;