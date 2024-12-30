import React, { useState, useEffect } from 'react';
import { fetchOrganizationData } from '../../network/Members';
import { message, Skeleton } from 'antd';
import { FiEdit } from 'react-icons/fi';
import EditOrgModal from './EditOrgModal';
import People from './People';

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
        console.error('Failed to fetch user data:', err.message);
        message.error(err.message);
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
      // Mock API call to send password reset email
      console.log('Sending password reset email to:', userData.email);
      message.success({
        content: 'Password reset email sent successfully!',
        key: 'reset',
      });
    } catch (err) {
      console.error('Failed to send password reset email:', err.message);
      message.error('Failed to send password reset email. Please try again.');
    }
  };

  const handleViewToggle = (viewType) => {
    setView(viewType);
  };

  const handleSaveProfile = (updatedData) => {
    console.log('Updated data:', updatedData);
    setUserData((prevData) => ({ ...prevData, ...updatedData }));
  };

  return (
    <div className="w-full h-full scrollbar-hide overflow-auto overflow-y-scroll mx-auto p-6 bg-[#f3f4f6] shadow-md">
      <h2 className="text-2xl text-semibold mb-4">Organization Settings</h2>

      <div className="flex bg-gray-50 rounded-xl p-3 text-sm justify-start gap-4 items-center mb-2">
        <>
          <button
            onClick={() => handleViewToggle('general')}
            className={`${
              view === 'general' ? 'text-black font-semibold' : 'text-gray-600'
            }`}
          >
            General
          </button>
          <button
            onClick={() => handleViewToggle('billing')}
            className={`${
              view === 'billing' ? ' text-black font-semibold' : 'text-gray-600'
            }`}
          >
            Billing
          </button>
        </>
      </div>

      <div className="mb-6 bg-white rounded-xl p-2 pr-4 flex flex-col gap-3 justify-between">
        <div className="p-2 pr-2 rounded-xl flex gap-6 items-start justify-between">
          <div className="flex justify-start items-center gap-4">
            {loading ? (
              <Skeleton.Avatar
                active
                size="large"
                style={{ height: 64, width: 64 }}
              />
            ) : userData?.profilePicture ? (
              <img
                src={userData?.profilePicture}
                alt="Profile"
                className="mt-1 w-16 h-16 rounded-full object-cover border"
              />
            ) : (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlPViCqVyGRxdQtmHT-5rBlQoa1XJsMwkOdQ3A-hEWfkYMRLG-S-LRYCLcGteHqbSF4Kk&usqp=CAU"
                alt="Profile"
                className="mt-1 w-16 h-16 rounded-full object-cover border"
              />
            )}
            <div className="flex flex-col gap-1">
              {loading ? (
                <>
                  <Skeleton.Input
                    style={{ height: 12 }}
                    active
                    size="small"
                    className="w-40"
                  />
                  <Skeleton.Input
                    style={{ height: 12 }}
                    active
                    size="small"
                    className="w-60 "
                  />
                </>
              ) : (
                <>
                  <p className="text-lg text-gray-900">
                    {userData.name || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-900">
                    {userData.email || 'N/A'}
                  </p>
                </>
              )}
            </div>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="text-black">
            {loading ? (
              <Skeleton.Button
                style={{ width: 12, height: 24 }}
                active
                size="small"
              />
            ) : (
              <FiEdit className="text-xl h-6 lg:mt-0 mt-2" />
            )}
          </button>
        </div>

        <div className="flex mb-2 justify-between items-center">
          <p className="text-sm px-2 text-left text-gray-500">
            {loading ? (
              <Skeleton.Input
                style={{ height: 12 }}
                active
                size="small"
                className="w-40"
              />
            ) : (
              <>
                Logged in via:{' '}
                <b>
                  {userData.oauthProvider === 'google' ? 'Google' : 'Password'}
                </b>
              </>
            )}
          </p>
          {!loading && userData.oauthProvider !== 'google' && (
            <button
              onClick={handleSendResetPasswordEmail}
              className="text-gray-800 px-2 text-right text-sm p-0 m-0"
            >
              Reset Password
            </button>
          )}
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
