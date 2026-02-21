import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';

const ConnectionInfoModal = ({ isOpen, onClose }) => {
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div
        ref={modalRef}
        className="bg-white flex flex-col lg:max-w-lg w-11/12 max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-300 ease-in-out animate-fadeIn"
      >
        {/* Header */}
        <div className="bg-blue-50 rounded-t-3xl p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#004182] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <h2 className="text-lg ovo-regular lg:text-xl mb-0 p-0 font-bold text-blue-900">
                Profile Added & Invite Sent
              </h2>
            </div>
            <button
              className="text-gray-500  hover:text-gray-800 hover:bg-blue-100 p-2 rounded-full transition-colors"
              onClick={onClose}
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 scrollbar-hide">
          <div className="text-gray-700 geist leading-relaxed whitespace-pre-wrap text-md">
            A Connection Token has been sent to your mail.
            <br />
            <br />
            You can check your mail to get the connection token or scroll down
            on this screen to find the connection token as well.
            <br />
            <br />
            You can now proceed to install the EngageGPT Extension
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 pt-0">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-[#004182] text-white font-medium rounded-full hover:bg-[#003366] transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ConnectionInfoModal;
