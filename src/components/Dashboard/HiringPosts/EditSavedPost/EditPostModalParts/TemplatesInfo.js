import React, { useState } from 'react';
import { Input } from 'antd';
import { Icons } from '@utils/constantData/icons';

const { TextArea } = Input;

const TemplatesForm = ({ postData, setPostData, errors = {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInputChange = (field, value) => {
    setPostData({ ...postData, [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 transition-all duration-300 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 border-b border-gray-100 cursor-pointer group"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:border-purple-200 transition-colors">
            <Icons.Book className="text-purple-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              Message Templates
            </h3>
            <p className="text-xs mb-0 text-gray-600">
              Email and LinkedIn message templates
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {Object.keys(errors).length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
              <Icons.Alert className="text-red-500" size={14} />
              <span className="text-xs font-medium text-red-600">
                {Object.keys(errors).length} error
                {Object.keys(errors).length > 1 ? 's' : ''}
              </span>
            </div>
          )}
          <button className="p-2 hover:bg-white/60 rounded-full transition-colors">
            <Icons.Down
              className={`text-gray-500 transition-transform duration-200 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
              size={20}
            />
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-[2000px]'
        } overflow-hidden`}
      >
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icons.Message size={16} className="text-blue-600" />
              Email Template
            </label>
            <TextArea
              value={postData.emailTemplate}
              onChange={(e) =>
                handleInputChange('emailTemplate', e.target.value)
              }
              maxLength={1000}
              placeholder="Enter email template with placeholders..."
              rows={4}
              className="rounded-xl border-gray-300 hover:border-black focus:border-black resize-none"
            />
            <span className="flex  justify-between gap-2 items-center text-xs text-gray-500">
              Characters: {postData.emailTemplate?.length || 0} / 1000
            </span>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icons.LinkedIn size={16} className="text-blue-600" />
              LinkedIn Template
            </label>
            <TextArea
              value={postData.linkedInTemplate}
              onChange={(e) =>
                handleInputChange('linkedInTemplate', e.target.value)
              }
              maxLength={500}
              placeholder="Enter LinkedIn message template..."
              rows={4}
              className="rounded-xl border-gray-300 hover:border-black focus:border-black resize-none"
            />
            <span className="flex  justify-between gap-2 items-center text-xs text-gray-500">
              Characters: {postData.linkedInTemplate?.length || 0} / 500
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesForm;
