import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import props from 'prop-types';
import InfoModal from '../../Global/InfoModal';

function MemberProfile({ memberData, view, handleViewToggle } = props) {
  const navigate = useNavigate();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // May
    const year = date.getFullYear();

    // Add ordinal suffix
    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${day}${getOrdinal(day)} ${month}, ${year}`;
  };

  const getFeatureInfo = (feature) => {
    const infoMap = {
      postsaving: {
        title: 'Post Saving Settings',
        content: (
          <div>
            <p className="mb-3">
              Configure how and when posts are automatically saved to your
              content library. This feature helps you:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Set up automatic saving rules based on keywords</li>
              <li>
                Choose which types of posts to save (text, images, videos,
                documents)
              </li>
              <li>Organize saved content</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              This helps you build a comprehensive content library without
              manual effort.
            </p>
          </div>
        ),
      },
      feedfilters: {
        title: 'Feed Filters',
        content: (
          <div>
            <p className="mb-3">
              Customize your LinkedIn feed to show only the most relevant
              content. Feed filters allow you to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Block content with specific keywords or from certain sources
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              Focus on content that matters most to your professional goals.
            </p>
          </div>
        ),
      },
      summary: {
        title: 'Professional Summary',
        content: (
          <div>
            <p className="mb-3">Professional summary this feature helps you:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Generate compelling LinkedIn summaries based on your experience
              </li>
              <li>
                Optimize existing summaries for better visibility and engagement
              </li>
              <li>
                A/B test different summary versions to see what works best
              </li>
              <li>
                Get suggestions for industry-specific keywords and phrases
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              Make a stronger first impression with a professionally crafted
              summary.
            </p>
          </div>
        ),
      },
      leadgeneration: {
        title: 'Lead Generation Goals',
        content: (
          <div>
            <p className="mb-3">
              Set up automated lead generation campaigns and track your
              progress. This feature enables you to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Define target customer profiles and ideal client characteristics
              </li>
              <li>
                Set up automated outreach sequences and follow-up messages
                (Coming Soon)
              </li>
              <li>Track conversion rates and campaign performance</li> (Coming
              Soon)
              <li>
                Integrate with CRM systems for seamless lead management (Coming
                Soon)
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              Turn your LinkedIn presence into a powerful lead generation
              machine.
            </p>
          </div>
        ),
      },
    };
    return infoMap[feature];
  };

  const openInfoModal = (feature) => {
    const info = getFeatureInfo(feature);
    setModalContent(info);
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
    setModalContent({ title: '', content: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
            <FiArrowLeft size={20} />
          </button>
          <h2 className="text-2xl text-semibold m-0">Member Settings</h2>
        </div>
      </div>

      <div className="mb-2 bg-[#f6f6f6] rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
        <img
          src={memberData?.profilePicture}
          alt={memberData?.name}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-col md:flex-row md:justify-between w-full">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {memberData?.name}
              </h3>
              <p className="text-sm text-gray-600">
                {memberData?.email}
                <span className="p-1 ml-1 text-sm rounded-sm">
                  • {memberData?.timeZone}
                </span>
              </p>
            </div>
            <div>
              <p className="p-1 px-3 lg:mt-0 mt-2 mb-2  bg-[#ededed] rounded-md text-sm">
                Member since {formatDate(memberData?.accountCreatedAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <p className="p-1 px-3 rounded-md text-xs bg-white">
              {memberData?.plan} Plan
            </p>
            <p className="p-1 px-3 rounded-md text-xs bg-white">
              {memberData?.credits} Credits Available
            </p>
            <p className="p-1 px-3 rounded-md text-xs bg-white">
              {memberData?.totalCreditsUsed} Credits Used
            </p>
          </div>
        </div>
      </div>

      <div className="flex bg-gray-50 rounded-xl p-3 text-sm justify-start gap-4 items-center mt-2 mb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewToggle('postsaving')}
            className={`${
              view === 'postsaving'
                ? 'text-black font-semibold'
                : 'text-gray-600'
            }`}
          >
            Post Saving Settings
          </button>
          <button
            onClick={() => openInfoModal('postsaving')}
            className="w-4 h-4  border border-gray-400 bg-white 00 hover:bg-indigo-500 rounded-full flex items-center justify-center transition-colors group"
            title="Learn more about Post Saving Settings"
          >
            <span className="text-black text-xs  font-bold group-hover:text-white">
              !
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewToggle('feedfilters')}
            className={`${
              view === 'feedfilters'
                ? 'text-black font-semibold'
                : 'text-gray-400'
            }`}
          >
            Feed Filters
          </button>
          <button
            onClick={() => openInfoModal('feedfilters')}
            className="w-4 h-4  border border-gray-400 bg-white 00 hover:bg-indigo-500 rounded-full flex items-center justify-center transition-colors group"
            title="Learn more about Feed Filters"
          >
            <span className="text-black text-xs  font-bold group-hover:text-white">
              !
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewToggle('summary')}
            className={`${
              view === 'summary' ? 'text-black font-semibold' : 'text-gray-400'
            }`}
          >
            Professional Summary
          </button>
          <button
            onClick={() => openInfoModal('summary')}
            className="w-4 h-4  border border-gray-400 bg-white 00 hover:bg-indigo-500 rounded-full flex items-center justify-center transition-colors group"
            title="Learn more about Professional Summary"
          >
            <span className="text-black text-xs  font-bold group-hover:text-white">
              !
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewToggle('leadgeneration')}
            className={`${
              view === 'leadgeneration'
                ? 'text-black font-semibold'
                : 'text-gray-400'
            }`}
          >
            Lead Generation Goals
          </button>
          <button
            onClick={() => openInfoModal('leadgeneration')}
            className="w-4 h-4  border border-gray-400 bg-white 00 hover:bg-indigo-500 rounded-full flex items-center justify-center transition-colors group"
            title="Learn more about Lead Generation Goals"
          >
            <span className="text-black text-xs  font-bold group-hover:text-white">
              !
            </span>
          </button>
        </div>
      </div>

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        title={modalContent.title}
        content={modalContent.content}
      />
    </div>
  );
}

export default MemberProfile;
