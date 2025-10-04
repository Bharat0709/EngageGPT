import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const ORGANIZATION_API_URL = '/organization';

export const sendHelpMail = async (helpTextContent) => {
  try {
    const response = await axiosInstance.post(
      `${ORGANIZATION_API_URL}/help`,
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
      `${ORGANIZATION_API_URL}/feedback`,
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

export const fetchOrganizationData = async () => {
  try {
    const response = await axiosInstance.get(`${ORGANIZATION_API_URL}/profile`);
    return response.data.profile;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const getCreditsLeft = async () => {
  try {
    const response = await axiosInstance.get(
      `${ORGANIZATION_API_URL}/credits-left`,
    );
    return response?.data?.credits || 0;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const updateProfile = async (name, profilePicture) => {
  try {
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (profilePicture) formData.append('profilePicture', profilePicture);

    const response = await axiosInstance.patch(
      `${ORGANIZATION_API_URL}/profile`,
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

// Add this to your organization network file

export const fetchDodoProducts = async () => {
  try {
    const response = await axiosInstance.get('/payments/dodo-products');
    console.log(response.data.data.products.items);
    return response.data.data.products.items;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const createCheckoutSession = async (productId) => {
  try {
    const response = await axiosInstance.post('/payments/create', {
      product_id: productId,
    });
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};