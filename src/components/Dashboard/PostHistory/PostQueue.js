import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import disconnected from '@assets/images/disconnected.svg';
import { useNavigate } from 'react-router-dom';
import { getAllMembers, addNewMember } from '../../../network/Members';
import AddMembersModal from '../Global/AddPeopleModal';
import { FaClock } from 'react-icons/fa';
import PostHistoryDashboard from './PostManager';
import ProfilesDropDown from '../Global/ProfilesDropDown';
import Button from '@components/Common/Button';
import { Icons } from '@utils/constantData/icons';
import MembersProfileDropDown from '../Global/MembersDropDown';
import { useNotifications } from '@components/Common/Notification';
import TabNavigation from './TabNavigation';
import { usePostHistory } from './usePostHistory';

const PostQueue = () => {
  const message = useNotifications();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('scheduled');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [linkedInConnectedProfiles, setLinkedInConnectedProfiles] = useState(
    [],
  );
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [invitedProfiles, setInvitedProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshMembers, setRefreshMembers] = useState(false);

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMembers();
        const invited = data.filter(
          (member) => member.isLinkedinConnected === false,
        );
        const linkedInConnected = data.filter(
          (member) => member.isLinkedinConnected === true,
        );
        setIsLoading(false);
        setLinkedInConnectedProfiles(linkedInConnected);
        setInvitedProfiles(invited);
        setSelectedProfile(linkedInConnected[0] || null);
      } catch (err) {
        console.error('Error getting profile details!');
      }
    };

    fetchAndSetUserData();
  }, [refreshMembers]);

  const handleAddMembers = async (newPerson) => {
    try {
      for (const person of newPerson) {
        await addNewMember(person);
      }
      message.success('Invite sent successfully!');
      setRefreshMembers(!refreshMembers);
      setIsAddMemberModalOpen(false);
    } catch (err) {
      console.log(err.message);
      message.error(err.message || 'Failed to send invite');
    }
  };

  const handleConnectLinkedIn = () => {
    const authUrl = process.env.REACT_APP_LINKEDIN_AUTH_URL;
    window.location.href = authUrl;
  };

  const handleProfileChange = (profile) => {
    console.log(profile);
    linkedInConnectedProfiles.forEach((p) => {
      if (p._id === profile) {
        setSelectedProfile(p);
      }
    });
  };

  const { postHistory } = usePostHistory(selectedProfile);

  if (isLoading) {
    return (
      <div className="dashboard-container bg-gray-100 rounded-xl p-3">
        <div className="flex bg-gray-100 items-center justify-between pr-3">
          <Skeleton.Input style={{ width: 100, height: 24 }} active />
          <Skeleton.Button style={{ height: 24, width: 100 }} active />
          <Skeleton.Button style={{ height: 24, width: 100 }} active />
        </div>
        <PostHistoryDashboard selectedProfile={selectedProfile} />
      </div>
    );
  }
  if (
    !selectedProfile &&
    invitedProfiles.length === 0 &&
    linkedInConnectedProfiles.length === 0
  ) {
    navigate('/dashboard');
  }

  if (!selectedProfile && invitedProfiles.length > 0) {
    return (
      <div className="dashboard-container bg-gray-50 rounded-xl h-full bg-white-50">
        <div className="flex lg:flex-row flex-wrap  bg-white p-2 px-4  items-center justify-center gap-3 mb-2 lg:justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-[#0c4a6e] rounded-lg text-white text-lg sm:text-xl">
              <FaClock />
            </div>
            <div>
              <h2 className="text-md sm:text-xl m-0 p-0 text-gray-800">
                Post History
              </h2>
            </div>
          </div>
          {invitedProfiles.length > 0 && (
            <ProfilesDropDown
              profiles={invitedProfiles}
              selectedProfile={selectedProfile}
              onProfileChange={setSelectedProfile}
              title="Pending Connections"
              type="pending"
            />
          )}
          <Button
            theme="dark"
            icon={<Icons.Plus size={14} />}
            buttonText="Add Member"
            onClick={() => setIsAddMemberModalOpen(true)}
            className="border !border-gray-300 !rounded-full flex items-center text-xs gap-1 !py-2 !px-3"
          />
        </div>
        <div className="bg-white rounded-2xl m-2 text-center">
          <div className="flex flex-col items-center justify-center py-8">
            <img src={disconnected} alt="not-connected" className="h-60 w-60" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No LinkedIn Profiles Connected
            </h2>
            <button
              onClick={handleConnectLinkedIn}
              className="btn-primary mt-4 flex items-center gap-2 whitespace-nowrap px-6 py-2 text-sm font-medium bg-white border border-black text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              <Icons.LinkedIn size={20} />
              Connect LinkedIn Profile
            </button>
          </div>
        </div>
        <div className="bg-gray-50"></div>
        <AddMembersModal
          isOpen={isAddMemberModalOpen}
          onClose={() => setIsAddMemberModalOpen(false)}
          onSubmit={handleAddMembers}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50  min-h-screen rounded-xl ">
      <div className="flex lg:flex-row flex-col pt-1 gap-3 px-4 bg-white  justify-between items-center ">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-[#0c4a6e] rounded-lg text-white text-md sm:text-md">
            <FaClock />
          </div>
          <div>
            <h2 className="text-lg m-0 p-0 sm:text-xl text-gray-800">
              Post History
            </h2>
          </div>
        </div>
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          postHistory={postHistory}
        />
        <div className="flex flex-wrap justify-center items-center gap-4">
          <MembersProfileDropDown
            selectedProfileId={selectedProfile}
            profiles={linkedInConnectedProfiles}
            onProfileChange={handleProfileChange}
            onCopy={() => message.success('Profile copied!')}
          />
        </div>
      </div>
      <PostHistoryDashboard
        activeTab={activeTab}
        selectedProfile={selectedProfile}
      />
      <AddMembersModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMembers}
      />
    </div>
  );
};

export default PostQueue;
