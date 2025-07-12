import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

export const generatePost = async (
  tone,
  topic,
  language,
  template,
  aiOption,
) => {
  try {
    if (aiOption === 'gemini') {
      const response = await axiosInstance.post(
        `/ai/generate/post-content/gemini`,
        {
          postType: topic,
          language,
          persona: template,
          selectedTone: tone,
        },
      );
      return response.data;
    } else {
      const response = await axiosInstance.post(
        `/openai/generate/post-content`,
        {
          postType: topic,
          language,
          template,
          selectedTone: tone,
          provider: aiOption,
        },
      );
      return response.data;
    }
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const getMasterData = async () => {
  try {
    const response = await axiosInstance.get(`/master-data`);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
