import React from 'react';
import { FiX } from 'react-icons/fi';

const MediaPreviewModal = ({ isOpen, onClose, media }) => {
  if (!isOpen || !media) return null;

  return (
    <div className="fixed  inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg h-3/4 scrollbar-hide overflow-y-scroll lg:w-1/2 w-11/12">
        <div className="flex bg-white justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Media Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          {media.type === 'image' ? (
            <img
              src={media.url}
              alt="Preview"
              className="max-w-full h-auto rounded-lg"
            />
          ) : media.type === 'video' ? (
            <video controls className="max-w-full h-auto rounded-lg">
              <source src={media.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MediaPreviewModal;
