import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const GENERATE_API_URL = '/ai';

export const generatePost = async (
  tone,
  topic,
  language,
  template,
  selectedFormat,
) => {
  console.log(tone, topic, language, template, selectedFormat);
  try {
    if (selectedFormat === 'Use Persona') {
      const response = await axiosInstance.post(
        `${GENERATE_API_URL}/generate-post/persona`,
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
        `${GENERATE_API_URL}/generate-post/template`,
        {
          postType: topic,
          language,
          template,
          selectedTone: tone,
        },
      );
      return response.data;
    }
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
