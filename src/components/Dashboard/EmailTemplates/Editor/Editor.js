import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import Button from '@components/Common/Button';
import { Icons } from '@utils/constantData/icons';
import { CustomSingleSelect } from '@components/Common/CustomSelect';
import { useNotifications } from '@components/Common/Notification';

const categories = [
  {
    value: 'outreach',
    label: 'Outreach',
    color: 'bg-blue-100 text-blue-800',
    icon: '📧',
  },
  {
    value: 'follow_up',
    label: 'Follow Up',
    color: 'bg-green-100 text-green-800',
    icon: '🔄',
  },
  {
    value: 'introduction',
    label: 'Introduction',
    color: 'bg-purple-100 text-purple-800',
    icon: '👋',
  },
  {
    value: 'networking',
    label: 'Networking',
    color: 'bg-orange-100 text-orange-800',
    icon: '🤝',
  },
  {
    value: 'cold_email',
    label: 'Cold Email',
    color: 'bg-cyan-100 text-cyan-800',
    icon: '❄️',
  },
  {
    value: 'meeting_request',
    label: 'Meeting Request',
    color: 'bg-indigo-100 text-indigo-800',
    icon: '📅',
  },
  {
    value: 'thank_you',
    label: 'Thank You',
    color: 'bg-pink-100 text-pink-800',
    icon: '💝',
  },
  {
    value: 'proposal',
    label: 'Proposal',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '📋',
  },
  {
    value: 'custom',
    label: 'Custom',
    color: 'bg-gray-100 text-gray-800',
    icon: '⚙️',
  },
];

