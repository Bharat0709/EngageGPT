import React, { useState, useMemo } from 'react';
import { Icons } from '@utils/constantData/icons';
import LeadsIcon from '@assets/images/leads.svg';
import { COLUMN_CONFIG, ACTIONS_CONFIG } from './ColumnConfig';
import { SortIcon } from '@utils/constantData/leadsFunctions/tabsFuncitons';
import CustomCheckbox from './CustomCheckBox';
import BulkActionModal from './BulkActionModal';
import FloatingNavigation from './FloatingNavigation';
import TableFooter from './Footer';
import TableHeader from './TableHeader';
import LeadPage from '../LeadPage';
import EmailSendModal from '../MailLeads/MailModal';

const LeadsTable = ({
  posts = [],
  onEdit,
  onDelete,
  isUpdating,
  onSendMail,
  setCurrentLead,
  formatDate,
  onBulkDelete,
  onBulkUpdateStatus,
  onBulkUpdatePriority,
  onBulkUpdateAutomation,
  columns = COLUMN_CONFIG,
  setActiveTab,
  showActions = true,
}) => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState(new Set());
  const [isMailModalOpen, setSendMailModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const dataToUse = posts.length > 0 ? posts : [];

  const [bulkModal, setBulkModal] = useState({
    isOpen: false,
    type: null,
    data: null,
  });

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = dataToUse.filter((post) => {
      const matchesSearch =
        post.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === 'all' || post.leadStatus === filterStatus;
      const matchesPriority =
        filterPriority === 'all' || post.leadPriority === filterPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    return filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'createdAt' || sortField === 'updatedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
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
    filterPriority,
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

  const onView = (post) => {
    setSelectedLead(post);
    setShowLeadModal(true);
  };

  const onMail = (post) => {
    setActiveTab('mail');
    setSelectedLead(post);
    setCurrentLead(post);
    setSendMailModalOpen(true);
  };

  const actionHandlers = {
    onEdit,
    onDelete,
    onSendMail,
    onView,
    onMail,
  };

  const bulkActions = [
    {
      key: 'delete',
      label: `Delete`,
      icon: <Icons.Trash />,
      className: 'text-red-600 hover:bg-red-50',
      handler: () => setBulkModal({ isOpen: true, type: 'delete', data: null }),
    },
    {
      key: 'updateStatus',
      label: 'Status',
      icon: <Icons.Edit />,
      className: 'text-green-600 hover:bg-green-50',
      handler: () => setBulkModal({ isOpen: true, type: 'status', data: null }),
    },
    {
      key: 'updatePriority',
      label: 'Priority',
      icon: <Icons.Edit />,
      className: 'text-orange-600 hover:bg-orange-50',
      handler: () =>
        setBulkModal({ isOpen: true, type: 'priority', data: null }),
    },
    {
      key: 'updateAutomation',
      label: 'Automation',
      icon: <Icons.Edit />,
      className: 'text-orange-600 hover:bg-orange-50',
      handler: () =>
        setBulkModal({ isOpen: true, type: 'automation', data: null }),
    },
    {
      key: 'export',
      label: 'Export',
      icon: <Icons.Download />,
      className: 'text-purple-600 hover:bg-purple-50',
      handler: () => console.log('Export selected leads'),
    },
  ];

  const handleBulkAction = (actionData) => {
    const leadIds = Array.from(selectedLeads);

    switch (bulkModal.type) {
      case 'delete':
        onBulkDelete?.(leadIds);
        break;
      case 'status':
        onBulkUpdateStatus?.(leadIds, actionData.status);
        break;
      case 'priority':
        onBulkUpdatePriority?.(leadIds, actionData.priority);
        break;
      case 'automation':
        console.log('actionData:', actionData);
        onBulkUpdateAutomation?.(leadIds, actionData);
        break;
    }

    setBulkModal({ isOpen: false, type: null, data: null });
    setSelectedLeads(new Set());
  };

  const closeBulkModal = () => {
    setBulkModal({ isOpen: false, type: null, data: null });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = new Set(filteredAndSortedPosts.map((post) => post._id));
      setSelectedLeads(allIds);
    } else {
      setSelectedLeads(new Set());
    }
  };

  const handleSelectLead = (leadId, checked) => {
    const newSelected = new Set(selectedLeads);
    if (checked) {
      newSelected.add(leadId);
    } else {
      newSelected.delete(leadId);
    }
    setSelectedLeads(newSelected);
  };

  const handleDeselectLeads = () => {
    setSelectedLeads(new Set());
    setBulkModal({ isOpen: false, type: null, data: null });
  };

  const isAllSelected =
    filteredAndSortedPosts.length > 0 &&
    filteredAndSortedPosts.every((post) => selectedLeads.has(post._id));
  const isIndeterminate = selectedLeads.size > 0 && !isAllSelected;

  if (filteredAndSortedPosts.length === 0) {
    return (
      <div className=" rounded-2xl bg-white p-0">
        <TableHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredAndSortedPosts={filteredAndSortedPosts}
        />
        <div className="text-center mt-4">
          <img src={LeadsIcon} alt="leads" className="mx-auto  mb-4 lg:w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl">
      <TableHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        postsLength={filteredAndSortedPosts.length}
      />

      {isMailModalOpen && (
        <EmailSendModal
          selectedLeads={selectedLeads}
          postData={selectedLead}
          onClose={() => setSendMailModalOpen(false)}
        />
      )}

      {selectedLeads.size > 0 && (
        <>
          <BulkActionModal
            isUpdating={isUpdating}
            closeBulkModal={closeBulkModal}
            bulkModal={bulkModal}
            selectedLeads={selectedLeads}
            handleBulkAction={handleBulkAction}
          />
          <FloatingNavigation
            selectedLeads={selectedLeads}
            handleDeselectLeads={handleDeselectLeads}
            bulkActions={bulkActions}
          />
        </>
      )}

      {showLeadModal && (
        <LeadPage
          leadData={selectedLead}
          onClose={() => {
            setShowLeadModal(false);
            setSelectedLead(null);
          }}
        />
      )}

      {/* Table */}
      <div className="overflow-x-scroll scrollbar-hide">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 w-12">
                <CustomCheckbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={() => handleSelectAll(!isAllSelected)}
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left py-3 px-4 font-medium text-gray-700 text-xs ${
                    column.minWidth ? `min-w-[${column.minWidth}]` : ''
                  }`}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.sortField)}
                      className="flex items-center gap-2 hover:text-blue-600"
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
                  className={`py-3 px-4 font-medium text-gray-700 text-xs ${
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
            {filteredAndSortedPosts.map((post) => (
              <tr
                key={post._id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="py-3 px-4">
                  <CustomCheckbox
                    checked={selectedLeads.has(post._id)}
                    onChange={() =>
                      handleSelectLead(post._id, !selectedLeads.has(post._id))
                    }
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="py-3 px-4">
                    {column.render(post, formatDate)}
                  </td>
                ))}
                {showActions && (
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      {ACTIONS_CONFIG.actions.map((action) => {
                        const IconComponent = action.icon;
                        const handler = actionHandlers[action.handler];

                        return (
                          <button
                            key={action.key}
                            onClick={(e) => {
                              e.stopPropagation();
                              handler?.(post);
                            }}
                            className={`p-1.5 text-gray-400 rounded transition-all ${action.className}`}
                            title={action.title}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
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
      <TableFooter dataToUse={filteredAndSortedPosts} />
    </div>
  );
};

export default LeadsTable;
