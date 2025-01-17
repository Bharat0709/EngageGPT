import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

export const shareLinkedInPost = async (postDetails, memberId) => {
  try {

    const formData = new FormData();

    // Function to remove the file extension from a file name
    const removeExtension = (fileName) => fileName.replace(/\.[^/.]+$/, '');

    // Add content and visibility
    formData.append('content', postDetails.content);
    formData.append('visibility', postDetails.visibility.toUpperCase());

    // Check if media exists and is valid
    if (Array.isArray(postDetails.media) && postDetails.media.length > 0) {
      postDetails.media.forEach((file, index) => {
        if (!file.file || !(file.file instanceof File)) {
          throw new Error(`Invalid file at index ${index}`);
        }

        const fileNameWithoutExtension = removeExtension(file.name);

        // Append metadata for the media
        formData.append(
          `media[${index}][metadata]`,
          JSON.stringify({
            name: fileNameWithoutExtension,
            type: file.type,
            size: file.size,
            title: file.title || fileNameWithoutExtension,
            description: file.description || fileNameWithoutExtension,
          }),
        );

        // Append the file itself
        formData.append(`media[${index}][file]`, file.file);
      });
    }

    console.log('FormData contents:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // Send request to backend
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
    return true;
  } catch (error) {
    console.error(
      'Error in shareLinkedInPost:',
      error.response?.data || error.message,
    );
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
