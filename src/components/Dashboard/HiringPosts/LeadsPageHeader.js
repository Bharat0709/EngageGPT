import React from 'react';
import MembersProfileDropDown from '../Global/MembersDropDown';
import Button from '@components/Common/Button';
import { Icons } from '@utils/constantData/icons';
import { useNotifications } from '@components/Common/Notification';

const LeadsPageHeader = ({
  selectedMemberId,
  activeTab,
  setActiveTab,
  memberProfiles,
  handleProfileChange,
  handleRefresh,
}) => {
  const message = useNotifications();

  const navigationTabs = [
    { id: 'leads', label: 'Leads', icon: Icons.Users },
    { id: 'settings', label: 'Settings', icon: Icons.Settings },
    // { id: 'editor', label: 'Editor', icon: Icons.Edit },
    { id: 'mail', label: 'Mail', icon: Icons.Mail },
  ];

  return (
    <div className="">
      {/* Main Header */}
      <div className="flex lg:flex-row flex-col gap-3 items-center justify-between px-4 pt-2">
        {/* Left Section - Brand/Title */}
        <div className="flex items-center space-x-2 mb-2">
          {/* <div className="flex items-center justify-center w-8 h-8 bg-black rounded-lg">
            <Icons.Users className="w-4 h-4 text-white" />
          </div> */}
          <span className="leading-30 ovo-regular text-lg lg:text-xl">
            Saved Leads
          </span>
        </div>

        {/* Center Section - Navigation Tabs */}
        <div className="flex items-center justify-between pr-6 pl-2 pt-2">
          <div className="flex  items-center space-x-1">
            {navigationTabs.map((tab) => {
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center geist space-x-2 px-4 pt-2 pb-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-b-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span> {<tab.icon />}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center mb-2 space-x-2">
          <div className="flex flex-wrap justify-center items-center gap-3">
            <Button
              theme="light"
              icon={<Icons.Refresh size={14} />}
              onClick={handleRefresh}
              className="border-none flex items-center text-xs gap-1 !p-0"
            />
            <div className="relative">
              {memberProfiles.length > 0 && (
                <MembersProfileDropDown
                  selectedProfileId={selectedMemberId}
                  profiles={memberProfiles}
                  onProfileChange={handleProfileChange}
                  onCopy={() => message.success('Profile copied!')}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsPageHeader;
