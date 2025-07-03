import React from 'react';
import { FiFilter } from 'react-icons/fi';

const TabNavigation = ({ activeTab, setActiveTab, postHistory }) => {
  const tabs = [
    {
      key: 'scheduled',
      label: 'Scheduled',
      count: postHistory.scheduled.length,
    },
    { key: 'posted', label: 'Posted', count: postHistory.posted.length },
    { key: 'drafts', label: 'Drafts', count: postHistory.drafts.length },
    { key: 'failed', label: 'Failed', count: postHistory.failed.length },
  ];

  return (
    <div className="flex gap-1 px-2 py-1 items-center rounded-xl bg-gray-50 justify-start">
      <FiFilter className="text-gray-400 ml-2" />
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`py-2 px-2 text-center text-sm flex items-center justify-center gap-2 ${
            activeTab === tab.key ? 'font-semibold text-black' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab(tab.key)}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
