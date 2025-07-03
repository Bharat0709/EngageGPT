import { Skeleton } from 'antd';
import { FaLinkedin } from 'react-icons/fa';
import ProfilesDropDown from '../Global/ProfilesDropDown';

const LinkedInConnection = ({
  invitedProfiles,
  isLoading,
  connectedProfiles,
  selectedProfile,
  setSelectedProfile,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <Skeleton.Button
            active
            size="default"
            style={{ width: '200px', height: '40px' }}
          />
          <Skeleton.Avatar active size="default" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 mb-2">
      {invitedProfiles.length > 0 && (
        <ProfilesDropDown
          profiles={invitedProfiles}
          selectedProfile={selectedProfile}
          onProfileChange={setSelectedProfile}
          title="Pending Connections"
          type="pending"
        />
      )}
      {connectedProfiles?.length > 0 && (
        <ProfilesDropDown
          profiles={connectedProfiles}
          selectedProfile={selectedProfile}
          onProfileChange={setSelectedProfile}
          title="Select Profile"
        />
      )}

      {invitedProfiles?.length === 0 && connectedProfiles?.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <FaLinkedin className="w-5 h-5 text-yellow-600" />
            <div>
              <h3 className="font-medium text-yellow-800">
                No Connected Profiles
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Add team members and connect their LinkedIn accounts to get
                started.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedInConnection;
