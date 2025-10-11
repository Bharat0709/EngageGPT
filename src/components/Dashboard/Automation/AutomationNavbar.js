// AutomationNavbar.js
import React from 'react';
import { Icons } from '@utils/constantData/icons';
import Button from '@components/Common/Button';
import MembersProfileDropDown from '../Global/MembersDropDown';

const AutomationNavbar = ({
  selectedProfile,
  activeTab,
  setActiveTab,
  memberProfiles,
  handleProfileChange,
  setIsAddMemberModalOpen,
  pendingApprovals = 0,
}) => {
  const navigationTabs = [
    {
      id: 'history',
      label: 'History',
      icon: Icons.Document,
    },

    {
      id: 'pending_approvals',
      label: 'Approvals',
      icon: Icons.Clock,
      badge: pendingApprovals,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: Icons.BarChart,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Icons.Settings,
    },
  ];
  console.log(memberProfiles, selectedProfile);
  return (
    <div>
      {/* Main Header */}
      <div className="flex lg:flex-row flex-col bg-white items-center justify-between px-4 pt-2 border-b border-gray-100">
        {/* Left Section - Brand/Title */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Icons.Zap className="w-4 h-4 text-white" />
          </div>
          <span className="leading-30 text-xl font-semibold">
            Automation Manager
          </span>
        </div>

        {/* Center Section - Navigation Tabs */}
        <div className="flex bg-white items-center justify-between pr-6 pl-2 pt-2">
          <div className="flex items-center space-x-1">
            {navigationTabs.map((tab) => {
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-2 px-4 pt-2 pb-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-b-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>{<tab.icon />}</span>
                  <span>{tab.label}</span>
                  {tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </span>
                  )}
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

export default AutomationNavbar;
