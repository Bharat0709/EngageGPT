import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

export const shareLinkedInPost = async (postDetails, memberId) => {
  try {
    console.log(postDetails);
    console.log(memberId);
    const formData = new FormData();
    formData.append('content', postDetails.content);
    formData.append('visibility', postDetails.visibility);

    // Append each media file with its fields
    postDetails.media.forEach((file) => {
      formData.append(
        'media',
        JSON.stringify({
          url: file.url,
          title: file.title,
          description: file.description,
        }),
      );
    });
    console.log("FormData contents:");
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    const response = await axiosInstance.post(
      `members/linkedin/share/${memberId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    console.log('Post shared successfully:', response.data);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
