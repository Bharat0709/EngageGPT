import React, { useState, useEffect } from 'react';
import { Switch, Skeleton } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';

const LinkedInPostPreview = ({
  isLoading,
  connectedProfiles,
  selectedProfile,
  postDetails,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProfileDetails, setSelectedProfileDetails] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (connectedProfiles && selectedProfile) {
      const profileDetails = connectedProfiles.find(
        (profile) => profile._id === selectedProfile,
      );
      setSelectedProfileDetails(profileDetails);
    }
  }, [connectedProfiles, selectedProfile]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const renderMedia = () => {
    return postDetails.media.map((file, index) => {
      if (file.type.startsWith('image/')) {
        return (
          <img
            key={index}
            src={file.url || URL.createObjectURL(file)}
            alt="Post Media"
            className="rounded-lg mb-2"
            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
          />
        );
      }
      if (file.type === 'application/pdf') {
        return (
          <div
            key={index}
            className="flex items-center p-2 border rounded mb-2"
          >
            <FilePdfOutlined style={{ color: 'red', fontSize: '24px' }} />
            <span className="ml-2">{file.name}</span>
          </div>
        );
      }
      if (file.type.startsWith('video/')) {
        return (
          <video
            key={index}
            controls
            className="rounded-lg mb-2"
            style={{ width: '100%', maxHeight: '200px' }}
          >
            <source
              src={file.url || URL.createObjectURL(file)}
              type={file.type}
            />
          </video>
        );
      }
      return null;
    });
  };

  return (
    <div
      className={`p-4 max-h-[65vh] overflow-y-scroll rounded-lg mb-3 scrollbar-hide  py-2 border-gray-300 border ${
        isDarkMode ? 'bg-[#1d2226] text-white' : 'bg-white text-black'
      }`}
    >
      {isLoading ? (
        <div className="flex items-center gap-4 mt-2 mb-4">
          <Skeleton.Avatar
            active
            size="large"
            style={{ height: 60, width: 60 }}
          />
          <div className="flex flex-col gap-1 w-full">
            <Skeleton.Input
              active
              size="small"
              style={{ width: '60%', height: 12 }}
            />
            <Skeleton.Input
              active
              size="small"
              style={{ width: '60%', height: 12 }}
            />
          </div>
        </div>
      ) : (
        selectedProfileDetails && (
          <div className="flex justify-between items-center">
            <div className="mb-4 mt-2 flex items-center gap-4">
              <img
                src={selectedProfileDetails?.profilePicture}
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div className="flex flex-col  gap-1">
                <p className="font-bold m-0 p-0">
                  {selectedProfileDetails?.name}
                </p>
                <p className="text-xs m-0 p-0">
                  Your bio will be present here...
                </p>
                <p className="text-[8px] m-0 p-0">Just Now</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg">
                <Switch
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  checkedChildren="🌙"
                  unCheckedChildren="☀️"
                  className="bg-gray-50 dark:bg-gray-500"
                />
              </div>
            </div>
          </div>
        )
      )}

      {isLoading ? (
        <Skeleton active paragraph={{ rows: 2 }} />
      ) : (
        <div className="mb-4 mt-2">
          <h4
            className="text-sm whitespace-pre-wrap"
            style={{ lineHeight: '1.5' }}
          >
            {postDetails?.content.length > 100 ? (
              <>
                {postDetails?.content.substring(0, 100)}...
                <span
                  className="text-sky-800 cursor-pointer"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? 'See Less' : 'See More'}
                </span>
              </>
            ) : (
              postDetails.content || 'Your post content here...'
            )}
          </h4>
        </div>
      )}

      {/* Media Skeleton */}
      {isLoading ? (
        <Skeleton.Image
          className="mt-3 mb-2 rounded-xl"
          active
          style={{ width: '80px', height: '70px' }}
        />
      ) : (
        showMore && (
          <div>
            <h4
              className="text-sm mb-3 whitespace-pre-wrap"
              style={{ lineHeight: '1.5' }}
            >
              {postDetails?.content}
            </h4>

            {renderMedia()}
          </div>
        )
      )}
    </div>
  );
};

export default LinkedInPostPreview;
