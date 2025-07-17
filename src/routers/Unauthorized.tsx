// src/pages/Unauthorized.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>🚫 403 - Không có quyền truy cập</h1>
            <p>Bạn không có quyền truy cập vào trang này.</p>
            <Link to="/">Quay lại trang chủ</Link>
        </div>
    );
};

export default Unauthorized;
