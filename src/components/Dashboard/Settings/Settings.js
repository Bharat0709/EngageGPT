import React, { useState, useEffect } from 'react';
import OrganizationProfileSkeleton from '@components/Dashboard/SkeletonLoaders/OrganizationSettings';
import { fetchOrganizationData, forgotPassword } from '@services/Organization';
import { message } from 'antd';
import { Icons } from '@utils/constantData/icons';
import EditOrgModal from './EditOrgModal';
import { People } from './People';

const OrganizationProfileSettings = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState('general');

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      setLoading(true);
      try {
        const data = await fetchOrganizationData();
        setUserData(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        message.error('Error fetching organization details');
      }
    };

    fetchAndSetUserData();
  }, []);

  const handleSendResetPasswordEmail = async () => {
    try {
      message.loading({
        content: 'Sending password reset email...',
        key: 'reset',
      });
      await forgotPassword(userData.email);
      message.success({
        content: 'Password reset email sent successfully!',
        key: 'reset',
      });
      message.info('Please check spam folder as well!');
    } catch (err) {
      message.error('Failed to send password reset email. Please try again.');
    }
  };

  const handleViewToggle = (viewType) => {
    setView(viewType);
  };

  const handleSaveProfile = (updatedData) => {
    setUserData((prevData) => ({ ...prevData, ...updatedData }));
  };

  if (loading) {
    return <OrganizationProfileSkeleton />;
  }

  return (
    <div className="w-full h-full rounded-xl scrollbar-hide overflow-auto overflow-y-scroll mx-auto lg:p-6 p-4 bg-[#ededed] shadow-md">
      <h2 className="text-2xl p-0 mt-0 text-semibold mb-4">
        Organization Settings
      </h2>

      <div className="flex bg-gray-50 rounded-xl p-3 text-sm justify-start gap-4 items-center mb-2">
        <button
          onClick={() => handleViewToggle('general')}
          className={`${
            view === 'general' ? 'text-black font-semibold' : 'text-gray-600'
          }`}
        >
          General
        </button>
      </div>

      <div className="mb-6 bg-white rounded-xl p-2 pr-4 flex flex-col gap-3 justify-between">
        <div className="p-2 pr-2 rounded-xl flex gap-6 items-start justify-between">
          <div className="flex justify-start items-center gap-4">
            {userData?.profilePicture ? (
              <img
                src={userData?.profilePicture}
                alt="Profile"
                className="mt-1 w-16 h-16 rounded-full object-cover border"
              />
            ) : (
              <img
                src="https://firebasestorage.googleapis.com/v0/b/coldemail-2d11a.appspot.com/o/Avatar.png?alt=media&token=b07b4ca9-074c-465e-985b-7c6e562f2e7b"
                alt="Profile"
                className="mt-1 w-16 h-16 rounded-full object-cover border"
              />
            )}
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

        <div className="flex w-full justify-between items-center">
          <p className="w-full text-sm px-2 text-left text-gray-500">
            <div className="flex lg:flex-row flex-col justify-between w-full lg:items-center items-start lg:gap-2 gap-4">
              <div className="flex lg:flex-row flex-col gap-2 lg:gap-4">
                <p className="p-0 m-0">
                  Logged in via:{' '}
                  <span className="font-bold p-0 m-0">
                    {userData.oauthProvider === 'google'
                      ? 'Google'
                      : 'Password'}
                  </span>
                </p>
                <p className="p-0 m-0">
                  Current Plan:{' '}
                  <span className="font-bold p-0 m-0">
                    {userData?.subscription.plan === 'basic'
                      ? 'FREE'
                      : userData?.subscription.plan.toUpperCase()}
                  </span>
                </p>
              </div>
              {userData.oauthProvider !== 'google' && (
                <button
                  onClick={handleSendResetPasswordEmail}
                  className="text-gray-800 text-left self-end text-sm p-0 m-0"
                >
                  Reset Password
                </button>
              )}
            </div>
          </p>
        </div>
      </div>

      <EditOrgModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />

      <People />
    </div>
  );
};

export default OrganizationProfileSettings;
