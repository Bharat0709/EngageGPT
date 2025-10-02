import { Icons } from '@utils/constantData/icons';

export const categories = [
  { value: 'all', label: 'All Categories', icon: '📂' },
  {
    value: 'outreach',
    label: 'Outreach',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    value: 'follow_up',
    label: 'Follow Up',
    color: 'bg-green-100 text-green-800',
    icon: '🔄',
  },
  {
    value: 'introduction',
    label: 'Introduction',
    color: 'bg-purple-100 text-purple-800',
    icon: '👋',
  },
  {
    value: 'networking',
    label: 'Networking',
    color: 'bg-orange-100 text-orange-800',
    icon: '🤝',
  },
  {
    value: 'cold_email',
    label: 'Cold Email',
    color: 'bg-cyan-100 text-cyan-800',
    icon: '❄️',
  },
  {
    value: 'meeting_request',
    label: 'Meeting',
    color: 'bg-indigo-100 text-indigo-800',
    icon: '📅',
  },
  {
    value: 'thank_you',
    label: 'Thank You',
    color: 'bg-pink-100 text-pink-800',
    icon: '💝',
  },
  {
    value: 'proposal',
    label: 'Proposal',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '📋',
  },
  {
    value: 'custom',
    label: 'Custom',
    color: 'bg-gray-100 text-gray-800',
    icon: '⚙️',
  },
];

export const typeOptions = [
  { value: 'all', label: 'All Types', icon: '📋' },
  { value: 'html', label: 'HTML', icon: '🌐' },
  { value: 'text', label: 'Text', icon: '📄' },
];

export const COLUMN_CONFIG = [
  {
    key: 'name',
    label: 'Template Name',
    minWidth: '200px',
    sortable: true,
    sortField: 'name',
  },
  {
    key: 'category',
    label: 'Category',
    minWidth: '120px',
    sortable: true,
    sortField: 'category',
  },
  {
    key: 'subject',
    label: 'Subject Line',
    minWidth: '250px',
    sortable: true,
    sortField: 'subject',
  },
  {
    key: 'type',
    label: 'Type',
    minWidth: '80px',
    sortable: true,
    sortField: 'templateType',
  },
  {
    key: 'placeholders',
    label: 'Placeholders',
    minWidth: '100px',
    sortable: false,
  },
  {
    key: 'created',
    label: 'Created',
    minWidth: '100px',
    sortable: true,
    sortField: 'createdAt',
  },
];

export const ACTIONS_CONFIG = {
  label: 'Actions',
  width: '120px',
  align: 'center',
  actions: [
    {
      key: 'view',
      icon: Icons.Eye,
      handler: 'onView',
      title: 'View template',
      className: 'hover:text-blue-600 hover:bg-blue-50',
    },
    {
      key: 'edit',
      icon: Icons.Edit,
      handler: 'onEdit',
      title: 'Edit template',
      className: 'hover:text-green-600 hover:bg-green-50',
    },
    {
      key: 'clone',
      icon: Icons.Copy,
      handler: 'onClone',
      title: 'Clone template',
      className: 'hover:text-purple-600 hover:bg-purple-50',
    },
    {
      key: 'star',
      icon: Icons.Star,
      handler: 'onSetDefault',
      title: 'Set as default',
      className: 'hover:text-yellow-600 hover:bg-yellow-50',
    }
  ],
};
