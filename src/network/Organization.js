import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const ORGANIZATION_API_URL = '/organization';

export const sendHelpMail = async (helpTextContent) => {
  try {
    const response = await axiosInstance.post(
      `${ORGANIZATION_API_URL}/mail/help`,
      {
        helpTextContent,
      },
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const sendFeeback = async (feedbackContent, rating) => {
  try {
    const response = await axiosInstance.post(
      `${ORGANIZATION_API_URL}/mail/feedback`,
      {
        feedbackContent,
        rating,
      },
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post(
      `${ORGANIZATION_API_URL}/auth/forgot-password`,
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
    const response = await axiosInstance.post(
      `${ORGANIZATION_API_URL}/auth/reset-password/${token}`,
      {
        password,
        passwordConfirm,
      },
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const fetchOrganizationData = async () => {
  try {
    const response = await axiosInstance.get(`${ORGANIZATION_API_URL}/auth`);
    return response.data.user;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// New function to update profile
export const updateProfile = async (name, profilePicture) => {
  try {
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (profilePicture) formData.append('profilePicture', profilePicture);

    const response = await axiosInstance.put(
      `${ORGANIZATION_API_URL}/profile/update`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
