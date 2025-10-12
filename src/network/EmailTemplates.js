import axiosInstance from './axiosConfig';
import { getErrorMessage } from '../utils/errorHandler';

const EMAIL_TEMPLATES_API_URL = '/email-templates';

// Create new email template
export const createEmailTemplate = async (memberId, templateData) => {
  try {
    const response = await axiosInstance.post(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/create`,
      templateData,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get all templates for a member
export const getMemberTemplates = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/my-templates`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get single template by ID
export const getEmailTemplate = async (memberId, templateId) => {
  try {
    const response = await axiosInstance.get(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Update email template
export const updateEmailTemplate = async (memberId, templateId, updateData) => {
  try {
    const response = await axiosInstance.patch(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}`,
      updateData,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Delete email template
export const deleteEmailTemplate = async (memberId, templateId) => {
  try {
    const response = await axiosInstance.delete(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Clone template
export const cloneEmailTemplate = async (
  memberId,
  templateId,
  cloneData = {},
) => {
  try {
    const response = await axiosInstance.post(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}/clone`,
      cloneData,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Set template as default
export const setDefaultTemplate = async (memberId, templateId) => {
  try {
    const response = await axiosInstance.patch(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}/set-default`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get default templates for member
export const getDefaultTemplates = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/defaults`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get template statistics
export const getTemplateStats = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/stats`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get organization templates
export const getOrganizationTemplates = async () => {
  try {
    const response = await axiosInstance.get(
      `${EMAIL_TEMPLATES_API_URL}/organization/all`,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get templates by category
export const getTemplatesByCategory = async (category, memberId = null) => {
  try {
    const url = memberId
      ? `${EMAIL_TEMPLATES_API_URL}/${memberId}/category/${category}`
      : `${EMAIL_TEMPLATES_API_URL}/organization/category/${category}`;

    const response = await axiosInstance.get(url);
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Search templates
export const searchTemplates = async (searchParams, memberId = null) => {
  try {
    const url = memberId
      ? `${EMAIL_TEMPLATES_API_URL}/${memberId}/search`
      : `${EMAIL_TEMPLATES_API_URL}/organization/search`;

    const response = await axiosInstance.get(url, { params: searchParams });
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Bulk delete templates
export const bulkDeleteTemplates = async (templateIds, memberId) => {
  try {
    const response = await axiosInstance.delete(
      `${EMAIL_TEMPLATES_API_URL}/bulk/delete`,
      { data: { templateIds, memberId } },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Bulk update templates
export const bulkUpdateTemplates = async (
  templateIds,
  updateData,
  memberId,
) => {
  try {
    const response = await axiosInstance.patch(
      `${EMAIL_TEMPLATES_API_URL}/bulk/update`,
      {
        templateIds,
        memberId,
        updateData,
      },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Add placeholder to template
export const addPlaceholderToTemplate = async (
  memberId,
  templateId,
  placeholderData,
) => {
  try {
    const response = await axiosInstance.post(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}/placeholders`,
      placeholderData,
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Remove placeholder from template
export const removePlaceholderFromTemplate = async (
  memberId,
  templateId,
  placeholderData,
) => {
  try {
    const response = await axiosInstance.delete(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}/placeholders`,
      { data: placeholderData },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Export templates (additional utility function)
export const exportTemplates = async (memberId, templateIds = []) => {
  try {
    const params = templateIds.length > 0 ? { templateIds } : {};
    const response = await axiosInstance.get(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/export`,
      { params },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Import templates (additional utility function)
export const importTemplates = async (memberId, templatesData) => {
  try {
    const response = await axiosInstance.post(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/import`,
      { templates: templatesData },
    );
    return response.data.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
