import React from 'react';
import {
  FaCheck,
  FaCalendarAlt,
  FaBookmark,
  FaEye,
  FaRocket,
  FaArrowRight,
  FaClock,
  FaComments,
  FaChartLine,
} from 'react-icons/fa';
import {
  FiCalendar,
  FiArrowRight,
  FiLink,
  FiMail,
  FiSettings,
  FiDollarSign,
  FiZap,
  FiMessageCircle,
} from 'react-icons/fi';

const updates = [
  {
    version: '2.4.0',
    date: '17th October, 2025',
    highlights: [
      '🪔 Diwali Special: New organization-wide credits-based system with detailed transaction history',
      '🪔 Payment Gateway Integration with UPI and international payment options',
      '🪔 Credit Transaction Analytics for complete visibility into credit usage',
      '🪔 Email Template Manager to create and manage reusable email templates',
      '🪔 Message Reply Templates are back with support for replies and new messages',
      '🪔 Complete UI refresh with modern design patterns and better navigation',
    ],
  },
  {
    version: '2.3.0',
    date: '13-14th July, 2025',
    highlights: [
      'Multi-AI Post Generation with ChatGPT, Gemini, Perplexity, Mistral, and Groq',
      'AI Comment Generator with 4 different AI models for engaging comments',
      'Smart Reply System with AI-powered reply suggestions',
      'Comments Option may take 2 seconds to appear',
      'No need to double tap now to enable comments options',
      'Mistral added for blazing fast performance',
    ],
  },
  {
    version: '2.2.0',
    date: '8th July, 2025',
    highlights: [
      'Profile Syncing Error is Resolved',
      'Enhanced User Interface',
      'Added a shortcut to enable post saving i.e ALT + S',
      'Better Performance',
    ],
  },
  {
    version: '2.1.0',
    date: '22th May, 2025',
    highlights: [
      'Added fully automated post saving based on keywords',
      'Automated Lead Saving while scrolling through LinkedIn',
      'New prospect mailing feature for direct outreach to saved contacts',
      'Enhanced post filtering capabilities',
      'UI improvements and performance optimizations',
    ],
  },
  {
    version: '2.0.1',
    date: '24th Feb, 2025',
    highlights: [
      'UI enhancements and bug fixes',
      'Added direct link to the analytics dashboard',
      'Dashboard error resolved',
      'ChatGPT Comments option is temporarily removed',
    ],
  },
  {
    version: '2.0.0',
    date: 'January, 2025',
    highlights: [
      'Launched a full-fledged dashboard to view your LinkedIn analytics',
      'Multi-Profile Dashboard to manage multiple LinkedIn profiles from single dashboard',
      'Integrated with LinkedIn to post content directly from EngageGPT',
      'Introduced a post calendar feature to enhance your productivity and consistency on LinkedIn',
      'Added an AI Post Generator to quickly generate posts using AI',
      'New authentication method using Connection Token instead of OTP',
    ],
  },
  {
    version: '1.0.0',
    date: '15th May, 2024',
    highlights: [
      'Initial release of EngageGPT Chrome Extension and gone through multiple iterations based on users feedback',
    ],
  },
];

const comingSoon = [
  {
    feature: 'Content Calendar Enhancement',
    description:
      'Advanced content planning with drag-and-drop scheduling, visual timeline, bulk scheduling, and optimal posting time suggestions.',
    icon: <FiCalendar className="w-6 h-6" />,
    color: 'from-indigo-500 to-purple-500',
    estimatedRelease: 'November 2025',
  },
  {
    feature: 'Zapier Integration',
    description:
      'Export leads directly to your favorite CRM tools. Seamless integration with 5000+ apps through Zapier for automated workflows.',
    icon: <FiLink className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    estimatedRelease: 'November 2025',
  },
  {
    feature: 'Advanced Transaction Analytics',
    description:
      'Deep dive into credit usage patterns. ROI tracking, team performance metrics, and detailed expense reports for better decision making.',
    icon: <FaChartLine className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    estimatedRelease: 'November 2025',
  },
  {
    feature: 'HTML/Text Mailing Feature',
    description:
      'Send tailored HTML or text emails to each lead directly from the platform. Personalize outreach at scale with AI-generated content.',
    icon: <FiMail className="w-6 h-6" />,
    color: 'from-gray-500 to-slate-500',
    estimatedRelease: 'December 2025',
  },
  {
    feature: 'Leads Automation + Auto Email',
    description:
      'Fully automated lead generation and email outreach. Generate leads and send personalized emails automatically with 20 credits per automation.',
    icon: <FiSettings className="w-6 h-6" />,
    color: 'from-gray-500 to-slate-500',
    estimatedRelease: 'December 2025',
  },
];

