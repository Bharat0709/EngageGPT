// src/hooks/useAuth.js

import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          navigate('/dashboard');
        } catch (error) {
          Cookies.remove('engage-gpt');
        }
      }
    };
    checkAuth();
  }, [dispatch, navigate]);
};

export default useAuthCheck;
