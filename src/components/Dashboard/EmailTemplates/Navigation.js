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
  setIsAddMemberModalOpen,
}) => {
  const navigationTabs = [
    { id: 'templates', label: 'Templates', icon: Icons.Document },
    { id: 'editor', label: 'Editor', icon: Icons.Edit },
    { id: 'preview', label: 'Preview', icon: Icons.Eye },
  ];

  return (
    <div>
      {/* Main Header */}
      <div className="flex lg:flex-row flex-col bg-white items-center justify-between px-4 pt-2">
        {/* Left Section - Brand/Title */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center justify-center w-8 h-8 bg-black rounded-lg">
            <Icons.Mail className="w-4 h-4 text-white" />
          </div>
          <span className="leading-30 text-xl">Email Template Manager</span>
        </div>

        {/* Center Section - Navigation Tabs */}
        <div className="flex bg-white items-center justify-between pr-6 pl-2 pt-2 ">
          <div className="flex items-center space-x-1">
            {navigationTabs.map((tab) => {
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 pt-2 pb-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-b-black text-black '
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
            <Button
              theme="dark"
              icon={<Icons.Plus size={14} />}
              buttonText="Add Member"
              onClick={() => setIsAddMemberModalOpen(true)}
              className="border !border-gray-300 !rounded-full flex items-center text-xs gap-1 !py-2 !px-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateNavbar;
