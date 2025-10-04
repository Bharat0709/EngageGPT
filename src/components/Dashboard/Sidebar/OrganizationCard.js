import { Icons } from '@utils/constantData/icons';
import { Link } from 'react-router-dom';
import { MenuButton } from './MenuButton';
import { useEffect, useState } from 'react';
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

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset states when profilePicture changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [profilePicture]);

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
              className="w-full flex items-center justify-center gap-2 px-8 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-none overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:w-full before:h-full before:translate-x-[-100%] hover:before:animate-[slide_1s_infinite] before:skew-x-12"
            >
              <Icons.Credits
                size={16}
                className="transition-transform duration-200 group-hover:rotate-12"
              />
              <span className="text-center">Add More Credits</span>
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
              <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 min-h-10 min-w-10 rounded-full overflow-hidden  flex items-center justify-center">
                {(!profilePicture || imageError || !imageLoaded) && (
                  <span className="text-white font-semibold text-xs">
                    {getInitials(name)}
                  </span>
                )}
                {profilePicture && !imageError && (
                  <img
                    src={profilePicture}
                    alt="Profile Picture"
                    className={`absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 object-cover transition-opacity duration-200 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
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
