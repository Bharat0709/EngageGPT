import React from 'react';
import { Icons } from '@utils/constantData/icons';
import { FiTrash } from 'react-icons/fi';
import Button from '@components/Common/Button';

const BulkActionModalPosts = ({
  bulkModal,
  selectedPosts,
  handleBulkAction,
  closeBulkModal,
  isUpdating = false,
}) => {
  if (!bulkModal.isOpen) return null;

  const renderModalContent = () => {
    switch (bulkModal.type) {
      case 'delete':
        return (
          <div className="text-center max-w-sm">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <FiTrash className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Delete {selectedPosts.size} post{selectedPosts.size > 1 ? 's' : ''}?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. All selected posts will be permanently deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                onClick={closeBulkModal}
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

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[60] flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 min-w-96 max-w-3xl mx-4">
        {renderModalContent()}
      </div>
    </div>
  );
};

export default BulkActionModalPosts;