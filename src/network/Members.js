import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const MEMBER_API_URL = '/members';

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

export const createMemberPersona = async (
  preferences,
  postSamples,
  memberId,
) => {
  try {
    const response = await axiosInstance.post(
      `${MEMBER_API_URL}/createPersona/${memberId}`,
      {
        preferences,
        postSamples,
      },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
export const fetchSheetDetails = async (gooleSheetUrl) => {
  try {
    const response = await axiosInstance.post(
      `${MEMBER_API_URL}/integrations/googleSheet`,
      {
        googleSheetUrl: gooleSheetUrl,
      },
    );
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

export const disconnectLinkedIn = async (memberId) => {
  try {
    const response = await axiosInstance.post(
      `${MEMBER_API_URL}/linkedin/disconnect/${memberId}`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