const Editor = ({
  handleFormSubmit,
  formData,
  setFormData,
  selectedTemplate,
  loading,
}) => {
  const [placeholderInput, setPlaceholderInput] = useState('');
  const [showPlaceholderHelp, setShowPlaceholderHelp] = useState(false);
  const message = useNotifications();

  const addPlaceholder = () => {
    if (
      placeholderInput.trim() &&
      !formData.placeholders?.includes(placeholderInput.trim()) &&
      (formData.placeholders?.length || 0) < 20
    ) {
      setFormData((prev) => ({
        ...prev,
        placeholders: [...(prev.placeholders || []), placeholderInput.trim()],
      }));
      setPlaceholderInput('');
    }
  };

  const detectPlaceholders = () => {
    if (!formData.templateBody) {
      message.error('TPlease enter content to detect placeholders.');
      return;
    }

    const content = formData.templateBody;
    const detectedPlaceholders = new Set();

    // Method 1: Double curly braces {{placeholder}}
    const curlyMatches = content.match(/\{\{([^}]+)\}\}/g);
    if (curlyMatches) {
      curlyMatches.forEach((match) => {
        detectedPlaceholders.add(match.trim()); // Keep full {{placeholder}}
      });
    }

    // Method 2: Square brackets [placeholder]
    const bracketMatches = content.match(/\[([^\]]+)\]/g);
    if (bracketMatches) {
      bracketMatches.forEach((match) => {
        const inner = match.replace(/[\[\]]/g, '').trim();
        if (!inner.includes('http') && !inner.includes('mailto')) {
          detectedPlaceholders.add(match.trim()); // Keep full [placeholder]
        }
      });
    }

    // Update placeholders array
    const newPlaceholders = Array.from(detectedPlaceholders);
    setFormData((prev) => ({
      ...prev,
      placeholders: [
        ...new Set([...(prev.placeholders || []), ...newPlaceholders]),
      ],
    }));

    // Show notification
    if (newPlaceholders.length > 0) {
      message.success(`${newPlaceholders.length} Placeholder Detected`);
    } else {
      message.info('No placeholders detected in the content.');
    }
  };

  const removePlaceholder = (placeholder) => {
    setFormData({
      ...formData,
      placeholders:
        formData.placeholders?.filter((p) => p !== placeholder) || [],
    });
  };

  return (
    <div className="flex h-full lg:flex-row flex-col-reverse lg:overflow-y-scroll scrollbar-hide p-2 rounded-tl-2xl rounded-bl-2xl bg-gray-50">
      {/* Left Sidebar - Form */}
      <div className="lg:w-1/3 w-full h-full rounded-tl-2xl rounded-bl-2xl  bg-white backdrop-blur-sm lg:p-6 p-4 lg:overflow-y-scroll scrollbar-hide">
        <div className="space-y-4">
          {/* Header */}
          {/* <div className="flex items-center justify-between">
            <div>
              <h2 className="text-md ovo-regular m-0 p-0 font-semibold text-gray-900">
                {selectedTemplate ? 'Edit Template' : 'Create Template'}
              </h2>
            </div>
          </div> */}

          <div className="space-y-6">
            {/* Template Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Template Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  maxLength={50}
                  className="w-full px-4 pr-14 py-2 text-sm border border-gray-300 rounded-full focus:outline-none  transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white"
                  placeholder="Enter template name..."
                  required
                />
                <div className="absolute right-3 top-3 text-xs bg-white text-gray-300">
                  {formData.name.length}/50
                </div>
              </div>
            </div>

            {/* Subject Line */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Subject Line
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 pr-14 py-2 text-sm border border-gray-300 rounded-full focus:outline-none  transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white"
                  placeholder="Enter email subject line..."
                  required
                  maxLength={100}
                />
                <div className="absolute right-3 top-3 text-xs text-gray-300">
                  {formData.subject.length}/100
                </div>
              </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <CustomSingleSelect
                label="Category"
                options={categories.map((cat) => ({
                  value: cat.value,
                  label: `${cat.icon} ${cat.label}`,
                }))}
                selectedValue={formData.category}
                onChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                placeholder="Select category..."
                className=""
              />
            </div>

            {/* Template Type Toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Template Type
              </label>
              <div className="flex p-1 bg-gray-100 rounded-full">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, templateType: 'html' })
                  }
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                    formData.templateType === 'html'
                      ? 'bg-white text-black'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icons.Code className="w-4 h-4" />
                  <span>HTML</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, templateType: 'text' })
                  }
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                    formData.templateType === 'text'
                      ? 'bg-white text-black'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icons.Document className="w-4 h-4" />
                  <span>Text</span>
                </button>
              </div>
            </div>

            {/* Placeholders Management */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-gray-800">
                  Placeholders ({formData.placeholders?.length || 0}/20)
                  <button
                    type="button"
                    onClick={() => setShowPlaceholderHelp(!showPlaceholderHelp)}
                    className="p-1 text-sm text-gray-300 hover:text-gray-600 transition-colors"
                  >
                    <Icons.Info className="w-4 h-4" />
                  </button>
                </label>

                {formData.templateBody && formData.templateBody.trim() && (
                  <button
                    onClick={detectPlaceholders}
                    className="flex items-center space-x-1 px-3 py-1.5 text-xs rounded-full bg-green-50 border border-green-200 hover:bg-green-100 transition-colors text-green-700"
                    title="Auto-detect placeholders in content"
                  >
                    <Icons.Search className="w-3 h-3" />
                    <span>Auto Detect</span>
                  </button>
                )}
              </div>

              {showPlaceholderHelp && (
                <div className="p-3 bg-gray-50 border border-blue-200 rounded-lg text-xs text-black">
                  Placeholders will be replaced with actual values when sending
                  emails. Maximum 20 placeholders allowed.
                </div>
              )}

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={placeholderInput}
                  onChange={(e) => setPlaceholderInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), addPlaceholder())
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none text-sm"
                  placeholder="Add placeholder..."
                  disabled={formData.placeholders?.length >= 20}
                />
                <button
                  type="button"
                  onClick={addPlaceholder}
                  disabled={formData.placeholders?.length >= 20}
                  className="px-3 py-2 bg-black text-white rounded-full transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Icons.Plus className="w-4 h-4" />
                </button>
              </div>

              {formData.placeholders?.length >= 20 && (
                <p className="text-xs text-red-600">
                  Maximum of 20 placeholders reached. Remove some to add new
                  ones.
                </p>
              )}

              {formData.placeholders && formData.placeholders.length > 0 && (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {formData.placeholders.map((placeholder, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 bg-slate-50 text-black px-3 py-1 rounded-full text-sm group cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        <span>{placeholder}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePlaceholder(placeholder);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Icons.Cross className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 ">
              <Button
                theme="dark"
                buttonText={` ${
                  selectedTemplate ? 'Update' : 'Create'
                } Template`}
                loading={loading}
                loadingText="Saving..."
                onClick={(e) => {
                  e.preventDefault();
                  handleFormSubmit(e);
                }}
                className="!rounded-full !text-center !items-center !justify-center  w-full mx-auto transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="bg-white w-full lg:w-2/3 rounded-tr-2xl rounded-br-2xl flex-col">
        <CodeEditor formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};

export default Editor;
