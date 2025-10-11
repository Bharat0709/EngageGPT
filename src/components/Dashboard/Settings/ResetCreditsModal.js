import React from 'react';
import { Icons } from '@utils/constantData/icons'; 
import Button from '@components/Common/Button'; 

const ResetCreditsModal = ({ 
  isVisible, 
  onClose, 
  onConfirm, 
  personName,
  isResetting = false 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  backdrop-blur-sm z-50">
      <div className="bg-white rounded-3xl p-4 shadow-xl max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <Icons.Refresh className="h-6 w-6 text-blue-600" />
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Reset Credits for {personName}?
          </h3>
          
          <p className="text-sm text-gray-500 mb-4">
            This will reset today's credit usage to zero for this member.
          </p>
          
          <div className="border border-red-700 rounded-lg p-3 mb-6">
            <p className="text-sm  m-0 p-0 font-semibold text-yellow-800">
              ⚠️ This action will deduct 10 credits from your account
            </p>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button
              onClick={onClose}
              theme="light"
              buttonText="Cancel"
              className="border-none hover:bg-gray-50 rounded-full"
              disabled={isResetting}
            />
            <Button
              isLoading={isResetting}
              disabled={isResetting}
              loadingText="Resetting..."
              onClick={onConfirm}
              theme="dark"
              buttonText="Reset Credits (-10)"
              className="px-6 !rounded-full bg-blue-600 hover:bg-blue-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetCreditsModal;