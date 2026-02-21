import React from 'react';
import MembersProfileDropDown from '../Global/MembersDropDown';
import Button from '@components/Common/Button';
import { Icons } from '@utils/constantData/icons';

const EmailTemplateNavbar = ({
  selectedProfile,
  activeTab,
  setActiveTab,
  memberProfiles,
  handleProfileChange,
}) => {
  const navigationTabs = [
    { id: 'templates', label: 'Templates', icon: Icons.Document },
    { id: 'editor', label: 'Editor', icon: Icons.Edit },
    { id: 'preview', label: 'Preview', icon: Icons.Eye },
  ];

  return (
    <div>
      {/* Main Header */}
      <div className="flex mx-4 mt-2 rounded-xl lg:flex-row flex-col items-center justify-between">
        {/* Left Section - Brand/Title */}
        <div className="flex items-center">
          {/* <div className="flex items-center justify-center w-6 h-6 text-black rounded-lg">
            <Icons.Mail className="w-5 h-5 text-black" />
          </div> */}
          <span className="ovo-regular text-xl">Email Templates</span>
        </div>

        {/* Center Section - Navigation Tabs */}
        <div className="flex items-center justify-between pr-6 pl-2 pt-2 ">
          <div className="flex items-center space-x-1">
            {navigationTabs.map((tab) => {
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex geist items-center space-x-2 px-4 pt-2 pb-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-b-blue-600 text-blue-600 '
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>{<tab.icon />}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Section - Member Profile Dropdown & Add Member Button */}
        {memberProfiles.length != 0 && (
          <div className="flex lg:mt-0 mt-4 items-center mb-2 space-x-2">
            <div className="flex flex-wrap justify-center items-center gap-3">
              <div className="relative">
                {memberProfiles.length > 0 && (
                  <MembersProfileDropDown
                    selectedProfileId={selectedProfile}
                    profiles={memberProfiles}
                    onProfileChange={handleProfileChange}
                    onCopy={() => message.success('Profile copied!')}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTemplateNavbar;
