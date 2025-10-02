// AutomationHistoryTable.js - Complete Implementation
import React, { useState, useMemo } from 'react';
import { Icons } from '@utils/constantData/icons';
import FloatingNavigationAutomation from './FloatingNavigationAutomation';
import AutomationTableHeader from './AutomationTableHeader';
import AutomationTableFooter from './AutomationTableFooter';
import NotFound from '@assets/images/PostNotFound.png';
import CustomCheckbox from './CustomCheckbox';

const SortIcon = ({ sortDirection, sortField, field }) => {
  if (sortField !== field) {
    return <Icons.Down className="w-3 h-3 text-gray-400" />;
  }
  return sortDirection === 'asc' ? (
    <Icons.Up className="w-3 h-3 text-blue-600" />
  ) : (
    <Icons.Down className="w-3 h-3 text-blue-600" />
  );
};

const AutomationHistoryTable = ({
  automations = [],
  onView,
  onRetry,
  onCancel,
  onApprove,
  onReject,
  isUpdating,
  onBulkCancel,
  onBulkRetry,
  onBulkApprove,
  onBulkReject,
  showActions = true,
}) => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterDeliveryStatus, setFilterDeliveryStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAutomations, setSelectedAutomations] = useState(new Set());

  // Table Column Configuration
  const COLUMN_CONFIG = [
    {
      key: 'recipient',
      label: 'Recipient',
      sortable: true,
      sortField: 'emailContent.to',
      minWidth: '200px',
    },
    {
      key: 'subject',
      label: 'Subject',
      sortable: true,
      sortField: 'emailContent.subject',
      minWidth: '250px',
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      sortField: 'automationType',
      minWidth: '140px',
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      sortField: 'status',
      minWidth: '130px',
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      sortField: 'priority',
      minWidth: '100px',
    },
    {
      key: 'delivery',
      label: 'Delivery Status',
      sortable: true,
      sortField: 'deliveryStatus',
      minWidth: '130px',
    },
    {
      key: 'template',
      label: 'Template',
      sortable: true,
      sortField: 'templateName',
      minWidth: '150px',
    },
    {
      key: 'created',
      label: 'Created',
      sortable: true,
      sortField: 'createdAt',
      minWidth: '150px',
    },
    {
      key: 'sent',
      label: 'Sent At',
      sortable: true,
      sortField: 'sentAt',
      minWidth: '150px',
    },
  ];

  const ACTIONS_CONFIG = {
    label: 'Actions',
    width: '140px',
    align: 'center',
    actions: [
      {
        key: 'view',
        icon: Icons.Eye,
        handler: 'onView',
        title: 'View Details',
        className: 'hover:bg-blue-50 hover:text-blue-600',
        condition: () => true,
      },
      {
        key: 'approve',
        icon: Icons.Check,
        handler: 'onApprove',
        title: 'Approve',
        className: 'hover:bg-green-50 hover:text-green-600',
        condition: (automation) => automation.status === 'pending_approval',
      },
      {
        key: 'reject',
        icon: Icons.Cross,
        handler: 'onReject',
        title: 'Reject',
        className: 'hover:bg-red-50 hover:text-red-600',
        condition: (automation) => automation.status === 'pending_approval',
      },
      {
        key: 'retry',
        icon: Icons.Refresh,
        handler: 'onRetry',
        title: 'Retry',
        className: 'hover:bg-yellow-50 hover:text-yellow-600',
        condition: (automation) => automation.status === 'failed',
      },
      {
        key: 'cancel',
        icon: Icons.Cross,
        handler: 'onCancel',
        title: 'Cancel',
        className: 'hover:bg-red-50 hover:text-red-600',
        condition: (automation) =>
          ['scheduled', 'approved'].includes(automation.status),
      },
    ],
  };

  const dataToUse = automations.length > 0 ? automations : [];

  const filteredAndSortedAutomations = useMemo(() => {
    let filtered = dataToUse.filter((automation) => {
      const matchesSearch =
        automation.emailContent?.to
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        automation.emailContent?.subject
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        automation.automationType
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        automation.templateName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === 'all' || automation.status === filterStatus;
      const matchesType =
        filterType === 'all' || automation.automationType === filterType;
      const matchesPriority =
        filterPriority === 'all' || automation.priority === filterPriority;
      const matchesDeliveryStatus =
        filterDeliveryStatus === 'all' ||
        automation.deliveryStatus === filterDeliveryStatus;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesPriority &&
        matchesDeliveryStatus
      );
    });

    return filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle nested fields
      if (sortField.includes('.')) {
        const fields = sortField.split('.');
        aValue = fields.reduce((obj, field) => obj?.[field], a);
        bValue = fields.reduce((obj, field) => obj?.[field], b);
      }

      // Handle date fields
      if (
        sortField === 'createdAt' ||
        sortField === 'updatedAt' ||
        sortField === 'sentAt'
      ) {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      }

      // Handle priority sorting
      if (sortField === 'priority') {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[aValue] || 0;
        bValue = priorityOrder[bValue] || 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [
    dataToUse,
    sortField,
    sortDirection,
    filterStatus,
    filterType,
    filterPriority,
    filterDeliveryStatus,
    searchTerm,
  ]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const actionHandlers = {
    onView,
    onRetry,
    onCancel,
    onApprove,
    onReject,
  };

  const bulkActions = [
    {
      key: 'approve',
      label: 'Approve',
      icon: <Icons.Check />,
      className: 'text-green-600 hover:bg-green-50',
      handler: () => {
        const pendingIds = Array.from(selectedAutomations).filter((id) => {
          const automation = dataToUse.find((a) => a._id === id);
          return automation?.status === 'pending_approval';
        });
        if (pendingIds.length > 0) {
          onBulkApprove?.(pendingIds);
        }
      },
    },
    {
      key: 'reject',
      label: 'Reject',
      icon: <Icons.Cross />,
      className: 'text-red-600 hover:bg-red-50',
      handler: () => {
        const pendingIds = Array.from(selectedAutomations).filter((id) => {
          const automation = dataToUse.find((a) => a._id === id);
          return automation?.status === 'pending_approval';
        });
        if (pendingIds.length > 0) {
          onBulkReject?.(pendingIds);
        }
      },
    },
    {
      key: 'cancel',
      label: 'Cancel',
      icon: <Icons.Cross />,
      className: 'text-orange-600 hover:bg-orange-50',
      handler: () => {
        const cancelableIds = Array.from(selectedAutomations).filter((id) => {
          const automation = dataToUse.find((a) => a._id === id);
          return ['scheduled', 'approved'].includes(automation?.status);
        });
        if (cancelableIds.length > 0) {
          onBulkCancel?.(cancelableIds);
        }
      },
    },
    {
      key: 'retry',
      label: 'Retry',
      icon: <Icons.Refresh />,
      className: 'text-yellow-600 hover:bg-yellow-50',
      handler: () => {
        const failedIds = Array.from(selectedAutomations).filter((id) => {
          const automation = dataToUse.find((a) => a._id === id);
          return automation?.status === 'failed';
        });
        if (failedIds.length > 0) {
          onBulkRetry?.(failedIds);
        }
      },
    },
  ];

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = new Set(
        filteredAndSortedAutomations.map((automation) => automation._id),
      );
      setSelectedAutomations(allIds);
    } else {
      setSelectedAutomations(new Set());
    }
  };

  const handleSelectAutomation = (automationId, checked) => {
    const newSelected = new Set(selectedAutomations);
    if (checked) {
      newSelected.add(automationId);
    } else {
      newSelected.delete(automationId);
    }
    setSelectedAutomations(newSelected);
  };

  const handleDeselectAutomations = () => {
    setSelectedAutomations(new Set());
  };

  const isAllSelected =
    filteredAndSortedAutomations.length > 0 &&
    filteredAndSortedAutomations.every((automation) =>
      selectedAutomations.has(automation._id),
    );
  const isIndeterminate = selectedAutomations.size > 0 && !isAllSelected;

  // Helper functions for styling
  const getStatusColor = (status) => {
    const colors = {
      pending_approval: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      sent: 'bg-blue-100 text-blue-800',
      failed: 'bg-red-100 text-red-800',
      scheduled: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getDeliveryStatusColor = (status) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-800',
      delivered: 'bg-green-100 text-green-800',
      bounced: 'bg-red-100 text-red-800',
      failed: 'bg-red-100 text-red-800',
      opened: 'bg-blue-100 text-blue-800',
      clicked: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getAutomationTypeLabel = (type) => {
    const typeLabels = {
      initial_outreach: 'Initial Outreach',
      follow_up_1: 'Follow-up 1',
      follow_up_2: 'Follow-up 2',
      follow_up_3: 'Follow-up 3',
      custom: 'Custom',
      linkedin_message: 'LinkedIn',
    };
    return typeLabels[type] || type;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending_approval: Icons.Clock,
      approved: Icons.Check,
      rejected: Icons.Cross,
      sent: Icons.Send,
      failed: Icons.Alert,
      scheduled: Icons.Calendar,
    };
    return icons[status] || Icons.Circle;
  };

  const formatTimeAgo = (date) => {
    if (!date) return 'N/A';
    const now = new Date();
    const past = new Date(date);
    const diffInHours = Math.floor((now - past) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return past.toLocaleDateString();
  };

  const renderCellContent = (automation, column) => {
    switch (column.key) {
      case 'recipient':
        return (
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {automation.emailContent?.to?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <span
                className="block font-medium text-gray-900 text-sm truncate"
                title={automation.emailContent?.to}
              >
                {automation.emailContent?.to}
              </span>
              {automation.emailContent?.from && (
                <span className="block text-xs text-gray-500 truncate">
                  From: {automation.emailContent.from}
                </span>
              )}
            </div>
          </div>
        );

      case 'subject':
        return (
          <div className="max-w-xs">
            <span
              className="block text-gray-900 text-sm font-medium truncate mb-1"
              title={automation.emailContent?.subject}
            >
              {automation.emailContent?.subject}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-1.5 py-0.5 text-xs rounded ${
                  automation.emailContent?.format === 'html'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {automation.emailContent?.format?.toUpperCase()}
              </span>
              {automation.emailContent?.attachments?.length > 0 && (
                <div className="flex items-center text-xs text-gray-500">
                  <Icons.Link className="w-3 h-3 mr-1" />
                  {automation.emailContent.attachments.length}
                </div>
              )}
            </div>
          </div>
        );

      case 'type':
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {getAutomationTypeLabel(automation.automationType)}
          </span>
        );

      case 'sequence':
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              {automation.sequenceNumber}
            </span>
            {automation.isPartOfSequence && (
              <Icons.Link
                className="w-3 h-3 text-gray-400"
                title="Part of sequence"
              />
            )}
          </div>
        );

      case 'status':
        const StatusIcon = getStatusIcon(automation.status);
        return (
          <div className="flex items-center gap-2">
            <StatusIcon className="w-4 h-4 text-gray-500" />
            <span
              className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(
                automation.status,
              )}`}
            >
              {automation.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        );

      case 'priority':
        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${getPriorityColor(
              automation.priority,
            )}`}
          >
            {automation.priority.toUpperCase()}
          </span>
        );

      case 'delivery':
        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${getDeliveryStatusColor(
              automation.deliveryStatus,
            )}`}
          >
            {automation.deliveryStatus.toUpperCase()}
          </span>
        );

      case 'template':
        return (
          <div className="max-w-xs">
            {automation.templateName ? (
              <>
                <span
                  className="block text-sm font-medium text-gray-900 truncate"
                  title={automation.templateName}
                >
                  {automation.templateName}
                </span>
                <span className="block text-xs text-gray-500">
                  {automation.templateId ? 'Template' : 'Custom'}
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-400">No template</span>
            )}
          </div>
        );

      case 'created':
        return (
          <div className="text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Icons.Calendar className="w-3 h-3" />
              <span>{new Date(automation.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formatTimeAgo(automation.createdAt)}
            </div>
          </div>
        );

      case 'sent':
        return (
          <div className="text-sm text-gray-600">
            {automation.sentAt ? (
              <>
                <div className="flex items-center gap-1 text-green-600">
                  <Icons.Check className="w-3 h-3" />
                  <span>
                    {new Date(automation.sentAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatTimeAgo(automation.sentAt)}
                </div>
              </>
            ) : (
              <span className="text-gray-400 text-xs">Not sent</span>
            )}
          </div>
        );

      case 'metrics':
        return (
          <div className="text-xs space-y-1">
            {automation.status === 'sent' && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Opens:</span>
                  <span className="font-medium">
                    {automation.openRate || 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Clicks:</span>
                  <span className="font-medium">
                    {automation.clickRate || 0}%
                  </span>
                </div>
                {automation.responseReceived && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Icons.MessageCircle className="w-3 h-3" />
                    <span>Reply</span>
                  </div>
                )}
              </>
            )}
            {automation.status === 'failed' && automation.errorMessage && (
              <div
                className="text-red-600 truncate"
                title={automation.errorMessage}
              >
                <Icons.Alert className="w-3 h-3 inline mr-1" />
                Error
              </div>
            )}
            {automation.retryCount > 0 && (
              <div className="text-yellow-600">
                <Icons.Refresh className="w-3 h-3 inline mr-1" />
                Retry {automation.retryCount}/{automation.maxRetries}
              </div>
            )}
          </div>
        );

      default:
        return automation[column.key];
    }
  };

  // Empty state
  if (filteredAndSortedAutomations.length === 0 && automations.length === 0) {
    return (
      <div className="bg-white rounded-2xl">
        <AutomationTableHeader
          filteredAutomations={[]}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={filterStatus}
          setStatusFilter={setFilterStatus}
          typeFilter={filterType}
          setTypeFilter={setFilterType}
          priorityFilter={filterPriority}
          setPriorityFilter={setFilterPriority}
          deliveryStatusFilter={filterDeliveryStatus}
          setDeliveryStatusFilter={setFilterDeliveryStatus}
        />
        <div className="rounded-lg mt-8 p-8">
          <div className="text-center">
            <img
              src={NotFound}
              alt="No automation history found"
              className="mx-auto mb-4 w-56 h-48"
            />
             <h3 className="text-2xl font-medium text-gray-900 mb-2">
             Automations Coming Soon! Stay Tuned.
            </h3>
            {/* <h3 className="text-lg font-medium text-gray-900 mb-2">
              No automation history found
            </h3> */}
            <p className="text-gray-500 mb-4">
              Automation history will appear here once you start using automated
              emails
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm">
      <AutomationTableHeader
        filteredAutomations={filteredAndSortedAutomations}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={filterStatus}
        setStatusFilter={setFilterStatus}
        typeFilter={filterType}
        setTypeFilter={setFilterType}
        priorityFilter={filterPriority}
        setPriorityFilter={setFilterPriority}
        deliveryStatusFilter={filterDeliveryStatus}
        setDeliveryStatusFilter={setFilterDeliveryStatus}
      />

      {selectedAutomations.size > 0 && (
        <FloatingNavigationAutomation
          selectedAutomations={selectedAutomations}
          handleDeselectAutomations={handleDeselectAutomations}
          bulkActions={bulkActions}
        />
      )}

      {/* Main Table */}
      <div className="overflow-x-auto">
        <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="py-4 px-4 w-12 border-b border-gray-200">
                  <CustomCheckbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={() => handleSelectAll(!isAllSelected)}
                  />
                </th>
                {COLUMN_CONFIG.map((column) => (
                  <th
                    key={column.key}
                    className={`text-left py-4 px-4 font-semibold text-gray-700 text-xs border-b border-gray-200 ${
                      column.minWidth ? `min-w-[${column.minWidth}]` : ''
                    }`}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.sortable ? (
                      <button
                        onClick={() => handleSort(column.sortField)}
                        className="flex items-center gap-2 hover:text-blue-600 transition-colors group"
                      >
                        {column.label}
                        <SortIcon
                          sortDirection={sortDirection}
                          sortField={sortField}
                          field={column.sortField}
                        />
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
                {showActions && (
                  <th
                    className={`py-4 px-4 font-semibold text-gray-700 text-xs border-b border-gray-200 ${
                      ACTIONS_CONFIG.align === 'center'
                        ? 'text-center'
                        : 'text-left'
                    }`}
                    style={{ width: ACTIONS_CONFIG.width }}
                  >
                    {ACTIONS_CONFIG.label}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAndSortedAutomations.map((automation, index) => (
                <tr
                  key={automation._id}
                  className={`group transition-all hover:bg-blue-25 duration-200 ${
                    selectedAutomations.has(automation._id)
                      ? 'bg-blue-50 border-l-4 border-l-blue-500'
                      : 'hover:shadow-sm'
                  }`}
                >
                  <td className="py-4 px-4">
                    <CustomCheckbox
                      checked={selectedAutomations.has(automation._id)}
                      onChange={() =>
                        handleSelectAutomation(
                          automation._id,
                          !selectedAutomations.has(automation._id),
                        )
                      }
                    />
                  </td>
                  {COLUMN_CONFIG.map((column) => (
                    <td key={column.key} className="py-4 px-4 align-top">
                      {renderCellContent(automation, column)}
                    </td>
                  ))}
                  {showActions && (
                    <td className="py-4 px-4 align-top">
                      <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {ACTIONS_CONFIG.actions
                          .filter((action) => action.condition(automation))
                          .map((action) => {
                            const IconComponent = action.icon;
                            const handler = actionHandlers[action.handler];

                            return (
                              <button
                                key={action.key}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handler?.(automation);
                                }}
                                className={`p-2 text-gray-600 rounded-lg transition-all duration-150 ${action.className}`}
                                title={action.title}
                              >
                                <IconComponent className="w-4 h-4" />
                              </button>
                            );
                          })}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AutomationTableFooter dataToUse={filteredAndSortedAutomations} />
    </div>
  );
};

export default AutomationHistoryTable;
