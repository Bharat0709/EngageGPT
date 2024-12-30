import React from 'react';
import { message } from 'antd';
import { disconnectLinkedIn } from '../../../network/Members';

const DisconnectConfirmationModal = ({
  isVisible,
  onClose,
  memberId,
  refreshPage,
}) => {
  if (!isVisible) return null;

  const handleDisconnectLinkedIn = async () => {
    try {
      await disconnectLinkedIn(memberId);
      refreshPage(true);
      message.success('Account disconnected successfully!');
      onClose();
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white lg:w-1/4 w-11/12 flex flex-col p-4 rounded-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-md mt-2 text-center mb-6">
          Are you sure you want to disconnect your linkedIn Account?
        </h2>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="global-button-secondary text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDisconnectLinkedIn}
            className="global-button-primary bg-red-600"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisconnectConfirmationModal;
