import React, { useState, useEffect, useRef } from 'react';
import { fetchOrganizationData, getCreditsLeft } from '@services/Organization';
import { generatePost } from '@services/GenerateContent';
import { creditsModalContent } from '../Global/AddCreditsContent';
import { useNotifications } from '@components/Common/Notification';
import {
  FaLinkedin,
  FaUser,
  FaRobot,
  FaArrowRight,
  FaCopy,
  FaRedo,
  FaThumbsUp,
  FaComment,
  FaRetweet,
  FaPaperPlane,
  FaGlobe,
  FaStar,
  FaExclamationTriangle,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import GeneratePostSkeletonLoading from '../SkeletonLoaders/GeneratePostSkeletonLoading';
import { goTo } from '@utils/navigator';
import { Icons } from '@utils/constantData/icons';
import InfoModal from '@components/Common/InfoModal';
import { CustomSingleSelect } from '@components/Common/CustomSelect';
import Button from '@components/Common/Button';
import UpgradeModal from '@components/Common/UpgradeModal';

const LinkedInPostGenerator = () => {
  const message = useNotifications();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState('');
  const [viewUpgradeModal, setViewUpgradeModal] = useState(false);
  const [selectedAIOption, setSelectedAIOption] = useState('Gemini');
  const [availableAIOptions, setAvailableAIOptions] = useState([]);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [creditsLeft, setCreditsLeft] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const tones = [
    'Professional',
    'Friendly',
    'Inspirational',
    'Casual',
    'Thought-provoking',
    'Humorous',
    'Educational',
  ];

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        const organizationData = await fetchOrganizationData();
        // const masterData = await getMasterData();
        const enabledAIServices = organizationData.planFeatures.aiModels.map(
          (model) => model.charAt(0).toUpperCase() + model.slice(1),
        );

        setAvailableAIOptions(enabledAIServices);
        // Set the first available AI option as default
        if (enabledAIServices.length > 0) {
          setSelectedAIOption(enabledAIServices[0]);
        }
        setSelectedProfile(organizationData);
        setCreditsLeft(organizationData?.credits.balance || 0);
        setIsInitialized(true);

        // Initialize welcome message only once
        setMessages([
          {
            id: 1,
            type: 'bot',
            content:
              "👋 Hi! I'm here to help you create engaging LinkedIn posts. What would you like to write about today? Give me the topic of your post! ",
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      } catch (error) {
        message.error('Failed to load organization data');
        setIsInitialized(true);
      }
    };

    initializeData();
  }, []);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) {
      message.warning('Please enter a message');
      return;
    }

    if (creditsLeft <= 0) {
      message.error('No credits remaining');
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue.trim();
    setInputValue('');
    setLoading(true);

    try {
      // Call actual API instead of simulation
      const generatedContent = await generatePost(
        selectedTone,
        currentInput,
        'English',
        '',
        selectedAIOption.toLowerCase(),
      );

      if (generatedContent?.generatedPostContent) {
        setGeneratedPost(generatedContent.generatedPostContent);
        setCreditsLeft((prev) => Math.max(0, prev - 10));

        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: `I've generated a LinkedIn post about "${currentInput}" with a ${selectedTone.toLowerCase()} tone. You can see the preview on the right and make any adjustments you'd like!`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setMessages((prev) => [...prev, botMessage]);
        message.success('Post generated successfully!');
      } else {
        throw new Error('No content generated');
      }
    } catch (error) {
      message.error(
        error.message || 'Failed to generate post. Please try again.',
      );

      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content:
          'Sorry, I encountered an error while generating your post. Please try again with a different topic or check your internet connection.',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyPost = async () => {
    if (!generatedPost) {
      message.warning('No post to copy');
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedPost);
      message.success('Post copied to clipboard!');
    } catch (error) {
      message.error('Failed to copy post');
    }
  };

  const handleRegeneratePost = () => {
    if (messages.length > 1) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((msg) => msg.type === 'user');
      if (lastUserMessage) {
        setInputValue(lastUserMessage.content);
        setTimeout(() => {
          handleSendMessage();
        }, 100);
      }
    }
  };

  const handleProceedToPost = () => {
    if (!generatedPost) {
      message.warning('No post to proceed with');
      return;
    }

    goTo('/dashboard/quick-post', {
      state: {
        content: generatedPost,
        postContents: generatedPost,
      },
    });

    message.info('Proceeding to post editor...');
  };

  const handleRefresh = async () => {
    message.info('Refreshing Credits');
    try {
      const NewcreditsLeft = await getCreditsLeft();
      setCreditsLeft(NewcreditsLeft);
      message.success('Credits Updated');
    } catch (err) {
      message.error(err.message || 'Failed to send invite');
    }
  };

  const handleViewUpgrade = () => {
    setViewUpgradeModal(true);
  };

  // Show loading state while initializing
  if (!isInitialized) {
    return <GeneratePostSkeletonLoading />;
  }

  return (
    <div className="bg-[#ededed] h-[98vh] p-2 lg:p-0 sm:p-4">
      <div className="mx-auto h-full bg-white  overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-2 py-2 sm:px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex lg:flex-row flex-wrap gap-2 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#0c4a6e] rounded-lg text-white text-lg sm:text-xl">
                <FaLinkedin />
              </div>
              <div>
                <h2 className="text-base m-0 p-0 sm:text-xl text-gray-800">
                  LinkedIn Post Generator
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* <button
                onClick={handleRefresh}
                className="p-2 text-gray-400 flex gap-3 bg-white rounded-xl hover:text-gray-600 hover:bg-white transition-all hover:"
                title="Refresh data"
              >
                <Icons.Refresh className="w-4 h-4" />
                Refresh Credits
              </button> */}
              <Button
                buttonText="Add More Credits"
                theme="dark"
                onClick={() => handleViewUpgrade('upgrade')}
                className={'text-black font-semibold'}
              />

              {selectedProfile && (
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-[#0c4a6e] rounded-full flex items-center justify-center text-white font-semibold text-xs">
                    {selectedProfile.name
                      ? selectedProfile.name.charAt(0)
                      : 'U'}
                  </div>
                  <span>{selectedProfile.name || 'User'}</span>
                </div>
              )}

              <div className="bg-gray-100 px-3 sm:px-4 py-2 rounded-lg border">
                <span className="font-semibold text-[#0c4a6e] text-sm sm:text-base">
                  {creditsLeft}
                </span>
                <span className="text-gray-600 ml-1 text-sm">credits</span>
              </div>

              <button
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden p-2 text-gray-600 hover:text-[#0c4a6e] rounded-lg transition-colors"
              >
                {showPreview ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Chat Section */}
          <div
            className={`flex-1 flex flex-col ${
              showPreview ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-scroll scrollbar-hide p-4 sm:p-6 space-y-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[90%] sm:max-w-[85%] ${
                      message.type === 'user'
                        ? 'flex-row-reverse space-x-reverse'
                        : ''
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full flex-shrink-0 ${
                        message.type === 'user'
                          ? 'bg-[#eff9ff] text-[#0c4a6e]'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {message.type === 'user' ? (
                        <FaUser className="text-sm text-black" />
                      ) : (
                        <FaRobot className="text-sm text-black" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl p-3 sm:p-4 ${
                        message.type === 'user'
                          ? 'bg-[#0c4a6e] text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}
                    >
                      <p
                        className={`text-sm mb-0 leading-relaxed whitespace-pre-wrap ${
                          message.type === 'user'
                            ? 'bg-[#0c4a6e] text-white rounded-br-md'
                            : 'bg-gray-100 text-gray-800 rounded-bl-md '
                        }`}
                      >
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mb-0 mt-2 ${
                          message.type === 'user'
                            ? 'text-blue-200'
                            : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-[85%]">
                    <div className="p-2 rounded-full bg-gray-200 text-gray-600 flex-shrink-0">
                      <FaRobot className="text-sm" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-md p-4 border border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#0c4a6e] rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-[#0c4a6e] rounded-full animate-bounce"
                            style={{ animationDelay: '0.1s' }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-[#0c4a6e] rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          Generating your post...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="border-t border-gray-100 bg-white px-4 py-4">
              {/* Model & Tone Selection - Custom Compact Row */}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center flex-wrap gap-4">
                  <div className="w-36 sm:w-40">
                    <div className="w-36 sm:w-40">
                      <CustomSingleSelect
                        label="Model"
                        options={availableAIOptions.map((option) => ({
                          label: option,
                          value: option,
                        }))}
                        selectedValue={selectedAIOption}
                        onChange={(val) => setSelectedAIOption(val)}
                        placeholder="Select Model"
                        dropdownPosition="top" // 👈 will appear above
                      />
                    </div>
                  </div>

                  <div className="w-36 sm:w-40">
                    <CustomSingleSelect
                      label="Tone"
                      options={tones.map((tone) => ({
                        label: tone,
                        value: tone,
                      }))}
                      selectedValue={selectedTone}
                      onChange={(val) => setSelectedTone(val)}
                      placeholder="Select Tone"
                      dropdownPosition="top"
                    />
                  </div>
                </div>

                {creditsLeft <= 10 && creditsLeft > 0 && (
                  <div className="flex items-center space-x-1 text-orange-600 font-medium">
                    <FaExclamationTriangle className="text-xs" />
                    <span>{creditsLeft} credits left</span>
                  </div>
                )}
              </div>

              {/* Message Input Area */}
              <div className="flex items-end space-x-3 relative">
                <div className="flex-1 relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => {
                      if (e.target.value.length <= 2000)
                        setInputValue(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="What would you like to write about? Be specific about your topic, audience, and style..."
                    className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c4a6e] focus:border-transparent placeholder-gray-400 bg-gray-50 shadow-sm transition-all"
                    rows="2"
                    disabled={loading}
                    style={{ maxHeight: '150px' }}
                  />

                  {/* Character Counter */}
                  <div className="absolute bottom-1.5 right-4 text-[11px] text-gray-400">
                    {inputValue.length} / 2000
                  </div>
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || loading || creditsLeft <= 0}
                  className="flex-shrink-0 w-10 h-10 bg-[#0c4a6e] text-white rounded-full hover:bg-[#093958] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-sm"
                >
                  <FaArrowRight className="text-sm" />
                </button>
              </div>

              <p className="text-[11px] sm:text-xs text-gray-400 mt-2 text-center">
                Press <span className="font-medium text-gray-600">Enter</span>{' '}
                to send,{' '}
                <span className="font-medium text-gray-600">Shift + Enter</span>{' '}
                for new line
              </p>
            </div>
          </div>

          {/* Preview Section */}
          <div
            className={`w-full lg:w-96 border-l overflow-y-auto bg-gray-50 flex flex-col ${
              showPreview ? 'flex' : 'hidden lg:flex'
            }`}
          >
            <div className="p-4 border-b bg-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Post Preview</h3>
                {generatedPost && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopyPost}
                      className="p-2 text-gray-600 hover:text-[#0c4a6e] hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Copy post"
                    >
                      <FaCopy />
                    </button>
                    <button
                      onClick={handleRegeneratePost}
                      className="p-2 text-gray-600 hover:text-[#0c4a6e] hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Regenerate post"
                      disabled={loading}
                    >
                      <FaRedo />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {generatedPost ? (
                <div className="bg-white rounded-xl p-4 border">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-[#0c4a6e] rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedProfile?.name
                        ? selectedProfile.name.charAt(0)
                        : 'U'}
                    </div>
                    <div>
                      <p className="font-semibold m-0 text-gray-800">
                        {selectedProfile?.name || 'Your Name'}
                      </p>
                      <p className="text-sm m-0 text-gray-500 flex items-center space-x-1">
                        <span>Just now</span>
                        <span>•</span>
                        <FaGlobe className="text-xs" />
                      </p>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm">
                      {generatedPost}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                    <button className="hover:text-blue-600 transition-colors flex items-center space-x-1">
                      <FaThumbsUp />
                      <span className="hidden sm:inline">Like</span>
                    </button>
                    <button className="hover:text-blue-600 transition-colors flex items-center space-x-1">
                      <FaComment />
                      <span className="hidden sm:inline">Comment</span>
                    </button>
                    <button className="hover:text-blue-600 transition-colors flex items-center space-x-1">
                      <FaRetweet />
                      <span className="hidden sm:inline">Repost</span>
                    </button>
                    <button className="hover:text-blue-600 transition-colors flex items-center space-x-1">
                      <FaPaperPlane />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaLinkedin className="text-3xl text-gray-400" />
                    </div>
                    <p className="text-gray-500 mb-2 text-sm sm:text-base">
                      Your generated LinkedIn post will appear here
                    </p>
                    <p className="text-xs text-gray-400">
                      Start a conversation to create your post
                    </p>
                  </div>
                </div>
              )}
            </div>

            {generatedPost && (
              <div className="p-4 border-t bg-white flex-shrink-0">
                <button
                  onClick={handleProceedToPost}
                  className="w-full bg-[#0c4a6e] text-white py-3 rounded-xl hover:bg-blue-800 transition-all duration-200 font-semibold text-sm sm:text-base"
                >
                  Proceed to Post Editor
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <InfoModal
        isOpen={showCreditsModal}
        onClose={() => setShowCreditsModal(false)}
        title="How to Get 500 FREE Credits"
        content={creditsModalContent}
      />
      <UpgradeModal isOpen={viewUpgradeModal} onClose={() => {setViewUpgradeModal(false)}} />
    </div>
  );
};

export default LinkedInPostGenerator;
