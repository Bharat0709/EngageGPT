import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const AUTOMATION_API_URL = 'automation';

// Create a new automation
export const createAutomation = async (memberId, organizationId, automationData) => {
  try {
    const response = await axiosInstance.post(
      `${AUTOMATION_API_URL}/${memberId}/${organizationId}`,
      automationData
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get all automations for a member
export const getAutomations = async (memberId, params = {}) => {
  try {
    // Convert params object to query string
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    const response = await axiosInstance.get(
      `${AUTOMATION_API_URL}/${memberId}?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get a single automation by ID
export const getAutomation = async (memberId, automationId) => {
  try {
    const response = await axiosInstance.get(
      `${AUTOMATION_API_URL}/${memberId}/${automationId}`
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Update automation
export const updateAutomation = async (memberId, automationId, updatedData) => {
  try {
    const response = await axiosInstance.patch(
      `${AUTOMATION_API_URL}/${memberId}/${automationId}`,
      updatedData
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Update automation status
export const updateAutomationStatus = async (memberId, automationId, status) => {
  try {
    const response = await axiosInstance.patch(
      `${AUTOMATION_API_URL}/${memberId}/${automationId}/status`,
      { status }
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Update automation priority
export const updateAutomationPriority = async (automationId, priority) => {
  try {
    const response = await axiosInstance.patch(
      `${AUTOMATION_API_URL}/${automationId}/priority`,
      { priority }
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Schedule automation
export const scheduleAutomation = async (memberId, automationId, scheduleData) => {
  try {
    const response = await axiosInstance.patch(
      `${AUTOMATION_API_URL}/${memberId}/${automationId}/schedule`,
      scheduleData
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Reschedule automation
export const rescheduleAutomation = async (automationId, scheduleData) => {
  try {
    const response = await axiosInstance.patch(
      `${AUTOMATION_API_URL}/${automationId}/reschedule`,
      scheduleData
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Approve automation
export const approveAutomation = async (memberId, automationId) => {
  try {
    const response = await axiosInstance.patch(
      `${AUTOMATION_API_URL}/${memberId}/${automationId}/approve`
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Reject automation
export const rejectAutomation = async (memberId, automationId, rejectionReason = '') => {
  try {
    const response = await axiosInstance.patch(
      `${AUTOMATION_API_URL}/${memberId}/${automationId}/reject`,
      { reason: rejectionReason }
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Update delivery status (for webhook callbacks)
export const updateDeliveryStatus = async (memberId, automationId, deliveryStatus) => {
  try {
    const response = await axiosInstance.patch(
      `${AUTOMATION_API_URL}/${memberId}/${automationId}/delivery-status`,
      { deliveryStatus }
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Delete automation
export const deleteAutomation = async (memberId, automationId) => {
  try {
    const response = await axiosInstance.delete(
      `${AUTOMATION_API_URL}/${memberId}/${automationId}`
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get automation statistics
export const getAutomationStats = async (memberId, timeframe = 'month') => {
  try {
    const response = await axiosInstance.get(
      `${AUTOMATION_API_URL}/${memberId}/stats?timeframe=${timeframe}`
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get pending approvals
export const getPendingApprovals = async (memberId, params = {}) => {
  try {
    // Convert params object to query string
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    const response = await axiosInstance.get(
      `${AUTOMATION_API_URL}/${memberId}/pending-approvals?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get scheduled automations
export const getScheduledAutomations = async (memberId, params = {}) => {
  try {
    // Convert params object to query string
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    const response = await axiosInstance.get(
      `${AUTOMATION_API_URL}/${memberId}/scheduled?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get recurring automations
export const getRecurringAutomations = async (memberId, params = {}) => {
  try {
    // Convert params object to query string
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    const response = await axiosInstance.get(
      `${AUTOMATION_API_URL}/${memberId}/recurring?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Bulk approve automations
export const bulkApproveAutomations = async (automationIds) => {
  try {
    const response = await axiosInstance.patch(
      `${AUTOMATION_API_URL}/bulk-approve`,
      { automationIds }
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Bulk reject automations
export const bulkRejectAutomations = async (automationIds, reason = '') => {
  try {
    const response = await axiosInstance.patch(
      `${AUTOMATION_API_URL}/bulk-reject`,
      { automationIds, reason }
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Bulk cancel automations
export const bulkCancelAutomations = async (automationIds) => {
  try {
    const response = await axiosInstance.patch(
      `${AUTOMATION_API_URL}/bulk-cancel`,
      { automationIds }
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Bulk retry failed automations
export const bulkRetryAutomations = async (automationIds) => {
  try {
    const response = await axiosInstance.patch(
      `${AUTOMATION_API_URL}/bulk-retry`,
      { automationIds }
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};