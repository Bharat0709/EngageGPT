import React, { useEffect, useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { Skeleton, message, Button } from 'antd';
import { FiUsers } from 'react-icons/fi';
import { formatDate } from '../../../utils/formatDate';
import { AiOutlinePlus, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { encodeToken } from '../../../utils/tokenUtils';
import { setAuthTokenAction } from '../../../redux/auth/authActions';
import Cookies from 'js-cookie';
import { getAllMembers, addNewMember } from '../../../network/Members';
import AddMembersModal from '../Global/AddPeopleModal';
import AddProfile from '../../../assets/images/AddProfile.png';
import PostDetails from './PostsAnalytics';
import Stats from './Stats';
import { FaLinkedin } from 'react-icons/fa';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authToken = Cookies.get('engage-gpt');
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [invitedProfiles, setInvitedProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshMembers, setRefreshMembers] = useState(false);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');

    if (!token && !authToken) {
      message.info('Session expired, Please log in.');
      navigate('/login');
      return;
    }

    if (token && !authToken) {
      const encodedToken = encodeToken(token);

      Cookies.set('engage-gpt', encodedToken, {
        expires: 3,
        secure: true,
        sameSite: 'strict',
      });

      dispatch(setAuthTokenAction(token));
    }
  }, [location.search, authToken, dispatch, navigate]);

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMembers();
        const invited = data.filter(
          (member) => member.isConnected === 'invited',
        );
        const connected = data.find(
          (member) => member.isConnected === 'connected',
        );
        setProfiles(data);
        setIsLoading(false);
        setInvitedProfiles(invited);
        setSelectedProfile(connected || null);
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
    const authUrl = `http://localhost:8000/api/v1/members/auth/linkedin`;
    window.location.href = authUrl;
  };

  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    message.success('Connection token copied!');
  };

  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
  };

  const renderSkeleton = () => (
    <div className="dashboard-container bg-white min-h-screen p-3">
      <div className="flex items-center justify-between pr-3">
        <Skeleton.Input style={{ width: 100, height: 24 }} active />
        <Skeleton.Button style={{ height: 24, width: 100 }} active />
      </div>
      <div className="mt-4">
        <div className="flex w-full flex-wrap gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-50 lg:w-fit w-full  rounded-lg p-3 flex flex-col justify-between"
            >
              <div className="flex gap-2 items-center">
                <Skeleton.Avatar active size="small" shape="circle" />
                <Skeleton.Input
                  className="w-1/2 mt-1"
                  style={{ height: 10, width: 10 }}
                  active
                />
              </div>
              <Skeleton.Input
                className="w-1/2 mt-2 my-0 "
                style={{ height: 10, width: 10 }}
                active
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-4 ">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="person-card w-full bg-gray-50 p-4 rounded-xl flex justify-between items-center"
            >
              <Skeleton.Avatar active size="large" />
              <div className="flex-grow items-center mt-1 gap-4">
                <Skeleton.Input
                  active
                  style={{
                    width: 120,
                    height: 10,
                    marginLeft: 12,
                    marginTop: 3,
                  }}
                />
                <Skeleton.Input
                  active
                  style={{
                    width: 100,
                    height: 10,
                    marginLeft: 12,
                    marginTop: 3,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return renderSkeleton();
  }

  if (!selectedProfile && invitedProfiles.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-start pt-10 gap-8 flex-col items-center">
        <img className="h-32 w-32" src={AddProfile} alt="AddProfile" />
        <button
          type="primary"
          onClick={() => setIsAddMemberModalOpen(true)}
          className="global-button-primary text-md flex items-center gap-1 py-2 px-3 rounded-lg"
        >
          <AiOutlinePlus size={14} />
          Add Profile
        </button>
        <AddMembersModal
          isOpen={isAddMemberModalOpen}
          onClose={() => setIsAddMemberModalOpen(false)}
          onSubmit={handleAddMembers}
        />
      </div>
    );
  }

  if (!selectedProfile && invitedProfiles.length > 0) {
    return (
      <div className="dashboard-container bg-gray-50 min-h-screen lg:p-6 p-4">
        <div className="flex items-center mb-6 justify-between">
          <h2 className="text-xl">Invited Profiles</h2>
          <button
            type="primary"
            onClick={() => setIsAddMemberModalOpen(true)}
            className="global-button-primary text-xs flex items-center gap-1 py-2 px-3 rounded-lg"
          >
            <AiOutlinePlus size={14} />
            Add Profile
          </button>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <p className="p-2 text-xs lg:text-left text-center bg-sky-100 rounded-lg">
            Connect to LinkedIn to share content
          </p>
          <div className="p-2 text-xs flex lg:flex-row flex-col justify-between items-center gap-3 bg-sky-100 rounded-lg">
            <p>Connect via connection token to view Profile Analytics</p>
            <div className="flex  lg:w-fit w-full justify-between items-center gap-4">
              <a
                className="text-sky-700 lg:p-0 p-2 lg:px-0 px-3 rounded-lg lg:bg-sky-100 bg-white"
                href="https://chromewebstore.google.com/detail/engagegpt-ai-for-linkedin/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1"
                target="_blank"
                rel="noreferrer"
              >
                Add Extension
              </a>{' '}
            </div>
          </div>
        </div>
        <ul className="space-y-2 mt-4">
          {invitedProfiles.map((person) => (
            <div
              key={person?.id}
              className="person-card w-full bg-white  lg:p-4 p-3 rounded-xl gap-6 flex lg:flex-row flex-col justify-between items-center"
            >
              <div className="flex w-full lg:flex-row flex-col lg:gap-4 gap-2 items-center">
                <div className="flex w-full flex-row justify-start items-center gap-3">
                  <img
                    src={person?.profilePicture}
                    alt={`${person?.name}'s profile`}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <div className="flex lg:w-fit w-full lg:flex-row flex-col lg:gap-3 gap-1">
                    <div className="flex justify-between items-center w-full gap-3 ">
                      <h3 className="text-sm p-0 m-0 font-semibold text-gray-800">
                        {person?.name}
                      </h3>
                      <div className="flex text-left rounded-full text-green-600 items-center">
                        <p
                          className={`text-sm p-0 m-0 font-medium ${
                            person.isConnected === true
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          •{' '}
                          {person.isConnected === 'connected'
                            ? 'Connected'
                            : person.isConnected === 'invited'
                            ? 'Invited'
                            : 'Disconnected'}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm rounded-lg p-0 m-0 text-gray-600">
                      {person?.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full lg:justify-end justify-between items-center gap-3">
                <button
                  onClick={handleConnectLinkedIn}
                  disabled={person.isLinkedinConnected}
                  className="border-gray-400 text-black flex items-center gap-2  bg-white border p-2 rounded-lg text-xs"
                >
                  <FaLinkedin className="text-sky-800" size={20} />
                  {person.isLinkedinConnected ? 'Connected' : 'Connect'}
                </button>
                <div className="copy-token text-gray-500 text-sm">
                  Connection Token
                  <Button
                    className="text-gray-800 hover:text-black"
                    icon={<FiCopy />}
                    onClick={() => handleCopy(person.connectionToken)}
                    type="link"
                  ></Button>
                </div>
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
    <div className="bg-gray-50 h-full overflow-y-scroll">
      <div className="flex lg:flex-row lg:px-6 lg:py-5 p-3 flex-col gap-3 justify-between items-center ">
        <h1 className="text-xl font-semibold">Home</h1>
        <p className="text-xs p-2  font-semibold rounded-lg px-4">
          {selectedProfile?.lastSyncedAt
            ? `Last Synced at ${formatDate(selectedProfile.lastSyncedAt)} IST`
            : 'Profile analytics not synced yet!'}
        </p>
        <div className="flex items-center space-x-2">
          <div className="relative flex py-2 px-2 pl-6 bg-white hover:bg-gray-50 rounded-lg justify-center items-center gap-2 group">
            <FiUsers />
            <span className="text-black">{profiles.length}</span>
            <div className="flex flex-col">
              <AiOutlineUp className="h-2" />
              <AiOutlineDown className="h-2" />
            </div>
            <div className="relative">
              <div className="absolute -left-40 top-4 mt-2 w-64 bg-white border rounded-lg hidden group-hover:block z-10">
                <ul className="divide-y divide-gray-200">
                  {profiles.map((profile) => (
                    <li
                      key={profile.id}
                      onClick={(e) => handleProfileChange(profile)}
                      className="flex items-center cursor-pointer justify-between p-2 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={profile.profilePicture}
                          alt={profile.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="flex flex-col gap-1">
                          <h4 className="text-sm p-0 m-0 font-medium text-gray-800">
                            {profile.name}
                          </h4>
                          <p
                            className={`text-xs m-0 p-0 ${
                              profile.isConnected === 'connected'
                                ? 'text-green-600'
                                : 'text-red-500'
                            }`}
                          >
                            {profile.isConnected === 'connected'
                              ? 'Connected'
                              : profile.isConnected === 'invited'
                              ? 'Invited'
                              : 'Disconnected'}
                          </p>
                        </div>
                      </div>
                      <Button
                        className="text-gray-500 hover:text-gray-700"
                        icon={<FiCopy size={10} />}
                        onClick={() => handleCopy(profile.connectionToken)}
                        type="link"
                      />
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
      <Stats
        isLoading={isLoading}
        selectedProfile={selectedProfile}
        stats={stats}
      />
      <PostDetails setStats={setStats} memberId={selectedProfile._id} />
      <AddMembersModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMembers}
      />
    </div>
  );
};

export default Home;
