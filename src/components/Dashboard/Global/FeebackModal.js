import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useNotifications } from '@components/Common/Notification';
import { sendFeeback } from '@services/Organization';
import { IoLogoWhatsapp } from 'react-icons/io';
import EngageGPTLogo from '@assets/images/EngageGPTLogo.png';

const FeedbackModal = ({ isVisible, onClose }) => {
  const message = useNotifications();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
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

  const handleWhatsAppContact = () => {
    const WHATSAPP_NUMBER = `${process.env.REACT_APP_CONTACT_NUMBER}`;
    const message = encodeURIComponent(
      'Hi, I would like to share my feedback.\nRating: ⭐⭐⭐⭐⭐(5/5)\nMessage: Insert your message here.',
    );
    const phoneNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
    const isMobile = /iPhone|Android/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleRatingHover = (hoverIndex) => {
    setRating(hoverIndex);
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback) {
      message.info('Please provide feedback before submitting.');
      return;
    }

    if (!rating) {
      message.info('Please provide a rating before submitting.');
      return;
    }

    setLoading(true);
    try {
      await sendFeeback(feedback, rating);
      message.success(`Thank you for your feedback`);
      setRating(0);
      setFeedback('');
      handleClose();
    } catch (error) {
      message.error('An error occurred while submitting your feedback.');
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
        className={`bg-gradient-to-br from-sky-100 via-gray-100 to-blue-100 flex flex-col justify-between p-6 rounded-3xl lg:w-1/2 lg:h-[95vh] md:w-2/3 w-full max-w-2xl relative transform transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 text-xl self-end hover:text-gray-800 transition-colors"
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
        <h1 className="lg:text-2xl  ovo-regular text-center text-lg mb-2">
          We value your feedback
        </h1>
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => handleRatingHover(star)}
              onClick={() => setRating(star)}
              className={`text-3xl sm:text-4xl transition-all duration-200 hover:scale-110 ${
                star <= rating ? 'text-yellow-500' : 'text-gray-300'
              }`}
              disabled={loading}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          rows="8"
          className="w-full rounded-xl p-3 border mb-2 border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all duration-200 resize-none"
          placeholder="Let us know what you think..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={loading} // Disable textarea during loading
        ></textarea>
        <div className="flex justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={handleFeedbackSubmit}
            className={`global-button-primary rounded-full px-6 py-2 transition-all duration-200 transform hover:scale-105 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        <button
          className="w-full px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
          onClick={handleWhatsAppContact}
          disabled={loading}
        >
          <IoLogoWhatsapp size={20} />
          Contact Founder
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
