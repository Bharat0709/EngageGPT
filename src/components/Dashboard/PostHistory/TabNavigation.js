import { Icons } from '@utils/constantData/icons';
import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab, postHistory }) => {
  const tabs = [
    {
      key: 'scheduled',
      label: 'Scheduled',
      count: postHistory.scheduled.length,
      icon: Icons.Clock,
    },
    {
      key: 'posted',
      label: 'Posted',
      count: postHistory.posted.length,
      icon: Icons.CheckCircle,
    },
    {
      key: 'drafts',
      label: 'Drafts',
      count: postHistory.drafts.length,
      icon: Icons.Edit3,
    },
    {
      key: 'failed',
      label: 'Failed',
      count: postHistory.failed.length,
      icon: Icons.Alert,
    },
  ];

  return (
    <div className="flex lg:flex-row flex-wrap gap-1 px-2 items-center rounded-xl  justify-center lg:justify-start">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            className={`py-4 px-3 text-center text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === tab.key
                ? 'font-semibold border-b-2 border-black text-black bg-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <Icon
              size={15}
              className={activeTab === tab.key ? 'text-black' : 'text-gray-400'}
            />
            <span>{tab.label}</span>
            <span
              className={`text-sm ${
                activeTab === tab.key ? 'text-gray-600' : 'text-gray-400'
              }`}
            >
              ({tab.count})
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
