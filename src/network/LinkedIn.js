import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const removeExtension = (fileName) => fileName.replace(/\.[^/.]+$/, '');

const preparePostFormData = (postDetails) => {
  const formData = new FormData();

  // Append content and visibility
  formData.append('content', postDetails.content);
  formData.append('visibility', postDetails.visibility.toUpperCase());

  // Process media files if available
  if (Array.isArray(postDetails.media) && postDetails.media.length > 0) {
    postDetails.media.forEach((file, index) => {
      if (!file.file || !(file.file instanceof File)) {
        throw new Error(`Invalid file at index ${index}`);
      }

      const fileNameWithoutExtension = removeExtension(file.name);

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

      formData.append(`media[${index}][file]`, file.file);
    });
  }

  return formData;
};

const prepareUpdatedPostFormData = (postDetails) => {
  const formData = new FormData();

  // Append content and visibility
  formData.append('content', postDetails.content || '');
  formData.append(
    'visibility',
    postDetails.visibility ? postDetails.visibility.toUpperCase() : 'PUBLIC',
  );

  // Handle existing media URLs (Send as a JSON string)
  if (
    Array.isArray(postDetails.mediaUrls) &&
    postDetails.mediaUrls.length > 0
  ) {
    formData.append('existingMediaUrls', JSON.stringify(postDetails.mediaUrls));
  }

  // Process new media files
  if (
    Array.isArray(postDetails.newMediaFiles) &&
    postDetails.newMediaFiles.length > 0
  ) {
    postDetails.newMediaFiles.forEach((file, index) => {
      if (!(file instanceof File)) {
        throw new Error(`Invalid file at index ${index}`);
      }

      formData.append('media', file); // ✅ Correctly append file
    });
  }

  return formData;
};

export const shareLinkedInPost = async (postDetails, memberId) => {
  try {
    const formData = preparePostFormData(postDetails);
    await axiosInstance.post(`/linkedin/${memberId}/share`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const scheduleLinkedInPost = async (
  date,
  time,
  postDetails,
  timeZone,
  memberId,
) => {
  try {
    const formData = preparePostFormData(postDetails);
    formData.append('postDate', date);
    formData.append('postTime', time);
    formData.append('timeZone', timeZone);
    formData.append('status', 'Scheduled');

    await axiosInstance.post(`/linkedin/${memberId}/schedule`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const saveDraftLinkedInPost = async (
  date,
  time,
  postDetails,
  timeZone,
  memberId,
) => {
  try {
    const formData = preparePostFormData(postDetails);
    formData.append('postDate', date);
    formData.append('postTime', time);
    formData.append('timeZone', timeZone);
    formData.append('status', 'Draft');

    await axiosInstance.post(`/linkedin/${memberId}/schedule/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getScheduledPosts = async (memberId) => {
  try {
    const response = await axiosInstance.get(`/linkedin/${memberId}/history`);
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateScheduledOrDraftPost = async (postId, postDetails) => {
  try {
    const formData = prepareUpdatedPostFormData(postDetails);
    formData.append('postDate', postDetails.postDate);
    formData.append('postTime', postDetails.postTime);
    formData.append('timeZone', postDetails.timeZone);
    formData.append('status', postDetails.status);

    const response = await axiosInstance.put(
      `/linkedin/${postId}/history`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteSchduledPost = async (postId) => {
  try {
    const response = await axiosInstance.delete(`/linkedin/${postId}/history`);
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const disconnectLinkedIn = async (memberId) => {
  try {
    const response = await axiosInstance.patch(
      `/linkedin/${memberId}/disconnect`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
