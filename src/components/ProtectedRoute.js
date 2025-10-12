import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNotifications } from './Common/Notification';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const message = useNotifications();

  useEffect(() => {
    if (!token) {
      message.info('Please log in to get started');
    }
  }, []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;