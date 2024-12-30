import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const BASE_URL = '/organization/auth';

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const signup = async (email, password, passwordConfirm) => {
  console.log(email, password, passwordConfirm);
  try {
    const response = await axiosInstance.post(`${BASE_URL}/signup`, {
      email,
      password,
      passwordConfirm,
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
