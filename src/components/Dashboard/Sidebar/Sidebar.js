import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../assets/styles/GlobalCSS.css';
import { Link, useLocation } from 'react-router-dom';
import LogoutModal from '../Global/LogoutModal';
import {
  FiLogOut,
  FiMenu,
  FiSettings,
  FiHelpCircle,
  FiUser,
  FiMessageSquare,
  FiChevronLeft,
  FiGrid,
  FiCalendar,
  FiSave,
  FiZap,
  FiEdit,
  FiClock,
} from 'react-icons/fi';
import EngageGPTLogo from '../../../assets/images/EngageGPTLogoIocn.png';
import FeedbackModal from './FeebackModal';
import HelpModal from './HelpModal';

// Updated menu items with hollow (outline) icons
const menuItems = [
  {
    to: '/dashboard',
    icon: <FiGrid size={18} className="text-white" />,
    label: 'Dashboard',
    activeClass:
      'global-sidebar-button-primary border border-gray-700 bg-white',
    hoverClass: 'hover:bg-white hover:text-black',
    tag: null,
  },
  {
    to: '/dashboard/quick-post',
    icon: <FiZap size={18} />,
    label: 'Quick Post',
    activeClass:
      'global-sidebar-button-primary border border-gray-700 bg-white',
    hoverClass: 'hover:bg-white hover:text-black',
    tag: { text: 'MOST USED', color: 'bg-red-500' },
  },
  {
    to: '/dashboard/create-post',
    icon: <FiEdit size={18} />,
    label: 'AI Content Creator',
    activeClass:
      'global-sidebar-button-primary border border-gray-700 bg-white',
    hoverClass: 'hover:bg-white hover:text-black',
    tag: { text: 'HOT', color: 'bg-yellow-500' },
  },
  {
    to: '/dashboard/post-history',
    icon: <FiClock size={18} />,
    label: 'Post History',
    activeClass:
      'global-sidebar-button-primary border border-gray-700 bg-white',
    hoverClass: 'hover:bg-white hover:text-black',
    tag: null,
  },
  {
    to: '/dashboard/content-calendar',
    icon: <FiCalendar size={18} />,
    label: 'Content Calendar',
    activeClass:
      'global-sidebar-button-primary border border-gray-700 bg-white',
    hoverClass: 'hover:bg-white hover:text-black',
    tag: { text: 'NEW', color: 'bg-blue-500' },
  },
  {
    to: '/dashboard/saved-posts',
    icon: <FiSave size={18} />,
    label: 'Saved Posts',
    activeClass:
      'global-sidebar-button-primary border border-gray-700 bg-white',
    hoverClass: 'hover:bg-white hover:text-black',
    tag: { text: 'NEW', color: 'bg-blue-500' },
  },
  // {
  //   to: '/dashboard/email-template',
  //   icon: <FiMail size={18} />,
  //   label: 'Email Template',
  //   activeClass:
  //     'global-sidebar-button-primary border border-gray-400 bg-white',
  //   hoverClass: 'hover:bg-white hover:text-black',
  //   tag: { text: 'SOON', color: 'bg-pink-500' },
  // },
];

