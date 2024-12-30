import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const POST_API_URL = '/posts';

export const getMemberPosts = async (memberId) => {
  try {
    const response = await axiosInstance.get(`${POST_API_URL}/${memberId}`);
    console.log(response.data.posts);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
