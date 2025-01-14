import React from 'react';

const ConfirmationModal = ({ show, title, message, onCancel, onConfirm }) => {
  if (!show) {
    return null; 
  }

  return (
    <div className="fixed inset-0 w-full z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
        {title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>}
        {message && <p className="text-gray-700 mb-6">{message}</p>}
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
