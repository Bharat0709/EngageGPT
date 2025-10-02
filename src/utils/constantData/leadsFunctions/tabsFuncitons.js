// Professional status configuration
import { Icons } from '../icons';

export const statusConfig = {
  new: { color: '#3b82f6', bg: '#eff6ff', text: '#1e40af', label: 'New' },
  contacted: {
    color: '#f59e0b',
    bg: '#fffbeb',
    text: '#92400e',
    label: 'Contacted',
  },
  responded: {
    color: '#10b981',
    bg: '#ecfdf5',
    text: '#047857',
    label: 'Responded',
  },
  qualified: {
    color: '#8b5cf6',
    bg: '#f3e8ff',
    text: '#6b21a8',
    label: 'Qualified',
  },
  converted: {
    color: '#06b6d4',
    bg: '#ecfeff',
    text: '#0891b2',
    label: 'Converted',
  },
  closed: {
    color: '#6b7280',
    bg: '#f9fafb',
    text: '#374151',
    label: 'Closed',
  },
  rejected: {
    color: '#ef4444',
    bg: '#fef2f2',
    text: '#dc2626',
    label: 'Rejected',
  },
};

export const priorityConfig = {
  low: {
    color: '#10b981',
    bg: '#ecfdf5',
    text: '#047857',
    icon: '●',
    label: 'Low',
  },
  medium: {
    color: '#f59e0b',
    bg: '#fffbeb',
    text: '#92400e',
    icon: '●●',
    label: 'Medium',
  },
  high: {
    color: '#f97316',
    bg: '#fff7ed',
    text: '#c2410c',
    icon: '●●●',
    label: 'High',
  },
  urgent: {
    color: '#ef4444',
    bg: '#fef2f2',
    text: '#dc2626',
    icon: '🔥',
    label: 'Urgent',
  },
};

export const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.new;
  return (
    <div
      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      <div
        className="w-2 text-xs h-2 rounded-full mr-1.5"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </div>
  );
};

export const PriorityBadge = ({ priority }) => {
  const config = priorityConfig[priority] || priorityConfig.medium;
  return (
    <div
      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      <Icons.Flag className="w-2.5 h-2.5 mr-1" />
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </div>
  );
};

export const SortIcon = ({ field, sortField, sortDirection }) => {
  if (sortField !== field)
    return <Icons.Up className="w-3 h-3 text-gray-400" />;
  return sortDirection === 'asc' ? (
    <Icons.Up className="w-3 h-3 text-blue-600" />
  ) : (
    <Icons.Down className="w-3 h-3 text-blue-600" />
  );
};
