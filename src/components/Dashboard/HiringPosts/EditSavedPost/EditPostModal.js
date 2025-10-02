import {
  initialtState,
  setInitialPostData,
} from '../SavePostUtils/EditPostUtils/Constants';
import EditPostHeader from './EditPostHeader';
import EditPostFooter from './EditPostFooter';
import BasicInformationForm from './EditPostModalParts/BasicInfo';
import {
  validateEditPostForm,
  groupErrorsBySection,
} from '../EditSavedPost/EditPostModalParts/FormValidation';
import ContactInformationForm from './EditPostModalParts/ContactInfo';
import DateManagementForm from './EditPostModalParts/DateManagement';
import TemplatesForm from './EditPostModalParts/TemplatesInfo';
import GeneratedContentForm from './EditPostModalParts/GeneratedContentInfo';
import NotesForm from './EditPostModalParts/NotesInfo';
import StatusPriorityForm from './EditPostModalParts/StatusNPriority';
import AutomationForm from './EditPostModalParts/AutomationInfo';
import CategoryTagsForm from './EditPostModalParts/CategoryNTags';
import { useState, useEffect } from 'react';

const EditHiringPostModal = ({ isOpen, onClose, post, onSave, isEditing }) => {
  const [postData, setPostData] = useState(initialtState);
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [formLinkInput, setFormLinkInput] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  console.log('EditHiringPostModal postData:', postData);
  // const [validationSummary, setValidationSummary] = useState(null);

  // const validateForm = useCallback(() => {
  //   if (!postData || Object.keys(postData).length === 0) return;

  //   try {
  //     const { isValid, errors } = validateEditPostForm(postData);
  //     setValidationErrors(errors);
  //     setValidationSummary(getValidationSummary(errors));
  //   } catch (error) {
  //     console.error('Validation error:', error);
  //     setValidationErrors({});
  //     setValidationSummary(null);
  //   }
  // }, [postData]);

  useEffect(() => {
    if (post) {
      setInitialPostData(setPostData, post);
    }
  }, [post]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     validateForm();
  //   }, 300);

  //   return () => clearTimeout(timeoutId);
  // }, [validateForm]);

  const handleSave = async () => {
    // const { isValid, errors } = validateEditPostForm(postData);

    // setValidationErrors(errors);
    // Scroll to first error
    // const firstErrorElement = document.querySelector('[data-error="true"]');
    // if (firstErrorElement) {
    //   firstErrorElement.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'center',
    //   });
    // }
    // return;

    setLoading(true);
    try {
      const saveData = {
        ...postData,
        lastContactedAt: postData.lastContactedAt
          ? postData.lastContactedAt.toDate()
          : null,
        followUpDate: postData.followUpDate
          ? postData.followUpDate.toDate()
          : null,
        nextAutomationDate: postData.nextAutomationDate
          ? postData.nextAutomationDate.toDate()
          : null,
      };
      console.log(saveData);
      await onSave(post._id, saveData);
    } catch (error) {
      console.error('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  if (!postData) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <p className="text-red-600">Error: No post data available</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  const groupedErrors = groupErrorsBySection(validationErrors);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <EditPostHeader onClose={onClose} />

        {/* Content */}
        <div className="p-6 bg-gray-100 overflow-y-auto max-h-[calc(95vh-200px)]">
          {post && (
            <div className="gap-8">
              {/* Right Columns - Edit Form */}
              <div className="lg:col-span-2 space-y-2">
                {/* Basic Information */}
                <BasicInformationForm
                  postData={postData}
                  setPostData={setPostData}
                  errors={groupedErrors.basicInfo || {}}
                />

                <ContactInformationForm
                  postData={postData}
                  setPostData={setPostData}
                  emailInput={emailInput}
                  setEmailInput={setEmailInput}
                  formLinkInput={formLinkInput}
                  setFormLinkInput={setFormLinkInput}
                  errors={{}}
                />

                {/* Status & Priority */}
                <StatusPriorityForm
                  postData={postData}
                  setPostData={setPostData}
                  errors={groupedErrors.statusPriority || {}}
                />

                <DateManagementForm
                  postData={postData}
                  setPostData={setPostData}
                  errors={{}}
                />

                <AutomationForm
                  postData={postData}
                  setPostData={setPostData}
                  errors={groupedErrors.automation || {}}
                />

                <CategoryTagsForm
                  postData={postData}
                  setPostData={setPostData}
                  tagInput={tagInput}
                  setTagInput={setTagInput}
                  errors={groupedErrors.organization || {}}
                />

                <TemplatesForm
                  postData={postData}
                  setPostData={setPostData}
                  errors={groupedErrors.templates || {}}
                />

                <GeneratedContentForm
                  postData={postData}
                  setPostData={setPostData}
                  errors={groupedErrors.generatedContent || {}}
                />

                <NotesForm
                  postData={postData}
                  setPostData={setPostData}
                  errors={groupedErrors.notes || {}}
                />
              </div>
            </div>
          )}
        </div>

        <EditPostFooter
          onClose={onClose}
          handleSave={handleSave}
          loading={loading}
          post={postData}
        />
      </div>
    </div>
  );
};

export default EditHiringPostModal;
