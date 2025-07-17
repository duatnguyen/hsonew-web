// src/routes/AdminRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AdminRouteProps {
    children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Nếu chưa đăng nhập → về trang login
        return <Navigate to="/login" replace />;
    }

    if (user.role !== 'admin') {
        // Nếu không phải admin → về trang không có quyền
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default AdminRoute;
