import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';

const InfoModal = ({ isOpen, onClose, title, content }) => {
  const modalRef = useRef(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle Escape key to close
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
        {/* Modal */}
        <div
          ref={modalRef}
          className="bg-white flex flex-col lg:max-w-lg w-11/12 max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-300 ease-in-out animate-fadeIn"
        >
          {/* Header */}
          <div className="bg-indigo-50 rounded-t-3xl p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <h2 className="text-lg lg:text-xl mb-0 p-0 font-bold text-indigo-800">
                  {title}
                </h2>
              </div>
              <button
                className="text-gray-500 hover:text-gray-800 hover:bg-indigo-100 p-2 rounded-full transition-colors"
                onClick={onClose}
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="p-6 overflow-y-auto flex-1 scrollbar-hide">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          </div>

          {/* Footer Button */}
          <div className="flex justify-end p-6 pt-0">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // Render modal using portal to document.body
  return createPortal(modalContent, document.body);
};

export default InfoModal;