// utils/navigationRoutes.js
import React from 'react';
import {
  MdDashboard,
  MdBolt,
  MdAutoAwesome,
  MdHistory,
  MdBookmark,
  MdRepeat,
  MdEmail,
  MdSettings,
  MdPerson,
  MdCalendarToday,
  MdNotifications,
  MdHelp,
  MdFeedback,
  MdLogout,
  MdLock,
  MdInfo,
} from 'react-icons/md';
import { Icons } from './constantData/icons';
import { isAction } from 'redux';

export const navigationRoutes = [
  // ===== ENGAGEGPT MCP =====
  {
    title: 'EngageGPT MCP',
    description: 'Connect your writing persona to Claude AI via MCP',
    path: '/dashboard/mcp',
    icon: <Icons.Code size={20} className="text-gray-700" />,
    keywords: ['mcp', 'claude', 'persona', 'connect', 'server', 'engagegpt'],
    category: 'Main',
  },

  // ===== MAIN DASHBOARD =====
  {
    title: 'Add More Credits',
    description: 'Add more credits to your account',
    icon: <Icons.Credits size={20} className="text-gray-700" />,
    keywords: ['upgarde', 'top-up'],
    category: 'Main',
    isAction: true,
    path: '#upgrade',
  },

  {
    title: 'Credits & Usage',
    description: 'Know how your credits are being spent by various features',
    icon: <Icons.TrendingUp size={20} className="text-gray-700" />,
    keywords: ['credits', 'spent'],
    category: 'Main',
    isAction: true,
    path: '#usage',
  },
  {
    title: 'Dashboard',
    description: 'View your main dashboard and overview',
    path: '/dashboard',
    icon: <MdDashboard size={20} className="text-gray-700" />,
    keywords: ['home', 'overview', 'main', 'start', 'dashboard'],
    category: 'Main',
  },

  // ===== CONTENT CREATION =====
  {
    title: 'Quick Post',
    description: 'Create and schedule posts quickly',
    path: '/dashboard/quick-post',
    icon: <MdBolt size={20} className="text-gray-700" />,
    keywords: ['create', 'new post', 'quick', 'schedule', 'post', 'publish'],
    category: 'Content',
  },
  {
    title: 'AI Content Creator',
    description: 'Generate LinkedIn posts using AI',
    path: '/dashboard/create-post',
    icon: <MdAutoAwesome size={20} className="text-gray-700" />,
    keywords: [
      'ai',
      'generate',
      'content',
      'creator',
      'linkedin',
      'artificial intelligence',
    ],
    category: 'Content',
  },
  {
    title: 'Post History',
    description: 'View all your previously created posts',
    path: '/dashboard/post-history',
    icon: <MdHistory size={20} className="text-gray-700" />,
    keywords: ['history', 'previous', 'past posts', 'old', 'queue'],
    category: 'Content',
  },

  // ===== LEADS MANAGEMENT =====
  {
    title: 'Saved Leads',
    description: 'Access your saved hiring posts and leads',
    path: '/dashboard/saved-leads',
    icon: <MdBookmark size={20} className="text-gray-700" />,
    keywords: ['saved', 'leads', 'hiring', 'posts', 'bookmarked', 'favorites'],
    category: 'Leads',
  },

  // ===== AUTOMATION =====
  {
    title: 'Leads Automation',
    description: 'Set up and manage lead automation workflows',
    path: '/dashboard/leads-automation',
    icon: <MdRepeat size={20} className="text-gray-700" />,
    keywords: ['automation', 'workflow', 'automatic', 'leads', 'rules'],
    category: 'Automation',
  },
  {
    title: 'Email Templates',
    description: 'Create and manage email templates',
    path: '/dashboard/email-templates',
    icon: <MdEmail size={20} className="text-gray-700" />,
    keywords: ['email', 'templates', 'messages', 'drafts', 'outreach'],
    category: 'Automation',
  },
  // ===== SETTINGS & PROFILE =====
  {
    title: 'Settings',
    description: 'Configure your account settings',
    path: '/dashboard/settings',
    icon: <MdSettings size={20} className="text-gray-700" />,
    keywords: [
      'settings',
      'configuration',
      'preferences',
      'options',
      'account',
    ],
    category: 'Settings',
  },
  {
    title: 'Survey & Feedback',
    description: 'Share your feedback with us',
    path: '/survey',
    icon: <MdFeedback size={20} className="text-gray-700" />,
    keywords: ['survey', 'feedback', 'uninstall', 'opinion'],
    category: 'Support',
  },
  {
    title: 'Updates & Info',
    description: 'View latest updates and information',
    path: '/update-info',
    icon: <MdInfo size={20} className="text-gray-700" />,
    keywords: ['updates', 'info', 'information', 'news', 'changes'],
    category: 'Support',
  },

  // ===== QUICK ACTIONS =====
  {
    title: 'Get Help',
    description: 'Access help and support resources',
    path: '#help',
    icon: <MdHelp size={20} className="text-gray-700" />,
    keywords: ['help', 'support', 'faq', 'contact', 'assistance'],
    category: 'Quick Actions',
    isAction: true, // Special flag for actions that don't navigate
  },
  {
    title: 'Give Feedback',
    description: 'Share your thoughts and suggestions',
    path: '#feedback',
    icon: <MdFeedback size={20} className="text-gray-700" />,
    keywords: ['feedback', 'suggestion', 'comment', 'review'],
    category: 'Quick Actions',
    isAction: true,
  },
  {
    title: 'Logout',
    description: 'Sign out of your account',
    path: '#logout',
    icon: <MdLogout size={20} className="text-gray-700" />,
    keywords: ['logout', 'sign out', 'exit', 'leave'],
    category: 'Quick Actions',
    isAction: true,
  },
];
