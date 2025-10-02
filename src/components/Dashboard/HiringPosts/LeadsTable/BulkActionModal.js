import { useState } from 'react';
import { Icons } from '@utils/constantData/icons';
import {
  priorityOptions,
  statusOptions,
  automationOptions,
  personalizationOptions,
} from './ColumnConfig';
import { Select, Switch, InputNumber, DatePicker } from 'antd';
import Button from '@components/Common/Button';

const { Option } = Select;

const BulkActionModal = ({
  isUpdating,
  handleBulkAction,
  bulkModal,
  selectedLeads,
  closeBulkModal,
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  // State for automation form data
  const [bulkFormData, setBulkFormData] = useState({
    personalizationLevel: null,
    followUpInterval: 7,
    maxFollowUps: 3,
    followUpCount: 0,
    autoFollowUp: false,
    generateEmail: false,
    generateLinkedInMessage: false,
    followUpDate: null,
    nextAutomationDate: null,
  });

  // Reset form data when modal closes
  const handleCloseModal = () => {
    setSelectedValue('');
    setBulkFormData({
      personalizationLevel: null,
      followUpInterval: 7,
      maxFollowUps: 3,
      followUpCount: 0,
      autoFollowUp: false,
      generateEmail: false,
      generateLinkedInMessage: false,
      followUpDate: null,
      nextAutomationDate: null,
    });
    closeBulkModal();
  };

  // Handle bulk action with automation data
  const handleAutomationUpdate = () => {
    const automationData = {
      automationEnabled: selectedValue,
      ...(selectedValue && ['semi'].includes(selectedValue)
        ? bulkFormData
        : {}),
    };

    console.log(automationData);
    handleBulkAction(automationData);
  };

  if (!bulkModal.isOpen) return null;

  const renderModalContent = () => {
    switch (bulkModal.type) {
      case 'delete':
        return (
          <div className="text-center  max-w-sm">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <Icons.Trash className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Delete {selectedLeads.size} leads?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. All selected leads will be
              permanently deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                onClick={handleCloseModal}
                theme="light"
                buttonText="Cancel"
                className="border-none hover:bg-gray-50 rounded-full"
              />
              <Button
                isLoading={isUpdating}
                disabled={isUpdating}
                loadingText="Deleting..."
                onClick={() => handleBulkAction({})}
                theme="dark"
                buttonText="Delete"
                className="px-6 !rounded-full bg-red-600 hover:bg-red-700"
              />
            </div>
          </div>
        );

      case 'status':
        return (
          <div>
            <div className="flex items-center flex-col justify-center gap-3 mb-4">
              <div className="flex items-center flex-col justify-center h-10 w-10 rounded-full bg-green-100">
                <Icons.Refresh className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-md m-0  text-center font-medium text-gray-900">
                  Update Status
                </h3>
                <p className="text-xs mb-0 mt-2 text-center  text-gray-500">
                  Change status for {selectedLeads.size} selected leads
                </p>
              </div>
            </div>

            <div className="flex items-center max-w-96 flex-wrap justify-center gap-2 mb-6">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedValue(option.value)}
                  className={`flex items-center justify-center text-center gap-3 p-1 px-3 rounded-full border  transition-all ${
                    selectedValue === option.value
                      ? 'border-black bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <span
                    className={`px-2 py-1 text-center rounded-full text-xs font-medium`}
                  >
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                onClick={handleCloseModal}
                theme="light"
                buttonText="Cancel"
                className="border-none hover:bg-gray-50 rounded-full"
              />
              <Button
                isLoading={isUpdating}
                loadingText="Updating"
                onClick={() => handleBulkAction({ status: selectedValue })}
                disabled={!selectedValue || isUpdating}
                theme="dark"
                buttonText="Update Status"
                className="px-4 py-2 text-sm font-medium !rounded-full text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        );

      case 'priority':
        return (
          <div>
            <div className="flex items-center flex-col justify-center gap-3 mb-4">
              <div className="flex items-center flex-col justify-center h-10 w-10 rounded-full bg-orange-100">
                <Icons.Flag className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-md m-0 text-center font-medium text-gray-900">
                  Update Priority
                </h3>
                <p className="text-xs mb-0 mt-2 text-center text-gray-500">
                  Change priority for {selectedLeads.size} selected leads
                </p>
              </div>
            </div>

            <div className="flex items-center max-w-96 flex-wrap justify-center gap-2 mb-6">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedValue(option.value)}
                  className={`flex items-center justify-center text-center gap-3 p-1 px-3 rounded-full border transition-all ${
                    selectedValue === option.value
                      ? 'border- bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <span
                    className={`px-2 py-1 text-center rounded-full text-xs font-medium `}
                  >
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                onClick={handleCloseModal}
                theme="light"
                buttonText="Cancel"
                className="border-none hover:bg-gray-50 rounded-full"
              />
              <Button
                onClick={() => handleBulkAction({ priority: selectedValue })}
                disabled={!selectedValue || isUpdating}
                loadingText="Updating..."
                isLoading={isUpdating}
                theme="dark"
                buttonText="Update Priority"
                className="px-4 py-2 text-sm font-medium !rounded-full text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        );

      case 'automation':
        return (
          <div className="scrollbar-hide max-h-[70vh] relative">
            <div className="flex items-center flex-col max-w-5xl justify-center scrollbar-hide gap-3 mb-6">
              <div className="flex items-center flex-col justify-center h-12 w-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 shadow-sm">
                <Icons.Robot className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg m-0 text-center font-semibold text-gray-900">
                  Update Automation Config
                </h3>
                <p className="text-sm mb-0 mt-2 text-center text-gray-500">
                  Configure automation for{' '}
                  <span className="font-medium text-orange-600">
                    {selectedLeads.size}
                  </span>{' '}
                  selected leads
                </p>
              </div>
            </div>

            {/* Automation Level Selection */}
            <div className="space-y-4 mb-6">
              <label className="block text-xs font-medium text-gray-700 text-center">
                Choose Automation Level
              </label>
              <div className="flex items-center justify-center gap-3">
                {automationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedValue(option.value)}
                    className={`flex items-center justify-center text-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                      selectedValue === option.value
                        ? 'border-orange-500 bg-orange-50 shadow-sm'
                        : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        selectedValue === option.value
                          ? 'text-orange-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </span>
                    {selectedValue === option.value && (
                      <Icons.Check className="h-4 w-4 text-orange-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Options - Show only for Semi or Fully automated */}
            {selectedValue && ['semi', 'full'].includes(selectedValue) && (
              <div className="space-y-6 mb-6 p-4  rounded-2xl">
                {/* Date Management */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <Icons.User size={14} className="text-black" />
                        Personalization Level
                      </label>
                      <Select
                        value={bulkFormData.personalizationLevel}
                        onChange={(value) =>
                          setBulkFormData((prev) => ({
                            ...prev,
                            personalizationLevel: value,
                          }))
                        }
                        size="large"
                        className="w-full"
                        placeholder="Select personalization"
                      >
                        {personalizationOptions?.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <Icons.Robot size={14} className="text-black" />
                        Next Automation
                      </label>
                      <DatePicker
                        value={bulkFormData.nextAutomationDate}
                        onChange={(date) =>
                          setBulkFormData((prev) => ({
                            ...prev,
                            nextAutomationDate: date,
                          }))
                        }
                        size="large"
                        className="w-full rounded-lg"
                        placeholder="Schedule automation"
                        showTime={{ format: 'HH:mm' }}
                        format="MMM DD, YYYY HH:mm"
                      />
                    </div>
                  </div>
                </div>

                {/* Toggle Switches */}
                <div className="flex w-full flex-wrap gap-2 items-center justify-center">
                  <div className="flex items-center gap-3 justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Icons.Mail className="h-4 w-4 text-red-500" />
                      <span className="text-xs font-medium text-gray-500">
                        Generate Email Content
                      </span>
                    </div>
                    <Switch
                      checked={bulkFormData.generateEmail}
                      onChange={(checked) =>
                        setBulkFormData((prev) => ({
                          ...prev,
                          generateEmail: checked,
                        }))
                      }
                      size="default"
                    />
                  </div>

                  <div className="flex items-center gap-3 justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Icons.LinkedIn className="h-4 w-4 text-black" />
                      <span className="text-xs font-medium text-gray-500">
                        Generate LinkedIn Messages
                      </span>
                    </div>
                    <Switch
                      checked={bulkFormData.generateLinkedInMessage}
                      onChange={(checked) =>
                        setBulkFormData((prev) => ({
                          ...prev,
                          generateLinkedInMessage: checked,
                        }))
                      }
                      size="default"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div
              className={`flex gap-3 ${
                selectedValue === 'semi' ? 'pb-6' : 'pb-0'
              } justify-end pt-4 border-t border-gray-200`}
            >
              <Button
                onClick={handleCloseModal}
                theme="light"
                buttonText="Cancel"
                className="rounded-full border-none px-6 py-2 text-sm font-medium"
              />
              <Button
                onClick={handleAutomationUpdate}
                disabled={!selectedValue || isUpdating}
                loadingText="Updating..."
                isLoading={isUpdating}
                theme="dark"
                buttonText="Update Automation"
                className="px-6 py-2 text-sm font-medium !rounded-full text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[60] flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-gray-200 p-4 min-w-96 max-w-3xl mx-4 scrollbar-hide max-h-[90vh] overflow-y-auto">
        {renderModalContent()}
      </div>
    </div>
  );
};

export default BulkActionModal;
