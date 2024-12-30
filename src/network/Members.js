import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const MEMBER_API_URL = '/members';

export const fetchOrganizationData = async () => {
  try {
    const response = await axiosInstance.get(`/organization/auth`);
    return response.data.user;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const addNewMember = async (newMemberDetails) => {
  const { name, email } = newMemberDetails;
  try {
    const response = await axiosInstance.post(`${MEMBER_API_URL}/create`, {
      name,
      email,
    });
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const getAllMembers = async () => {
  try {
    const response = await axiosInstance.get(`${MEMBER_API_URL}/all`);
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
