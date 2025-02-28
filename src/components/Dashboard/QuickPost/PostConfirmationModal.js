import React from 'react'; 

const PostConfirmationModal = ({
  isVisible,
  title,
  description,
  confirmButtonText,
  isProcessingText,
  isProcessing,
  onConfirm,
  onClose,
}) => {

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white lg:w-1/3 w-11/12 flex flex-col p-4 rounded-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-md mt-2 text-center mb-4">{title}</h2>
        <p className="text-center text-base text-gray-600">{description}</p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="global-button-secondary text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`global-button-primary flex ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isProcessing}
          >
          {confirmButtonText}
          </button>
        </div>  
      </div>
    </div>
  );
};

export default PostConfirmationModal;
