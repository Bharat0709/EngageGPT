import { useState, useEffect } from 'react';
import {
  MdMail as Mail,
  MdSettings as Settings,
  MdDescription as FileText,
  MdSend as Send,
  MdHistory as History,
  MdAdd as Plus,
  MdEdit as Edit,
  MdDelete as Trash2,
  MdVpnKey as Key,
  MdLock as Lock,
  MdCheckCircle as CheckCircle,
  MdPerson as User,
  MdBusiness as Building,
  MdGroup as Users,
  MdWork as Briefcase,
  MdClose as X,
  MdSave as Save,
  MdContentCopy as Copy,
} from 'react-icons/md';

// Mock API functions (replace with actual API calls)
const mockAPI = {
  generateApiKey: async (appPassword) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { apiKey: 'sk-' + Math.random().toString(36).substr(2, 32) };
  },
  saveTemplate: async (template) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { id: Date.now(), ...template };
  },
  getTemplates: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        name: 'Cold Outreach',
        format: 'html',
        content:
          "Hi {{recipientName}}, I'm {{yourName}} from {{companyName}}...",
        placeholders: ['recipientName', 'yourName', 'companyName'],
      },
    ];
  },
  sendEmail: async (emailData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { success: true, messageId: 'msg_' + Date.now() };
  },
  getEmailHistory: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        to: 'john@example.com',
        subject: 'Cold Outreach',
        status: 'sent',
        sentAt: new Date().toISOString(),
      },
    ];
  },
};

