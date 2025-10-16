import axios from 'axios';
import { store } from '../redux/store';
import { logoutAction } from '../redux/auth/authActions';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

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
