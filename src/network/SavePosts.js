import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const HIRING_POSTS_API_URL = 'saved-posts';

// Create a new hiring post
export const createHiringPost = async (postData) => {
  try {
    const response = await axiosInstance.post(HIRING_POSTS_API_URL, postData);
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
  x;
};

// Get all hiring posts with optional filtering
export const getSavedPosts = async (params = {}) => {
  try {
    // Convert params object to query string
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    const response = await axiosInstance.get(
      `${HIRING_POSTS_API_URL}?${queryParams.toString()}`,
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get a single hiring post by ID
export const getSavedPost = async (postId) => {
  try {
    const response = await axiosInstance.get(
      `${HIRING_POSTS_API_URL}/${postId}`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Update a hiring post status
export const updateSavedPostStatus = async (postId, status) => {
  try {
    const response = await axiosInstance.patch(
      `${HIRING_POSTS_API_URL}/${postId}/status`,
      { status },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const updateSavedPost = async (postId, updatedData) => {
  try {
    const response = await axiosInstance.patch(
      `${HIRING_POSTS_API_URL}/${postId}`,
      { updateData: updatedData },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Update hiring post notes
export const updateSavedPostNotes = async (postId, notes) => {
  try {
    const response = await axiosInstance.patch(
      `${HIRING_POSTS_API_URL}/${postId}/notes`,
      { notes },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Update job role for a hiring post
export const updateJobRole = async (postId, jobRole) => {
  try {
    const response = await axiosInstance.patch(
      `${HIRING_POSTS_API_URL}/${postId}/job-role`,
      { jobRole },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Delete a hiring post
export const deleteSavedPost = async (postId) => {
  try {
    const response = await axiosInstance.delete(
      `${HIRING_POSTS_API_URL}/${postId}`,
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get hiring statistics
export const getSavedPostsStats = async (
  timeframe = 'month',
  memberId = null,
) => {
  try {
    let url = `${HIRING_POSTS_API_URL}/stats?timeframe=${timeframe}`;

    // Add memberId parameter if provided
    if (memberId) {
      url += `&memberId=${memberId}`;
    }

    const response = await axiosInstance.get(url);
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get hiring posts for a specific member
export const getMemberSavedPosts = async (memberId, params = {}) => {
  try {
    // Add memberId to params
    const queryParams = new URLSearchParams();
    queryParams.append('memberId', memberId);

    // Add other params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    const response = await axiosInstance.get(
      `${HIRING_POSTS_API_URL}?${queryParams.toString()}`,
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

export const bulkUpdateStatus = async (postIds, status) => {
  try {
    const response = await axiosInstance.patch(
      `${HIRING_POSTS_API_URL}/bulk-status`,
      { postIds, status },
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Bulk update priority for multiple posts
export const bulkUpdatePriority = async (postIds, priority) => {
  try {
    const response = await axiosInstance.patch(
      `${HIRING_POSTS_API_URL}/bulk-priority`,
      { postIds, priority },
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Bulk update priority for multiple posts
export const bulkUpdateAutomation = async (postIds, automationData) => {
  try {
    const response = await axiosInstance.patch(
      `${HIRING_POSTS_API_URL}/bulk-automation`,
      { postIds, automationData },
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Bulk delete multiple posts
export const bulkDeletePosts = async (postIds) => {
  if (!Array.isArray(postIds) || postIds.length === 0) {
    throw new Error('postIds must be a non-empty array');
  }
  try {
    const response = await axiosInstance.delete(
      `${HIRING_POSTS_API_URL}/bulk-delete`,
      {
        data: { postIds },
      },
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
