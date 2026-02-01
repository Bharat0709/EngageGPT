import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { menuItems } from '@utils/constantData/sidebar';
import { Icons } from '@utils/constantData/icons';
import { goTo } from '@utils/navigator';
import { fetchOrganizationData } from '@services/Organization';
import { SidebarSkeletonLoader } from '../SkeletonLoaders/SideBarSkeleton';
import { Sidebarheader } from './SidebarHeader';
import FeedbackModal from '../Global/FeebackModal';
import HelpModal from '../Global/HelpModal';
import SidebarLink from './SidebarLink';
import '@assets/styles/GlobalCSS.css';
import OrganizationCard from './OrganizationCard';
import LogoutModal from '../Global/LogoutModal';
import { creditsModalContent } from '../Global/AddCreditsContent';
import InfoModal from '@components/Common/InfoModal';
import { useNotifications } from '@components/Common/Notification';

// New Helper Component for Section Headers
const SidebarSection = ({ label, tag, isOpen, lineColor }) => (
  <div
    className={`flex items-center mt-4 mb-2 transition-all duration-300 ${
      isOpen ? 'justify-start pl-3' : 'justify-center'
    }`}
  >
    {/* The colored dash line */}
    <div
      className={`h-0.5 w-5  rounded-full ${lineColor || 'bg-gray-400'} mr-2 ${
        isOpen ? 'block' : 'hidden'
      }`}
    ></div>

    <span
      className={`text-[10px] text-gray-400 font-bold tracking-wider transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden
        ${isOpen ? 'opacity-100 max-w-[200px] delay-300' : 'opacity-0 max-w-0'}
      `}
    >
      {label}
    </span>

    {tag && isOpen && (
      <span
        className={`ml-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white ${tag.color}`}
      >
        {tag.text}
      </span>
    )}
  </div>
);

const Sidebar = () => {
  const message = useNotifications();
  const [isOpen, setIsOpen] = useState(true);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = window.innerWidth < 1024;
  const location = useLocation();

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchOrganizationData();
        setUserData(data);
        setIsLoading(false);
      } catch (err) {
        message.error('Error fetching organization details');
      }
    };
    fetchAndSetUserData();
  }, []);

  const toggleSidebar = () => {
    setIsCardOpen(false);
    setIsOpen(!isOpen);
  };

  const isActiveLink = (path) => location.pathname === path;

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const handleProfileNavigate = () => {
    goTo('/dashboard/settings');
  };

  const handleToggleCard = () => {
    setIsOpen(true);
    setIsCardOpen(!isCardOpen);
  };

  return (
    <div className="flex scrollbar-hide flex-col">
      <div className="flex justify-between h-min bg-white p-4 lg:hidden border-b border-gray-100">
        <button onClick={toggleSidebar} className="text-gray-600">
          <Icons.Menu size={24} />
        </button>
        <button onClick={handleProfileNavigate} className="text-gray-600">
          <Icons.User size={24} />
        </button>
      </div>

      <div
        className={`mulish-normal h-[90vh] lg:h-[100vh] scrollbar-hide mr-1 fixed lg:relative lg:top-0 lg:left-0 top-0 left-0 bg-white text-black transition-all duration-300 ease-in-out z-[50] shadow-xl lg:shadow-none
          ${
            isOpen ? 'translate-x-0 lg:ml-0 ml-0' : '-translate-x-full'
          } lg:translate-x-0
        `}
        style={{ width: isOpen ? '240px' : '78px' }}
      >
        <Sidebarheader
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />

        <nav className="flex flex-col h-[79vh] lg:h-[calc(100vh-64px)] bg-white justify-between p-2">
          {/* Menu Items Container - Added overflow handling */}
          <div className="flex flex-col p-2 space-y-1 overflow-y-auto scrollbar-hide">
            {menuItems.map((item) => {
              // Logic to render Section Headers
              // if (item.type === 'section') {
              //   return (
              //     <SidebarSection
              //       key={item.key}
              //       label={item.label}
              //       tag={item.tag}
              //       isOpen={isOpen}
              //       lineColor={item.lineColor}
              //     />
              //   );
              // }

              // Logic to render Links
              return (
                <SidebarLink
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isActive={isActiveLink(item.to)}
                  onClick={handleLinkClick}
                  isOpen={isOpen}
                  activeClass={item.activeClass}
                  hoverClass={item.hoverClass}
                  tag={item.tag}
                />
              );
            })}
          </div>

          {isLoading ? (
            <SidebarSkeletonLoader isOpen={isOpen} />
          ) : (
            <>
              <OrganizationCard
                userData={userData}
                isOpen={isOpen}
                isCardOpen={isCardOpen}
                setShowCreditsModal={setShowCreditsModal}
                isLogoutModalOpen={isLogoutModalOpen}
                setIsLogoutModalOpen={setIsLogoutModalOpen}
                email={userData?.email}
                onToggleCard={handleToggleCard}
                onSettingsClick={handleProfileNavigate}
                setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                setIsHelpModalOpen={setIsHelpModalOpen}
                setIsLogoutModalVisible={setIsLogoutModalOpen}
              />
            </>
          )}
        </nav>
      </div>

      <FeedbackModal
        isVisible={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
      <HelpModal
        isVisible={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
      <LogoutModal
        isVisible={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
      <InfoModal
        isOpen={showCreditsModal}
        onClose={() => setShowCreditsModal(false)}
        title="How to Get 500 FREE Credits"
        content={creditsModalContent}
      />
    </div>
  );
};

export default Sidebar;
