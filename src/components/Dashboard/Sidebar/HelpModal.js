import React, { useState } from 'react';
import { message } from 'antd';
import { sendHelpMail } from '../../../network/Organization';
import { IoLogoWhatsapp } from 'react-icons/io';
const WHATSAPP_NUMBER = process.env.CONTACT_NUMBER;

const handleWhatsAppContact = () => {
  const message = encodeURIComponent('Hi, I need help with your service.');
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(
    /[^0-9]/g,
    '',
  )}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};

const HelpModal = ({ isVisible, onClose }) => {
  const [helpQuery, setHelpQuery] = useState('');
  const [loading, setLoading] = useState(false); // Loading state added

  const handleSubmit = async () => {
    if (!helpQuery) {
      message.info('Please describe your issue before submitting.');
      return;
    }

    setLoading(true); // Set loading to true before submission
    try {
      await sendHelpMail(helpQuery);
      message.success(`Help Query Submitted`);
      setHelpQuery('');
      onClose();
    } catch (error) {
      message.error('An error occurred while submitting your help request.');
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity z-50"
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
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className={`global-button-secondary rounded-full ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading} // Disable close button during loading
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={`global-button-primary rounded-full ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading} // Disable submit button during loading
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        <div className="flex items-center my-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* WhatsApp contact button */}
        <button
          className="w-full px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          onClick={handleWhatsAppContact}
        >
          <IoLogoWhatsapp size={20} />
          Contact Founder
        </button>
        <p className="text-xs text-center text-gray-500 mt-2">
          You can also reach us on WhatsApp for immediate assistance.
        </p>
      </div>
    </div>
  );
};

export default HelpModal;