const EmailManagementSystem = () => {
  const [currentStep, setCurrentStep] = useState('setup'); // setup, templates, send, history
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [templates, setTemplates] = useState([]);
  const [emailHistory, setEmailHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Setup Component
  const EmailSetup = () => {
    const [appPassword, setAppPassword] = useState('');
    const [showInstructions, setShowInstructions] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateApiKey = async () => {
      if (!appPassword.trim()) {
        alert('Please enter your app password');
        return;
      }

      setIsGenerating(true);
      try {
        const response = await mockAPI.generateApiKey(appPassword);
        setApiKey(response.apiKey);
        setIsConnected(true);
        alert('API Key generated successfully!');
      } catch (error) {
        alert('Failed to generate API key');
      } finally {
        setIsGenerating(false);
      }
    };

    const AppPasswordInstructions = () => (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-blue-800 mb-2">
          How to Create an App Password:
        </h3>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>Go to your email provider's account settings</li>
          <li>Navigate to Security settings</li>
          <li>Find "App Passwords" or "Application-specific passwords"</li>
          <li>Generate a new app password for "Mail"</li>
          <li>Copy the generated password and paste it below</li>
        </ol>
        <div className="mt-2 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
          <strong>Note:</strong> You may need to enable 2-factor authentication
          first
        </div>
      </div>
    );

    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-gray-900">Email Setup</h2>
          <p className="text-gray-600">Connect your email to start sending</p>
        </div>

        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full mb-4 text-blue-600 hover:text-blue-800 text-sm underline"
        >
          {showInstructions ? 'Hide' : 'Show'} App Password Instructions
        </button>

        {showInstructions && <AppPasswordInstructions />}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email App Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={appPassword}
                onChange={(e) => setAppPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your app password"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateApiKey}
            disabled={isGenerating}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Generating...
              </>
            ) : (
              <>
                <Key className="w-4 h-4" />
                Generate API Key
              </>
            )}
          </button>

          {apiKey && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-800 font-medium">
                  API Key Generated
                </span>
              </div>
              <div className="bg-white p-2 rounded border text-xs font-mono break-all">
                {apiKey}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(apiKey)}
                className="mt-2 text-xs text-green-600 hover:text-green-800 flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                Copy to clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Template Management Component
  const TemplateManager = () => {
    const [showCreateForm, setShowCreateForm] = useState(true);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [newTemplate, setNewTemplate] = useState({
      name: '',
      format: 'text',
      content: '',
      placeholders: [],
    });

    // useEffect(() => {
    //   // loadTemplates();
    // }, []);

    // const loadTemplates = async () => {
    //   setLoading(true);
    //   try {
    //     const data = await mockAPI.getTemplates();
    //     setTemplates(data);
    //   } catch (error) {
    //     alert('Failed to load templates');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const detectPlaceholders = (content) => {
      const matches = content.match(/\{\{([^}]+)\}\}/g);
      return matches ? matches.map((match) => match.slice(2, -2)) : [];
    };

    const handleSaveTemplate = async () => {
      if (!newTemplate.name || !newTemplate.content) {
        alert('Please fill in all required fields');
        return;
      }

      const placeholders = detectPlaceholders(newTemplate.content);
      const templateToSave = { ...newTemplate, placeholders };

      setLoading(true);
      try {
        const savedTemplate = await mockAPI.saveTemplate(templateToSave);
        if (editingTemplate) {
          setTemplates(
            templates.map((t) =>
              t.id === editingTemplate.id ? savedTemplate : t,
            ),
          );
        } else {
          setTemplates([...templates, savedTemplate]);
        }
        setShowCreateForm(false);
        setEditingTemplate(null);
        setNewTemplate({
          name: '',
          format: 'text',
          content: '',
          placeholders: [],
        });
        alert('Template saved successfully!');
      } catch (error) {
        alert('Failed to save template');
      } finally {
        setLoading(false);
      }
    };

    const handleEditTemplate = (template) => {
      setNewTemplate(template);
      setEditingTemplate(template);
      setShowCreateForm(true);
    };

    const handleDeleteTemplate = (templateId) => {
      if (alert('Are you sure you want to delete this template?')) {
        setTemplates(templates.filter((t) => t.id !== templateId));
      }
    };

    const CommonPlaceholders = () => {
      const commonPlaceholders = [
        { key: 'recipientName', label: 'Recipient Name', icon: User },
        { key: 'companyName', label: 'Company Name', icon: Building },
        { key: 'yourName', label: 'Your Name', icon: User },
        { key: 'position', label: 'Position', icon: Briefcase },
        { key: 'skills', label: 'Skills', icon: Users },
      ];

      const insertPlaceholder = (key) => {
        const placeholder = `{{${key}}}`;
        setNewTemplate((prev) => ({
          ...prev,
          content: prev.content + placeholder,
        }));
      };

      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Common Placeholders
          </label>
          <div className="flex flex-wrap gap-2">
            {commonPlaceholders.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => insertPlaceholder(key)}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200"
              >
                <Icon className="w-3 h-3" />
                {label}
              </button>
            ))}
          </div>
        </div>
      );
    };

    if (showCreateForm) {
      return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingTemplate ? 'Edit Template' : 'Create Template'}
            </h2>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setEditingTemplate(null);
                setNewTemplate({
                  name: '',
                  format: 'text',
                  content: '',
                  placeholders: [],
                });
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Name *
              </label>
              <input
                type="text"
                value={newTemplate.name}
                onChange={(e) =>
                  setNewTemplate((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Cold Outreach Template"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <select
                value={newTemplate.format}
                onChange={(e) =>
                  setNewTemplate((prev) => ({
                    ...prev,
                    format: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="text">Plain Text</option>
                <option value="html">HTML</option>
              </select>
            </div>

            <CommonPlaceholders />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Content *
              </label>
              <textarea
                value={newTemplate.content}
                onChange={(e) =>
                  setNewTemplate((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                rows={newTemplate.format === 'html' ? 12 : 8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder={
                  newTemplate.format === 'html'
                    ? `<html><body><h1>Hi {{recipientName}},</h1><p>I'm {{yourName}} from {{companyName}}...</p></body></html>`
                    : `Hi {{recipientName}},\n\nI'm {{yourName}} from {{companyName}}...`
                }
              />
            </div>

            {newTemplate.content && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Detected Placeholders:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {detectPlaceholders(newTemplate.content).map(
                    (placeholder, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {placeholder}
                      </span>
                    ),
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleSaveTemplate}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editingTemplate ? 'Update Template' : 'Save Template'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Email Templates</h2>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Template
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto"></div>
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No templates created yet</p>
            <p className="text-sm">
              Create your first email template to get started
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs uppercase">
                        {template.format}
                      </span>
                      {template.placeholders.length > 0 && (
                        <span className="text-xs text-gray-500">
                          {template.placeholders.length} placeholders
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {template.content.substring(0, 150)}...
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEditTemplate(template)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Email Sender Component
  const EmailSender = () => {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [emailData, setEmailData] = useState({
      to: '',
      subject: '',
      content: '',
    });
    const [placeholderValues, setPlaceholderValues] = useState({});
    const [isSending, setIsSending] = useState(false);

    const selectedTemplateData = templates.find(
      (t) => t.id === parseInt(selectedTemplate),
    );

    const handleSendEmail = async () => {
      if (!emailData.to || !emailData.subject || !emailData.content) {
        alert('Please fill in all fields');
        return;
      }

      setIsSending(true);
      try {
        await mockAPI.sendEmail(emailData);
        alert('Email sent successfully!');
        setEmailData({ to: '', subject: '', content: '' });
        setPlaceholderValues({});
      } catch (error) {
        alert('Failed to send email');
      } finally {
        setIsSending(false);
      }
    };

    const handleTemplateSelect = (templateId) => {
      setSelectedTemplate(templateId);
      const template = templates.find((t) => t.id === parseInt(templateId));
      if (template) {
        setEmailData((prev) => ({
          ...prev,
          content: template.content,
        }));
        // Reset placeholder values
        const initialPlaceholders = {};
        template.placeholders.forEach((placeholder) => {
          initialPlaceholders[placeholder] = '';
        });
        setPlaceholderValues(initialPlaceholders);
      }
    };

    const updateContentWithPlaceholders = () => {
      if (!selectedTemplateData) return;

      let updatedContent = selectedTemplateData.content;
      Object.entries(placeholderValues).forEach(([key, value]) => {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        updatedContent = updatedContent.replace(regex, value || `{{${key}}}`);
      });

      setEmailData((prev) => ({ ...prev, content: updatedContent }));
    };

    useEffect(() => {
      updateContentWithPlaceholders();
    }, [placeholderValues, selectedTemplateData]);

    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Email</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Template (Optional)
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => handleTemplateSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedTemplateData &&
              selectedTemplateData.placeholders.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">
                    Fill Placeholders:
                  </h4>
                  {selectedTemplateData.placeholders.map((placeholder) => (
                    <div key={placeholder}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {placeholder.charAt(0).toUpperCase() +
                          placeholder.slice(1)}
                      </label>
                      <input
                        type="text"
                        value={placeholderValues[placeholder] || ''}
                        onChange={(e) =>
                          setPlaceholderValues((prev) => ({
                            ...prev,
                            [placeholder]: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Enter ${placeholder}`}
                      />
                    </div>
                  ))}
                </div>
              )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To *
              </label>
              <input
                type="email"
                value={emailData.to}
                onChange={(e) =>
                  setEmailData((prev) => ({ ...prev, to: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="recipient@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) =>
                  setEmailData((prev) => ({ ...prev, subject: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email subject"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Content *
            </label>
            <textarea
              value={emailData.content}
              onChange={(e) =>
                setEmailData((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={15}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="Enter your email content here..."
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSendEmail}
            disabled={isSending}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isSending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Email
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Email History Component
  const EmailHistory = () => {
    useEffect(() => {
      loadEmailHistory();
    }, []);

    const loadEmailHistory = async () => {
      setLoading(true);
      try {
        const data = await mockAPI.getEmailHistory();
        setEmailHistory(data);
      } catch (error) {
        alert('Failed to load email history');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Email History</h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto"></div>
          </div>
        ) : emailHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <History className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No emails sent yet</p>
            <p className="text-sm">Your sent emails will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {emailHistory.map((email) => (
              <div
                key={email.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {email.subject}
                    </h3>
                    <p className="text-sm text-gray-600">To: {email.to}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        email.status === 'sent'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {email.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(email.sentAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Navigation
  const NavigationBar = () => (
    <div className="bg-white shadow-sm border-b mb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-gray-900">Email Management</h1>

          {isConnected && (
            <nav className="flex space-x-8">
              <button
                onClick={() => setCurrentStep('templates')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentStep === 'templates'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                Templates
              </button>

              <button
                onClick={() => setCurrentStep('send')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentStep === 'send'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Send className="w-4 h-4" />
                Send Email
              </button>

              <button
                onClick={() => setCurrentStep('history')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentStep === 'history'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <History className="w-4 h-4" />
                History
              </button>

              <button
                onClick={() => setCurrentStep('setup')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentStep === 'setup'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    if (!isConnected && currentStep !== 'setup') {
      return <EmailSetup />;
    }

    switch (currentStep) {
      case 'templates':
        return <TemplateManager />;
      case 'send':
        return <EmailSender />;
      case 'history':
        return <EmailHistory />;
      default:
        return <EmailSetup />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="container mx-auto px-4 py-6">{renderCurrentStep()}</div>
    </div>
  );
};

export default EmailManagementSystem;
