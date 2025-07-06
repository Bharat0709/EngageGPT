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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
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
        console.error('Error fetching organization details:', err);
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
      <div className="flex justify-between h-min bg-white p-4 lg:hidden">
        <button onClick={toggleSidebar} className="text-gray-600">
          <Icons.Menu size={24} />
        </button>
        <button onClick={handleProfileNavigate} className="text-gray-600">
          <Icons.User size={24} />
        </button>
      </div>

      <div
        className={`mulish-normal h-[90vh] lg:h-[98vh] lg:rounded-r-xl lg:rounded-l-xl scrollbar-hide mr-1 fixed lg:relative lg:top-0 lg:left-0 top-2 left-0 rounded-xl bg-gray-50 text-black transition-all duration-1000 ease-in-out z-[50] ${
          isOpen ? 'translate-x-0 lg:ml-0 ml-2' : '-translate-x-full'
        } lg:translate-x-0`}
        style={{ width: isOpen ? '240px' : '78px' }}
      >
        <Sidebarheader
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />

        <nav className="flex flex-col rounded-xl h-[79vh] lg:h-[86vh] bg-gray-50 justify-between p-2">
          <div className="flex flex-col p-2 space-y-1">
            {menuItems.map((item) => (
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
            ))}
          </div>

          {isLoading ? (
            <SidebarSkeletonLoader isOpen={isOpen} />
          ) : (
            <OrganizationCard
              userData={userData}
              isOpen={isOpen}
              isCardOpen={isCardOpen}
              isLogoutModalOpen={isLogoutModalOpen}
              setIsLogoutModalOpen={setIsLogoutModalOpen}
              email={userData?.email}
              onToggleCard={handleToggleCard}
              onSettingsClick={handleProfileNavigate}
              setIsFeedbackModalOpen={setIsFeedbackModalOpen}
              setIsHelpModalOpen={setIsHelpModalOpen}
            />
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
    </div>
  );
};

export default Sidebar;
