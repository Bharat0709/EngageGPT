import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const MEMBER_API_URL = '/member';

export const addNewMember = async (newMemberDetails) => {
  const { name, email } = newMemberDetails;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  localStorage.setItem('userTimeZone', timeZone);
  try {
    const response = await axiosInstance.post(`${MEMBER_API_URL}/add-member`, {
      name,
      email,
      timeZone,
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
      `/calendar/integrations/googleSheet`,
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
    const response = await axiosInstance.get(
      `${MEMBER_API_URL}/associated-members`,
    );
    return response?.data?.members || [];
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const getMemberDetails = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      `${MEMBER_API_URL}/profile/${memberId}`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const updateMemberSettings = async (memberId, settingsData) => {
  try {
    const response = await axiosInstance.put(
      `${MEMBER_API_URL}/settings/${memberId}`,
      settingsData,
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
    const formattedData = calendarData.map((item) => {
      return {
        title: item.Title,
        date: item.Date,
        time: item.Time,
      };
    });

    const response = await axiosInstance.post(`/calendar/${memberId}`, {
      calendarData: formattedData,
    });

    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const getContentCalendar = async (memberId) => {
  try {
    const response = await axiosInstance.get(`/calendar/${memberId}`);
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
      `/calendar/${memberId}/${contentId}`,
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

    const response = await axiosInstance.delete(
      `/calendar/${memberId}/${contentId}`,
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const updateFeedFilterSettings = async (
  memberId,
  feedFilterSettings,
) => {
  try {
    const response = await axiosInstance.patch(
      `${MEMBER_API_URL}/feed-filters/${memberId}`,
      { feedFilterSettings },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const getFeedFilterSettings = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      `${MEMBER_API_URL}/${memberId}/feed-filters`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const updateMemberSummary = async (memberId, summaryData) => {
  try {
    const response = await axiosInstance.put(
      `${MEMBER_API_URL}/summary/${memberId}`,
      {
        formData: summaryData,
      },
    );

    return await response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const updateLeadGenerationGoals = async (
  memberId,
  leadGenerationGoals,
) => {
  try {
    const response = await axiosInstance.put(
      `${MEMBER_API_URL}/lead-generation-settings/${memberId}`,
      {
        ...leadGenerationGoals,
      },
    );

    return await response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMemberAccount = async (memberId) => {
  try {
    const response = await axiosInstance.delete(
      `${MEMBER_API_URL}/deleteAccount/${memberId}`,
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const resetMemberCredits = async (memberId) => {
  try {
    const response = await axiosInstance.post(
      `${MEMBER_API_URL}/reset-credits/${memberId}`
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
