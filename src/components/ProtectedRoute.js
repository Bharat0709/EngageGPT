import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useNotifications } from './Common/Notification';

const ProtectedRoute = ({ children }) => {
  const encodedToken = Cookies.get('engage-gpt');
  const token = useSelector((state) => state.auth.token);
  const message = useNotifications();

  if (!token || !encodedToken) {
    message.info('Please log in to get started');
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
