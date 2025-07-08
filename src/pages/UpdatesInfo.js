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
import { FiCalendar, FiArrowRight } from 'react-icons/fi';

const updates = [
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
      'Launched a full-fledged dashboard to view your LinkedIn analytics.',
      'Integrated with LinkedIn to post content directly from EngageGPT.',
      'Introduced a post calendar feature to enhance your productivity and consistency on LinkedIn.',
      'Added an AI Post Generator to quickly generate posts using AI.',
      'New authentication method using Connection Token instead of OTP.',
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
    feature: 'DeepSeek AI Integration',
    description:
      'Advanced AI model for more contextual and engaging LinkedIn content generation.',
    icon: <FaComments className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    feature: 'Claude AI for Comment Generation',
    description:
      'Leverage Claude AI to write thoughtful, relevant comments on LinkedIn posts.',
    icon: <FaComments className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    feature: 'Enhanced Analytics Dashboard',
    description:
      'More detailed insights and metrics to track your LinkedIn growth and engagement.',
    icon: <FaChartLine className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
  },
];

const featuredCapabilities = [
  {
    title: 'Smart Post Saving',
    description:
      'Automatically save posts based on custom keywords with ALT + S shortcut',
    icon: <FaBookmark className="w-7 h-7" />,
    gradient: 'from-blue-500 to-cyan-500',
    badge: 'New',
    badgeColor: 'bg-blue-500',
  },
  {
    title: 'Intelligent Feed Filtering',
    description:
      'Hide posts containing specific keywords to curate your perfect feed',
    icon: <FaEye className="w-7 h-7" />,
    gradient: 'from-emerald-500 to-teal-500',
    badge: 'Popular',
    badgeColor: 'bg-emerald-500',
  },
  {
    title: 'Content Calendar',
    description:
      'Plan and schedule your LinkedIn posts with our intuitive calendar',
    icon: <FiCalendar className="w-7 h-7" />,
    gradient: 'from-purple-500 to-pink-500',
    badge: 'Hot',
    badgeColor: 'bg-purple-500',
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
