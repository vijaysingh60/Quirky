import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, checkAuthStatus } = useContext(AuthContext);

    useEffect(() => {
        const verifyAuth = async () => {
            await checkAuthStatus();
        };
        verifyAuth();
    }, [checkAuthStatus]);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
