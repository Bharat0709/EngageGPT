// leadsTableConfig.js
import React from 'react';
import { Icons } from '@utils/constantData/icons';
import {
  PriorityBadge,
  StatusBadge,
} from '@utils/constantData/leadsFunctions/tabsFuncitons';

const Badge = ({ children, className = '', icon: IconComponent }) => (
  <span
    className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${className}`}
  >
    {IconComponent && <IconComponent className="w-2.5 h-2.5 mr-1" />}
    {children}
  </span>
);

export const COLUMN_CONFIG = [
  {
    key: 'contact',
    label: 'Contact',
    sortField: 'author',
    sortable: true,
    minWidth: '200px',
    searchable: true,
    render: (post) => (
      <div className="flex items-center gap-3">
        <div className="min-w-0">
          <div className="text-gray-900 text-xs truncate">{post.author}</div>
          {post.jobRole && (
            <div className="text-xs text-gray-500 truncate">{post.jobRole}</div>
          )}
          {post.authorUrl && (
            <a
              href={post.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"
            >
              <Icons.ExternalLink className="w-2.5 h-2.5" />
              Profile
            </a>
          )}
        </div>
      </div>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    sortField: 'leadStatus',
    sortable: true,
    minWidth: '100px',
    filterable: true,
    filterField: 'leadStatus',
    render: (post) => <StatusBadge status={post.leadStatus} />,
  },
  {
    key: 'priority',
    label: 'Priority',
    sortField: 'leadPriority',
    sortable: true,
    minWidth: '100px',
    filterable: true,
    filterField: 'leadPriority',
    render: (post) => <PriorityBadge priority={post.leadPriority} />,
  },
  {
    key: 'opportunity',
    label: 'Opportunity',
    sortable: false,
    minWidth: '250px',
    searchable: true,
    render: (post) => (
      <div className="space-y-1">
        {post.title && (
          <div className="font-medium text-gray-900 text-xs line-clamp-1">
            {post.title}
          </div>
        )}
        <div className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
          {post.content?.substring(0, 50)}...
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {post.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="text-xs text-gray-400">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    ),
  },
  {
    key: 'category',
    label: 'Category',
    sortable: false,
    minWidth: '120px',
    searchable: true,
    render: (post) =>
      post.category ? (
        <Badge className="bg-green-50 text-green-700" icon={Icons.Tag}>
          {post.category}
        </Badge>
      ) : null,
  },
  {
    key: 'automation',
    label: 'Automation',
    sortable: false,
    minWidth: '120px',
    render: (post) =>
      post.automationEnabled ? (
        <Badge className="bg-pink-50 text-pink-700" icon={Icons.AiRobot}>
          {post.automationEnabled}
        </Badge>
      ) : null,
  },
  {
    key: 'industry',
    label: 'Industry',
    sortable: false,
    minWidth: '120px',
    searchable: true,
    render: (post) =>
      post.industry ? (
        <Badge className="bg-purple-50 text-purple-700" icon={Icons.Building}>
          {post.industry}
        </Badge>
      ) : (
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs">
          N/A
        </span>
      ),
  },
  {
    key: 'budget',
    label: 'Budget',
    sortField: 'budget',
    sortable: true,
    minWidth: '120px',
    render: (post) =>
      post.budget ? (
        <Badge className="bg-green-50 text-green-700" icon={Icons.DollarSign}>
          {post.budget}
        </Badge>
      ) : (
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs">
          N/A
        </span>
      ),
  },
  {
    key: 'contactInfo',
    label: 'Contact Info',
    sortable: false,
    minWidth: '150px',
    render: (post) => (
      <div className="space-y-1">
        {post.emailAddresses && post.emailAddresses.length > 0 && (
          <div className="flex items-center gap-1 text-xs">
            <Icons.Mail className="w-3 h-3 text-blue-500" />
            <span className="text-gray-700">
              {post.emailAddresses.length} email(s)
            </span>
          </div>
        )}
        {post.formLinks && post.formLinks.length > 0 && (
          <div className="flex items-center gap-1 text-xs">
            <Icons.Link className="w-3 h-3 text-green-500" />
            <span className="text-gray-700">
              {post.formLinks.length} link(s)
            </span>
          </div>
        )}
      </div>
    ),
  },
  {
    key: 'engagement',
    label: 'Engagement',
    sortable: false,
    minWidth: '100px',
    render: (post) => (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Icons.Heart className="w-3 h-3 text-red-500" />
          <span className="text-xs text-gray-700">{post.likes || 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icons.Comments className="w-3 h-3 text-blue-500" />
          <span className="text-xs text-gray-700">{post.comments || 0}</span>
        </div>
      </div>
    ),
  },
  {
    key: 'created',
    label: 'Created',
    sortField: 'createdAt',
    sortable: true,
    minWidth: '150px',
    render: (post, formatDate) => (
      <div className="text-xs text-gray-600">
        {formatDate
          ? formatDate(post.createdAt)
          : new Date(post.createdAt).toLocaleDateString()}
      </div>
    ),
  },
  {
    key: 'followUp',
    label: 'Follow Up',
    sortField: 'followUpDate',
    sortable: true,
    minWidth: '120px',
    render: (post, formatDate) =>
      post.followUpDate ? (
        <div className="flex items-center gap-1 text-xs text-orange-600">
          <Icons.Calendar className="w-3 h-3" />
          {formatDate
            ? formatDate(post.followUpDate)
            : new Date(post.followUpDate).toLocaleDateString()}
        </div>
      ) : null,
  },
];

export const ACTIONS_CONFIG = {
  key: 'actions',
  label: 'Actions',
  sortable: false,
  width: '100px',
  align: 'center',
  actions: [
    {
      key: 'view',
      icon: Icons.Eye,
      title: 'View Lead',
      className: 'hover:text-blue-600 hover:bg-blue-50',
      handler: 'onView',
    },
    // {
    //   key: 'edit',
    //   icon: Icons.Edit,
    //   title: 'Edit Lead',
    //   className: 'hover:text-blue-600 hover:bg-blue-50',
    //   handler: 'onEdit',
    // },

    {
      key: 'delete',
      icon: Icons.Trash,
      title: 'Delete Lead',
      className: 'hover:text-red-600 hover:bg-red-50',
      handler: 'onDelete',
    },
    {
      key: 'mail',
      icon: Icons.Mail,
      title: 'Send Mail',
      className: 'hover:text-green-600 hover:bg-green-50',
      handler: 'onMail',
    },
  ],
};

// Utility function to add new columns easily
export const addColumn = (column, position = -1) => {
  if (position === -1) {
    return [...LEADS_COLUMNS, column];
  }
  const newColumns = [...LEADS_COLUMNS];
  newColumns.splice(position, 0, column);
  return newColumns;
};

// Utility function to remove columns
export const removeColumn = (columnKey) => {
  return LEADS_COLUMNS.filter((col) => col.key !== columnKey);
};

// Utility function to reorder columns
export const reorderColumns = (columnKeys) => {
  return columnKeys
    .map((key) => LEADS_COLUMNS.find((col) => col.key === key))
    .filter(Boolean);
};

// Example of how to add a new column:
export const SAMPLE_NEW_COLUMN = {
  key: 'source',
  label: 'Source',
  sortField: 'source',
  sortable: true,
  minWidth: '120px',
  searchable: true,
  render: (post) => (
    <Badge className="bg-blue-50 text-blue-700" icon={Icons.Globe}>
      {post.source || 'Unknown'}
    </Badge>
  ),
};

// Column presets for different views
export const COLUMN_PRESETS = {
  minimal: ['contact', 'status', 'priority', 'opportunity', 'created'],
  detailed: COLUMN_CONFIG.map((col) => col.key),
  sales: ['contact', 'status', 'priority', 'budget', 'followUp', 'contactInfo'],
  marketing: ['contact', 'engagement', 'category', 'industry', 'created'],
};

export const statusOptions = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  {
    value: 'contacted',
    label: 'Contacted',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    value: 'responded',
    label: 'Responded',
    color: 'bg-indigo-100 text-indigo-800',
  },
  {
    value: 'qualified',
    label: 'Qualified',
    color: 'bg-green-100 text-green-800',
  },
  {
    value: 'converted',
    label: 'Converted',
    color: 'bg-purple-100 text-purple-800',
  },
  { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
];

export const priorityOptions = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' },
];

export const automationOptions = [
  { value: 'none', label: 'None', color: 'bg-gray-100 text-gray-800' },
  {
    value: 'semi',
    label: 'Semi Automation',
    color: 'bg-yellow-100 text-yellow-800',
  },
];

export const personalizationOptions = [
  { value: 'basic', label: 'Basic', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
];
