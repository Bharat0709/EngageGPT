import React, { useEffect, useState } from 'react';
import { MdContentCopy } from 'react-icons/md';
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
      message.error('Session expired, please log in again.');
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
        message.error('Unable to get user details');
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
      message.error('Something went wrong try again');
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

  if (isLoading) {
    return (
      <div className="dashboard-container bg-white min-h-screen p-6">
        <div className="flex items-center justify-between pr-3">
          <h2 className="text-2xl">Home</h2>
          <div className="w-min">
            <Skeleton.Button style={{ height: 30 }} active />
          </div>
        </div>
        <div className="person-card w-full py-4 rounded-xl flex justify-between items-center">
          <div className="flex justify-center items-center flex-wrap w-full gap-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-gray-50  py-4 px-4 rounded-xl">
                <Skeleton.Input
                  active
                  style={{
                    width: 70,
                    height: 10,
                    backgroundColor: '#f9fafb',
                    marginLeft: 12,
                    marginTop: 5,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
      <div className="dashboard-container bg-white min-h-screen p-6">
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
          <p className="p-2 text-xs bg-sky-50 rounded-lg">
            Connect to LinkedIn to share content
          </p>
          <div className="p-2 text-xs flex justify-between bg-sky-50 rounded-lg">
            <p>Connect via connection token to view Profile Analytics</p>
            <a
              className="text-sky-700"
              href="https://chromewebstore.google.com/detail/engagegpt-ai-for-linkedin/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1"
              target="_blank"
              rel="noreferrer"
            >
              Connect via token
            </a>
          </div>
        </div>
        <ul className="space-y-4">
          {invitedProfiles.map((person) => (
            <div
              key={person?.id}
              className="person-card w-full bg-gray-50 p-4 rounded-xl gap-2 flex lg:flex-row flex-col justify-between items-center"
            >
              <div className="flex lg:flex-row flex-col lg:gap-4 gap-2 items-center">
                <img
                  src={person?.profilePicture}
                  alt={`${person?.name}'s profile`}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <h3 className="text-sm p-0 m-0 font-semibold text-gray-800">
                  {person?.name}
                </h3>
                <p className="text-sm rounded-lg p-0 m-0 text-gray-600">
                  {person?.email}
                </p>
                <div className="flex  rounded-full text-green-600 items-center">
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
              <div className="flex items-center gap-3">
                <button
                  onClick={handleConnectLinkedIn}
                  disabled={person.isLinkedinConnected}
                  className="border-black text-black bg-white border p-2 rounded-lg text-xs"
                >
                  {person.isLinkedinConnected
                    ? 'LinkedIn Connected'
                    : 'Connect LinkedIn'}
                </button>
                <div className="copy-token text-sm">
                  Connection Token
                  <Button
                    className="text-black hover:text-black"
                    icon={<MdContentCopy />}
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
    <div className="bg-white h-full overflow-y-scroll">
      <div className="flex lg:flex-row lg:px-6 lg:py-5 p-3 flex-col gap-3 justify-between items-center ">
        <h1 className="text-xl font-semibold">Home</h1>
        <p className="text-xs p-2 bg-blue-50 font-semibold rounded-lg px-4">
          {selectedProfile?.lastSyncedAt
            ? `Last Synced at ${formatDate(selectedProfile.lastSyncedAt)}`
            : 'Profile analytics not synced yet!'}
        </p>
        <div className="flex items-center space-x-2">
          <div className="relative flex py-2 px-2 pl-6 hover:bg-gray-50 rounded-lg justify-center items-center gap-2 group">
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
                        icon={<MdContentCopy />}
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
