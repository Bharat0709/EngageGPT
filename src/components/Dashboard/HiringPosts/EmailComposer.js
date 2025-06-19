import React, { useState, useRef, useEffect } from 'react';
import { 
  FiMail, 
  FiPaperclip, 
  FiSend, 
  FiClock, 
  FiX, 
  FiEdit3,
  FiCode,
  FiEye,
  FiCalendar,
  FiUser,
  FiType,
  FiFileText
} from 'react-icons/fi';

// Sample templates data
const sampleTemplates = [
  {
    id: 1,
    name: "Job Application Follow-up",
    type: "html",
    subject: "Following up on my application for {position}",
    content: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <p>Dear {recipient_name},</p>
      <p>I hope this email finds you well. I wanted to follow up on my application for the <strong>{position}</strong> position at {company_name}.</p>
      <p>I submitted my application on {application_date} and I'm very excited about the opportunity to contribute to your team.</p>
      <p>I would appreciate any updates you might have regarding the hiring process timeline.</p>
      <p>Thank you for your time and consideration.</p>
      <p>Best regards,<br>{your_name}</p>
    </div>`
  },
  {
    id: 2,
    name: "Cold Outreach",
    type: "text",
    subject: "Collaboration opportunity - {your_name}",
    content: `Hi {recipient_name},

I came across your profile and was impressed by your work in {field/industry}.

I'm {your_name}, and I work as {your_position} at {your_company}. I'd love to explore potential collaboration opportunities between our teams.

Would you be available for a brief call next week to discuss this further?

Looking forward to hearing from you.

Best regards,
{your_name}
{your_contact}`
  },
  {
    id: 3,
    name: "Thank You Note",
    type: "html",
    subject: "Thank you for your time",
    content: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <p>Dear {recipient_name},</p>
      <p>Thank you for taking the time to speak with me about the <strong>{position}</strong> opportunity.</p>
      <p>I enjoyed our conversation about {discussion_topic} and I'm even more excited about the possibility of joining your team.</p>
      <p>Please let me know if you need any additional information from me.</p>
      <p>I look forward to hearing about the next steps.</p>
      <p>Best regards,<br>{your_name}</p>
    </div>`
  },
  {
    id: 4,
    name: "Meeting Request",
    type: "text",
    subject: "Meeting request - {meeting_topic}",
    content: `Hello {recipient_name},

I hope you're doing well.

I would like to schedule a meeting to discuss {meeting_topic}. 

Are you available for a {duration} meeting sometime next week? I'm flexible with timing and can accommodate your schedule.

Please let me know what works best for you.

Thanks,
{your_name}`
  }
];

