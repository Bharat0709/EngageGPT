import React, { useEffect, useState } from 'react';
import { message, Button } from 'antd';
import { FiUsers, FiCopy } from 'react-icons/fi';
import { formatDate } from '../../../utils/formatDate';
import { AiOutlinePlus, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { encodeToken } from '../../../utils/tokenUtils';
import { setAuthTokenAction } from '../../../redux/auth/authActions';
import Cookies from 'js-cookie';
import { getAllMembers, addNewMember } from '../../../network/Members';
import AddMembersModal from '../Global/AddPeopleModal';
import PostDetails from './PostsAnalytics';
import Stats from './Stats';
import OnboardingGuide from './OnboardingGuide';
import { renderSkeleton } from './SkeletonLoading';

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
  const [onboardingComplete, setOnboardingComplete] = useState(false);

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

        // Check if onboarding is complete
        const hasProfiles = data.length > 0;
        const hasConnected = connected !== undefined;
        const isProfileSynced = connected?.lastSyncedAt;

        setOnboardingComplete(hasProfiles && hasConnected && isProfileSynced);
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

  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    message.success('Connection token copied!');
  };

  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
  };

  if (isLoading) {
    return renderSkeleton;
  }

  // Show onboarding when needed
  if (!onboardingComplete) {
    return (
      <div className="bg-gray-50 w-full rounded-xl min-h-screen flex rouned-xl justify-start pt-10 gap-8 flex-col items-center">
        <OnboardingGuide
          onAddProfile={() => setIsAddMemberModalOpen(true)}
          isModalOpen={isAddMemberModalOpen}
          onCloseModal={() => setIsAddMemberModalOpen(false)}
          onSubmitModal={handleAddMembers}
          invitedProfiles={invitedProfiles}
          selectedProfile={selectedProfile}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl scrollbar-hide h-screen overflow-y-scroll">
      <div className="flex lg:flex-row lg:px-4 lg:py-4 p-3 flex-col gap-3 justify-between items-center ">
        <h1 className="text-xl text-black font-semibold">Home</h1>
        <p className="text-sm p-2 font-semibold rounded-lg px-4">
          {selectedProfile?.lastSyncedAt
            ? `Last Synced at ${formatDate(selectedProfile.lastSyncedAt)}`
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
