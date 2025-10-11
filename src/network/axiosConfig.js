import axios from 'axios';
import { store } from '../redux/store';
import { logoutAction } from '../redux/auth/authActions';
import Cookies from 'js-cookie';
import { decodeToken } from '../utils/tokenUtils';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ allow sending cookies automatically
});

axiosInstance.interceptors.request.use(
  (config) => {
    const encodedToken = Cookies.get('engage-gpt');

    if (encodedToken) {
      // Optional: verify token validity before sending
      const token = decodeToken(encodedToken);
      if (token) {
        try {
          const decodedPayload = JSON.parse(atob(token.split('.')[1]));
          const isExpired = decodedPayload.exp * 1000 < Date.now();

          if (isExpired) {
            console.warn('JWT expired. Logging out...');
            store.dispatch(logoutAction());
            return Promise.reject(new Error('Token expired'));
          }
        } catch (err) {
          console.error('Error decoding JWT:', err);
        }
      }
    }

    // ❌ No need to attach Authorization header
    // The cookie will be automatically sent via withCredentials
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutAction());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;