const featuredCapabilities = [
  {
    title: 'Credits-Based System',
    description:
      'Organization-wide credit tracking with detailed transaction history for transparent usage',
    icon: <FiDollarSign className="w-7 h-7" />,
    gradient: 'from-orange-500 to-cyan-500',
    badge: 'New',
    badgeColor: 'bg-orange-500',
  },
  {
    title: 'Multi-AI Content Generation',
    description:
      'Generate posts and comments using ChatGPT, Gemini, Perplexity, Mistral, and Groq',
    icon: <FiZap className="w-7 h-7" />,
    gradient: 'from-purple-500 to-pink-500',
    badge: 'Hot',
    badgeColor: 'bg-purple-500',
  },
  {
    title: 'Smart Post Saving',
    description:
      'Automatically save posts based on custom keywords with ALT + S shortcut',
    icon: <FaBookmark className="w-7 h-7" />,
    gradient: 'from-blue-500 to-cyan-500',
    badge: 'Popular',
    badgeColor: 'bg-blue-500',
  },
  {
    title: 'Email Template Manager',
    description:
      'Create, save, and manage reusable email templates for streamlined lead outreach',
    icon: <FiMail className="w-7 h-7" />,
    gradient: 'from-pink-500 to-rose-500',
    badge: 'New',
    badgeColor: 'bg-pink-500',
  },
  {
    title: 'Message Reply Templates',
    description:
      'Pre-written responses for common scenarios to save time on LinkedIn messaging',
    icon: <FiMessageCircle className="w-7 h-7" />,
    gradient: 'from-emerald-500 to-teal-500',
    badge: 'New',
    badgeColor: 'bg-emerald-500',
  },
  {
    title: 'Content Calendar',
    description:
      'Plan and schedule your LinkedIn posts with our intuitive calendar',
    icon: <FiCalendar className="w-7 h-7" />,
    gradient: 'from-indigo-500 to-purple-500',
    badge: 'Featured',
    badgeColor: 'bg-indigo-500',
  },
];

const UpdateInfoScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-3xl shadow-xl">
                <FaRocket className="w-10 h-10 text-white" />
              </div>
              <h1 className="ml-6 text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                EngageGPT Updates
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10">
              Discover the latest innovations and improvements in EngageGPT.
              Stay ahead with cutting-edge AI features designed to supercharge
              your LinkedIn presence.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://engagegpt.in/dashboard"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
              >
                View Dashboard
                <FiArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/feed/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-600 to-green-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
              >
                Try New Updates
                <FiArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Current Version Spotlight */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full translate-y-16 -translate-x-16"></div>
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg
                    className="h-7 w-7 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center">
                  <span>📦 Data Migration Underway</span>
                </h3>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  We're currently migrating your data to our enhanced system as
                  part of the Diwali Special Release.
                  <span className="font-semibold">
                    {' '}
                    Your data will be available within the next few days.
                  </span>{' '}
                  We appreciate your patience during this upgrade!
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl shadow-lg">
                  <FaCheck className="w-8 h-8 text-white" />
                </div>
                <div className="ml-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Version {updates[0].version}
                  </h2>
                  <p className="text-gray-600 flex items-center mt-2">
                    <FaCalendarAlt className="w-5 h-5 mr-3" />
                    Released {updates[0].date}
                  </p>
                </div>
              </div>
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                Latest Release
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {updates[0].highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 mr-4"></div>
                  <p className="text-gray-700 font-medium text-lg leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Capabilities */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 mb-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Capabilities
            </h2>
            <p className="text-gray-600 text-lg">
              Powerful features that enhance your LinkedIn experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCapabilities.map((capability, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 transform hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`bg-gradient-to-r ${capability.gradient} p-4 rounded-2xl text-white shadow-lg`}
                    >
                      {capability.icon}
                    </div>
                    <span
                      className={`${capability.badgeColor} text-white px-4 py-2 rounded-full text-sm font-bold`}
                    >
                      {capability.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {capability.description}
                  </p>
                  <a href="https://engagegpt.in/dashboard">
                    <button className="text-blue-600 hover:text-blue-700 font-bold flex items-center group-hover:translate-x-2 transition-transform">
                      Learn More <FaArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 mb-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-6 shadow-lg">
              <FaClock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 text-lg">
              Exciting features currently in development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {comingSoon.map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-dashed border-gray-200 hover:border-gray-300 transition-all duration-300 group-hover:shadow-lg">
                  <div
                    className={`inline-flex items-center justify-center p-4 bg-gradient-to-r ${item.color} rounded-2xl mb-6 text-white shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.feature}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Update History */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Update History
            </h2>
            <p className="text-gray-600 text-lg">
              Track our journey of continuous improvement
            </p>
          </div>

          <div className="space-y-8">
            {updates.slice(1).map((update, index) => (
              <div key={index} className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {update.version.split('.')[0]}.
                    {update.version.split('.')[1]}
                  </div>
                  <div className="ml-8 flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Version {update.version}
                      </h3>
                      <span className="text-gray-500 flex items-center bg-gray-100 px-4 py-2 rounded-full">
                        <FaCalendarAlt className="w-4 h-4 mr-2" />
                        {update.date}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {update.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4"></div>
                          <p className="text-gray-700 leading-relaxed">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {index < updates.slice(1).length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-gray-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateInfoScreen;
