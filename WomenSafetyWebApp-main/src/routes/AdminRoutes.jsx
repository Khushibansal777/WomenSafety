import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth';

const AdminRoute = () => {
  const [auth] = useAuth();
  const adminEmail = "admin@example.com"; // 🔁 Replace with your admin email

  if (!auth?.user) {
    return <Navigate to="/login" />;
  }

  return auth.user.email === adminEmail ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;