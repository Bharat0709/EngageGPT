import { Icons } from '@utils/constantData/icons';
import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

const GeneratedContentForm = ({ postData, setPostData, errors = {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  console.log(postData);
  const handleInputChange = (field, value) => {
    setPostData({ ...postData, [field]: value });
    console.log('Updating field:', field, 'with value:', value);
    console.log(postData);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 transition-all duration-300 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 border-b border-gray-100 cursor-pointer group"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:border-indigo-200 transition-colors">
            <Icons.Robot className="text-indigo-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              Generated Content
            </h3>
            <p className="text-xs mb-0 text-gray-600">
              AI-generated emails and messages
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {Object.keys(errors).length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
              <Icons.Alert className="text-red-500" size={14} />
              <span className="text-xs font-medium text-red-600">
                {Object.keys(errors).length} error
                {Object.keys(errors).length > 1 ? 's' : ''}
              </span>
            </div>
          )}
          <button className="p-2 hover:bg-white/60 rounded-full transition-colors">
            <Icons.Down
              className={`text-gray-500 transition-transform duration-200 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
              size={20}
            />
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-[2000px]'
        } overflow-hidden`}
      >
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icons.Mail size={16} className="text-green-600" />
              Email Subject Line
            </label>
            <Input
              maxLength={50}
              value={postData.generatedSubject}
              onChange={(e) =>
                handleInputChange('generatedSubject', e.target.value)
              }
              placeholder="Generated email subject..."
              size="large"
              className="rounded-xl border-gray-300 hover:border-black focus:border-black"
            />
            <span className="flex  justify-between gap-2 items-center text-xs text-gray-500">
              Characters: {postData.generatedSubject?.length || 0} / 50
            </span>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icons.Mail size={16} className="text-green-600" />
              Email Body
            </label>
            <TextArea
              value={postData.generatedEmailBody}
              maxLength={1000}
              onChange={(e) =>
                handleInputChange('generatedEmailBody', e.target.value)
              }
              placeholder="Generated email body content..."
              rows={6}
              className="rounded-xl border-gray-300 hover:border-black focus:border-black resize-none"
            />
            <span className="flex  justify-between gap-2 items-center text-xs text-gray-500">
              Characters: {postData?.generatedEmailBody?.length || 0} / 1000
            </span>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icons.LinkedIn size={16} className="text-blue-600" />
              LinkedIn Message
            </label>
            <TextArea
              value={postData.generatedLinkedInMessage}
              onChange={(e) =>
                handleInputChange('generatedLinkedInMessage', e.target.value)
              }
              placeholder="Generated LinkedIn message..."
              rows={5}
              className="rounded-xl border-gray-300 hover:border-black focus:border-black resize-none"
            />
            <span className="flex  justify-between gap-2 items-center text-xs text-gray-500">
              Characters: {postData.generatedLinkedInMessage?.length || 0} / 500
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedContentForm;
