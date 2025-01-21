import React from 'react';
import EngageGPTLogo from '../assets/images/EngageGPTLogo.png';

const updates = [
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
    version: ': Intial Release',
    date: '15th May, 2024',
    highlights: [
      'Initial release of EngageGPT Chrome Extension and gone through multiple iterations based on users feedback',
    ],
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

      {/* Updates Section */}
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
