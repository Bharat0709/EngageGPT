import React, { useState } from 'react';
import { Input, Tag } from 'antd';
import { Icons } from '@utils/constantData/icons';
import CommonHeader from './CommonHeader';

const ContactInformationForm = ({
  postData,
  setPostData,
  emailInput,
  setEmailInput,
  formLinkInput,
  setFormLinkInput,
  errors = {},
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleAddEmail = () => {
    const email = emailInput.trim();
    if (
      email &&
      isValidEmail(email) &&
      !postData.emailAddresses.includes(email)
    ) {
      setPostData({
        ...postData,
        emailAddresses: [...postData.emailAddresses, email],
      });
      setEmailInput('');
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setPostData({
      ...postData,
      emailAddresses: postData.emailAddresses.filter(
        (email) => email !== emailToRemove,
      ),
    });
  };

  const handleAddFormLink = () => {
    const link = formLinkInput.trim();
    if (link && isValidUrl(link) && !postData.formLinks.includes(link)) {
      setPostData({
        ...postData,
        formLinks: [...postData.formLinks, link],
      });
      setFormLinkInput('');
    }
  };

  const handleRemoveFormLink = (linkToRemove) => {
    setPostData({
      ...postData,
      formLinks: postData.formLinks.filter((link) => link !== linkToRemove),
    });
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const totalContacts =
    postData.emailAddresses.length + postData.formLinks.length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100  transition-all duration-300 overflow-hidden">
      {/* Header */}
      <CommonHeader
        title="Contact Information"
        description="Email addresses and form links for outreach"
        icon={<Icons.Mail className="text-blue-600" size={20} />}
        isCollapsed={isCollapsed}
        totalContacts={totalContacts}
        errors={errors}
        onClick={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-[2000px]'
        } overflow-hidden`}
      >
        <div className="p-6 space-y-8">
          {/* Email Addresses Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Mail size={16} className="text-blue-600" />
                Email Addresses
                {postData.emailAddresses.length === 0 && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="text-xs text-gray-500">
                {postData.emailAddresses.length} email
                {postData.emailAddresses.length !== 1 ? 's' : ''} added
              </div>
            </div>

            <div className="space-y-3">
              <Input
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddEmail)}
                placeholder="Enter email address and press Enter..."
                size="large"
                className={`rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500 ${
                  errors.emailAddresses
                    ? 'border-red-300 focus:border-red-500'
                    : ''
                }`}
                status={errors.emailAddresses ? 'error' : ''}
                suffix={
                  <button
                    onClick={handleAddEmail}
                    disabled={
                      !emailInput.trim() || !isValidEmail(emailInput.trim())
                    }
                    className="px-4 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    Add
                  </button>
                }
              />

              {errors.emailAddresses && (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <Icons.Alert size={14} />
                  {errors.emailAddresses}
                </p>
              )}

              {/* Email Tags */}
              {postData.emailAddresses.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {postData.emailAddresses.map((email, index) => (
                      <Tag
                        key={index}
                        closable
                        onClose={() => handleRemoveEmail(email)}
                        className="px-3 py-1 rounded-full border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                      >
                        <div className="flex items-center gap-2">
                          <Icons.Mail size={12} />
                          {email}
                        </div>
                      </Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Links Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Link size={16} className="text-purple-600" />
                Form Links
              </label>
              <div className="text-xs text-gray-500">
                {postData.formLinks.length} link
                {postData.formLinks.length !== 1 ? 's' : ''} added
              </div>
            </div>

            <div className="space-y-3">
              <Input
                value={formLinkInput}
                onChange={(e) => setFormLinkInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddFormLink)}
                placeholder="Enter form/application link and press Enter..."
                size="large"
                className="rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500"
                suffix={
                  <button
                    onClick={handleAddFormLink}
                    disabled={
                      !formLinkInput.trim() || !isValidUrl(formLinkInput.trim())
                    }
                    className="px-4 py-1 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    Add
                  </button>
                }
              />

              {/* Form Link Tags */}
              {postData.formLinks.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="space-y-2">
                    {postData.formLinks.map((link, index) => (
                      <Tag
                        key={index}
                        closable
                        onClose={() => handleRemoveFormLink(link)}
                        className="w-full px-3 py-2 rounded-lg border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <Icons.Link size={12} />
                            <span className="truncate max-w-xs">
                              {link.length > 50
                                ? `${link.substring(0, 50)}...`
                                : link}
                            </span>
                          </div>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 p-1 hover:bg-purple-200 rounded"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Icons.ExternalLink size={12} />
                          </a>
                        </div>
                      </Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Summary */}
          {totalContacts > 0 && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Icons.Check className="text-green-600" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Contact Information Complete
                    </p>
                    <p className="text-sm text-gray-600">
                      {postData.emailAddresses.length} email
                      {postData.emailAddresses.length !== 1 ? 's' : ''} and{' '}
                      {postData.formLinks.length} form link
                      {postData.formLinks.length !== 1 ? 's' : ''} ready for
                      outreach
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInformationForm;
