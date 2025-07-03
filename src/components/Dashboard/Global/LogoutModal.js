import React from 'react';
import LogoutButton from '../../Logout';

const LogoutConfirmationModal = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden  bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity z-50"
      onClick={onClose}
    >
      <div
        className="bg-white lg:w-1/4 w-11/12 flex flex-col p-4 rounded-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-md mt-2 text-center mb-6">
          Are you sure you want to log out?
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
            onClick={onConfirm}
            className="global-button-primary rounded-full px-6 bg-red-600"
          >
            <LogoutButton />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
