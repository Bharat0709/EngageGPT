// src/hooks/useAuth.js

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setAuthTokenAction } from '../redux/auth/authActions';
import { decodeToken } from '../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    const checkAuth = async () => {
      const encodedToken = Cookies.get('engage-gpt');
      if (encodedToken) {
        try {
          const decodedToken = decodeToken(encodedToken);
          dispatch(setAuthTokenAction(decodedToken));
          navigate('/dashboard');
        } catch (error) {
          console.error('Token decoding failed:', error);
          Cookies.remove('engage-gpt');
          alert('Session expired. Please log in.');
        }
      }
    };
    checkAuth();
  }, [dispatch, navigate]);
};

export default useAuthCheck;
