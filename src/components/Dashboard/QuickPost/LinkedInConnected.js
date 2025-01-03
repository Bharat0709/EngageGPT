import React from 'react';
import { Skeleton } from 'antd';
import CustomDropdown from '../Global/CustomDropDown';
import { FaLinkedin } from 'react-icons/fa';

const LinkedInConnection = ({
  isLoading,
  linkedInConnected,
  connectedProfiles,
  selectedProfile,
  setSelectedProfile,
}) => {
  const handleConnectLinkedIn = () => {
    const authUrl = process.env.REACT_APP_LINKEDIN_AUTH_URL;
    window.location.href = authUrl;
  };

  return (
    <div className="mb-4">
      <div className="flex lg:flex-row flex-wrap gap-2 items-center justify-between mb-2">
        <h3 className="text-xl p-0 m-0 font-medium">Share Content</h3>

        <div className="flex items-end text-sm gap-4">
          {isLoading ? (
            <>
              <Skeleton.Input active size="small" style={{ width: '200px' }} />
            </>
          ) : (
            <>
              {connectedProfiles?.length > 0 ? (
                <div className="my-2">
                  <CustomDropdown
                    options={connectedProfiles.map((profile) => ({
                      label: profile.name,
                      value: profile._id,
                    }))}
                    selected={selectedProfile}
                    onSelect={setSelectedProfile}
                    label="Select Profile"
                  />
                </div>
              ) : (
                <div></div>
              )}
            </>
          )}
        </div>
        {isLoading ? (
          <Skeleton.Button active size="default" style={{ width: '150px' }} />
        ) : (
          <button
            onClick={handleConnectLinkedIn}
            disabled={linkedInConnected}
            className={`py-2 flex items-center gap-2 px-3 rounded-lg text-sm transition-all duration-300 ${
              linkedInConnected
                ? 'global-button-primary bg-green-500 text-white border-green-600 hover:bg-green-600'
                : selectedProfile
                ? 'global-button-primary hover:bg-sky-950'
                : 'global-button-primary text-white hover:bg-sky-950 transition-all'
            }`}
          >
            <FaLinkedin className="text-white" size={20} />
            {linkedInConnected
              ? 'Connected'
              : selectedProfile
              ? 'Connect another account'
              : 'Connect'}
          </button>
        )}
      </div>
    </div>
  );
};

export default LinkedInConnection;
