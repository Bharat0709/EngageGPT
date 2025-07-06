import { Icons } from '@utils/constantData/icons';
import React from 'react';

const ActiveTabsComponent = ({ activeTab, setActiveTab, totalStats }) => {
  const tabs = [
    { key: 'new', label: 'New', count: totalStats.new },
    { key: 'contacted', label: 'Contacted', count: totalStats.contacted },
    { key: 'responded', label: 'Responded', count: totalStats.responded },
    { key: 'closed', label: 'Closed', count: totalStats.closed },
    { key: 'rejected', label: 'Rejected', count: totalStats.rejected },
  ];

  return (
    <div className="rounded-lg">
      <div className="flex gap-1 px-2 py-1 items-center rounded-lg bg-gray-50 justify-start overflow-x-auto">
        <Icons.Filter className="text-gray-400 ml-2" />
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`py-2 px-2 text-center text-sm flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === tab.key
                ? 'font-semibold text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActiveTabsComponent;
