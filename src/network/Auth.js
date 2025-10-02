import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const BASE_URL = '/auth';

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

export const sendVerificationEmail = async (email, timeZone) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/signup/initiate`, {
      email,
      timeZone,
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const resendVerificationEmail = async (email) => {
  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/resend-verification`,
      {
        email,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const verifyMail = async (email, token) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/verify-email`, {
      email,
      token,
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const checkVerificationStatus = async (email) => {
  try {
    const response = await axiosInstance.post(
      `/organization/check-verification`,
      {
        email,
      },
    );
    return response.data.isVerified;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const signup = async (email, password, passwordConfirm) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/signup/complete`, {
      email,
      password,
      passwordConfirm,
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/password-reset/initiate`,
      {
        email,
      },
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const resetPassword = async (token, password, passwordConfirm) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/password-reset`, {
      token,
      password,
      passwordConfirm,
    });
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