// Enhanced SidebarLink with tag support
const SidebarLink = ({
  to,
  icon,
  label,
  isActive,
  onClick,
  isOpen,
  activeClass,
  hoverClass,
  tag,
}) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex pl-3 pr-3 items-center bg-gray-50 max-h-[38px] w-full gap-3 rounded-md transition-all duration-500 ease-in-out relative
    ${isOpen ? 'py-2' : 'py-2'} 
    ${isActive ? activeClass : hoverClass}
  `}
  >
    {React.cloneElement(icon, {
      className: 'text-black opacity-100 flex-shrink-0', // Ensure icon doesn't shrink
    })}
    <span
      className={`text-black text-sm transition-all duration-300 ease-in-out overflow-hidden
    ${isOpen ? 'opacity-100 max-w-[250px] delay-500' : 'opacity-0 max-w-0'}
  `}
    >
      {label}
    </span>

    {/* Tag element - only shows when sidebar is open */}
    {tag && isOpen && (
      <span
        className={`absolute right-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white ${tag.color}`}
      >
        {tag.text}
      </span>
    )}

    {/* Small dot indicator when sidebar is closed and item has a tag */}
    {tag && !isOpen && (
      <span
        className={`absolute top-0 right-0 w-2 h-2 rounded-full ${tag.color}`}
      ></span>
    )}
  </Link>
);

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
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

  const handleProfileNavigate = () => {
    navigate('/dashboard/settings');
  };

  return (
    <div className="flex scrollbar-hide flex-col">
      <div className="flex justify-between h-min bg-white p-4 lg:hidden">
        <button onClick={toggleSidebar} className="text-gray-600">
          <FiMenu size={24} />
        </button>
        <button onClick={handleProfileNavigate} className="text-gray-600">
          <FiUser size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`mulish-normal h-[90vh] lg:h-[98vh] lg:rounded-r-xl lg:rounded-l-xl scrollbar-hide mr-1 fixed lg:relative lg:top-0 lg:left-0 top-2 left-0 rounded-xl bg-gray-50 text-black transition-all duration-1000 ease-in-out z-10 ${
          isOpen ? 'translate-x-0 lg:ml-0 ml-2' : '-translate-x-full'
        } lg:translate-x-0`}
        style={{ width: isOpen ? '240px' : '78px' }}
        // onMouseEnter={() => setIsOpen(true)}
        // onMouseLeave={() => setIsOpen(false)}
      >
        <div
          className={`flex items-center scrollbar-hide justify-between pt-2 pb-4 ${
            isOpen ? 'pl-6 pr-2' : 'pr-2 pl-4'
          } border-b lg:border-b-0`}
        >
          <a
            className="h-10 w-10 min-w-10 mr-2 mt-2 "
            href="https://engagegpt.in"
          >
            <img src={EngageGPTLogo} className="h-10" alt="EngageGPT Logo" />
          </a>
          <button
            onClick={toggleSidebar}
            className="text-gray-200 transform transition-transform duration-500"
          >
            <FiChevronLeft
              size={24}
              className={`transform p-1 transition-transform duration-500 ${
                isMobile ? 'flex' : 'flex'
              } ${
                isOpen
                  ? 'rotate-0 bg-white text-black rounded-full'
                  : 'bg-white text-black rounded-full rotate-180'
              }`}
            />
          </button>
        </div>

        {/* Sidebar Links */}
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

          <div className="flex flex-col rounded-lg p-2 bg-white lg:mr-1 space-y-1">
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="flex text-black w-full text-sm items-center gap-3 py-2 pr-3 pl-3 rounded-md hover:bg-gray-100"
            >
              <FiMessageSquare className="flex-shrink-0" size={17} />
              <span
                className={`text-black text-sm transition-all duration-300 ease-in-out overflow-hidden
    ${isOpen ? 'opacity-100 max-w-[250px] delay-500' : 'opacity-0 max-w-0'}
  `}
              >
                Feedback
              </span>
            </button>

            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="flex text-black w-full items-center text-sm gap-3 py-2 pr-3 pl-3 rounded-md hover:bg-gray-100"
            >
              <FiHelpCircle className="flex-shrink-0" size={17} />
              <span
                className={`text-black text-sm transition-all duration-300 ease-in-out overflow-hidden
    ${isOpen ? 'opacity-100 max-w-[250px] delay-500' : 'opacity-0 max-w-0'}
  `}
              >
                Help
              </span>
            </button>
            <SidebarLink
              key="/dashboard/settings"
              to="/dashboard/settings"
              icon={<FiSettings size={17} />}
              label="Settings"
              isActive={isActiveLink('/dashboard/settings')}
              onClick={handleLinkClick}
              isOpen={isOpen}
              activeClass="global-sidebar-button-primary text-sm bg-gray-100"
              hoverClass="hover:bg-gray-100 hover:text-black"
              tag={null}
            />
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex text-black items-center gap-3 mt-4 bg-red-500 w-full py-2 text-sm pl-3 rounded-md"
            >
              <FiLogOut className=" text-white flex-shrink-0" size={17} />
              <span
                className={`text-white text-sm transition-all duration-300 ease-in-out overflow-hidden
    ${isOpen ? 'opacity-100 max-w-[250px] delay-500' : 'opacity-0 max-w-0'}
  `}
              >
                Logout
              </span>
            </button>
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
