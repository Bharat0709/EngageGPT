import { message } from 'antd';
import { FiAlertCircle } from 'react-icons/fi';
import { disconnectLinkedIn } from '../../../network/Members';
import { useNavigate } from 'react-router-dom';

function LinkedInSettings({ memberData } = props) {
  const handleConnectLinkedIn = () => {
    const authUrl = process.env.REACT_APP_LINKEDIN_AUTH_URL;
    window.location.href = authUrl;
  };

  const handleDisconnectLinkedIn = async () => {
    try {
      await disconnectLinkedIn(memberId);
      // Update the memberData to reflect disconnection
      setMemberData({
        ...memberData,
        isLinkedinConnected: false,
      });
      message.success('LinkedIn account disconnected successfully');
    } catch (error) {
      message.error('Failed to disconnect LinkedIn account');
    }
  };
  return (
    <div>
      {' '}
      <div className="p-2">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold m-0">LinkedIn Connection</h3>
            <p className="text-sm text-gray-500 m-0">
              Manage LinkedIn account integration
            </p>
          </div>
        </div>

        {memberData?.isLinkedinConnected ? (
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-3">Account Information</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="border rounded-lg p-4">
                <p className="text-sm font-medium m-0">Followers</p>
                <p className="text-xl font-semibold">
                  {memberData?.followersCount.toLocaleString()}
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <p className="text-sm font-medium m-0">Connections</p>
                <p className="text-xl font-semibold">
                  {memberData?.connectionsCount.toLocaleString()}
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <p className="text-sm font-medium m-0">Profile Views</p>
                <p className="text-xl font-semibold">
                  {memberData?.profileViews.toLocaleString()}
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <p className="text-sm font-medium m-0">Search Appearances</p>
                <p className="text-xl font-semibold">
                  {memberData?.searchAppearances.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Last Synced</p>
              <p className="text-sm text-gray-600">
                {memberData?.lastSyncedAt
                  ? new Date(memberData.lastSyncedAt).toLocaleString()
                  : 'Never'}
              </p>
            </div>

            <button
              className="bg-red-600 text-white w-fit transition-all rounded-none px-6 py-2 text-sm font-medium flex items-center gap-2"
              onClick={handleDisconnectLinkedIn}
            >
              Disconnect LinkedIn
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 border rounded-lg">
            <FiAlertCircle size={48} className="text-gray-400 mb-4" />
            <p className="text-lg font-medium mb-2">LinkedIn Not Connected</p>
            <p className="text-sm text-gray-500 mb-4 text-center max-w-md">
              Connect LinkedIn to automatically save posts and access analytics
              features
            </p>
            <button
              onClick={handleConnectLinkedIn}
              className="btn-primary flex items-center gap-2 whitespace-nowrap px-6 py-2 text-sm font-medium bg-white border border-black text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#00000"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Connect LinkedIn Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LinkedInSettings;
