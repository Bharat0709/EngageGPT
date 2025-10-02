import React, { useState, useEffect } from 'react';
import { getMemberTemplates } from '@services/EmailTemplates';
import { Icons } from '@utils/constantData/icons';
import Button from '@components/Common/Button';
import PostContent from './PostContent';
import TemplatesDrawer from './MailTemplates';
import PlaceholderDrawer from './PlaceholderManagement';
import TemplatePreviewModal from './MailPreview';
import EmailMediaUploader from './EmailMediaUploader';
import { useNotifications } from '@components/Common/Notification';
import CustomToggle from '@components/Common/CustomToggle';

const EmailSendModal = ({ memberId, postData, onSend, onClose }) => {
  const message = useNotifications();
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    body: '',
    attachments: [],
  });

  const [templates, setTemplates] = useState([]);
  const [showTemplatesDrawer, setShowTemplatesDrawer] = useState(false);
  const [showPlaceholderDrawer, setShowPlaceholderDrawer] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [requireApproval, setRequireApproval] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [emailFormat, setEmailFormat] = useState('text');
  const [isSending, setIsSending] = useState(false);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);

  useEffect(() => {
    if (
      (postData?.emailAddresses && postData?.emailAddresses?.length > 0) ||
      postData?.generatedEmailBody
    ) {
      setEmailData((prev) => ({
        ...prev,
        to: postData.emailAddresses.join(', '),
        body: postData?.generatedEmailBody || '',
        subject: postData?.generatedSubject || '',
      }));
    }
  }, [postData]);

  useEffect(() => {
    loadTemplates();
  }, [memberId]);

  const loadTemplates = async () => {
    try {
      setIsLoadingTemplates(true);
      const memberTemplates = await getMemberTemplates(memberId);
      setTemplates(memberTemplates.templates || []);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const handleSend = async () => {
    if (!emailData.to || !emailData.subject || !emailData.body) {
      return;
    }

    setIsSending(true);

    try {
      // Prepare email payload
      const emailPayload = {
        ...emailData,
        postId: postData?._id,
        templateId: selectedTemplate?.id || selectedTemplate?._id,
        memberId: memberId,
      };
      console.log(emailPayload);
      // await onSend?.(emailPayload);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-2">
      <div className="bg-white rounded-2xl overflow-y-scroll scrollbar-hide max-h-[95vh]">
        {/* Header */}
        <div className="flex lg:flex-row flex-col gap-3  items-start lg:items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
              <Icons.Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg m-0 p-0 font-semibold text-gray-900">
                Send Email
              </h3>
              <p className="text-sm m-0 p-0 text-gray-500">
                Compose and send email to selected lead
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => setShowTemplatesDrawer(true)}
              theme="dark"
              loadingText="Fetching Email Templates..."
              isLoading={isLoadingTemplates}
              buttonText="Browse Templates"
              icon={<Icons.Document className="h-4 w-4" />}
              className="!rounded-full"
            />
          </div>
        </div>

        <div className="p-4 space-y-6 overflow-y-scroll scrollbar-hide">
          {/* Post Context */}
          {postData && <PostContent postData={postData} />}
          {/* Email Form */}
          <div className="space-y-4">
            {/* To Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <textarea
                value={emailData.to}
                onChange={(e) =>
                  setEmailData((prev) => ({ ...prev, to: e.target.value }))
                }
                placeholder="Enter email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="1"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) =>
                  setEmailData((prev) => ({ ...prev, subject: e.target.value }))
                }
                placeholder="Email subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Body Field */}
            <div>
              <div className="flex lg:flex-row flex-wrap items-center justify-between mb-2">
                <label className="flex gap-4 items-center text-sm font-medium text-gray-700">
                  Email Body{' '}
                </label>
                <CustomToggle
                  label="Format"
                  enabled={emailFormat === 'html'}
                  onChange={(isHtml) =>
                    setEmailFormat(isHtml ? 'html' : 'text')
                  }
                  leftLabel="Text"
                  rightLabel="HTML"
                />
                {selectedTemplate && (
                  <span className="text-xs text-gray-500">
                    Using template: {selectedTemplate.name}
                  </span>
                )}
              </div>
              <textarea
                value={emailData.body}
                onChange={(e) =>
                  setEmailData((prev) => ({ ...prev, body: e.target.value }))
                }
                placeholder="Compose your email message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="10"
              />
            </div>

            <EmailMediaUploader
              emailData={emailData}
              setEmailData={setEmailData}
            />

            <h4 className="text-sm font-semibold text-gray-800 mb-3">
              Email Settings
            </h4>
          </div>

          {/* Action Buttons */}
          <div className="flex lg:flex-row flex-wrap gap-3 justify-end pt-4 border-t">
            <Button
              theme="light"
              buttonText={'Cancel'}
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 !border-none rounded-full transition-colors"
            />
            {/* <CustomToggle
              label="Require Approval"
              enabled={requireApproval}
              onChange={setRequireApproval}
            /> */}
            <Button
              onClick={() => {
                // Convert emailData to template format
                const emailTemplate = {
                  name: 'Current Email Draft',
                  templateBody: emailData.body || 'No email content yet',
                  templateType:
                    emailData.body?.includes('<') &&
                    emailData.body?.includes('>')
                      ? 'html'
                      : 'text',
                  subject: emailData.subject || 'No subject',
                  category: 'draft',
                };
                setSelectedTemplate(emailTemplate);
                setShowPreviewModal(true);
              }}
              theme="light"
              buttonText="Preview"
              icon={<Icons.Eye className="h-3 w-3" />}
              className="flex w-fit text-xs py-1.5"
            />
            {/* <Button
              onClick={handleSend}
              disabled={
                !emailData.to ||
                !emailData.subject ||
                !emailData.body ||
                isSending
              }
              theme="dark"
              loadingText="Sending..."
              isLoading={isSending}
              buttonText={'Send Email'}
              icon={<Icons.Send className="h-4 w-4" />}
              className=""
            /> */}
          </div>
        </div>
      </div>
      <TemplatesDrawer
        isOpen={showTemplatesDrawer}
        onClose={() => setShowTemplatesDrawer(false)}
        templates={templates}
        onPreview={(template) => {
          setSelectedTemplate(template);
          setShowPreviewModal(true);
          setEmailFormat(template.templateType);
        }}
        onUseTemplate={(template) => {
          setSelectedTemplate(template);
          setShowPreviewModal(true);
          setEmailFormat(template.templateType);
          setShowPlaceholderDrawer(true);
        }}
      />
      <PlaceholderDrawer
        isOpen={showPlaceholderDrawer}
        onClose={() => {
          setShowPlaceholderDrawer(false);
          setShowPreviewModal(false);
          setShowTemplatesDrawer(false);
        }}
        postData={postData}
        template={selectedTemplate}
        onGenerateEmail={(email) => {
          setEmailData((prev) => ({
            ...prev,
            body: email,
          }));
        }}
      />
      <TemplatePreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        template={selectedTemplate}
        onUseTemplate={() => {
          setShowPlaceholderDrawer(true);
        }}
      />
    </div>
  );
};

export default EmailSendModal;
