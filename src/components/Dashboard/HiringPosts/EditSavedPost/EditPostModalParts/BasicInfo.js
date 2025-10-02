import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { Icons } from '@utils/constantData/icons';
import { companySizeOptions } from '../../SavePostUtils/EditPostUtils/Constants';
import CommonHeader from './CommonHeader';

const { TextArea } = Input;
const { Option } = Select;

const BasicInformationForm = ({ postData, setPostData, errors = {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInputChange = (field, value) => {
    setPostData({ ...postData, [field]: value });
    console.log('Updating field:', field, 'with value:', value);
    console.log(postData);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 transition-all duration-300 overflow-hidden">
      {/* Header */}

      <CommonHeader
        title="Basic Information"
        description="Lead Information"
        icon={<Icons.Edit3 className="text-blue-600" size={20} />}
        isCollapsed={isCollapsed}
        errors={errors}
        onClick={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-[2000px]'
        } overflow-hidden`}
      >
        <div className="p-6 space-y-6">
          {/* Post Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icons.Book size={16} className="text-blue-600" />
              Lead Title
              <span className="text-red-500">*</span>
            </label>
            <Input
              value={postData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter a compelling post title..."
              size="large"
              className={`rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500 ${
                errors.title ? 'border-red-300 focus:border-red-500' : ''
              }`}
              status={errors.title ? 'error' : ''}
            />
            {errors.title && (
              <p className="flex items-center gap-2 text-sm text-red-600">
                <Icons.Alert size={14} />
                {errors.title}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Author Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.User size={16} className="text-green-600" />
                Lead Name
                <span className="text-red-500">*</span>
              </label>
              <Input
                value={postData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Enter author's full name..."
                size="large"
                className={`rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500 ${
                  errors.author ? 'border-red-300 focus:border-red-500' : ''
                }`}
                status={errors.author ? 'error' : ''}
              />
              {errors.author && (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <Icons.Alert size={14} />
                  {errors.author}
                </p>
              )}
            </div>

            {/* Author Profile URL */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Link size={16} className="text-purple-600" />
                Lead Profile URL
              </label>
              <Input
                value={postData.authorUrl}
                onChange={(e) => handleInputChange('authorUrl', e.target.value)}
                placeholder="https://linkedin.com/in/author..."
                size="large"
                className={`rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500 ${
                  errors.authorUrl ? 'border-red-300 focus:border-red-500' : ''
                }`}
                status={errors.authorUrl ? 'error' : ''}
              />
              {errors.authorUrl && (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <Icons.Alert size={14} />
                  {errors.authorUrl}
                </p>
              )}
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Building size={16} className="text-orange-600" />
                Industry
              </label>
              <Input
                value={postData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                placeholder="e.g., Technology, Healthcare, Finance..."
                size="large"
                className="rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500"
              />
            </div>

            {/* Company Size */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Users size={16} className="text-indigo-600" />
                Company Size
              </label>
              <Select
                value={postData.companySize}
                onChange={(value) => handleInputChange('companySize', value)}
                size="large"
                className="w-full"
                placeholder="Select company size range"
                allowClear
              >
                {companySizeOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Icons.Building size={14} className="text-gray-500" />
                      {option.label}
                    </div>
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          {/* Post Content */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icons.Edit3 size={16} className="text-teal-600" />
              Post Content
              <span className="text-red-500">*</span>
            </label>
            <TextArea
              value={postData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Enter the complete post content here..."
              rows={6}
              className={`rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500 resize-none ${
                errors.content ? 'border-red-300 focus:border-red-500' : ''
              }`}
              status={errors.content ? 'error' : ''}
            />
            {errors.content && (
              <p className="flex items-center gap-2 text-sm text-red-600">
                <Icons.Alert size={14} />
                {errors.content}
              </p>
            )}
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Characters: {postData.content?.length || 0}</span>
              <span
                className={
                  postData.content?.length > 2000 ? 'text-orange-600' : ''
                }
              >
                Recommended: 500-2000 characters
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationForm;
