import { Icons } from './icons';

export const menuItems = [
  // --- Section 1: Dashboard & Posting (Orange Theme) ---
  // {
  //   type: 'section',
  //   label: 'DASHBOARD & POSTING',
  //   key: 'section_dashboard',
  //   lineColor: 'bg-black',
  // },
  {
    type: 'link',
    to: '/dashboard',
    icon: <Icons.Grid size={18} />,
    label: 'Dashboard',
    activeClass: 'bg-gray-200 border-l-4 border-black text-white',
    hoverClass: 'hover:bg-gray-100 hover:translate-x-1 hover:text-black',
    tag: null,
  },
  {
    type: 'link',
    to: '/dashboard/quick-post',
    icon: <Icons.Zap size={18} />,
    label: 'Quick Post',
    activeClass: 'bg-slate-200 border-l-4 border-red-500 text-black',
    hoverClass: 'hover:bg-gray-100 hover:translate-x-1 hover:text-black',
    tag: { text: 'MOST USED', color: 'bg-red-500' },
  },
  {
    type: 'link',
    to: '/dashboard/create-post',
    icon: <Icons.Edit size={18} />,
    label: 'AI Content Creator',
    activeClass: 'bg-slate-200 border-l-4 border-yellow-500 text-black',
    hoverClass: 'hover:bg-gray-100 hover:translate-x-1 hover:text-black',
    tag: { text: 'HOT', color: 'bg-yellow-500' },
  },
  {
    type: 'link',
    to: '/dashboard/post-history',
    icon: <Icons.Clock size={18} />,
    label: 'Post History',
    activeClass: 'bg-slate-200 border-l-4 border-green-500 text-black',
    hoverClass: 'hover:bg-gray-100 hover:translate-x-1 hover:text-black',
    tag: null,
  },

  // --- Section 2: Leads & Automation (Red Theme) ---
  // {
  //   type: 'section',
  //   label: 'LEADS & AUTOMATION',
  //   key: 'section_leads',
  //   lineColor: 'bg-red-500',
  //   tag: null, // Example section tag
  // },
  {
    type: 'link',
    to: '/dashboard/saved-leads',
    icon: <Icons.Save size={18} />,
    label: 'Leads',
    activeClass: 'bg-slate-100 border-l-4 border-red-500 text-black',
    hoverClass: 'hover:bg-gray-100 hover:translate-x-1 hover:text-black',
    tag: { text: 'NEW', color: 'bg-blue-500' },
  },
  {
    type: 'link',
    to: '/dashboard/leads-automation',
    icon: <Icons.Robot size={18} />,
    label: 'Automation',
    activeClass: 'bg-slate-200  border-l-4 border-yellow-500    text-black',
    hoverClass: 'hover:bg-gray-100 hover:translate-x-1 hover:text-black',
    tag: { text: 'NEW', color: 'bg-blue-500' },
  },

  // --- Section 3: Email & Other (Green Theme) ---
  // {
  //   type: 'section',
  //   label: 'EMAILS',
  //   key: 'section_email',
  //   lineColor: 'bg-green-500',
  // },
  {
    type: 'link',
    to: '/dashboard/email-templates',
    icon: <Icons.Mail size={18} />,
    label: 'Email Templates',
    activeClass: 'bg-slate-200 border-l-4 border-green-500  text-black',
    hoverClass: 'hover:bg-gray-100 hover:translate-x-1 hover:text-black',
    tag: { text: 'NEW', color: 'bg-blue-500' },
  },
  // {
  //   type: 'section',
  //   label: 'OTHER',
  //   key: 'section_other',
  //   lineColor: 'bg-red-500',
  //   tag: null, // Example section tag
  // },
  {
    type: 'link',
    to: '/dashboard/settings',
    icon: <Icons.Settings size={18} />,
    label: 'Settings',
    activeClass: 'bg-slate-200 border-l-4 border-green-500  text-black',
    hoverClass: 'hover:bg-gray-100 hover:translate-x-1 hover:text-black',
    tag: null,
  },
];
