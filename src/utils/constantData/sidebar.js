import { Icons } from './icons';

export const menuItems = [
  {
    to: '/dashboard',
    icon: <Icons.Grid size={18} />,
    label: 'Dashboard',
    activeClass:
      'global-sidebar-button-primary  bg-gradient-to-br from-slate-200 via-gray-50 to-indigo-100',
    hoverClass: 'hover:bg-white hover:text-black',
    tag: null,
  },
  {
    to: '/dashboard/quick-post',
    icon: <Icons.Zap size={18} />,
    label: 'Quick Post',
    activeClass:
      'global-sidebar-button-primary  bg-gradient-to-br from-slate-200 via-gray-50 to-indigo-100',
    hoverClass: 'hover:bg-white hover:text-black',
    tag: { text: 'MOST USED', color: 'bg-red-500' },
  },
  {
    to: '/dashboard/create-post',
    icon: <Icons.Edit size={18} />,
    label: 'AI Content Creator',
    activeClass:
      'global-sidebar-button-primary  bg-gradient-to-br from-slate-200 via-gray-50 to-indigo-100',
    hoverClass: 'hover:bg-white hover:text-black',
    tag: { text: 'HOT', color: 'bg-yellow-500' },
  },
  {
    to: '/dashboard/post-history',
    icon: <Icons.Clock size={18} />,
    label: 'Post History',
    activeClass:
      'global-sidebar-button-primary  bg-gradient-to-br from-slate-200 via-gray-50 to-indigo-100',
    hoverClass: 'hover:bg-white hover:text-black',
    tag: null,
  },
  {
    to: '/dashboard/saved-posts',
    icon: <Icons.Save size={18} />,
    label: 'Saved Posts',
    activeClass:
      'global-sidebar-button-primary  bg-gradient-to-br from-slate-200 via-gray-50 to-indigo-100',
    hoverClass: 'hover:bg-white hover:text-black',
    tag: { text: 'NEW', color: 'bg-blue-500' },
  },
];
