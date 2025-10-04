import React, { useState } from 'react';
import GenerateEmail from './GenerateEmail';
import { Icons } from '@utils/constantData/icons';
import Button from '@components/Common/Button';
import { html as beautifyHtml } from 'js-beautify';

const CodeEditor = ({ formData, setFormData }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const handleCodeChange = (e) => {
    setFormData({ ...formData, templateBody: e.target.value });
  };

  const htmlPlaceholder = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            color: #333;
            margin-bottom: 20px;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        .content {
            line-height: 1.6;
            color: #555;
            margin-bottom: 30px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="header">Hello {{firstName}}!</h1>
        <div class="content">
            <p>I hope this email finds you well. I wanted to reach out regarding {{topic}}.</p>
            <p>{{customMessage}}</p>
            <a href="{{callToActionUrl}}" class="button">{{buttonText}}</a>
        </div>
        <div class="footer">
            <p>Best regards,<br>{{senderName}}</p>
            <p><small>{{companyName}} | {{companyAddress}}</small></p>
        </div>
    </div>
</body>
</html>`;

  const textPlaceholder = `Hello {{firstName}},

I hope this email finds you well. I wanted to reach out regarding {{topic}}.

{{customMessage}}

Best regards,
{{senderName}}`;

  const formatHtml = () => {
    if (formData.templateBody && formData.templateType === 'html') {
      const formatted = beautifyHtml(formData.templateBody, {
        indent_size: 2,
        wrap_line_length: 80,
        max_preserve_newlines: 2,
        preserve_newlines: true,
        end_with_newline: false,
      });

      setFormData((prev) => ({
        ...prev,
        templateBody: formatted,
      }));
    }
  };

  return (
    <div className="h-full rounded-t-3xl flex flex-col">
      {/* Header Controls */}
      <div className="flex lg:flex-row flex-col gap-3 items-center rounded-3xl justify-between p-3 bg-white  ">
        <div className="flex lg:flex-row gap-3 flex-col  items-center space-x-2">
          <span className="text-sm flex items-center gap-2 font-medium text-gray-700">
            <Icons.Code className="w-4 h-4 text-gray-600" />{' '}
            {formData.templateType === 'html' ? 'HTML Editor' : 'Text Editor'}
          </span>
          {formData.templateType === 'html' && (
            <div className="flex items-center space-x-2">
              {/* Format Button - Add this */}
              <button
                onClick={formatHtml}
                className="flex items-center space-x-1 px-3 py-1.5 text-xs rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                title="Format HTML code"
              >
                <Icons.Code className="w-3 h-3" />
                <span>Format</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className="flex items-center space-x-1 px-3 py-1.5 text-xs rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                title={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
              >
                {isDarkTheme ? (
                  <Icons.Sun className="w-3 h-3" />
                ) : (
                  <Icons.Moon className="w-3 h-3" />
                )}
              </button>

              {/* Preview Toggle */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center space-x-2 px-3 py-1.5 text-xs rounded-full transition-colors ${
                  showPreview
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icons.Eye className="w-4 h-4" />
                <span>{showPreview ? 'Edit' : 'Preview'}</span>
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center lg:ml-6 space-x-3">
          <p className="bg-yellow-400 m-0 px-3 py-1 text-xs font-semibold text-yellow-900 rounded-full">
            Beta
          </p>
          <Button
            buttonText={'Generate with AI'}
            theme="light"
            icon={<Icons.Sparkles className="h-4 w-4" />}
            onClick={() => setShowGenerateModal(true)}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-none overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:w-full before:h-full before:translate-x-[-100%] hover:before:animate-[slide_1s_infinite] before:skew-x-12"
          />
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-2 min-h-96 h-full overflow-y-auto scrollbar-hide">
        {formData.templateType === 'html' ? (
          <div className="h-full">
            {showPreview ? (
              // Preview Mode
              <div className="h-full border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="p-3 bg-gray-100 border-b border-gray-300 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Email Preview
                  </span>
                </div>
                <div
                  className="h-full overflow-auto"
                  style={{ height: 'calc(100% - 52px)' }}
                >
                  <iframe
                    srcDoc={formData.templateBody || htmlPlaceholder}
                    className="w-full h-full border-0"
                    title="Email Preview"
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>
            ) : (
              // HTML Code Editor Mode (Styled Textarea)
              <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-sm relative">
                {/* Character Counter */}
                <div className="absolute top-2 right-2 z-10">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      (formData.templateBody?.length || 0) > 5000
                        ? 'bg-red-100 text-red-700'
                        : (formData.templateBody?.length || 0) > 3800
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {formData.templateBody?.length || 0}/5000
                  </span>
                </div>

                {/* Code Editor Textarea */}
                <textarea
                  value={formData.templateBody || ''}
                  onChange={handleCodeChange}
                  maxLength={5000}
                  placeholder={htmlPlaceholder}
                  className={`w-full h-full pl-4 pr-20 overflow-y-scroll scrollbar-hide py-4 resize-none outline-none border-0 font-mono text-sm leading-6 ${
                    isDarkTheme
                      ? 'bg-[#212121] text-green-400 placeholder-gray-600'
                      : 'bg-white text-gray-800 placeholder-gray-400'
                  }`}
                  style={{
                    fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    tabSize: 2,
                  }}
                  spellCheck={false}
                />

                {/* Syntax Highlighting Overlay (Simple) */}
                <div
                  className="absolute scrollbar-hide left-14 top-4 right-20 bottom-4 pointer-events-none overflow-hidden"
                  style={{
                    fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }}
                >
                  <pre className="whitespace-pre-wrap text-transparent">
                    {(formData.templateBody || '').replace(
                      /(\{\{[^}]+\}\})/g,
                      isDarkTheme ? '\x1b[95m$1\x1b[0m' : '\x1b[94m$1\x1b[0m',
                    )}
                  </pre>
                </div>

                {/* Warning message when approaching limit */}
                {(formData.templateBody?.length || 0) > 3800 && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <p
                      className={`text-xs px-2 py-1 rounded ${
                        (formData.templateBody?.length || 0) > 5000
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {(formData.templateBody?.length || 0) > 5000
                        ? 'Character limit exceeded. Content will be truncated.'
                        : `Approaching character limit (${
                            5000 - (formData.templateBody?.length || 0)
                          } remaining)`}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          // Plain Text Editor
          <div className="h-full relative">
            {/* Character Counter for Plain Text */}
            <div className="absolute top-2 right-2 z-10">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  (formData.templateBody?.length || 0) > 2000
                    ? 'bg-red-100 text-red-700'
                    : (formData.templateBody?.length || 0) > 1800
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {formData.templateBody?.length || 0}/2000
              </span>
            </div>

            <textarea
              value={formData.templateBody || ''}
              onChange={handleCodeChange}
              maxLength={2000}
              className="h-full w-full px-4 py-4 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white font-mono text-sm leading-relaxed resize-none shadow-sm"
              placeholder={textPlaceholder}
              style={{
                fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
              }}
            />

            {/* Warning message for plain text */}
            {(formData.templateBody?.length || 0) > 1800 && (
              <div className="absolute bottom-2 left-2 right-2">
                <p
                  className={`text-xs px-2 py-1 rounded ${
                    (formData.templateBody?.length || 0) > 2000
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {(formData.templateBody?.length || 0) > 2000
                    ? 'Character limit exceeded. Content will be truncated.'
                    : `Approaching character limit (${
                        2000 - (formData.templateBody?.length || 0)
                      } remaining)`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {showGenerateModal && (
        <GenerateEmail
          isOpen={setShowGenerateModal}
          onGenerate={(generatedContent) =>
            setFormData({ ...formData, templateBody: generatedContent })
          }
          onClose={() => setShowGenerateModal(false)}
        />
      )}
    </div>
  );
};

export default CodeEditor;
