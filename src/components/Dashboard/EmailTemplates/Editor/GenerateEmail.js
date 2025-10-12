import { useState } from 'react';
import { Icons } from '@utils/constantData/icons';
import Button from '@components/Common/Button';
import { generateEmailTemplate } from '@services/GenerateContent';
import { useNotifications } from '@components/Common/Notification';

const GenerateEmail = ({ isOpen, onClose, onGenerate }) => {
  const [generateFormat, setGenerateFormat] = useState('formal');
  const [templateType, setTemplateType] = useState('html');
  const [generatePrompt, setGeneratePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const message = useNotifications();

  const formatOptions = [
    { value: 'formal', label: 'Formal', icon: '💼' },
    { value: 'informal', label: 'Friendly', icon: '😊' },
    { value: 'persuasive', label: 'Sales Focused', icon: '🎯' },
    { value: 'personal', label: 'Personal Touch', icon: '✨' },
  ];

  const handleGenerate = async () => {
    if (!generatePrompt) {
      message.info('Additional Instructions are required');
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateEmailTemplate(
        generateFormat,
        templateType,
        generatePrompt,
        'gemini',
      );
      onGenerate?.(result.data.generatedEmailTemplate);
      onClose();
    } catch (error) {
      message.error(
        error.message || 'Failed to generate email. Please try again.',
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseModal = () => {
    setGenerateFormat('formal');
    setTemplateType('html');
    setGeneratePrompt('');
    setIsGenerating(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[60] flex items-center justify-center">
      <div className="bg-white rounded-3xl  p-6 min-w-xl max-w-2xl  mx-4 scrollbar-hide h-[80vh] lg:h-fit overflow-y-auto">
        <div className="scrollbar-hide max-h-[70vh] relative">
          <div className="flex items-center flex-col max-w-5xl justify-center scrollbar-hide gap-3 mb-6">
            <div className="flex items-center flex-col justify-center h-12 w-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 shadow-sm">
              <Icons.Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-lg m-0 text-center font-semibold text-gray-900">
                Generate Email with AI{' '}
              </h3>
              <span className="px-4 text-center text-xs py-2 border border-black rounded-full ">
                {' '}
                Free Forever - No Credits Deducted
              </span>
            </div>
          </div>

          {/* Format Selection */}
          <div className="space-y-4 mb-6">
            <label className="lg:block hidden text-xs font-medium text-gray-700 text-center">
              Choose Email Style
            </label>
            <div className="flex flex-wrap gap-3 justify-center">
              {formatOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setGenerateFormat(option.value)}
                  className={`flex items-center justify-center text-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                    generateFormat === option.value
                      ? 'border-purple-500 bg-purple-50 shadow-sm'
                      : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      generateFormat === option.value
                        ? 'text-purple-700'
                        : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </span>
                  {generateFormat === option.value && (
                    <Icons.Check className="h-4 w-4 text-purple-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Template Format Selection - ADDED THIS SECTION */}
          <div className="space-y-4 mb-4">
            <div className="flex justify-center">
              <div className="relative p-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full">
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setTemplateType('html')}
                    className={`flex items-center justify-center space-x-2 py-2 px-6 rounded-full text-sm font-semibold transition-all duration-300 ${
                      templateType === 'html'
                        ? 'bg-white text-green-700 transform scale-105'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icons.Code className="w-4 h-4" />
                    <span className="text-xs">HTML</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemplateType('text')}
                    className={`flex items-center justify-center space-x-2 py-2 px-6 rounded-full text-sm font-semibold transition-all duration-300 ${
                      templateType === 'text'
                        ? 'bg-white text-green-700 transform scale-105'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icons.Document className="w-4 h-4" />
                    <span className="text-xs">Text</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Instructions */}
          <div className="space-y-2 ">
            <label className="block text-sm font-medium text-gray-700">
              Additional Instructions*
              <span className="text-xs text-gray-500 font-normal ml-2">
                (Be specific for better results)
              </span>
            </label>
            <div className="relative">
              <textarea
                value={generatePrompt}
                onChange={(e) => setGeneratePrompt(e.target.value)}
                placeholder="e.g., Focus on collaboration opportunities, mention our SaaS product, keep it under 150 words, include a call-to-action..."
                className="w-full scrollbar-hide px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 resize-none transition-all duration-200 bg-white/80 backdrop-blur-sm text-sm"
                rows="4"
                maxLength={500}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {generatePrompt.length}/500
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-2 justify-end">
            <Button
              onClick={handleCloseModal}
              theme="light"
              buttonText="Cancel"
              className="rounded-full border-none px-6 py-2 text-sm font-medium"
            />
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              loadingText="Generating..."
              isLoading={isGenerating}
              theme="dark"
              buttonText="Generate Email"
              className="px-6 py-2 text-sm font-medium !rounded-full text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              icon={<Icons.Sparkles className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateEmail;
