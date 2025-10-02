// EmailApprovalScreen.js
import React, { useState, useEffect } from 'react';
import { Icons } from '@utils/constantData/icons';
import Button from '@components/Common/Button';

const EmailApprovalScreen = ({
  automationData,
  onApprove,
  onReject,
  onClose,
  isLoading = false,
}) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Editable email data
  const [editableEmail, setEditableEmail] = useState({
    from: '',
    to: '',
    subject: '',
    body: '',
    format: 'text',
  });

  // Function to parse HTML if it's stringified
  const parseEmailBody = (bodyContent) => {
    if (!bodyContent) return '';

    // Check if it's a stringified HTML (starts with escaped quotes or HTML tags)
    if (typeof bodyContent === 'string') {
      try {
        // Try to parse as JSON first (in case it's JSON stringified)
        const parsed = JSON.parse(bodyContent);
        return parsed;
      } catch (e) {
        // If not JSON, check if it has escaped characters
        if (
          bodyContent.includes('\\n') ||
          bodyContent.includes('\\"') ||
          bodyContent.includes('\\\\')
        ) {
          // Unescape common JSON escape sequences
          return bodyContent
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t')
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, '\\');
        }
        // Return as is if no escaping detected
        return bodyContent;
      }
    }

    return bodyContent;
  };

  // Initialize editable data
  useEffect(() => {
    if (automationData?.emailContent) {
      const parsedBody = parseEmailBody(automationData.emailContent.body);

      setEditableEmail({
        from: automationData.emailContent.from || '',
        to: automationData.emailContent.to || '',
        subject: automationData.emailContent.subject || '',
        body: parsedBody,
        format: automationData.emailContent.format || 'text',
      });
    }
  }, [automationData]);

  const handleEmailChange = (field, value) => {
    setEditableEmail((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleApprove = () => {
    // Pass the edited email content along with automation ID
    const updatedAutomationData = {
      ...automationData,
      emailContent: editableEmail,
    };
    onApprove(automationData._id, updatedAutomationData);
  };

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onReject(automationData._id, rejectionReason);
      setShowRejectionModal(false);
      setRejectionReason('');
    }
  };

  const handleSaveChanges = () => {
    setIsEditMode(false);
    setHasChanges(false);
  };

  const handleCancelEdit = () => {
    // Reset to original data
    const parsedBody = parseEmailBody(automationData.emailContent.body);

    setEditableEmail({
      from: automationData.emailContent.from || '',
      to: automationData.emailContent.to || '',
      subject: automationData.emailContent.subject || '',
      body: parsedBody,
      format: automationData.emailContent.format || 'text',
    });
    setIsEditMode(false);
    setHasChanges(false);
  };

  const getAutomationTypeLabel = (type) => {
    const typeLabels = {
      initial_outreach: 'Initial Outreach',
      follow_up_1: 'First Follow-up',
      follow_up_2: 'Second Follow-up',
      follow_up_3: 'Third Follow-up',
      custom: 'Custom Email',
      linkedin_message: 'LinkedIn Message',
    };
    return typeLabels[type] || type;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  // Function to detect if content is HTML
  const isHtmlContent = (content) => {
    if (!content || typeof content !== 'string') return false;

    // Check for HTML tags
    const htmlTagRegex = /<[^>]*>/;
    return htmlTagRegex.test(content);
  };

  // Render email body based on format and content
  const renderEmailBody = () => {
    const { body, format } = editableEmail;

    if (isEditMode) {
      return (
        <div className="p-0">
          <textarea
            value={body}
            onChange={(e) => handleEmailChange('body', e.target.value)}
            placeholder="Enter your email content here..."
            className="w-full h-[400px] p-4 border-none resize-none focus:ring-0 focus:outline-none text-sm leading-relaxed font-mono"
            style={{ minHeight: '400px' }}
          />
        </div>
      );
    }

    // Auto-detect HTML or use specified format
    const shouldRenderAsHtml = format === 'html' || isHtmlContent(body);

    if (shouldRenderAsHtml) {
      return (
        <div className="p-4">
          <div
            className="prose max-w-none text-sm"
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="p-4">
          <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
            {body}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <Icons.Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Email Approval Required
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                    automationData?.priority,
                  )}`}
                >
                  {automationData?.priority?.toUpperCase() || 'LOW'} PRIORITY
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {getAutomationTypeLabel(
                    automationData?.automationType || 'custom',
                  )}
                </span>
                {hasChanges && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    MODIFIED
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditMode ? (
              <button
                onClick={() => setIsEditMode(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Icons.Edit className="h-4 w-4" />
                Edit Email
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Icons.Cross className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  disabled={!hasChanges}
                >
                  <Icons.Check className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Icons.Cross className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Email Details */}
            <div className="space-y-6">
              {/* Email Information */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Icons.Mail className="h-5 w-5" />
                    Email Details
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* From Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      From:
                    </label>
                    {isEditMode ? (
                      <input
                        type="email"
                        value={editableEmail.from}
                        onChange={(e) =>
                          handleEmailChange('from', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    ) : (
                      <div className="text-sm text-gray-900 p-2 bg-white rounded border">
                        {editableEmail.from}
                      </div>
                    )}
                  </div>

                  {/* To Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      To:
                    </label>
                    {isEditMode ? (
                      <input
                        type="email"
                        value={editableEmail.to}
                        onChange={(e) =>
                          handleEmailChange('to', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    ) : (
                      <div className="text-sm text-gray-900 p-2 bg-white rounded border">
                        {editableEmail.to}
                      </div>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Subject:
                    </label>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={editableEmail.subject}
                        onChange={(e) =>
                          handleEmailChange('subject', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
                      />
                    ) : (
                      <div className="text-sm text-gray-900 font-medium p-2 bg-white rounded border">
                        {editableEmail.subject}
                      </div>
                    )}
                  </div>

                  {/* Format Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Format:
                    </label>
                    {isEditMode ? (
                      <select
                        value={editableEmail.format}
                        onChange={(e) =>
                          handleEmailChange('format', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="text">Plain Text</option>
                        <option value="html">HTML</option>
                      </select>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            editableEmail.format === 'html' ||
                            isHtmlContent(editableEmail.body)
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {editableEmail.format === 'html' ||
                          isHtmlContent(editableEmail.body)
                            ? 'HTML'
                            : 'TEXT'}
                        </span>
                        {isHtmlContent(editableEmail.body) &&
                          editableEmail.format !== 'html' && (
                            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              AUTO-DETECTED
                            </span>
                          )}
                      </div>
                    )}
                  </div>

                  {automationData?.templateName && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Template:
                      </label>
                      <div className="text-sm text-gray-900 p-2 bg-white rounded border">
                        {automationData.templateName}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Attachments */}
              {automationData?.emailContent?.attachments &&
                automationData.emailContent.attachments.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Icons.Paperclip className="h-5 w-5" />
                      Attachments (
                      {automationData.emailContent.attachments.length})
                    </h3>
                    <div className="space-y-2">
                      {automationData.emailContent.attachments.map(
                        (attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-2 bg-white rounded-lg"
                          >
                            <Icons.Document className="h-4 w-4 text-gray-500" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {attachment.fileName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(attachment.fileSize / 1024).toFixed(1)} KB •{' '}
                                {attachment.mimeType}
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

              {/* Automation Context */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Icons.Info className="h-5 w-5" />
                  Automation Context
                </h3>

                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      Sequence:
                    </span>
                    <span className="col-span-2 text-sm text-gray-900">
                      Step {automationData?.sequenceNumber || 1} of automation
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      Created:
                    </span>
                    <span className="col-span-2 text-sm text-gray-900">
                      {automationData?.createdAt
                        ? new Date(automationData.createdAt).toLocaleString()
                        : 'N/A'}
                    </span>
                  </div>

                  {automationData?.scheduledFor && (
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        Scheduled:
                      </span>
                      <span className="col-span-2 text-sm text-gray-900">
                        {new Date(automationData.scheduledFor).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Email Body Editor/Preview */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Icons.Eye className="h-5 w-5" />
                    {isEditMode ? 'Edit Email Content' : 'Email Preview'}
                  </h3>

                  {!isEditMode && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          editableEmail.format === 'html' ||
                          isHtmlContent(editableEmail.body)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {editableEmail.format === 'html' ||
                        isHtmlContent(editableEmail.body)
                          ? 'HTML PREVIEW'
                          : 'TEXT PREVIEW'}
                      </span>
                    </div>
                  )}

                  {isEditMode && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Icons.Info className="h-3 w-3" />
                      <span>Changes are saved locally until approved</span>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg border border-gray-200 min-h-[400px]">
                  {renderEmailBody()}
                </div>

                {isEditMode && (
                  <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                    <span>Characters: {editableEmail.body.length}</span>
                    <span>•</span>
                    <span>
                      Words:{' '}
                      {
                        editableEmail.body
                          .trim()
                          .split(/\s+/)
                          .filter((word) => word.length > 0).length
                      }
                    </span>
                    <span>•</span>
                    <span>
                      Type:{' '}
                      {isHtmlContent(editableEmail.body)
                        ? 'HTML Detected'
                        : 'Plain Text'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icons.Clock className="h-4 w-4" />
            <span>
              Pending for{' '}
              {automationData?.createdAt
                ? Math.floor(
                    (Date.now() - new Date(automationData.createdAt)) /
                      (1000 * 60 * 60),
                  )
                : 0}{' '}
              hours
            </span>
          </div>

          <div className="flex items-center gap-3">
            {hasChanges && !isEditMode && (
              <div className="flex items-center gap-1 text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
                <Icons.AlertCircle className="h-4 w-4" />
                <span>Unsaved changes</span>
              </div>
            )}

            <Button
              onClick={() => setShowRejectionModal(true)}
              theme="light"
              buttonText="Reject"
              icon={<Icons.Cross className="h-4 w-4" />}
              className="border-red-300 text-red-600 hover:bg-red-50"
              disabled={isLoading || isEditMode}
            />

            <Button
              onClick={handleApprove}
              theme="dark"
              buttonText={
                hasChanges ? 'Approve & Send (Modified)' : 'Approve & Send'
              }
              icon={<Icons.Check className="h-4 w-4" />}
              className={
                hasChanges
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : 'bg-green-600 hover:bg-green-700'
              }
              isLoading={isLoading}
              loadingText="Approving..."
              disabled={isLoading || isEditMode}
            />
          </div>
        </div>
      </div>

      {/* Rejection Reason Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
                <Icons.Cross className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Reject Email
                </h3>
                <p className="text-sm text-gray-600">
                  Please provide a reason for rejection
                </p>
              </div>
            </div>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Explain why this email should be rejected..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows="4"
            />

            <div className="flex justify-end gap-3 mt-4">
              <Button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason('');
                }}
                theme="light"
                buttonText="Cancel"
                className="border-none hover:bg-gray-50"
              />
              <Button
                onClick={handleReject}
                theme="dark"
                buttonText="Reject Email"
                className="bg-red-600 hover:bg-red-700"
                disabled={!rejectionReason.trim()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailApprovalScreen;
