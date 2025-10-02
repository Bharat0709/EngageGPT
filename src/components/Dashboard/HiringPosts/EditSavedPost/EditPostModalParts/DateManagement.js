import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { Icons } from '@utils/constantData/icons';
import CommonHeader from './CommonHeader';

const DateManagementForm = ({ postData, setPostData, errors = {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleDateChange = (field, date) => {
    setPostData({ ...postData, [field]: date });
    console.log('Updating field:', field, 'with value:', date);
    console.log(postData);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100  transition-all duration-300 overflow-hidden">
      {/* Header */}
      <CommonHeader
        title="Date Management"
        description="Schedule and track important dates"
        icon={<Icons.Calendar className="text-indigo-600" size={20} />}
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
        <div className="p-6 space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Clock size={16} className="text-green-600" />
                Last Contacted
              </label>
              <DatePicker
                value={postData.lastContactedAt}
                onChange={(date) => handleDateChange('lastContactedAt', date)}
                size="large"
                className={`w-full rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500 ${
                  errors.lastContactedAt
                    ? 'border-red-300 focus:border-red-500'
                    : ''
                }`}
                placeholder="Select contact date"
                showTime={{ format: 'HH:mm' }}
                format="MMM DD, YYYY HH:mm"
              />
              {errors.lastContactedAt && (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <Icons.Alert size={14} />
                  {errors.lastContactedAt}
                </p>
              )}
              <div className="text-xs text-gray-500">
                When did you last reach out to this lead?
              </div>
            </div>

            {/* Follow Up Date */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Calendar size={16} className="text-blue-600" />
                Follow Up Date
              </label>
              <DatePicker
                value={postData.followUpDate}
                onChange={(date) => handleDateChange('followUpDate', date)}
                size="large"
                className={`w-full rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500 ${
                  errors.followUpDate
                    ? 'border-red-300 focus:border-red-500'
                    : ''
                }`}
                placeholder="Schedule follow up"
                showTime={{ format: 'HH:mm' }}
                format="MMM DD, YYYY HH:mm"
              />
              {errors.followUpDate && (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <Icons.Alert size={14} />
                  {errors.followUpDate}
                </p>
              )}
              <div className="text-xs text-gray-500">
                When should you follow up with this lead?
              </div>
            </div>

            {/* Next Automation Date */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Robot size={16} className="text-purple-600" />
                Next Automation
              </label>
              <DatePicker
                value={postData.nextAutomationDate}
                onChange={(date) =>
                  handleDateChange('nextAutomationDate', date)
                }
                size="large"
                className="w-full rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500"
                placeholder="Schedule automation"
                showTime={{ format: 'HH:mm' }}
                format="MMM DD, YYYY HH:mm"
              />
              <div className="text-xs text-gray-500">
                When should automated outreach begin?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateManagementForm;
