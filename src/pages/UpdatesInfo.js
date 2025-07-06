import React from 'react';
import EngageGPTLogo from '@assets/images/EngageGPTLogo.png';

const updates = [
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
  },
  {
    feature: 'Claude AI for Comment Generation',
    description:
      'Leverage Claude AI to write thoughtful, relevant comments on LinkedIn posts.',
  },
  {
    feature: 'Enhanced Analytics Dashboard',
    description:
      'More detailed insights and metrics to track your LinkedIn growth and engagement.',
  },
];

const UpdateInfoScreen = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 py-8 px-4">
      {/* Header Section */}
      <div className="max-w-4xl w-full bg-white rounded-lg p-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <a href="https://engagegpt.in">
            <img
              src={EngageGPTLogo}
              alt="EngageGPT Logo"
              className="h-16 w-auto"
            />
          </a>
          <h1 className="text-2xl font-bold text-gray-800">
            AI for LinkedIn - EngageGPT Updates
          </h1>
        </div>
        <p className="text-gray-600 mt-4">
          Discover the latest updates and improvements in EngageGPT. Stay
          informed about the new features and fixes introduced in every version.
        </p>
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://www.linkedin.com/feed/"
        >
          <button type="submit" className={`mt-4 global-button-primary`}>
            Try New Updates
          </button>
        </a>
      </div>

      {/* Current Version Section */}
      <div className="max-w-4xl w-full bg-white rounded-lg mt-6 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Current Version: {updates[0].version}
        </h2>
        <p className="text-gray-600">Release Date: {updates[0].date}</p>
        <ul className="list-disc list-inside mt-4 text-gray-700">
          {updates[0].highlights.map((highlight, index) => (
            <li key={index} className="mb-2">
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Featured New Capabilities */}
      <div className="max-w-4xl w-full bg-white rounded-lg mt-6 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Featured New Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-200 to-cyan-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </span>
                <h3 className="font-bold">Post Saving</h3>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-300 to-cyan-400 text-white">
                New
              </span>
            </div>
            <p className="text-sm">
              Save posts automatically based on custom keywords for easy
              reference and inspiration.
            </p>
            <a
              href="/dashboard/saved-posts"
              className="inline-block mt-3 text-blue-700 text-sm font-medium"
            >
              Learn More →
            </a>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-200 to-green-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </span>
                <h3 className="font-bold">Hide Post</h3>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-yellow-300 to-green-300 text-white">
                Popular
              </span>
            </div>
            <p className="text-sm">
              Filter your feed by hiding posts containing specific keywords you
              want to avoid.
            </p>
            <a
              href="/dashboard/saved-posts"
              className="inline-block mt-3 text-green-700 text-sm font-medium"
            >
              Learn More →
            </a>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-200 to-cyan-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <h3 className="font-bold">Content Calendar</h3>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                Hot
              </span>
            </div>
            <p className="text-sm">
              Manage your posts efficiently with an intuitive content calendar.
            </p>
            <a
              href="/dashboard/content-calendar"
              className="inline-block mt-3 text-blue-700 text-sm font-medium"
            >
              Learn More →
            </a>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="max-w-4xl w-full bg-white rounded-lg mt-6 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Coming Soon
        </h2>
        <div className="space-y-4">
          {comingSoon.map((item, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-bold text-gray-800">{item.feature}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Update History Section */}
      <div className="max-w-4xl w-full bg-white rounded-lg mt-6 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Update History
        </h2>
        {updates.slice(1).map((update, index) => (
          <div key={index} className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-lg font-bold text-gray-800">
              Version {update.version}
            </h3>
            <p className="text-gray-600">Release Date: {update.date}</p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {update.highlights.map((highlight, idx) => (
                <li key={idx} className="mb-2">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateInfoScreen;
