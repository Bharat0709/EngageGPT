import React from 'react';
import { disconnectLinkedIn } from '@services/LinkedIn';
import { useNotifications } from '@components/Common/Notification';

const DisconnectConfirmationModal = ({
  isVisible,
  onClose,
  memberId,
  refreshPage,
}) => {
  if (!isVisible) return null;
  const message = useNotifications();

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
      className="fixed inset-0 w-full z-50 flex bg-black bg-opacity-50 backdrop-blur-sm transition-opacity items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white lg:w-1/4 w-11/12 flex flex-col p-4 rounded-3xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg mt-2 text-center mb-6">
          Are you sure you want to disconnect your LinkedIn Account?
        </h2>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="global-button-secondary border-none rounded-full text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDisconnectLinkedIn}
            className="global-button-primary rounded-full px-6 bg-red-600"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisconnectConfirmationModal;
