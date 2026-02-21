import { Icons } from '@utils/constantData/icons';
import { useState, useEffect } from 'react';

const getInitials = (name) => {
  if (!name) return 'NA';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const OrganizationCard = ({ userData, setIsModalOpen }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [userData?.profilePicture]);

  return (
    <div className="mb-4 bg-white mt-4 rounded-xl p-2 pr-4 flex flex-col gap-3 justify-between">
      <div className="p-2 pr-2 rounded-xl flex gap-6 items-start justify-between">
        <div className="flex justify-start items-center gap-4">
          <div className="relative mt-1 w-16 h-16 rounded-full overflow-hidden border bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            {(!userData?.profilePicture || imageError || !imageLoaded) && (
              <span className="text-white font-bold text-xl">
                {getInitials(userData?.name)}
              </span>
            )}
            {userData?.profilePicture && !imageError && (
              <img
                src={userData.profilePicture}
                alt="Profile"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-lg p-0 m-0 text-gray-900">
              {userData?.name || 'N/A'}
            </p>
            <p className="text-sm p-0 m-0 text-gray-900">
              {userData?.email || 'N/A'}
            </p>
          </div>
        </div>

        <button
          disabled={userData?.oauthProvider === 'google'}
          onClick={() => setIsModalOpen(true)}
          className={`text-black ${
            userData?.oauthProvider === 'google'
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          }`}
        >
          <Icons.Edit className="text-xl h-6 lg:mt-0 mt-2" />
        </button>
      </div>
      <p className="w-full text-sm px-2 text-left text-gray-500">
        <div className="flex lg:flex-row flex-col justify-between w-full lg:items-center items-start lg:gap-2 gap-4">
          <div className="flex lg:flex-row flex-col gap-2 lg:gap-4">
            <p className="p-0 m-0">
              Logged in via:{' '}
              <span className="font-bold p-0 m-0">
                {userData.oauthProvider === 'google' ? 'Google' : 'Password'}
              </span>
            </p>
          </div>
        </div>
      </p>
    </div>
  );
};
