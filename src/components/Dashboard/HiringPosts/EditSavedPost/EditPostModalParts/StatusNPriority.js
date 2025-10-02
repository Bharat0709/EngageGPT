import React, { useState } from 'react';
import { Select, Switch } from 'antd';
import { Icons } from '@utils/constantData/icons';
import {
  statusOptions,
  priorityOptions,
} from '../../SavePostUtils/EditPostUtils/Constants';
import CommonHeader from './CommonHeader';

const { Option } = Select;

const StatusPriorityForm = ({ postData, setPostData, errors = {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInputChange = (field, value) => {
    setPostData({ ...postData, [field]: value });
    console.log('Updating field:', field, 'with value:', value);
    console.log(postData);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 transition-all duration-300 overflow-hidden">
      <CommonHeader
        title="Status & Priority Management"
        description="Lead status, priority level, and activity settings"
        icon={<Icons.Target className="text-purple-600" size={20} />}
        isCollapsed={isCollapsed}
        errors={errors}
        onClick={() => setIsCollapsed(!isCollapsed)}
      />

      <div
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-[2000px]'
        } overflow-hidden`}
      >
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Lead Status */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Target size={16} className="text-blue-600" />
                Lead Status
                <span className="text-red-500">*</span>
              </label>
              <Select
                value={postData.leadStatus}
                onChange={(value) => handleInputChange('leadStatus', value)}
                size="large"
                className="w-full"
                placeholder="Select lead status"
                status={errors.leadStatus ? 'error' : ''}
              >
                {statusOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${option.color}`}
                      ></div>
                      {option.label}
                    </div>
                  </Option>
                ))}
              </Select>
              {errors.leadStatus && (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <Icons.Alert size={14} />
                  {errors.leadStatus}
                </p>
              )}
            </div>

            {/* Priority Level */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Flag size={16} className="text-orange-600" />
                Priority Level
                <span className="text-red-500">*</span>
              </label>
              <Select
                value={postData.leadPriority}
                onChange={(value) => handleInputChange('leadPriority', value)}
                size="large"
                className="w-full"
                placeholder="Select priority level"
                status={errors.leadPriority ? 'error' : ''}
              >
                {priorityOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${option.color}`}
                      ></div>
                      {option.label}
                    </div>
                  </Option>
                ))}
              </Select>
              {errors.leadPriority && (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <Icons.Alert size={14} />
                  {errors.leadPriority}
                </p>
              )}
            </div>

            {/* Active Status */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Activity size={16} className="text-green-600" />
                Active Status
              </label>
              <div className="pt-3">
                <Switch
                  checked={postData.isActive}
                  onChange={(checked) => handleInputChange('isActive', checked)}
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                  size="default"
                />
              </div>
              <p className="text-xs text-gray-500">
                {postData.isActive
                  ? 'Lead is currently active'
                  : 'Lead is inactive'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPriorityForm;
