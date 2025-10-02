import { Icons } from '@utils/constantData/icons';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

const NotesForm = ({ postData, setPostData, errors = {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInputChange = (field, value) => {
    setPostData({ ...postData, [field]: value });
    console.log('Updating field:', field, 'with value:', value);
    console.log(postData);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 transition-all duration-300 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 border-b border-gray-100 cursor-pointer group"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 group-hover:border-yellow-200 transition-colors">
            <Icons.Notes className="text-yellow-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              Additional Notes
            </h3>
            <p className="text-xs mb-0 text-gray-600">
              Lead notes, conversation history, and next steps
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
        <div className="p-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icons.Edit3 size={16} className="text-teal-600" />
              Notes
            </label>
            <TextArea
              value={postData.notes}
              maxLength={200}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add detailed notes about this lead, conversation history, next steps, or any other relevant information..."
              rows={8}
              className="rounded-xl border-gray-400 hover:border-black focus:border-black resize-none"
            />
            <div className="flex  justify-between gap-2 items-center text-xs text-gray-500">
              <span>Characters: {postData.notes?.length || 0} / 200</span>
              <span>Use this space for important reminders and context</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesForm;
