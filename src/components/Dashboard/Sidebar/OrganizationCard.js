import { Icons } from '@utils/constantData/icons';
import { Link } from 'react-router-dom';
import { MenuButton } from './MenuButton';
import { useState } from 'react';
import UpgradeModal from '../../Common/UpgradeModal';

const OrganizationCard = ({
  userData,
  isOpen,
  isCardOpen,
  onSettingsClick,
  setIsFeedbackModalOpen,
  setIsLogoutModalOpen,
  setIsHelpModalOpen,
  onToggleCard,
}) => {
  const {
    name = 'Loading...',
    email = '',
    profilePicture,
    credits,
  } = userData || {};

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Get user initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <div
        className="bg-gradient-to-br from-slate-200 via-gray-100 to-indigo-100 rounded-2xl p-2 text-black transition-all duration-300 ease-in-out overflow-hidden"
        style={{ width: isOpen ? '230px' : '70px' }}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            isCardOpen
              ? 'max-h-96 opacity-100 transform translate-y-0 mb-4'
              : 'max-h-0 opacity-0 transform -translate-y-4 mb-0'
          }`}
          style={{
            overflow: 'hidden',
            transitionProperty: 'max-height, opacity, transform, margin-bottom',
          }}
        >
          <p className="text-black text-xs m-0 px-2 py-0">{email}</p>
          <div className="space-y-1 py-2">
            <Link to="/dashboard/settings" onClick={onSettingsClick}>
              <MenuButton
                icon={<Icons.Settings size={16} />}
                text="Settings"
                hasArrow
              />
            </Link>
            <div className="text-gray-500 h-[0.2px] bg-gray-300"></div>
            <MenuButton
              onClick={() => setIsHelpModalOpen(true)}
              icon={<Icons.Help size={16} />}
              text="Get help"
            />
            <MenuButton
              onClick={() => setIsFeedbackModalOpen(true)}
              icon={<Icons.Message size={16} />}
              text="Give feedback"
            />
            <div className="text-gray-500 h-[0.2px] bg-gray-300"></div>
            <MenuButton
              onClick={() => setIsLogoutModalOpen(true)}
              icon={<Icons.LogOut size={16} />}
              text="Logout"
              className="text-red-500 hover:bg-white"
            />
          </div>
        </div>

        {/* User profile section */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isOpen ? 'w-full' : 'w-[80px]'
          }`}
        >
          {isOpen && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="relative mb-2 w-full group overflow-hidden rounded-lg p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-xy"></div>

              {/* Button content */}
              <div className="relative flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:to-pink-50">
                {/* Icon with animation */}
                <div className="relative">
                  <Icons.Credits
                    size={16}
                    className="relative z-10 text-purple-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                  />

                  {/* Sparkle effect */}
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                </div>

                {/* Text with gradient */}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 group-hover:from-purple-700 group-hover:via-pink-700 group-hover:to-blue-700 transition-all duration-300">
                  Add More Credits
                </span>

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </div>
            </button>
          )}

          {/* Add these custom animations to your global CSS or Tailwind config */}
          <style jsx>{`
            @keyframes gradient-xy {
              0%,
              100% {
                background-position: 0% 50%;
                background-size: 400% 400%;
              }
              50% {
                background-position: 100% 50%;
                background-size: 400% 400%;
              }
            }

            .animate-gradient-xy {
              animation: gradient-xy 3s ease infinite;
            }
          `}</style>

          <button
            onClick={onToggleCard}
            className="w-max mx-auto flex items-center justify-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-white/30"
          >
            {/* Avatar */}
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 transition-all duration-300 ${
                isOpen ? 'mr-0' : 'mr-10'
              }`}
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile Picture"
                  className="min-h-10 min-w-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-xs">
                  {getInitials(name)}
                </span>
              )}
            </div>

            {isOpen && (
              <div className="flex items-center justify-between w-full">
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'opacity-100 transform translate-x-0 w-fit'
                      : 'opacity-0 transform -translate-x-4 w-0'
                  }`}
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div className="flex w-fit flex-col text-left">
                    <div className="font-semibold w-fit text-black text-sm truncate">
                      {name}
                    </div>
                    <div className="text-xs w-fit text-black capitalize">
                      {`${credits?.balance || 0} Credits Left`}
                    </div>
                  </div>
                </div>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'opacity-100 transform translate-x-0 ml-4'
                      : 'opacity-0 transform -translate-x-4 ml-0'
                  }`}
                >
                  <div
                    className={`text-gray-400 transform transition-transform duration-300 ease-in-out ${
                      isCardOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    <Icons.Up size={16} />
                  </div>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
};

export default OrganizationCard;
