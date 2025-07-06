import React, { useEffect, useState } from 'react';
import { Skeleton, message } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { getAllMembers, addNewMember } from '../../../network/Members';
import AddMembersModal from '../Global/AddPeopleModal';
import { FaClock, FaLinkedin } from 'react-icons/fa';
import PostHistoryDashboard from './PostManager';
import ProfilesDropDown from '../Global/ProfilesDropDown';

const PostQueue = () => {
  const navigate = useNavigate();
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
      message.info('Please check spam folder as well');
      setRefreshMembers(!refreshMembers);
      setIsAddMemberModalOpen(false);
    } catch (err) {
      message.error(err.message);
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
      <div className="dashboard-container rounded-xl h-full lg:p-6 p-2 bg-[#ededed]">
        <div className="flex items-center mb-6 justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#0c4a6e] rounded-lg text-white text-lg sm:text-xl">
              <FaClock />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl m-0 p-0 font-bold text-gray-800">
                Post History
              </h2>
              <p className="text-sm text-gray-600 m-0 p-0 hidden sm:block">
                Manage your post history and track your LinkedIn activity
              </p>
            </div>
          </div>
          <button
            type="primary"
            onClick={() => setIsAddMemberModalOpen(true)}
            className="global-button-primary text-sm  px-4 rounded-full flex items-center gap-1 py-2 "
          >
            <AiOutlinePlus size={14} />
            Add Profile
          </button>
        </div>
        <p className="text-center text-sm p-3 bg-gray-50 rounded-lg mt-4">
          Connect to LinkedIn to start Posting
        </p>
        <ul className="space-y-2 mt-2">
          {invitedProfiles.map((person) => (
            <div
              key={person?.id}
              className="person-card w-full bg-white p-3 rounded-xl gap-6 flex lg:flex-row flex-col justify-between items-center"
            >
              <div className="flex w-full lg:flex-row flex-col lg:gap-4 gap-2 items-center">
                <div className="flex w-full flex-row justify-start items-center gap-3">
                  <img
                    src={person?.profilePicture}
                    alt={`${person?.name}'s profile`}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <div className="flex lg:w-fit w-full lg:flex-row flex-col lg:gap-3 gap-1">
                    <div className="flex justify-between flex-col items-start w-full gap-1 ">
                      <h3 className="text-sm p-0 m-0 font-semibold text-gray-800">
                        {person?.name}
                      </h3>
                      <p className="text-sm rounded-lg p-0 m-0 text-gray-600">
                        {person?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row w-full lg:justify-end justify-between items-center gap-3">
                <button
                  onClick={handleConnectLinkedIn}
                  disabled={person.isLinkedinConnected}
                  className={`text-xs m-0 border-gray-900 border px-2 text-black flex  items-center gap-2 p-2 rounded-lg ${
                    person.isLinkedinConnected
                      ? 'bg-green-400 text-white cursor-not-allowed'
                      : 'bg-white'
                  }`}
                >
                  {person.isLinkedinConnected ? (
                    <FaLinkedin className="text-white" size={20} />
                  ) : (
                    <FaLinkedin className="text-sky-800" size={20} />
                  )}
                  {person.isLinkedinConnected ? 'Connected' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </ul>
        <AddMembersModal
          isOpen={isAddMemberModalOpen}
          onClose={() => setIsAddMemberModalOpen(false)}
          onSubmit={handleAddMembers}
        />
      </div>
    );
  }

  return (
    <div className="bg-[#ededed] min-h-screen rounded-xl lg:p-2  p-4">
      <div className="flex lg:flex-row flex-col gap-3 p-2 px-4 bg-white rounded-2xl justify-between items-center ">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#0c4a6e] rounded-lg text-white text-lg sm:text-xl">
            <FaClock />
          </div>
          <div>
            <h2 className="text-lg m-0 p-0 sm:text-2xl font-bold text-gray-800">
              Post History
            </h2>
            <p className="text-sm m-0 p-0 text-gray-600 hidden sm:block">
              Manage your post history and track your LinkedIn activity
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <ProfilesDropDown
            profiles={linkedInConnectedProfiles}
            selectedProfile={selectedProfile}
            onProfileChange={handleProfileChange}
            title="Connected Profiles"
            type="connected"
          />
        </div>
      </div>
      <PostHistoryDashboard selectedProfile={selectedProfile} />
      <AddMembersModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMembers}
      />
    </div>
  );
};

export default PostQueue;
