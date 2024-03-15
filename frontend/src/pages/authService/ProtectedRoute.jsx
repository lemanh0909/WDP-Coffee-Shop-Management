import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getUserRole } from './authService.jsx';

const ProtectedRoute = ({ element: Element, roles, ...rest }) => {
    const userRole = getUserRole();

    const isAuthorized = roles.includes(userRole);

    return (
        <Route
            {...rest}
            element={isAuthorized ? <Element /> : <Navigate to="/" />}
        />
    );
};

export default ProtectedRoute;
