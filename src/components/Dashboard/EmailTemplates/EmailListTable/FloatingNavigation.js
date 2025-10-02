import React from 'react';
import { Icons } from '@utils/constantData/icons';

const FloatingNavigationTemplates = ({
  handleDeselectTemplates,
  selectedTemplates,
  bulkActions,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[60]">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
            <button
              onClick={handleDeselectTemplates}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Clear selection"
            >
              <Icons.Cross className="w-4 h-4" />
            </button>
            <span className="text-xs"> {selectedTemplates.size} Selected</span>
          </div>

          <div className="flex items-center gap-1">
            {bulkActions.map((action) => {
              return (
                <button
                  key={action.key}
                  onClick={action.handler}
                  className={`flex items-center gap-2 hover:bg-gray-100 hover:shadow:lg bg-gray-50 text-xs px-2 py-1 rounded-lg  font-medium transition-all duration-200 border border-gray-100`}
                  title={action.label}
                >
                  {action.icon}
                  <span className="hidden sm:inline">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingNavigationTemplates;
