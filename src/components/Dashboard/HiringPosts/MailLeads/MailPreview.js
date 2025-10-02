import React from 'react';
import { Icons } from '@utils/constantData/icons';

const TemplatePreviewModal = ({ isOpen, onClose, template }) => {
  if (!isOpen || !template) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[70] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Right Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-fit lg:w-[650px] bg-white shadow-2xl z-[80] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Icons.Eye className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg m-0 p-0  text-gray-900">
                Template Preview
              </h3>
              <p className="text-sm p-0 m-0 text-gray-500">
                {template?.name || 'Email Body'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icons.Cross className="h-5 w-5" />
          </button>
        </div>

        {/* Email Preview Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 bg-white max-h-[calc(100vh-200px)] overflow-y-auto">
              {template.templateType === 'html' ? (
                <div
                  dangerouslySetInnerHTML={{ __html: template.templateBody }}
                  className="prose prose-sm max-w-none"
                />
              ) : (
                <pre className="whitespace-pre-wrap text-sm text-gray-900 font-sans leading-relaxed">
                  {template.templateBody}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplatePreviewModal;
