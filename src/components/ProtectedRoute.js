import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { message } from 'antd';

const ProtectedRoute = ({ children }) => {
  const encodedToken = Cookies.get('engage-gpt');
  const token = useSelector((state) => state.auth.token);

  if (!token || !encodedToken) {
    message.error('Session expired. Please log in.');
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
