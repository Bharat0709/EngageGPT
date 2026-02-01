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
        `/ai/gemini/generate/post-content`,
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
        `/ai/openai/generate/post-content`,
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

export const generateEmailTemplate = async (
  format,
  templateType,
  prompt,
  aiOption,
) => {
  try {
    if (aiOption === 'gemini') {
      const response = await axiosInstance.post(
        `/ai/gemini/generate/email-template`,
        {
          format,
          templateType,
          prompt,
        },
      );
      return response.data;
    } else {
      const response = await axiosInstance.post(
        `/ai/openai/generate/email-template`,
        {
          format,
          templateType,
          prompt,
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
