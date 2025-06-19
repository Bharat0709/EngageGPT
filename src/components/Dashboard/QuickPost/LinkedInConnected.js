import { useState, useEffect } from 'react';
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
  const [selectedProfileDetails, setSelectedProfileDetails] = useState(null);

  useEffect(() => {
    if (selectedProfile) {
      const profileDetails = connectedProfiles.find(
        (profile) => profile._id === selectedProfile,
      );
      setSelectedProfileDetails(profileDetails);
    }
  }, [selectedProfileDetails, selectedProfile, connectedProfiles]);

  const handleConnectLinkedIn = () => {
    const authUrl = process.env.REACT_APP_LINKEDIN_AUTH_URL;
    window.location.href = authUrl;
  };

  return (
    <div className=" bg-white rounded-lg flex px-2 mb-2 items-center justify-between">
      <div className="flex lg:flex-row lg:mt-0 mt-2 flex-wrap gap-2 items-center justify-center lg:justify-center">
        {isLoading ? (
          <Skeleton.Button
            active
            size="default"
            style={{ marginTop: '12px', marginBottom: '12px', width: '100px' }}
          />
        ) : (
          <div className="flex lg:flex-row flex-wrap items-center justify-center lg:gap-4 gap-2">
            <div className="flex items-end text-sm gap-4">
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
            </div>
            <button
              onClick={handleConnectLinkedIn}
              disabled={linkedInConnected}
              className={`py-2 flex items-center justify-center mx-auto text-xs gap-2 px-3 my-2 rounded-lg transition-all duration-300 ${
                linkedInConnected
                  ? 'global-button-primary bg-green-500 text-white border-green-600 hover:bg-green-600'
                  : selectedProfile
                  ? 'global-button-primary hover:bg-sky-950'
                  : 'global-button-primary text-white hover:bg-sky-950 transition-all'
              }`}
            >
              <FaLinkedin className="text-white " size={18} />
              {linkedInConnected
                ? 'Connected'
                : selectedProfile
                ? 'Connect more profiles'
                : 'Connect'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInConnection;
