// AutomationTableFooter.js
import React from 'react';

const AutomationTableFooter = ({ dataToUse = [] }) => {
  if (dataToUse.length === 0) return null;

  const stats = {
    total: dataToUse.length,
    pending: dataToUse.filter((item) => item.status === 'pending_approval')
      .length,
    approved: dataToUse.filter((item) => item.status === 'approved').length,
    sent: dataToUse.filter((item) => item.status === 'sent').length,
    failed: dataToUse.filter((item) => item.status === 'failed').length,
    rejected: dataToUse.filter((item) => item.status === 'rejected').length,
  };

  return (
    <div className="px-4 py-3 bg-gray-50 rounded-b-2xl border-t border-gray-100">
      <div className="flex flex-wrap items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <span>
            Total: <strong>{stats.total}</strong>
          </span>
          <span>
            Pending:{' '}
            <strong className="text-yellow-600">{stats.pending}</strong>
          </span>
          <span>
            Sent: <strong className="text-green-600">{stats.sent}</strong>
          </span>
          <span>
            Failed: <strong className="text-red-600">{stats.failed}</strong>
          </span>
        </div>
        <div className="text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default AutomationTableFooter;
