import { useState } from 'react';
import { message } from 'antd';
import { sendHelpMail } from '../../../network/Organization';
import { IoLogoWhatsapp } from 'react-icons/io';
import EngageGPTLogo from '../../../assets/images/EngageGPTLogo.png';

const handleWhatsAppContact = () => {
  const WHATSAPP_NUMBER = `${process.env.REACT_APP_CONTACT_NUMBER}`;
  const message = encodeURIComponent('Hi, I need help with your service.');
  const phoneNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);
  const whatsappUrl = isMobile
    ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
  window.open(whatsappUrl, '_blank');
};

const HelpModal = ({ isVisible, onClose }) => {
  const [helpQuery, setHelpQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!helpQuery) {
      message.info('Please describe your issue before submitting.');
      return;
    }

    setLoading(true);
    try {
      await sendHelpMail(helpQuery);
      message.success(`Help Query Submitted`);
      setHelpQuery('');
      onClose();
    } catch (error) {
      message.error('An error occurred while submitting your help request.');
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity z-50"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col p-6 rounded-3xl lg:w-1/2 w-11/12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={EngageGPTLogo}
          alt="EngageGPT Logo"
          className="w-30 h-12 mx-auto mb-4"
        />
        <h1 className="text-xl text-center mt-2 mb-4">
          How can we assist you?
        </h1>
        <textarea
          rows="4"
          className="w-full border border-gray-800 rounded-xl p-2 mb-4"
          placeholder="Describe your issue here..."
          value={helpQuery}
          onChange={(e) => setHelpQuery(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className={`global-button-secondary border-none rounded-full ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading} // Disable close button during loading
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={`global-button-primary px-6 rounded-full ${
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
