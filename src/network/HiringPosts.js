import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const HIRING_POSTS_API_URL = 'hiring-posts';

// Create a new hiring post
export const createHiringPost = async (postData) => {
  try {
    const response = await axiosInstance.post(HIRING_POSTS_API_URL, postData);
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get all hiring posts with optional filtering
export const getHiringPosts = async (params = {}) => {
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
export const getHiringPost = async (postId) => {
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
export const updateHiringPostStatus = async (postId, status) => {
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

// Update hiring post notes
export const updateHiringPostNotes = async (postId, notes) => {
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

// Update candidate requirements
export const updateCandidateRequirements = async (
  postId,
  candidateRequirements,
) => {
  try {
    const response = await axiosInstance.patch(
      `${HIRING_POSTS_API_URL}/${postId}/requirements`,
      { candidateRequirements },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Contact a hiring post author
export const contactHiringPost = async (postId, emailContent) => {
  try {
    const response = await axiosInstance.post(
      `${HIRING_POSTS_API_URL}/${postId}/contact`,
      { emailContent },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Delete a hiring post
export const deleteHiringPost = async (postId) => {
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
export const getHiringStats = async (timeframe = 'month', memberId = null) => {
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

// Bulk update hiring posts
export const bulkUpdateHiringPosts = async (postIds, status) => {
  try {
    const response = await axiosInstance.patch(
      `${HIRING_POSTS_API_URL}/bulk-update`,
      { postIds, status },
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Export hiring posts as CSV
export const exportHiringPosts = async (params = {}) => {
  try {
    // Convert params object to query string
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    // Set responseType to blob to handle file download
    const response = await axiosInstance.get(
      `${HIRING_POSTS_API_URL}/export?${queryParams.toString()}`,
      { responseType: 'blob' },
    );

    // Create a download link for the CSV file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `hiring-posts-${new Date().toISOString().split('T')[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Detect and update job role
export const detectJobRole = async (postId) => {
  try {
    const response = await axiosInstance.post(
      `${HIRING_POSTS_API_URL}/${postId}/detect-job-role`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get job role suggestions
export const getJobRoleSuggestions = async () => {
  try {
    const response = await axiosInstance.get(
      `${HIRING_POSTS_API_URL}/job-roles`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get hiring posts for a specific member
export const getMemberHiringPosts = async (memberId, params = {}) => {
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
