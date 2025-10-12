import React, { useState } from 'react';
import { Select, Switch, InputNumber, Divider } from 'antd';
import { Icons } from '@utils/constantData/icons';
import {
  automationOptions,
  personalizationOptions,
} from '../../SavePostUtils/EditPostUtils/Constants';

const { Option } = Select;

const AutomationForm = ({ postData, setPostData, errors = {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInputChange = (field, value) => {
    setPostData({ ...postData, [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 transition-all duration-300 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50/50 to-violet-50/50 border-b border-gray-100 cursor-pointer group"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:border-purple-200 transition-colors">
            <Icons.Robot className="text-purple-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              Automation Configuration
            </h3>
            <p className="text-xs mb-0 text-gray-600">
              Follow-up settings and content generation
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
          {/* First Row */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Settings size={16} className="text-blue-600" />
                Automation Level
              </label>
              <Select
                value={postData.automationEnabled}
                onChange={(value) =>
                  handleInputChange('automationEnabled', value)
                }
                size="large"
                className="w-full"
                placeholder="Select automation level"
              >
                {automationOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.User size={16} className="text-green-600" />
                Personalization Level
              </label>
              <Select
                value={postData.personalizationLevel}
                onChange={(value) =>
                  handleInputChange('personalizationLevel', value)
                }
                size="large"
                className="w-full"
                placeholder="Select personalization"
              >
                {personalizationOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Clock size={16} className="text-orange-600" />
                Follow Up Interval (Days)
              </label>
              <InputNumber
                value={postData.followUpInterval}
                onChange={(value) =>
                  handleInputChange('followUpInterval', value || 7)
                }
                min={1}
                max={365}
                size="large"
                className="w-full"
                placeholder="7"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Repeat size={16} className="text-indigo-600" />
                Max Follow Ups
              </label>
              <InputNumber
                value={postData.maxFollowUps}
                onChange={(value) =>
                  handleInputChange('maxFollowUps', value || 3)
                }
                min={0}
                max={20}
                size="large"
                className="w-full"
                placeholder="3"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Activity size={16} className="text-teal-600" />
                Current Follow Up Count
              </label>
              <InputNumber
                value={postData.followUpCount}
                onChange={(value) =>
                  handleInputChange('followUpCount', value || 0)
                }
                min={0}
                size="large"
                className="w-full"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 mb-3 block">
                Automation Options
              </label>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Auto Follow Up</span>
                <Switch
                  checked={postData.autoFollowUp}
                  onChange={(checked) =>
                    handleInputChange('autoFollowUp', checked)
                  }
                  size="default"
                />
              </div>
            </div>
          </div>

          <Divider />

          {/* Generation Settings */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Icons.Mail size={16} className="text-red-500" />
                Email Generation
              </h4>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                <span className="text-sm text-gray-600">
                  Generate Email Content
                </span>
                <Switch
                  checked={postData.generateEmail}
                  onChange={(checked) =>
                    handleInputChange('generateEmail', checked)
                  }
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Icons.LinkedIn size={16} className="text-blue-500" />
                LinkedIn Generation
              </h4>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <span className="text-sm text-gray-600">
                  Generate LinkedIn Messages
                </span>
                <Switch
                  checked={postData.generateLinkedInMessage}
                  onChange={(checked) =>
                    handleInputChange('generateLinkedInMessage', checked)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationForm;
