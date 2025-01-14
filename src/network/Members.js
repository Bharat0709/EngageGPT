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

export const submitSurvey = async (formData) => {
  try {
    const response = await axiosInstance.post(`${MEMBER_API_URL}/survey`, {
      formData,
    });
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const addContentCalendar = async (calendarData, memberId) => {
  try {
    console.table(calendarData);
    const formattedData = calendarData.map((item) => {
      return {
        title: item.Title,
        date: item.Date,
        time: item.Time,
      };
    });

    const response = await axiosInstance.post(
      `${MEMBER_API_URL}/content-calendar/${memberId}`,
      {
        calendarData: formattedData,
      },
    );

    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const getContentCalendar = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      `${MEMBER_API_URL}/content-calendar/${memberId}`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const updateContentCalendar = async (
  contentId,
  memberId,
  updatedData,
) => {
  try {
    const response = await axiosInstance.put(
      `${MEMBER_API_URL}/content-calendar/${memberId}/${contentId}`,
      updatedData,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const deleteContentCalendar = async (contentDetails) => {
  try {
    const memberId = contentDetails.memberId.toString();
    const contentId = contentDetails._id;
    console.log(memberId, contentId);

    const response = await axiosInstance.delete(
      `${MEMBER_API_URL}/content-calendar/${memberId}/${contentId}`,
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
