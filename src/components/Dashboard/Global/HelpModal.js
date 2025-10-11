import { useState, useEffect } from 'react';
import { useNotifications } from '@components/Common/Notification';
import { FiX } from 'react-icons/fi';
import { sendHelpMail } from '@services/Organization';
import { IoLogoWhatsapp } from 'react-icons/io';
import EngageGPTLogo from '@assets/images/EngageGPTLogo.png';

const handleWhatsAppContact = () => {
  const WHATSAPP_NUMBER = `${process.env.REACT_APP_CONTACT_NUMBER}`;
  const usermessage = encodeURIComponent('Hi, I need help with your service.');
  const phoneNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);
  const whatsappUrl = isMobile
    ? `whatsapp://send?phone=${phoneNumber}&text=${usermessage}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${usermessage}`;
  window.open(whatsappUrl, '_blank');
};

const HelpModal = ({ isVisible, onClose }) => {
  const message = useNotifications();
  const [helpQuery, setHelpQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsAnimating(false);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose();
    }, 300);
  };

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
      handleClose();
    } catch (error) {
      message.error('An error occurred while submitting your help request.');
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 overflow-hidden bg-black bg-opacity-60 flex items-center justify-end p-4 backdrop-blur-sm z-50 transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-gradient-to-br from-sky-100 via-gray-100 to-blue-100 flex justify-between flex-col p-6 rounded-3xl lg:w-1/2 lg:h-[95vh] w-full relative transform transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 text-xl self-end hover:text-gray-800"
          onClick={handleClose}
          disabled={loading} // Disable close button during loading
        >
          <FiX />
        </button>
        <img
          src={EngageGPTLogo}
          alt="EngageGPT Logo"
          className="w-30 h-12 mx-auto mb-4"
        />
        <h1 className="lg:text-2xl text-lg text-center mt-2 mb-4">
          How can we assist you?
        </h1>
        <textarea
          rows="8"
          className="w-full p-3 focus:outline-none focus:ring-1 focus:ring-blue-200  rounded-xl mb-2"
          placeholder="Describe your issue here..."
          value={helpQuery}
          onChange={(e) => setHelpQuery(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-2">
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
