import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const GENERATE_API_URL = '/ai';

export const generatePost = async (tone, topic, language, template) => {
  try {
    const response = await axiosInstance.post(
      `${GENERATE_API_URL}/generate-post`,
      {
        postType: topic,
        language,
        template,
        selectedTone: tone,
      },
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
