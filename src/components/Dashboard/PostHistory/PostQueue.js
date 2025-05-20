import React, { useEffect, useState } from 'react';
import { Skeleton, message } from 'antd';
import { FiUsers } from 'react-icons/fi';
import { AiOutlinePlus, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { getAllMembers, addNewMember } from '../../../network/Members';
import AddMembersModal from '../Global/AddPeopleModal';
import { FaLinkedin } from 'react-icons/fa';
import PostHistoryDashboard from './PostManager';

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
    setSelectedProfile(profile);
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
      <div className="dashboard-container rounded-xl h- lg:p-6 p-2 bg-gray-100">
        <div className="flex items-center mb-6 justify-between">
          <h1 className="text-xl flex items-center text-black font-semibold">
            Post Queue{' '}
          </h1>
          <button
            type="primary"
            onClick={() => setIsAddMemberModalOpen(true)}
            className="global-button-primary text-xs flex items-center gap-1 py-2 px-3 rounded-lg"
          >
            <AiOutlinePlus size={14} />
            Add Profile
          </button>
        </div>
        <p className="text-center text-sm p-3 bg-white rounded-lg mt-4">
          Connect to LinkedIn to start Posting
        </p>
        <ul className="space-y-2 mt-4">
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
        <PostHistoryDashboard selectedProfile={selectedProfile} />
        <AddMembersModal
          isOpen={isAddMemberModalOpen}
          onClose={() => setIsAddMemberModalOpen(false)}
          onSubmit={handleAddMembers}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen rounded-xl lg:p-6 p-4">
      <div className="flex lg:flex-row flex-col gap-3 justify-between items-center ">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl flex items-center text-black font-semibold">
            Post History{' '}
          </h1>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="relative flex py-1 px-1 pl-3 bg-white hover:bg-gray-50 rounded-lg justify-center items-center gap-2 group">
            <FiUsers size={16} />
            <p className="text-sm">Connected Profiles:</p>
            <span className="text-sm text-black">
              {linkedInConnectedProfiles.length}
            </span>
            <div className="flex flex-col">
              <AiOutlineUp className="h-2" />
              <AiOutlineDown className="h-2" />
            </div>
            <div className="relative">
              <div className="absolute -left-52 top-2 mt-2 w-64 bg-white border rounded-lg hidden group-hover:block z-10">
                <ul className="divide-y divide-gray-200">
                  {linkedInConnectedProfiles.map((profile) => (
                    <li
                      key={profile.id}
                      onClick={(e) => handleProfileChange(profile)}
                      className="flex items-center cursor-pointer justify-between p-2 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={profile.profilePicture}
                          alt={profile.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="flex flex-col gap-1">
                          <h4 className="text-xs p-0 m-0 font-medium text-gray-800">
                            {profile.name}
                          </h4>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="relative flex py-1 px-1 pl-3 bg-white hover:bg-gray-50 rounded-lg justify-center items-center gap-2 group">
            <FiUsers size={16} />
            <p className="text-sm"> Pending Connections:</p>
            <span className=" text-sm text-black">
              {invitedProfiles.length}
            </span>
            <div className="flex flex-col">
              <AiOutlineUp className="h-2" />
              <AiOutlineDown className="h-2" />
            </div>
            <div className="relative">
              <div className="absolute -left-64 top-2 mt-2 w-64 bg-white border rounded-lg hidden group-hover:block z-10">
                <ul className="divide-y divide-gray-200">
                  {invitedProfiles.map((profile) => (
                    <li
                      key={profile.id}
                      onClick={(e) => handleProfileChange(profile)}
                      className="flex items-center justify-between p-2 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={profile.profilePicture}
                          alt={profile.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="flex flex-col gap-1">
                          <h4 className="text-xs p-0 m-0 font-medium text-gray-800">
                            {profile.name}
                          </h4>
                        </div>
                      </div>
                      <button
                        onClick={handleConnectLinkedIn}
                        className={`text-xs m-0 rounded-lg px-2 text-black flex items-center gap-2 p-1 bg-gray-50 bg-white-400 font-semibold'
                           `}
                      >
                        <FaLinkedin className="text-sky-800" size={20} />
                        Connect
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <button
            type="primary"
            onClick={() => setIsAddMemberModalOpen(true)}
            className="global-button-primary text-xs flex items-center gap-1 py-2 px-3 rounded-lg"
          >
            <AiOutlinePlus size={14} />
            Add Profile
          </button>
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
