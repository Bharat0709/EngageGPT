import React, { useState } from 'react';
import { Icons } from '@utils/constantData/icons';
import Button from '@components/Common/Button';

const BulkActionModalTemplates = ({
  isUpdating,
  closeBulkModal,
  bulkModal,
  selectedTemplates,
  handleBulkAction,
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleCloseModal = () => {
    setSelectedValue('');
    closeBulkModal();
  };

  if (!bulkModal.isOpen) return null;

  const renderModalContent = () => {
    switch (bulkModal.type) {
      case 'delete':
        return (
          <div className="text-center max-w-sm">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <Icons.Trash className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Delete {selectedTemplates.size} template
              {selectedTemplates.size > 1 ? 's' : ''}?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. All selected templates will be
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

      case 'category':
        const categoryOptions = [
          { value: 'outreach', label: 'Outreach', icon: '📧' },
          { value: 'follow_up', label: 'Follow Up', icon: '🔄' },
          { value: 'introduction', label: 'Introduction', icon: '👋' },
          { value: 'networking', label: 'Networking', icon: '🤝' },
          { value: 'cold_email', label: 'Cold Email', icon: '❄️' },
          { value: 'meeting_request', label: 'Meeting Request', icon: '📅' },
          { value: 'thank_you', label: 'Thank You', icon: '💝' },
          { value: 'proposal', label: 'Proposal', icon: '📋' },
          { value: 'custom', label: 'Custom', icon: '⚙️' },
        ];

        return (
          <div>
            <div className="flex items-center flex-col justify-center gap-3 mb-4">
              <div className="flex items-center flex-col justify-center h-10 w-10 rounded-full bg-blue-100">
                <Icons.Tag className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-md m-0 text-center font-medium text-gray-900">
                  Update Category
                </h3>
                <p className="text-xs mb-0 mt-2 text-center text-gray-500">
                  Change category for {selectedTemplates.size} selected template
                  {selectedTemplates.size > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center max-w-96 flex-wrap justify-center gap-2 mb-6">
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedValue(option.value)}
                  className={`flex items-center justify-center text-center gap-2 p-1 px-3 rounded-full border transition-all ${
                    selectedValue === option.value
                      ? 'border-black bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xs">{option.icon}</span>
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
                loadingText="Updating..."
                onClick={() => handleBulkAction({ category: selectedValue })}
                disabled={!selectedValue || isUpdating}
                theme="dark"
                buttonText="Update Category"
                className="px-4 py-2 text-sm font-medium !rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        );

      case 'type':
        const typeOptions = [
          { value: 'html', label: 'HTML', icon: '🌐' },
          { value: 'text', label: 'Text', icon: '📄' },
        ];

        return (
          <div>
            <div className="flex items-center flex-col justify-center gap-3 mb-4">
              <div className="flex items-center flex-col justify-center h-10 w-10 rounded-full bg-green-100">
                <Icons.Code className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-md m-0 text-center font-medium text-gray-900">
                  Update Type
                </h3>
                <p className="text-xs mb-0 mt-2 text-center text-gray-500">
                  Change type for {selectedTemplates.size} selected template
                  {selectedTemplates.size > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center max-w-96 flex-wrap justify-center gap-2 mb-6">
              {typeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedValue(option.value)}
                  className={`flex items-center justify-center text-center gap-2 p-1 px-3 rounded-full border transition-all ${
                    selectedValue === option.value
                      ? 'border-black bg-green-50'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xs">{option.icon}</span>
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
                onClick={() =>
                  handleBulkAction({ templateType: selectedValue })
                }
                disabled={!selectedValue || isUpdating}
                loadingText="Updating..."
                isLoading={isUpdating}
                theme="dark"
                buttonText="Update Type"
                className="px-4 py-2 text-sm font-medium !rounded-full text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        );

      case 'setDefault':
        const templateStatusOptions = [
          { value: true, label: 'Set as Default', icon: '⭐' },
          { value: false, label: 'Remove Default', icon: '🔘' },
        ];

        return (
          <div>
            <div className="flex items-center flex-col justify-center gap-3 mb-4">
              <div className="flex items-center flex-col justify-center h-10 w-10 rounded-full bg-yellow-100">
                <Icons.Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-md m-0 text-center font-medium text-gray-900">
                  Update Default Status
                </h3>
                <p className="text-xs mb-0 mt-2 text-center text-gray-500">
                  Change default status for {selectedTemplates.size} selected
                  template{selectedTemplates.size > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center max-w-96 flex-wrap justify-center gap-2 mb-6">
              {templateStatusOptions.map((option) => (
                <button
                  key={option.value.toString()}
                  onClick={() => setSelectedValue(option.value)}
                  className={`flex items-center justify-center text-center gap-2 p-1 px-3 rounded-full border transition-all ${
                    selectedValue === option.value
                      ? 'border-black bg-yellow-50'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xs">{option.icon}</span>
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
                onClick={() => handleBulkAction({ isDefault: selectedValue })}
                disabled={selectedValue === '' || isUpdating}
                loadingText="Updating..."
                isLoading={isUpdating}
                theme="dark"
                buttonText="Update Status"
                className="px-4 py-2 text-sm font-medium !rounded-full text-white bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default BulkActionModalTemplates;
