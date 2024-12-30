// Start of Selection
import React, { useState } from 'react';
import '../../../assets/styles/GlobalCSS.css';
import { Link, useLocation } from 'react-router-dom';
import LogoutModal from '../Global/LogoutModal';
import { FiLogOut } from 'react-icons/fi';
import {
  FiMenu,
  FiSettings,
  FiFolder,
  FiHelpCircle,
  FiUser,
  FiZap,
  FiFileText,
  FiMessageSquare,
  FiHome,
  FiChevronLeft,
} from 'react-icons/fi';
import EngageGPTLogo from '../../../assets/images/EngageGPTLogoIocn.png';
import FeedbackModal from './FeebackModal';
import HelpModal from './HelpModal';
import Tooltip from '../Global/ToolTip';

const menuItems = [
  {
    to: '/dashboard',
    icon: <FiHome size={20} className="text-white" />,
    label: 'Home',
    activeClass: 'global-sidebar-button-primary bg-[#004265]',
    hoverClass: 'hover:bg-[#004265] hover:text-white',
  },
  {
    to: '/dashboard/quick-post',
    icon: <FiZap size={20} />,
    label: 'Quick Post',
    activeClass: 'global-sidebar-button-primary bg-[#006da7fb]',
    hoverClass: 'hover:bg-[#004265] hover:text-white',
  },
  {
    to: '/dashboard/create-post',
    icon: <FiFileText size={20} />,
    label: 'Post Generator',
    activeClass: 'global-sidebar-button-primary bg-[#00 6da7fb]',
    hoverClass: 'hover:bg-[#004265] hover:text-white',
  },
  {
    to: '/dashboard/collections',
    icon: <FiFolder size={20} />,
    label: 'Collections',
    activeClass: 'global-sidebar-button-primary bg-[#004265]',
    hoverClass: 'hover:bg-[#004265] hover:text-white',
  },
];

const SidebarLink = ({
  to,
  icon,
  label,
  isActive,
  onClick,
  isOpen,
  activeClass,
  hoverClass,
}) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-3 pr-3 w-full py-2 pl-3 rounded-md transition-opacity duration-500 ${
      isActive ? activeClass : hoverClass
    }`}
  >
    {React.cloneElement(icon, {
      className: 'text-white',
    })}
    <span className={`text-white text-sm ${isOpen ? '' : 'hidden'}`}>
      {label}
    </span>
  </Link>
);

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();
  const isMobile = window.innerWidth < 1024;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isActiveLink = (path) => location.pathname === path;

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between h-min bg-white p-4 lg:hidden">
        <button onClick={toggleSidebar} className="text-gray-600">
          <FiMenu size={24} />
        </button>

        <button onClick={toggleSidebar} className="text-gray-600">
          <FiUser size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`mulish-normal h-[90vh] lg:h-[100vh] lg:rounded-none rounded-xl fixed lg:relative lg:top-0 lg:left-0 top-2 left-0 border-r border-gray-300 bg-[#0c4a6e] text-white transition-all duration-700 ease-in-out z-10 ${
          isOpen ? 'translate-x-0 lg:ml-0 ml-2' : '-translate-x-full'
        } lg:translate-x-0`}
        style={{ width: isOpen ? '240px' : '78px' }}
      >
        <div
          className={`flex items-center justify-between py-4 ${
            isOpen ? 'pl-6 pr-2' : 'pr-2 pl-4'
          } border-b lg:border-b-0`}
        >
          <img src={EngageGPTLogo} className="h-10" alt="EngageGPT Logo" />
          {/* <span className={`text-md ${isOpen ? '' : 'hidden'}`}>EngageGPT</span> */}

          {/* Left Arrow for collapsing the sidebar on desktop */}
          <button
            onClick={toggleSidebar}
            className="text-gray-200 transform transition-transform duration-500"
          >
            <FiChevronLeft
              size={24}
              className={`transform p-1 transition-transform duration-500 ${
                isOpen
                  ? 'rotate-0 bg-white text-black rounded-full'
                  : 'bg-white text-black rounded-full lg:ml-3 rotate-180'
              }`}
            />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col rounded-xl h-[79vh] lg:h-[86vh] bg-[#0c4a6e] justify-between p-2">
          <div className="flex flex-col p-2 space-y-2">
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
              />
            ))}
          </div>

          <div className="flex flex-col rounded-lg p-2 bg-[#004265] lg:mr-1 space-y-3">
            <Tooltip text="Feedback" position="right">
              <button
                onClick={() => setIsFeedbackModalOpen(true)}
                className="flex text-white w-full text-sm items-center gap-3 py-2 pr-3 pl-3 rounded-md hover:bg-[#145a7f]"
              >
                <FiMessageSquare size={20} />
                <span className={`${isOpen ? '' : 'hidden'}`}>Feedback</span>
              </button>
            </Tooltip>
            <Tooltip text="Need Help?" position="right">
              <button
                onClick={() => setIsHelpModalOpen(true)}
                className="flex text-white w-full items-center text-sm gap-3 py-2 pr-3 pl-3 rounded-md hover:bg-[#145a7f]"
              >
                <FiHelpCircle size={20} />
                <span className={`${isOpen ? '' : 'hidden'}`}>Help</span>
              </button>
            </Tooltip>
            <SidebarLink
              key="/dashboard/settings"
              to="/dashboard/settings"
              icon={<FiSettings size={20} />}
              label="Settings"
              isActive={isActiveLink('/dashboard/settings')}
              onClick={handleLinkClick}
              isOpen={isOpen}
              activeClass="global-sidebar-button-primary text-sm bg-[#145a7f]"
              hoverClass="hover:bg-[#145a7f]"
            />
            <Tooltip text="Logout" position="right">
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex text-white items-center gap-3 w-full py-2 text-sm pl-3 rounded-md hover:bg-[#145a7f]"
              >
                <FiLogOut size={20} />
                <span className={`${isOpen ? '' : 'hidden'}`}>Logout</span>
              </button>
            </Tooltip>
          </div>
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
        onConfirm={() => {
          setIsLogoutModalOpen(false);
        }}
      />
    </div>
  );
}

export default Sidebar;
