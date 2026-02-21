import React, { useState, useEffect } from 'react';
import OrganizationProfileSkeleton from '@components/Dashboard/SkeletonLoaders/OrganizationSettings';
import { fetchOrganizationData } from '@services/Organization';
import { useNotifications } from '@components/Common/Notification';
import EditOrgModal from './EditOrgModal';
import { People } from './People';
import { OrganizationCard } from './Organization/OrganizationCard';
import { SubscriptionCard } from './Organization/SubscriptionDetails';
import UpgradeModal from '@components/Common/UpgradeModal';

const OrganizationProfileSettings = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState('general');
  const message = useNotifications();

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

  const handleViewUpgrade = (viewType) => {
    setView(viewType);
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
    <div className="w-full h-full scrollbar-hide overflow-auto overflow-y-scroll mx-auto lg:p-4 p-4 bg-[#fafafa] shadow-md">
      <h2 className="text-xl ovo-regular p-0 mt-0 text-semibold mb-2">
        Organization Settings
      </h2>

      <div className="flex geist pt-3 pr-3 text-sm lg:text-md justify-start gap-4 items-center mb-2">
        <button
          onClick={() => handleViewToggle('general')}
          className={`${
            view === 'general'
              ? 'text-blue-600  pb-3 border-b border-blue-600  !font-semibold geist '
              : 'rounded-xl pb-3  text-gray-500'
          }`}
        >
          General
        </button>

        <button
          onClick={() => handleViewToggle('subscription')}
          className={`${
            view === 'subscription'
              ? 'text-blue-600  pb-3 border-b border-blue-600  !font-semibold geist '
              : 'text-gray-500  pb-3 '
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => handleViewUpgrade('upgrade')}
          className={`${
            view === 'upgrade'
              ? 'text-blue-600  pb-3 border-b border-blue-600  !font-semibold geist '
              : 'text-gray-500 pb-3 '
          }`}
        >
          Add More Credits
        </button>
      </div>
      {view === 'general' && (
        <OrganizationCard userData={userData} setIsModalOpen={setIsModalOpen} />
      )}
      {view === 'subscription' && <SubscriptionCard userData={userData} />}
      {view === 'upgrade' && (
        <UpgradeModal
          isOpen={true}
          onClose={() => {
            setView('general');
          }}
        />
      )}
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
