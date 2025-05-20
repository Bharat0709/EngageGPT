import React, { useState, useEffect } from 'react';
import { FiX, FiMail, FiSend } from 'react-icons/fi';

const ContactModal = ({ isOpen, onClose, post, onSend, isContacting }) => {
  const [emailContent, setEmailContent] = useState('');
  const [recipient, setRecipient] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('');

  useEffect(() => {
    if (post && post.emailAddresses && post.emailAddresses.length > 0) {
      setRecipient(post.emailAddresses[0]);
      
      // Generate default email template based on job role and post content
      const jobRole = post.jobRole || 'this position';
      const template = `Hello,

I noticed your post about ${jobRole} and I'm interested in learning more about this opportunity. I have experience in this field and believe I could be a good fit for your team.

Could you please share more details about the role, including the requirements and application process?

Thank you,
[Your Name]`;
      
      setEmailTemplate(template);
      setEmailContent(template);
    }
  }, [post]);

  const handleSend = () => {
    if (!emailContent.trim()) return;
    onSend(post._id, emailContent);
  };

  const resetTemplateContent = () => {
    setEmailContent(emailTemplate);
  };

  if (!isOpen || !post) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col p-6 rounded-xl max-h-[90vh] overflow-y-auto w-full lg:w-1/2 md:w-2/3 sm:w-5/6 max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 text-xl hover:text-gray-800"
          onClick={onClose}
        >
          <FiX />
        </button>
        
        <h2 className="text-xl text-center font-semibold mb-6 flex items-center justify-center gap-2">
          <FiMail className="text-blue-600" />
          Contact Hiring Manager
        </h2>
        
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-700">To:</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm bg-blue-50 px-2 py-1 rounded flex items-center gap-1">
                <FiMail size={12} className="text-blue-600" />
                {recipient}
              </span>
            </div>
            
            <p className="text-sm font-medium text-gray-700">About:</p>
            <p className="text-sm mb-3">
              {post.jobRole ? `Position: ${post.jobRole}` : 'Hiring opportunity'} from {post.author}
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Your Message:</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 resize-none text-sm"
            rows="12"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Introduce yourself and express interest in the position..."
          />
          
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={resetTemplateContent}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Reset to template
            </button>
          </div>
        </div>
        
        <div className="flex justify-end mt-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={isContacting || !emailContent.trim()}
            className={`px-4 py-2 rounded-lg global-button-primary flex items-center gap-2 ${
              isContacting || !emailContent.trim() ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isContacting ? 'Sending...' : 'Send Email'}
            <FiSend size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;