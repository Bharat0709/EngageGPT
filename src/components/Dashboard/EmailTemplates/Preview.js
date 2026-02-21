import React, { useState } from 'react';
import PreviewIcon from '@assets/images/preview.svg';

const Preview = ({ selectedTemplate }) => {
  const [previewMode, setPreviewMode] = useState('desktop');

  if (!selectedTemplate) {
    return (
      <div className="w-full h-full bg-gray-50">
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center  backdrop-blur-lg rounded-3xl p-6  border border-white/20">
            <img
              className="h-60 w-60 mx-auto mb-4"
              src={PreviewIcon}
              alt="Preview"
            />

            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Template Preview
            </h3>
            <p className="text-gray-600 text-lg">
              Select a template to see a beautiful preview
            </p>
            <div className="mt-8 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-scroll scrollbar-hide bg-gray-50">
      {/* Main Content */}
      <div className="w-full h-full overflow-y-scroll scrollbar-hide pt-2 px-2 lg:px-4 pb-4">
        {/* Email Preview */}
        <div className="w-full h-full">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl scrollbar-hide border border-white/20 overflow-hidden">
            {/* Email Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-2 lg:px-6 py-4">
              <div className="flex lg:flex-row gap-2 flex-col items-center  justify-between">
                <div className="flex gap-2 w-full lg:flex-row flex-col items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-white text-sm font-medium">
                    Email Preview - {selectedTemplate.name}
                  </div>
                </div>

                {/* Template Info Pills */}
                <div className="flex w-full lg:flex-row flex-wrap gap-2 justify-center items-center space-x-2">
                  <span className="capitalize text-white ml-1 px-3 py-1 bg-white/20 rounded-full text-xs">
                    {selectedTemplate.category.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-medium border border-orange-500/30">
                    {selectedTemplate.templateType.toUpperCase()}
                  </span>
                  {selectedTemplate.isDefault && (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium border border-yellow-500/30">
                      Default Template
                    </span>
                  )}
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium border border-green-500/30">
                    Created{' '}
                    {new Date(selectedTemplate.createdAt).toLocaleDateString()}
                  </span>
                  {selectedTemplate.updatedAt && (
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
                      Updated{' '}
                      {new Date(
                        selectedTemplate.updatedAt,
                      ).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Subject Line */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <p className="text-sm m-0 p-0 text-gray-600">Subject</p>
                  <p className="text-lg m-0 p-0 font-semibold text-gray-900">
                    {selectedTemplate.subject}
                  </p>
                </div>

                {/* Placeholders Display */}
                {selectedTemplate.placeholders &&
                  selectedTemplate.placeholders.length > 0 && (
                    <div className="flex flex-col items-end space-y-2">
                      <span className="text-sm text-gray-500 font-medium">
                        Available Placeholders:
                      </span>
                      <div className="flex flex-wrap gap-1 justify-end max-w-xl">
                        {selectedTemplate.placeholders.map(
                          (placeholder, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 text-xs bg-white text-blue-800 rounded-full font-mono"
                            >
                              {`${placeholder}`}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Email Body */}
            <div
              className={`transition-all scrollbar-hide duration-300 ${
                previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''
              }`}
            >
              <div className="p-6  bg-white min-h-[66vh]">
                {selectedTemplate.templateType === 'html' ? (
                  <iframe
                    srcDoc={selectedTemplate.templateBody}
                    className="w-full min-h-[60vh] border-0 scrollbar-hide rounded-xl"
                    title="Email Preview"
                  />
                ) : (
                  <div className="whitespace-pre-wrap text-gray-900 text-base leading-relaxed font-mono bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
                    {selectedTemplate.templateBody}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
