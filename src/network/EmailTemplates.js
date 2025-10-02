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
  console.log('Fetching templates for member:', memberId);
  try {
    const response = await axiosInstance.get(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/my-templates`,
    );
    console.log('Get member templates response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching member templates:', error);
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get single template by ID
export const getEmailTemplate = async (memberId, templateId) => {
  console.log('Fetching template:', templateId, 'for member:', memberId);
  try {
    const response = await axiosInstance.get(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}`,
    );
    console.log('Get email template response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching email template:', error);
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Update email template
export const updateEmailTemplate = async (memberId, templateId, updateData) => {
  console.log(
    'Updating template:',
    templateId,
    'for member:',
    memberId,
    'with data:',
    updateData,
  );
  try {
    const response = await axiosInstance.patch(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}`,
      updateData,
    );
    console.log('Update template response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error updating email template:', error);
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Delete email template
export const deleteEmailTemplate = async (memberId, templateId) => {
  console.log('Deleting template:', templateId, 'for member:', memberId);
  try {
    const response = await axiosInstance.delete(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}`,
    );
    console.log('Delete template response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error deleting email template:', error);
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
  console.log(
    'Cloning template:',
    templateId,
    'for member:',
    memberId,
    'with data:',
    cloneData,
  );
  try {
    const response = await axiosInstance.post(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}/clone`,
      cloneData,
    );
    console.log('Clone template response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error cloning email template:', error);
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
    console.log('Set default template response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error setting default template:', error);
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get default templates for member
export const getDefaultTemplates = async (memberId) => {
  console.log('Fetching default templates for member:', memberId);
  try {
    const response = await axiosInstance.get(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/defaults`,
    );
    console.log('Get default templates response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching default templates:', error);
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get template statistics
export const getTemplateStats = async (memberId) => {
  console.log('Fetching template stats for member:', memberId);
  try {
    const response = await axiosInstance.get(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/stats`,
    );
    console.log('Get template stats response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching template stats:', error);
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get organization templates
export const getOrganizationTemplates = async () => {
  console.log('Fetching organization templates');
  try {
    const response = await axiosInstance.get(
      `${EMAIL_TEMPLATES_API_URL}/organization/all`,
    );
    console.log('Get organization templates response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching organization templates:', error);
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Get templates by category
export const getTemplatesByCategory = async (category, memberId = null) => {
  console.log(
    'Fetching templates by category:',
    category,
    'for member:',
    memberId,
  );
  try {
    const url = memberId
      ? `${EMAIL_TEMPLATES_API_URL}/${memberId}/category/${category}`
      : `${EMAIL_TEMPLATES_API_URL}/organization/category/${category}`;

    const response = await axiosInstance.get(url);
    console.log('Get templates by category response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching templates by category:', error);
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Search templates
export const searchTemplates = async (searchParams, memberId = null) => {
  console.log(
    'Searching templates with params:',
    searchParams,
    'for member:',
    memberId,
  );
  try {
    const url = memberId
      ? `${EMAIL_TEMPLATES_API_URL}/${memberId}/search`
      : `${EMAIL_TEMPLATES_API_URL}/organization/search`;

    const response = await axiosInstance.get(url, { params: searchParams });
    console.log('Search templates response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error searching templates:', error);
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Bulk delete templates
export const bulkDeleteTemplates = async (templateIds, memberId) => {
  console.log('Bulk deleting templates:', templateIds);
  try {
    const response = await axiosInstance.delete(
      `${EMAIL_TEMPLATES_API_URL}/bulk/delete`,
      { data: { templateIds, memberId } },
    );
    console.log('Bulk delete templates response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error bulk deleting templates:', error);
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
  console.log(
    'Bulk updating templates:',
    templateIds,
    'with data:',
    updateData,
  );
  try {
    const response = await axiosInstance.patch(
      `${EMAIL_TEMPLATES_API_URL}/bulk/update`,
      {
        templateIds,
        memberId,
        updateData,
      },
    );
    console.log('Bulk update templates response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error bulk updating templates:', error);
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
  console.log(
    'Adding placeholder to template:',
    templateId,
    'for member:',
    memberId,
    'data:',
    placeholderData,
  );
  try {
    const response = await axiosInstance.post(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}/placeholders`,
      placeholderData,
    );
    console.log('Add placeholder response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error adding placeholder:', error);
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
  console.log(
    'Removing placeholder from template:',
    templateId,
    'for member:',
    memberId,
    'data:',
    placeholderData,
  );
  try {
    const response = await axiosInstance.delete(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/${templateId}/placeholders`,
      { data: placeholderData },
    );
    console.log('Remove placeholder response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error removing placeholder:', error);
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Export templates (additional utility function)
export const exportTemplates = async (memberId, templateIds = []) => {
  console.log(
    'Exporting templates for member:',
    memberId,
    'templates:',
    templateIds,
  );
  try {
    const params = templateIds.length > 0 ? { templateIds } : {};
    const response = await axiosInstance.get(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/export`,
      { params },
    );
    console.log('Export templates response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error exporting templates:', error);
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};

// Import templates (additional utility function)
export const importTemplates = async (memberId, templatesData) => {
  console.log(
    'Importing templates for member:',
    memberId,
    'data:',
    templatesData,
  );
  try {
    const response = await axiosInstance.post(
      `${EMAIL_TEMPLATES_API_URL}/${memberId}/import`,
      { templates: templatesData },
    );
    console.log('Import templates response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error importing templates:', error);
    const errorMsg = getErrorMessage(error);
    throw new Error(errorMsg);
  }
};
