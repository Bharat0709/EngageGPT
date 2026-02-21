import React, { useState, useMemo } from 'react';
import { Icons } from '@utils/constantData/icons';
import { COLUMN_CONFIG, ACTIONS_CONFIG, categories } from './Utils/Constant';
import CustomCheckbox from './CustomCheckbox';
import BulkActionModalTemplates from './BulkActionModalTemplate';
import FloatingNavigationTemplates from './FloatingNavigation';
import TemplateTableFooter from './TemplatesTableFooter';
import TemplateTableHeader from './TemplatesTableHeader';
import NotFound from '@assets/images/PostNotFound.png';

// Sort icon component
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

const TemplatesTable = ({
  templates = [],
  onEdit,
  onView,
  onClone,
  onSetDefault,
  isUpdating,
  onCreateTemplate,
  onBulkDelete,
  onBulkUpdateCategory,
  onBulkUpdateType,
  onBulkUpdateStatus,
  columns = COLUMN_CONFIG,
  showActions = true,
}) => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState(new Set());

  const [bulkModal, setBulkModal] = useState({
    isOpen: false,
    type: null,
    data: null,
  });

  const dataToUse = templates.length > 0 ? templates : [];

  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = dataToUse.filter((template) => {
      const matchesSearch =
        template.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === 'all' || template.category === filterCategory;
      const matchesType =
        filterType === 'all' || template.templateType === filterType;

      return matchesSearch && matchesCategory && matchesType;
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
    filterCategory,
    filterType,
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
    onEdit,
    onView,
    onClone,
    onSetDefault,
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
      key: 'updateCategory',
      label: 'Category',
      icon: <Icons.Tag />,
      className: 'text-blue-600 hover:bg-blue-50',
      handler: () =>
        setBulkModal({ isOpen: true, type: 'category', data: null }),
    },
    {
      key: 'updateType',
      label: 'Type',
      icon: <Icons.Code className="w-4 h-4" />,
      className: 'text-green-600 hover:bg-green-50',
      handler: () => setBulkModal({ isOpen: true, type: 'type', data: null }),
    },
  ];

  const handleBulkAction = (actionData) => {
    const templateIds = Array.from(selectedTemplates);

    switch (bulkModal.type) {
      case 'delete':
        onBulkDelete?.(templateIds);
        break;
      case 'category':
        onBulkUpdateCategory?.(templateIds, actionData.category);
        break;
      case 'type':
        onBulkUpdateType?.(templateIds, actionData.templateType);
        break;
      case 'setDefault':
        onBulkUpdateStatus?.(actionData.templateId, actionData.isDefault);
        break;
    }

    setBulkModal({ isOpen: false, type: null, data: null });
    setSelectedTemplates(new Set());
  };

  const closeBulkModal = () => {
    setBulkModal({ isOpen: false, type: null, data: null });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = new Set(
        filteredAndSortedTemplates.map((template) => template._id),
      );
      setSelectedTemplates(allIds);
    } else {
      setSelectedTemplates(new Set());
    }
  };

  const handleSelectTemplate = (templateId, checked) => {
    const newSelected = new Set(selectedTemplates);
    if (checked) {
      newSelected.add(templateId);
    } else {
      newSelected.delete(templateId);
    }
    setSelectedTemplates(newSelected);
  };

  const handleDeselectTemplates = () => {
    setSelectedTemplates(new Set());
    setBulkModal({ isOpen: false, type: null, data: null });
  };

  const isAllSelected =
    filteredAndSortedTemplates.length > 0 &&
    filteredAndSortedTemplates.every((template) =>
      selectedTemplates.has(template._id),
    );
  const isIndeterminate = selectedTemplates.size > 0 && !isAllSelected;

  const renderCellContent = (template, column) => {
    switch (column.key) {
      case 'name':
        return (
          <div className="flex items-center space-x-2">
            <span
              className="font-medium text-gray-900 text-sm"
              title={template.name}
            >
              {template.name.length > 25
                ? `${template.name.substring(0, 25)}...`
                : template.name}
            </span>
            {template.isDefault && (
              <Icons.Star className="w-4 h-4 text-yellow-500 fill-current" />
            )}
          </div>
        );

      case 'category':
        const category = categories.find(
          (cat) => cat.value === template.category,
        );
        return (
          <span
            className={`inline-flex  items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${
              category?.color || 'bg-gray-100 text-gray-800'
            }`}
          >
            {category?.label || template.category}
          </span>
        );

      case 'subject':
        return (
          <span className="text-gray-600 text-sm truncate max-w-xs block">
            {template.subject}
          </span>
        );

      case 'type':
        return (
          <span
            className={`inline-flex items-center px-4 py-1 text-xs font-medium rounded-full ${
              template.templateType === 'html'
                ? 'bg-green-50 text-green-800'
                : 'bg-gray-50 text-gray-800'
            }`}
          >
            {template.templateType === 'html' && (
              <Icons.Code className="w-3 h-3 mr-1" />
            )}
            {template.templateType.toUpperCase()}
          </span>
        );

      case 'placeholders':
        return (
          <div className="flex items-center text-gray-600 text-sm">
            <Icons.Tag className="w-3 h-3 mr-1" />
            {template.placeholders?.length || 0}
          </div>
        );

      case 'created':
        return (
          <div className="flex items-center text-gray-600 text-sm">
            <Icons.Calendar className="w-3 h-3 mr-1" />
            {new Date(template.createdAt).toLocaleDateString()}
          </div>
        );

      default:
        return template[column.key];
    }
  };

  if (filteredAndSortedTemplates.length === 0 && templates.length === 0) {
    return (
      <div className="bg-white rounded-2xl">
        <TemplateTableHeader
          filteredTemplates={[]}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onCreateTemplate={onCreateTemplate}
          categoryFilter={filterCategory}
          setCategoryFilter={setFilterCategory}
          typeFilter={filterType}
          setTypeFilter={setFilterType}
        />
        <div className="rounded-lg mt-8 p-8">
          <div className="text-center">
            <img
              src={NotFound}
              alt="No templates found"
              className="mx-auto mb-4 w-56 h-48"
            />
            <h3 className="text-lg geist  uppercase font-medium text-gray-900 mb-2">
              No templates found
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by creating your first email template
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl h-full">
      <TemplateTableHeader
        filteredTemplates={filteredAndSortedTemplates}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCreateTemplate={onCreateTemplate}
        categoryFilter={filterCategory}
        setCategoryFilter={setFilterCategory}
        typeFilter={filterType}
        setTypeFilter={setFilterType}
      />

      {selectedTemplates.size > 0 && (
        <>
          <BulkActionModalTemplates
            isUpdating={isUpdating}
            closeBulkModal={closeBulkModal}
            bulkModal={bulkModal}
            selectedTemplates={selectedTemplates}
            handleBulkAction={handleBulkAction}
          />
          <FloatingNavigationTemplates
            selectedTemplates={selectedTemplates}
            handleDeselectTemplates={handleDeselectTemplates}
            bulkActions={bulkActions}
          />
        </>
      )}

      {/* Table */}
      <div className="overflow-x-auto max-h-[75dvh] overflow-y-scroll scrollbar-hide">
        <table className="w-full overflow-y-scroll table-auto border-separate border-spacing-0">
          <thead className="bg-cyan-50">
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
                  className={`py-3 px-4 font-medium text-black text-xs ${
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
          <tbody className="divide-y overflow-y-scroll scrollbar-hide divide-gray-100">
            {filteredAndSortedTemplates.map((template, index) => (
              <tr
                key={template._id}
                className={`group transition-all hover:bg-gray-50 duration-300 cursor-pointer ${
                  index % 2 === 0 ? 'bg-white ' : 'bg-white '
                }`}
              >
                <td className="py-3 px-4">
                  <CustomCheckbox
                    checked={selectedTemplates.has(template._id)}
                    onChange={() =>
                      handleSelectTemplate(
                        template._id,
                        !selectedTemplates.has(template._id),
                      )
                    }
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="py-3 px-4">
                    {renderCellContent(template, column)}
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
                              handler?.(template);
                            }}
                            className={`p-1.5 text-gray-700 rounded transition-all ${action.className}`}
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
      <TemplateTableFooter dataToUse={filteredAndSortedTemplates} />
    </div>
  );
};

export default TemplatesTable;
