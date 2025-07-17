// src/App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import UserLayout from './user/UserLayout';
import AdminLayout from './admin/AdminLayout';
import AdminRoute from '../src/routers/AdminRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Trang user */}
          <Route path="/*" element={<UserLayout />} />

          {/* Trang admin */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