const EmailComposer = ({ isOpen, onClose, initialEmail = "" }) => {
  const [step, setStep] = useState('template'); // 'template' or 'compose'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Email data
  const [emailData, setEmailData] = useState({
    to: initialEmail,
    subject: '',
    content: '',
    attachments: []
  });
  
  // Scheduling
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  
  // UI states
  const [isSending, setIsSending] = useState(false);
  const [isSchedulingSend, setIsSchedulingSend] = useState(false);
  
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Get user's timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    if (initialEmail) {
      setEmailData(prev => ({ ...prev, to: initialEmail }));
    }
  }, [initialEmail]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setEmailData(prev => ({
      ...prev,
      subject: template.subject,
      content: template.content
    }));
    setIsHtmlMode(template.type === 'html');
    setStep('compose');
  };

  const handleFileAttachment = (event) => {
    const files = Array.from(event.target.files);
    setEmailData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setEmailData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSendNow = async () => {
    setIsSending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Sending email:', emailData);
      alert('Email sent successfully!');
      onClose();
    } catch (error) {
      alert('Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  const handleScheduleSend = async () => {
    if (!scheduleDate || !scheduleTime) {
      alert('Please select both date and time for scheduling');
      return;
    }
    
    setIsSchedulingSend(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      console.log('Scheduling email for:', scheduledDateTime, 'in timezone:', userTimezone);
      console.log('Email data:', emailData);
      alert(`Email scheduled for ${scheduledDateTime.toLocaleString()} (${userTimezone})`);
      onClose();
    } catch (error) {
      alert('Failed to schedule email');
    } finally {
      setIsSchedulingSend(false);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [emailData.content]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FiMail className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold">
              {step === 'template' ? 'Choose Email Template' : 'Compose Email'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Template Selection Step */}
        {step === 'template' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Select a template to get started</h3>
              <p className="text-sm text-gray-600">You can customize the template after selection</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleTemplates.map((template) => (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                      template.type === 'html' 
                        ? 'bg-orange-100 text-orange-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {template.type === 'html' ? <FiCode size={10} /> : <FiType size={10} />}
                      {template.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Subject: {template.subject}</p>
                  <p className="text-xs text-gray-500 line-clamp-3">
                    {template.type === 'html' 
                      ? template.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
                      : template.content.substring(0, 100) + '...'
                    }
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setStep('compose');
                  setEmailData(prev => ({ ...prev, subject: '', content: '' }));
                }}
                className="btn-primary flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-black text-black transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <FiEdit3 size={16} />
                Start from scratch
              </button>
            </div>
          </div>
        )}

        {/* Compose Step */}
        {step === 'compose' && (
          <div className="p-6">
            {/* Back button */}
            <button
              onClick={() => setStep('template')}
              className="text-sm text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-1"
            >
              ← Back to templates
            </button>

            {/* Recipient */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To:
              </label>
              <div className="flex items-center gap-2">
                <FiUser size={16} className="text-gray-400" />
                <input
                  type="email"
                  value={emailData.to}
                  onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                  placeholder="recipient@example.com"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject:
              </label>
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter email subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Content Mode Toggle */}
            {selectedTemplate && (
              <div className="mb-4 flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Content Mode:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsHtmlMode(false);
                      setPreviewMode(false);
                    }}
                    className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
                      !isHtmlMode ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <FiType size={12} />
                    Text
                  </button>
                  <button
                    onClick={() => {
                      setIsHtmlMode(true);
                      setPreviewMode(false);
                    }}
                    className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
                      isHtmlMode && !previewMode ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <FiCode size={12} />
                    HTML
                  </button>
                  {isHtmlMode && (
                    <button
                      onClick={() => setPreviewMode(!previewMode)}
                      className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
                        previewMode ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <FiEye size={12} />
                      Preview
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Content Editor */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isHtmlMode ? 'HTML Content:' : 'Message:'}
              </label>
              
              {previewMode && isHtmlMode ? (
                <div className="border border-gray-300 rounded-lg p-4 min-h-[200px] bg-gray-50">
                  <div dangerouslySetInnerHTML={{ __html: emailData.content }} />
                </div>
              ) : (
                <textarea
                  ref={textareaRef}
                  value={emailData.content}
                  onChange={(e) => {
                    setEmailData(prev => ({ ...prev, content: e.target.value }));
                    adjustTextareaHeight();
                  }}
                  placeholder={isHtmlMode ? 'Enter HTML content...' : 'Enter your message...'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                  style={{ minHeight: '200px' }}
                />
              )}
            </div>

            {/* Template Variables Help */}
            {selectedTemplate && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 font-medium mb-1">Template Variables:</p>
                <p className="text-xs text-blue-600">
                  Use variables like {'{recipient_name}'}, {'{position}'}, {'{company_name}'}, {'{your_name}'} in your content. 
                  Replace them with actual values before sending.
                </p>
              </div>
            )}

            {/* Attachments */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments:
              </label>
              <div className="flex items-center gap-4 mb-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <FiPaperclip size={16} />
                  Attach Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileAttachment}
                  className="hidden"
                />
              </div>
              
              {emailData.attachments.length > 0 && (
                <div className="space-y-2">
                  {emailData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FiFileText size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Scheduling Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  id="schedule"
                  checked={isScheduling}
                  onChange={(e) => setIsScheduling(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="schedule" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiClock size={16} />
                  Schedule this email
                </label>
              </div>
              
              {isScheduling && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time:</label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <FiCalendar size={12} />
                      Timezone: {userTimezone}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleSendNow}
                disabled={isSending || !emailData.to || !emailData.subject}
                className="btn-primary flex items-center gap-2 px-6 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                <FiSend size={16} />
                {isSending ? 'Sending...' : 'Send Now'}
              </button>
              
              {isScheduling && (
                <button
                  onClick={handleScheduleSend}
                  disabled={isSchedulingSend || !emailData.to || !emailData.subject || !scheduleDate || !scheduleTime}
                  className="btn-primary flex items-center gap-2 px-6 py-2 text-sm font-medium bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
                >
                  <FiClock size={16} />
                  {isSchedulingSend ? 'Scheduling...' : 'Schedule Send'}
                </button>
              )}
              
              <button
                onClick={onClose}
                className="btn-secondary flex items-center gap-2 px-6 py-2 text-sm font-medium bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Demo component to show the email composer in action
const EmailComposerDemo = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');

  const sampleEmails = [
    'john.doe@example.com',
    'jane.smith@company.com',
    'hr@startup.com',
    'recruiter@techcorp.com'
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Email Composer Demo</h1>
        
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Test the Email Composer</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select an email to compose to:
            </label>
            <select
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose an email...</option>
              {sampleEmails.map((email) => (
                <option key={email} value={email}>{email}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => setIsComposerOpen(true)}
            className="btn-primary flex items-center gap-2 px-6 py-2 text-sm font-medium bg-white border border-black text-black transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            <FiMail size={16} />
            Open Email Composer
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-md font-semibold mb-3">Features Included:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Template selection with HTML and Text options</li>
            <li>• Rich content editing with HTML preview</li>
            <li>• File attachment support</li>
            <li>• Email scheduling with timezone display</li>
            <li>• Template variables for personalization</li>
            <li>• Responsive design matching your existing component style</li>
          </ul>
        </div>
      </div>
      
      <EmailComposer
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        initialEmail={selectedEmail}
      />
    </div>
  );
};

export default EmailComposer;