import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotifications } from '@components/Common/Notification';
import { setAuthTokenAction } from '@redux/auth/authActions';
import logo from '@assets/images/EngageGPTLogo.png';

const GoogleLoginRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const message = useNotifications();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGoogleRedirect = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const tokenFromQuery = params.get('token');
        console.log(params);

        if (!tokenFromQuery) {
          message.error('Google login failed or session expired.');
          navigate('/login');
          return;
        }

        // Random wait time between 3 and 5 seconds
        const waitTime = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
        await new Promise((resolve) => setTimeout(resolve, waitTime));

        // Save token in Redux state for frontend use
        dispatch(setAuthTokenAction(tokenFromQuery));
        message.success('Login successful! Redirecting...');
        navigate('/dashboard');
      } catch (error) {
        console.error(error);
        message.error('Something went wrong with Google login.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    handleGoogleRedirect();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-sky-800 to-sky-900">
      <div className="bg-white rounded-2xl shadow-xl w-96 p-8 flex flex-col items-center">
        {/* Logo */}
        <img src={logo} alt="EngageGPT Logo" className="w-3/4 h-16 mb-6" />

        {/* Title */}
        <h1 className="text-2xl font-semibold text-sky-900 mb-4 text-center">
          Logging you in...
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 text-center mb-8">
          We are redirecting you to your dashboard.
        </p>

        {/* Loader */}
        <div className="loader mb-4"></div>

        {/* Optional spinner message */}
        {loading && <p className="text-gray-500 text-sm">Please wait a moment...</p>}
      </div>
    </div>
  );
};

export default GoogleLoginRedirect;