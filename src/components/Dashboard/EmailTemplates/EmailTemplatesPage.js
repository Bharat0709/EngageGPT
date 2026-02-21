import React, { useState, useEffect } from 'react';
import EmailTemplateNavbar from './Navigation';
import { getAllMembers } from '@services/Members';
import { useNotifications } from '@components/Common/Notification';
import {
  createEmailTemplate,
  getMemberTemplates,
  updateEmailTemplate,
  cloneEmailTemplate,
  setDefaultTemplate,
  bulkDeleteTemplates,
  bulkUpdateTemplates,
} from '@services/EmailTemplates';
import NotFound from '@assets/images/PostNotFound.png';
import TemplatesTable from './EmailListTable/TemplatesTable';
import CodeEditor from './Editor/Editor';
import Preview from './Preview';
import SavedPostsSkeleton from '../SkeletonLoaders/SavedPostsSkeletonLoading';

const EmailTemplateManager = () => {
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [memberProfiles, setMemberProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('templates');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subject: '',
    templateBody: '',
    templateType: 'html',
    category: 'custom',
    placeholders: [],
  });
  const message = useNotifications();

  useEffect(() => {
    const fetchAndSetMemberData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMembers();
        setMemberProfiles(data);
        setSelectedMemberId(data[0]?._id || null);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };

    fetchAndSetMemberData();
  }, []);

  useEffect(() => {
    if (selectedMemberId) {
      fetchTemplates();
    }
  }, [selectedMemberId]);

  const fetchTemplates = async () => {
    if (!selectedMemberId) return;
    setLoading(true);
    try {
      const templatesData = await getMemberTemplates(selectedMemberId);
      setTemplates(templatesData.templates || []);
    } catch (error) {
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (profile) => {
    const selectedProfile = memberProfiles.find((p) => p._id === profile._id);
    if (selectedProfile) {
      setSelectedMemberId(selectedProfile._id);
    }
  };

  // Template CRUD operations
  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setFormData({
      name: '',
      description: '',
      subject: '',
      templateBody: '',
      templateType: 'html',
      category: 'custom',
      placeholders: [],
    });
    setShowCreateForm(true);
    setActiveTab('editor');
  };

  const handleEditTemplate = (template) => {
    setFormData({
      name: template.name,
      description: template.description,
      subject: template.subject,
      templateBody: template.templateBody,
      templateType: template.templateType,
      category: template.category,
      placeholders: template.placeholders || [],
    });
    setSelectedTemplate(template);
    setShowCreateForm(true);
    setActiveTab('editor');
  };

  const handleViewTemplate = (template) => {
    setSelectedTemplate(template);
    setActiveTab('preview');
  };

  const handleCloneTemplate = async (template) => {
    if (!selectedMemberId) return;

    try {
      message.loading('Template cloning in progress');
      setIsUpdating(true);
      const cloneData = {
        name: `${template.name} (Copy)`,
        description: template.description,
      };

      await cloneEmailTemplate(selectedMemberId, template._id, cloneData);
      message.success('Template cloned successfully!');
      await fetchTemplates();
    } catch (error) {
      message.error(error.message || 'Error cloning template');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSetDefaultTemplate = async (template) => {
    if (!selectedMemberId) return;

    try {
      setIsUpdating(true);
      message.loading('Updating default status');
      await setDefaultTemplate(selectedMemberId, template._id);
      setTemplates(
        templates.map((t) => ({
          ...t,
          isDefault: t._id === template._id,
        })),
      );
      message.success('Default template updated successfully!');
    } catch (error) {
      message.error(error.message || 'Error setting default template');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBulkDelete = async (templateIds) => {
    try {
      setIsUpdating(true);
      message.info('Deleting templates...');
      await bulkDeleteTemplates(templateIds, selectedMemberId);
      setTemplates(templates.filter((t) => !templateIds.includes(t._id)));
      message.success('Templates deleted successfully!');
    } catch (error) {
      message.error(error.message || 'Error deleting templates');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBulkUpdateCategory = async (templateIds, category) => {
    try {
      setIsUpdating(true);
      message.info('Updating templates category...');
      await bulkUpdateTemplates(templateIds, { category }, selectedMemberId);
      setTemplates(
        templates.map((t) =>
          templateIds.includes(t._id) ? { ...t, category } : t,
        ),
      );
      message.success('Templates category updated successfully!');
    } catch (error) {
      message.error(error.message || 'Error updating category');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBulkUpdateType = async (templateIds, templateType) => {
    try {
      setIsUpdating(true);
      message.info('Updating templates type');
      await bulkUpdateTemplates(
        templateIds,
        { templateType },
        selectedMemberId,
      );

      setTemplates(
        templates.map((t) =>
          templateIds.includes(t._id) ? { ...t, templateType } : t,
        ),
      );
      message.success('Templates type updated successfully!');
    } catch (error) {
      message.error(error.message || 'Error updating type');
    } finally {
      setIsUpdating(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      subject: '',
      templateBody: '',
      templateType: 'html',
      category: 'custom',
      placeholders: [],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMemberId) return;

    // Validation - check required fields
    const missingFields = [];

    if (!formData.name || formData.name.trim() === '') {
      missingFields.push('Template name');
    }
    if (!formData.templateBody || formData.templateBody.trim() === '') {
      missingFields.push('Template content');
    }
    if (!formData.category || formData.category === '') {
      missingFields.push('Category');
    }
    if (!formData.templateType || formData.templateType === '') {
      missingFields.push('Template type');
    }
    if (!formData.subject || formData.subject.trim() === '') {
      missingFields.push('Subject line');
    }

    // Show error notification if fields are missing
    if (missingFields.length > 0) {
      message.error(
        `Please fill in the following required fields: ${missingFields.join(
          ', ',
        )}`,
      );
      return;
    }

    try {
      setIsUpdating(true);
      message.loading(
        selectedTemplate ? 'Updating template' : 'Creating template',
      );

      if (selectedTemplate) {
        const updatedTemplate = await updateEmailTemplate(
          selectedMemberId,
          selectedTemplate._id,
          formData,
        );

        setTemplates(
          templates.map((t) =>
            t._id === selectedTemplate._id ? { ...t, ...updatedTemplate } : t,
          ),
        );
      } else {
        const newTemplate = await createEmailTemplate(
          selectedMemberId,
          formData,
        );
        setTemplates([...templates, newTemplate]);
      }

      message.success(
        selectedTemplate
          ? 'Template updated successfully!'
          : 'Template created successfully!',
      );

      resetForm();
      fetchTemplates();
      setShowCreateForm(false);
      setSelectedTemplate(null);
      setActiveTab('templates');
    } catch (error) {
      message.error('Failed to save template. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  // No member selected component
  const NoMemberSelected = () => (
    <div className="p-8 m-2 mx-4  rounded-2xl flex flex-col justify-center gap-2 text-center">
      <img src={NotFound} alt="Not Found" className="h-50 w-60 mx-auto" />
      <h3 className="text-lg  geist font-medium mb-2">No Profile Added</h3>
      <p className="text-gray-600 geist  mb-4">
        Please add a profile from settings page.
      </p>
    </div>
  );

  return (
    <>
      {isLoading && <SavedPostsSkeleton />}
      <div className="h-screen flex flex-col bg-[#fafafa]">
        <EmailTemplateNavbar
          selectedProfile={selectedMemberId}
          handleProfileChange={handleProfileChange}
          memberProfiles={memberProfiles}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {!selectedMemberId ? (
          <NoMemberSelected />
        ) : (
          <div className="flex-1 mx-2 lg:overflow-hidden">
            {activeTab === 'templates' && (
              <div className="p-2 rounded-2xl">
                <TemplatesTable
                  templates={templates}
                  onEdit={handleEditTemplate}
                  onView={handleViewTemplate}
                  onClone={handleCloneTemplate}
                  onSetDefault={handleSetDefaultTemplate}
                  isUpdating={isUpdating}
                  loading={loading}
                  onCreateTemplate={handleCreateTemplate}
                  onBulkDelete={handleBulkDelete}
                  onBulkUpdateCategory={handleBulkUpdateCategory}
                  onBulkUpdateType={handleBulkUpdateType}
                />
              </div>
            )}
            {activeTab === 'editor' && (
              <CodeEditor
                selectedTemplate={selectedTemplate}
                handleFormSubmit={handleFormSubmit}
                formData={formData}
                setFormData={setFormData}
                resetForm={resetForm}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                showCreateForm={showCreateForm}
                setShowCreateForm={setShowCreateForm}
                setSelectedTemplate={setSelectedTemplate}
                isUpdating={isUpdating}
              />
            )}
            {activeTab === 'preview' && (
              <Preview selectedTemplate={selectedTemplate} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EmailTemplateManager;
