import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { message } from 'antd';
import { sendFeeback } from '../../../network/Organization';

const FeedbackModal = ({ isVisible, onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

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

    setLoading(true); // Set loading to true
    try {
      await sendFeeback(feedback, rating);
      message.success(`Thank you for your feedback`);
      setRating(0);
      setFeedback('');
      onClose();
    } catch (error) {
      message.error('An error occurred while submitting your feedback.');
    } finally {
      setLoading(false); // Reset loading state
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
        <button
          className="text-gray-500 text-xl self-end hover:text-gray-800"
          onClick={onClose}
          disabled={loading} // Disable close button during loading
        >
          <FiX />
        </button>
        <h2 className="text-xl text-center mb-2">We value your feedback</h2>
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => handleRatingHover(star)}
              onClick={() => setRating(star)}
              className={`text-4xl ${
                star <= rating ? 'text-yellow-500' : 'text-gray-300'
              }`}
              disabled={loading} 
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          rows="4"
          className="w-full border border-gray-300 rounded-xl p-2 mb-4"
          placeholder="Let us know what you think..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={loading} // Disable textarea during loading
        ></textarea>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className={`global-button-secondary ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading} 
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleFeedbackSubmit}
            className={`global-button-primary ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading} 
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
