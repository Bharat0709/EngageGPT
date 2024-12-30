import React, { useState } from 'react';
import { message } from 'antd';
import { sendHelpMail } from '../../../network/Organization';

const HelpModal = ({ isVisible, onClose }) => {
  const [helpQuery, setHelpQuery] = useState('');

  const handleSubmit = async () => {
    if (!helpQuery) {
      message.info('Please describe your issue before submitting.');
      return;
    }

    try {
      await sendHelpMail(helpQuery);
      message.success(`Help Query Submitted`);
      setHelpQuery('');
      onClose();
    } catch (error) {
      message.error('An error occurred while submitting your help request.');
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col p-6 rounded-xl lg:w-1/2 w-11/12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl text-center mt-2 mb-4">
          How can we assist you?
        </h2>
        <textarea
          rows="4"
          className="w-full border border-gray-300 rounded-xl p-2 mb-4"
          placeholder="Describe your issue..."
          value={helpQuery}
          onChange={(e) => setHelpQuery(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="global-button-secondary"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="global-button-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
