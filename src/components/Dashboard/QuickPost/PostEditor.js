import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PostContentEditor = ({
  selectedPostTopic,
  postDetails,
  setPostDetails,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const handlePostChange = (e) => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      content: e.target.value,
    }));
  };

  const handleWriteWithAI = () => {
    navigate('/dashboard/create-post');
  };

  // LinkedIn-specific formatting functions
  const insertLinkedInFormat = (type, placeholder = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const textToInsert = selectedText || placeholder;

    let newText = '';
    let cursorOffset = 0;

    switch (type) {
      case 'bold':
        // LinkedIn doesn't support bold, so we use CAPS or emphasis techniques
        newText = textToInsert.toUpperCase();
        cursorOffset = newText.length;
        break;
      case 'italic':
        // Use underscores or slashes for emphasis
        newText = `_${textToInsert}_`;
        cursorOffset = selectedText ? newText.length : 1;
        break;
      case 'bullet':
        newText = `• ${textToInsert}`;
        cursorOffset = selectedText ? newText.length : 2;
        break;
      case 'numberedlist':
        newText = `1. ${textToInsert}`;
        cursorOffset = selectedText ? newText.length : 3;
        break;
      case 'hashtag':
        newText = `#${textToInsert.replace(/\s+/g, '')}`;
        cursorOffset = selectedText ? newText.length : 1;
        break;
      case 'mention':
        newText = `@${textToInsert}`;
        cursorOffset = selectedText ? newText.length : 1;
        break;
      case 'line':
        newText = '\n───────────────────\n';
        cursorOffset = newText.length;
        break;
      case 'callout':
        newText = `📢 ${textToInsert}`;
        cursorOffset = selectedText ? newText.length : 2;
        break;
      case 'quote':
        newText = `"${textToInsert}"`;
        cursorOffset = selectedText ? newText.length : 1;
        break;
      case 'emoji-bullet':
        newText = `✅`;
        cursorOffset = selectedText ? newText.length : 1;
        break;
    }

    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);
    const updatedContent = beforeText + newText + afterText;

    setPostDetails((prev) => ({
      ...prev,
      content: updatedContent,
    }));

    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = selectedText
        ? start + newText.length
        : start + cursorOffset;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Quick insert functions for common LinkedIn patterns
  const insertTemplate = (template) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(start);

    const updatedContent = beforeText + template + afterText;

    setPostDetails((prev) => ({
      ...prev,
      content: updatedContent,
    }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + template.length,
        start + template.length,
      );
    }, 0);
  };

  const templates = {
    hook: "🎯 Here's something that might surprise you:\n\n",
    question: '❓ Quick question for my network:\n\n',
    story: '📖 Let me share a quick story:\n\n',
    tip: '💡 Pro tip:\n\n',
    announcement: '🚀 Exciting news:\n\n',
    lesson: '📚 Key takeaway:\n\n',
  };

  const TwinStarsIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-200 group-hover:scale-110"
    >
      <path d="M12 2l1.09 3.27L16 6l-3.27 1.09L12 10l-1.09-2.91L8 6l2.91-1.09L12 2z" />
      <path d="M18 14l0.89 2.67L22 18l-2.67 0.89L18 22l-0.89-2.67L14 18l2.67-0.89L18 14z" />
    </svg>
  );

  const EditIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );

  const getCharacterCountColor = () => {
    const length = postDetails?.content?.length || 0;
    if (length > 2700) return 'text-red-500';
    if (length > 2400) return 'text-amber-500';
    return 'text-slate-500';
  };

  const getProgressBarColor = () => {
    const length = postDetails?.content?.length || 0;
    if (length > 2700) return 'bg-red-500';
    if (length > 2400) return 'bg-amber-500';
    return 'bg-blue-500';
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            insertLinkedInFormat('bold', 'emphasized text');
            break;
          case 'i':
            e.preventDefault();
            insertLinkedInFormat('italic', 'italic text');
            break;
        }
      }
    };

    if (isFocused) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFocused]);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-slate-200 rounded-lg w-32"></div>
        <div className="h-9 bg-slate-200 rounded-lg w-28"></div>
      </div>
      <div className="mb-4">
        <div className="h-4 bg-slate-200 rounded w-48 mb-2"></div>
      </div>
      <div className="h-12 bg-slate-200 rounded-xl mb-3"></div>
      <div className="h-80 bg-slate-200 rounded-xl mb-3"></div>
      <div className="flex justify-between items-center">
        <div className="h-2 bg-slate-200 rounded-full w-32"></div>
        <div className="h-4 bg-slate-200 rounded w-16"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl  p-6">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl transition-all duration-300 lg:p-4 p-4">
      {/* Header Section */}
      <div className="flex items-center lg:flex-row flex-col justify-center gap-4 lg:justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#0c4a6e] rounded-lg text-white text-lg sm:text-xl">
            <EditIcon />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
              Quick Post Editor
            </h2>
            <p className="text-sm text-gray-600 hidden sm:block">
              Post your thoughts, ideas, and updates quickly and easily!
            </p>
          </div>
        </div>

        <button
          onClick={handleWriteWithAI}
          className="group flex items-center gap-2 bg-[#0c4a6e] text-white px-4 py-2 font-medium rounded-full hover:bg-blue-800 transition-all duration-200 transform"
        >
          <TwinStarsIcon />
          <span className="text-sm">Write with AI</span>
        </button>
      </div>

      {/* Topic Display */}
      {selectedPostTopic && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-600">
              Post Topic:
            </span>
            <span className="text-sm font-semibold text-blue-700 bg-white px-2 py-1 rounded-lg">
              {selectedPostTopic?.topic}
            </span>
          </div>
        </div>
      )}

      {/* LinkedIn Formatting Toolbar */}
      <div className="mb-4 p-4 bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-700">
            LinkedIn Formatting Tools
          </span>
          <div className="text-xs text-slate-500 bg-white px-2 py-1 rounded-lg">
            Native LinkedIn Style
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs font-medium text-slate-600 mb-2">
              Special Elements
            </p>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() =>
                  insertLinkedInFormat('emoji-bullet', 'list item')
                }
                className="flex items-center gap-1 p-2 hover:bg-white hover  rounded-lg transition-all duration-150 text-slate-600 hover:text-slate-800"
                title="Emoji Bullet"
              >
                <span>✅</span>
                <span className="text-xs font-medium">Check</span>
              </button>
              <button
                onClick={() =>
                  insertLinkedInFormat('callout', 'important message')
                }
                className="flex items-center gap-1 p-2 hover:bg-white hover  rounded-lg transition-all duration-150 text-slate-600 hover:text-slate-800"
                title="Callout"
              >
                <span>📢</span>
                <span className="text-xs font-medium">Alert</span>
              </button>
              <button
                onClick={() => insertLinkedInFormat('line')}
                className="flex items-center gap-1 p-2 hover:bg-white hover  rounded-lg transition-all duration-150 text-slate-600 hover:text-slate-800"
                title="Divider Line"
              >
                <span>───</span>
                <span className="text-xs font-medium">Line</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Templates */}
        <div className="border-t border-slate-200 pt-3">
          <p className="text-xs font-medium text-slate-600 mb-2">
            Quick Templates
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(templates).map(([key, template]) => (
              <button
                key={key}
                onClick={() => insertTemplate(template)}
                className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors capitalize"
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={postDetails?.content || ''}
          onChange={handlePostChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Start writing your LinkedIn post... 

💡 Pro tip: Use the formatting tools above to make your post stand out!

Try starting with:
🎯 Here's something that might surprise you:
❓ Quick question for my network:
📖 Let me share a quick story:"
          className={`w-full h-80 p-4 scrollbar-hide border-2 rounded-xl resize-none transition-all duration-200 bg-slate-50 focus:bg-white text-slate-700 placeholder-slate-400 text-sm leading-relaxed ${
            isFocused
              ? 'border-blue-500  ring-4 ring-blue-100'
              : 'border-slate-200 hover:border-slate-300'
          }`}
          maxLength={3000}
        />

        {/* Floating character count for focused state */}
        {isFocused && (
          <div className="absolute top-3 right-3 bg-white  border border-slate-200 rounded-lg px-2 py-1">
            <span className={`text-xs font-medium ${getCharacterCountColor()}`}>
              {postDetails?.content?.length || 0}/3000
            </span>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="mt-6 flex items-center justify-between">
        {/* Progress Bar */}
        <div className="flex-1 mr-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getProgressBarColor()}`}
                style={{
                  width: `${Math.min(
                    ((postDetails?.content?.length || 0) / 3000) * 100,
                    100,
                  )}%`,
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-semibold ${getCharacterCountColor()}`}
              >
                {postDetails?.content?.length || 0}
              </span>
              <span className="text-slate-400 text-sm">/</span>
              <span className="text-slate-500 text-sm">3000</span>
            </div>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="flex  lg:flex-row flex-col items-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg">
            <span className="text-slate-500">Words:</span>
            <span className="font-semibold text-slate-700">
              {postDetails?.content
                ? postDetails.content
                    .trim()
                    .split(/\s+/)
                    .filter((word) => word.length > 0).length
                : 0}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg">
            <span className="text-slate-500">Hashtags:</span>
            <span className="font-semibold text-slate-700">
              {postDetails?.content
                ? (postDetails.content.match(/#\w+/g) || []).length
                : 0}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg">
            <span className="text-slate-500">Mentions:</span>
            <span className="font-semibold text-slate-700">
              {postDetails?.content
                ? (postDetails.content.match(/@\w+/g) || []).length
                : 0}
            </span>
          </div>
        </div>
      </div>

      {/* Character limit warning */}
      {(postDetails?.content?.length || 0) > 2700 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700 font-medium">
            ⚠️ You're approaching the character limit. Consider condensing your
            content.
          </p>
        </div>
      )}

      {/* LinkedIn-specific tips */}
      <div className="mt-4 p-4 bg-blue-50  rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-600"
            >
              <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4v-9zM13 9h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4V9z" />
              <path d="M9 7v4M13 3v6" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-700 font-medium mb-1">
              LinkedIn Best Practices
            </p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Use emojis and bullet points to improve readability</li>
              <li>• Add 3-5 relevant hashtags for better visibility</li>
              <li>• Ask questions to encourage engagement</li>
              <li>• Keep paragraphs short (2-3 lines max)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContentEditor;
