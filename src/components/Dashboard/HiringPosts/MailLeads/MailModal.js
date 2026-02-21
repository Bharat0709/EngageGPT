// ✅ Full Code Below

import React, { useState, useEffect } from 'react';
import { getMemberTemplates } from '@services/EmailTemplates';
import { getMemberDetails, sendEmailViaGmail } from '@services/Members';
import { Icons } from '@utils/constantData/icons';
import Button from '@components/Common/Button';
import PostContent from './PostContent';
import TemplatesDrawer from './MailTemplates';
import PlaceholderDrawer from './PlaceholderManagement';
import TemplatePreviewModal from './MailPreview';
import { useNotifications } from '@components/Common/Notification';
import CustomToggle from '@components/Common/CustomToggle';
import axios from 'axios';

const EmailSendModal = ({ memberId, postData, onClose }) => {
  const message = useNotifications();

  const [emailData, setEmailData] = useState({
    from: '',
    to: '',
    subject: '',
    body: '',
    attachments: [],
  });

  const [templates, setTemplates] = useState([]);
  const [memberDetails, setMemberDetails] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [showTemplatesDrawer, setShowTemplatesDrawer] = useState(false);
  const [showPlaceholderDrawer, setShowPlaceholderDrawer] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [emailFormat, setEmailFormat] = useState('text');
  const [isSending, setIsSending] = useState(false);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [isLoadingMember, setIsLoadingMember] = useState(true);

  /** ✅ Fetch Member Details & Gmail Connection State */
  useEffect(() => {
    const fetchMember = async () => {
      try {
        setIsLoadingMember(true);
        const data = await getMemberDetails(memberId);
        setMemberDetails(data);
        if (data?.gmailTokens?.email) {
          setEmailData((prev) => ({ ...prev, from: data.gmailTokens.email }));
          setIsGmailConnected(true);
        }
      } catch (err) {
        message.error('Unable to fetch member details.');
      } finally {
        setIsLoadingMember(false);
      }
    };
    if (memberId) {
      fetchMember();
    } else {
      setIsLoadingMember(false);
    }
  }, [memberId]);

  /** ✅ Fetch Templates */
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setIsLoadingTemplates(true);
        const res = await getMemberTemplates(memberId);
        setTemplates(res.templates || []);
      } catch (err) {
        message.error(err.message);
      } finally {
        setIsLoadingTemplates(false);
      }
    };
    if (memberId) {
      loadTemplates();
    }
  }, [memberId]);

  /** ✅ If postData has prefilled email content, load it */
  useEffect(() => {
    if (postData?.emailAddresses?.length || postData?.generatedEmailBody) {
      setEmailData((prev) => ({
        ...prev,
        to: postData?.emailAddresses?.join(', ') || '',
        subject: postData?.generatedSubject || '',
        body: postData?.generatedEmailBody || '',
      }));
    }
  }, [postData]);

  const handleGmailConnect = async (memberId) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_GOOGLE_GMAIL_CONNECT_URL,
        { params: { userId: memberId } },
      );
      const { url } = response.data;
      if (url) {
        window.location.href = url;
      } else {
        console.error('No OAuth URL received from backend');
      }
    } catch (error) {
      console.error(
        'Gmail connect error:',
        error?.response?.data || error.message,
      );
      message.error('Failed to connect gmail.');
    }
  };

  /** ✅ Send Email */
  const handleSend = async () => {
    if (!emailData.to || !emailData.subject || !emailData.body) {
      return message.error('Please fill all fields before sending.');
    }
    if (!isGmailConnected) {
      return message.error('Please connect Gmail first.');
    }

    setIsSending(true);
    try {
      const emailPayload = {
        ...emailData,
        postId: postData?._id,
        templateId: selectedTemplate?._id || selectedTemplate?.id,
        memberId,
        format: emailFormat,
      };
      await sendEmailViaGmail(memberId, emailPayload);
      message.success('Email sent successfully!');
    } catch (error) {
      message.error(error.message || 'Failed to send email.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-2 mx-2">
      <div className="bg-white rounded-2xl max-h-[95vh] overflow-y-scroll scrollbar-hide">
        {/* ✅ Header */}
        <div
          className="flex lg:flex-row flex-col gap-3 items-start lg:items-center
                        justify-between p-4 border-b border-gray-100"
        >
          <div className="flex gap-3 items-center">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Icons.Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg m-0 p-0 ovo-regular  font-semibold text-gray-900">
                Send Email
              </h3>
              <p className="text-sm m-0 p-0  text-gray-500">
                Compose and send email to lead
              </p>
            </div>
          </div>

          <Button
            onClick={() => setShowTemplatesDrawer(true)}
            theme="dark"
            buttonText="Browse Templates"
            loadingText="Loading templates..."
            isLoading={isLoadingTemplates}
            icon={<Icons.Document className="h-4 w-4" />}
            className="!rounded-full"
          />
        </div>

        {/* ✅ Main Content */}
        <div className="p-4 space-y-6">
          {postData && <PostContent postData={postData} />}

          {/* ✅ Sender (From) Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <input
              type="text"
              readOnly
              value={
                isLoadingMember
                  ? 'Loading...'
                  : emailData.from ||
                    'Gmail not connected , Connect Gmail to send mails'
              }
              className={`w-full px-4 py-3 rounded-lg border
              ${
                isGmailConnected
                  ? 'border-gray-300 bg-gray-100'
                  : 'border-red-400 bg-red-50'
              }`}
            />
            {!isGmailConnected && (
              <Button
                className="mt-2"
                theme="light"
                buttonText="Connect Gmail"
                icon={<Icons.Google />}
                onClick={() => handleGmailConnect(memberId)}
              />
            )}
          </div>

          {/* ✅ To Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <textarea
              rows="1"
              value={emailData.to}
              onChange={(e) =>
                setEmailData((prev) => ({ ...prev, to: e.target.value }))
              }
              placeholder="Enter email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ✅ Subject */}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* ✅ Body + Format Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Email Body
              </label>
              <CustomToggle
                label="Format"
                enabled={emailFormat === 'html'}
                onChange={(isHtml) => setEmailFormat(isHtml ? 'html' : 'text')}
                leftLabel="Text"
                rightLabel="HTML"
              />
            </div>
            <textarea
              rows="10"
              value={emailData.body}
              onChange={(e) =>
                setEmailData((prev) => ({ ...prev, body: e.target.value }))
              }
              placeholder="Write your email here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* ✅ Attachments */}
          {/* <EmailMediaUploader
            emailData={emailData}
            setEmailData={setEmailData}
          /> */}

          {/* ✅ Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
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
            <Button
              onClick={handleSend}
              theme="dark"
              buttonText="Send Email"
              icon={<Icons.Send className="h-4 w-4" />}
              loadingText="Sending..."
              isLoading={isSending}
              disabled={
                isSending ||
                !emailData.to ||
                !emailData.subject ||
                !emailData.body ||
                !isGmailConnected
              }
            />
          </div>
        </div>
      </div>

      {/* ✅ Drawers / Preview Modals */}
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
          setShowPlaceholderDrawer(true);
          setEmailFormat(template.templateType);
        }}
      />

      <PlaceholderDrawer
        isOpen={showPlaceholderDrawer}
        onClose={() => {
          setShowPlaceholderDrawer(false);
          setShowPreviewModal(false);
        }}
        postData={postData}
        template={selectedTemplate}
        onGenerateEmail={(generatedEmail) =>
          setEmailData((prev) => ({ ...prev, body: generatedEmail }))
        }
      />

      <TemplatePreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        template={selectedTemplate}
        onUseTemplate={() => setShowPlaceholderDrawer(true)}
      />
    </div>
  );
};

export default EmailSendModal;
