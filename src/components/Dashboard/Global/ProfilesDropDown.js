import { useState } from 'react';
import { FiUsers, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';

const ProfilesDropDown = ({
  profiles,
  selectedProfile,
  onProfileChange,
  title,
  type = 'connected',
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const handleConnectLinkedIn = () => {
    const authUrl = process.env.REACT_APP_LINKEDIN_AUTH_URL;
    window.location.href = authUrl;
  };

  const getStatusColor = (profile) => {
    if (profile.isLinkedinConnected) return 'bg-green-400';
    return 'bg-yellow-400';
  };

  const getStatusText = (profile) => {
    if (profile.isLinkedinConnected) return 'Connected';
    return 'Pending';
  };

  const getStatusTextColor = (profile) => {
    if (profile.isLinkedinConnected) return 'text-green-600';
    return 'text-yellow-600';
  };

  const handleProfileClick = (profileId) => {
    onProfileChange(profileId);
    setIsHidden(true);
  };

  const handleMouseEnter = () => {
    setIsHidden(false);
  };

  return (
    <div className="relative group" onMouseEnter={handleMouseEnter}>
      <div className="flex items-center space-x-3 py-2 px-4 bg-white hover:bg-gray-50 rounded-xl  border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-lg">
            <FiUsers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-semibold">
              {profiles.length}
            </span>
            <span className="text-sm text-gray-500 hidden sm:block">
              {title}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <FiChevronUp className="h-2 w-2 text-gray-400" />
          <FiChevronDown className="h-2 w-2 text-gray-400" />
        </div>
      </div>

      <div
        className={`absolute -left-12 lg:right-0 lg:top-11 mt-2 w-80 bg-white border border-gray-200 rounded-xl z-20 overflow-hidden backdrop-blur-sm ${
          isHidden ? 'hidden' : 'hidden group-hover:block'
        }`}
      >
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">
            {type === 'connected'
              ? 'Linkedin Connected'
              : 'Connect LinkedIn Account'}
          </p>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {profiles.map((profile) => (
            <div
              key={profile.id || profile._id}
              onClick={() => handleProfileClick(profile._id)}
              className={`flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 cursor-pointer transition-all duration-200 group/item ${
                selectedProfile?.id === profile.id
                  ? 'bg-blue-50 border-r-2 border-blue-500'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={
                      profile.profilePicture ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        profile.name,
                      )}&background=6366f1&color=fff&size=40`
                    }
                    alt={profile.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        profile.name,
                      )}&background=6366f1&color=fff&size=40`;
                    }}
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(
                      profile,
                    )}`}
                  ></div>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-gray-900 group-hover/item:text-gray-700">
                    {profile.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(
                        profile,
                      )}`}
                    ></div>
                    <p
                      className={`text-xs font-medium ${getStatusTextColor(
                        profile,
                      )}`}
                    >
                      {getStatusText(profile)}
                    </p>
                  </div>
                </div>
              </div>
              {type === 'pending' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConnectLinkedIn();
                  }}
                  className="flex items-center gap-1 px-4 py-2 text-xs bg-blue-900 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <FaLinkedin className="w-3 h-3" />
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilesDropDown;
