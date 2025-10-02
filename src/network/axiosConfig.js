import axios from 'axios';
import { store } from '../redux/store';
import { logoutAction } from '../redux/auth/authActions';
import { decodeToken } from '../utils/tokenUtils';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('engage-gpt');
    if (token) {
      const decodedToken = decodeToken(token);
      config.headers.Authorization = `Bearer ${decodedToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutAction());
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
