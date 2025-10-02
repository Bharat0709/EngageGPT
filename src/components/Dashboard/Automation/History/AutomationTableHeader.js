// AutomationTableHeader.js
import React, { useState } from 'react';
import { Icons } from '@utils/constantData/icons';

const AutomationTableHeader = ({
  filteredAutomations,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
}) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status', icon: '📋' },
    { value: 'pending_approval', label: 'Pending Approval', icon: '⏳' },
    { value: 'approved', label: 'Approved', icon: '✅' },
    { value: 'rejected', label: 'Rejected', icon: '❌' },
    { value: 'sent', label: 'Sent', icon: '📤' },
    { value: 'failed', label: 'Failed', icon: '⚠️' },
    { value: 'scheduled', label: 'Scheduled', icon: '📅' },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types', icon: '📧' },
    { value: 'initial_outreach', label: 'Initial Outreach', icon: '👋' },
    { value: 'follow_up_1', label: 'Follow-up 1', icon: '🔄' },
    { value: 'follow_up_2', label: 'Follow-up 2', icon: '🔄' },
    { value: 'follow_up_3', label: 'Follow-up 3', icon: '🔄' },
    { value: 'custom', label: 'Custom', icon: '⚙️' },
    { value: 'linkedin_message', label: 'LinkedIn', icon: '💼' },
  ];

  const selectedStatus = statusOptions.find(
    (status) => status.value === statusFilter,
  );
  const selectedType = typeOptions.find((type) => type.value === typeFilter);

  return (
    <div className="px-4 py-4 bg-white rounded-t-2xl">
      <div className="flex flex-col rounded-2xl lg:flex-row items-center lg:justify-between gap-4">
        <div className="flex lg:flex-row flex-col items-center gap-3">
          <p className="m-0 text-gray-400 italic text-md">
            {filteredAutomations.length} Automation Records
          </p>
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search automations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full border-gray-400 text-xs w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Section */}
          <div className="flex items-center gap-2">
            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowTypeDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-xs bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <span>{selectedStatus?.label}</span>
                <Icons.Down
                  className={`w-3 h-3 transition-transform ${
                    showStatusDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showStatusDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg z-50 max-h-60 overflow-y-scroll scrollbar-hide">
                  {statusOptions.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => {
                        setStatusFilter(status.value);
                        setShowStatusDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 flex items-center gap-2 ${
                        statusFilter === status.value
                          ? 'bg-gray-50 text-gray-600'
                          : 'text-gray-700'
                      }`}
                    >
                      <span>{status.label}</span>
                      {statusFilter === status.value && (
                        <Icons.Check className="w-3 h-3 ml-auto text-gray-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Type Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowTypeDropdown(!showTypeDropdown);
                  setShowStatusDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-xs bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <span>{selectedType?.label}</span>
                <Icons.Down
                  className={`w-3 h-3 transition-transform ${
                    showTypeDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showTypeDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg z-50 max-h-60 overflow-y-scroll scrollbar-hide">
                  {typeOptions.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => {
                        setTypeFilter(type.value);
                        setShowTypeDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 flex items-center gap-2 ${
                        typeFilter === type.value
                          ? 'bg-gray-50 text-gray-600'
                          : 'text-gray-700'
                      }`}
                    >
                      <span>{type.label}</span>
                      {typeFilter === type.value && (
                        <Icons.Check className="w-3 h-3 ml-auto text-gray-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <span>
              Pending:{' '}
              {
                filteredAutomations.filter(
                  (a) => a.status === 'pending_approval',
                ).length
              }
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>
              Sent:{' '}
              {filteredAutomations.filter((a) => a.status === 'sent').length}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <span>
              Failed:{' '}
              {filteredAutomations.filter((a) => a.status === 'failed').length}
            </span>
          </div>
        </div>
      </div>

      {/* Click outside handler */}
      {(showStatusDropdown || showTypeDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowStatusDropdown(false);
            setShowTypeDropdown(false);
          }}
        />
      )}
    </div>
  );
};

export default AutomationTableHeader;
