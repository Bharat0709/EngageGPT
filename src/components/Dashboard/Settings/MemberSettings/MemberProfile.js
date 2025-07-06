import { Icons } from '@utils/constantData/icons';
import { goTo } from '@utils/navigator';
import { useState } from 'react';
import {
  featureInfo,
  formatDate,
  tabs,
} from '@utils/constantData/memberSetttings';
import props from 'prop-types';

import InfoModal from '../../Global/InfoModal';
import AccountSettings from './MemberAccountSettings';

function MemberProfile({ memberData, view, handleViewToggle } = props) {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const openInfoModal = (feature) => {
    const info = featureInfo[feature];
    setModalContent(info);
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
    setModalContent({ title: '', content: '' });
  };

  const InfoButton = ({ feature }) => (
    <button
      onClick={() => openInfoModal(feature)}
      className="w-4 h-4 border border-gray-400 bg-white hover:bg-indigo-500 rounded-full flex items-center justify-center transition-colors group"
      title={`Learn more about ${featureInfo[feature].title}`}
    >
      <span className="text-black text-xs font-bold group-hover:text-white">
        !
      </span>
    </button>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => goTo(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Icons.ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl text-semibold m-0">Member Settings</h2>
        </div>
      </div>

      <div className="mb-2 bg-[#f6f6f6] rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center md:items-center">
        <img
          src={memberData?.profilePicture}
          alt={memberData?.name}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-col md:flex-row md:justify-between w-full">
            <div>
              <h3 className="text-lg m-0 p-0 font-semibold text-gray-900">
                {memberData?.name}
              </h3>
              <p className="text-sm m-0 p-0 text-gray-600">
                {memberData?.email}
                <span className="p-1 ml-1 text-sm rounded-sm">
                  • {memberData?.timeZone}
                </span>
              </p>
              <p className="text-sm text-gray-500 m-0 py-1">
                {memberData?.profileLink || 'N/A'}
              </p>
            </div>
            <div className="flex items-center mt-4 flex-wrap gap-3">
              <button
                onClick={() => setIsAccountSettingsOpen(true)}
                className="flex items-center bg-red-600 px-4 py-2 text-white gap-2 rounded-full text-xs"
              >
                <Icons.Settings />
                Account Settings
              </button>
              <p className="p-1 px-3 m-0 bg-[#ededed] rounded-md text-sm">
                Member since {formatDate(memberData?.accountCreatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex p-2 bg-gray-100 flex-wrap items-center m-0 gap-2 rounded-xl">
        <p className="p-1 px-3 m-0 rounded-md text-xs bg-white">
          {memberData?.plan} Plan
        </p>
        <p className="p-1 px-3 m-0 rounded-md text-xs bg-white">
          {memberData?.credits} Credits Available
        </p>
        <p className="p-1 px-3 m-0 rounded-md text-xs bg-white">
          {memberData?.totalCreditsUsed} Credits Used
        </p>
      </div>

      <div className="flex bg-gray-50 rounded-xl p-3 text-sm justify-start gap-4 items-center mt-2 mb-2">
        {tabs.map((tab) => (
          <div key={tab.id} className="flex items-center gap-2">
            <button
              onClick={() => handleViewToggle(tab.id)}
              className={`${
                view === tab.id ? 'text-black font-semibold' : 'text-gray-400'
              }`}
            >
              {tab.label}
            </button>
            <InfoButton feature={tab.id} />
          </div>
        ))}
      </div>

      {isAccountSettingsOpen && (
        <AccountSettings
          onClose={() => setIsAccountSettingsOpen(false)}
          memberData={memberData}
        />
      )}

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
