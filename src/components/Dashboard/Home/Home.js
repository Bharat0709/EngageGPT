import { useEffect, useState } from 'react';
import { message } from 'antd';
import { FiRefreshCw } from 'react-icons/fi';
import { formatDate } from '../../../utils/formatDate';
import { AiOutlinePlus } from 'react-icons/ai';
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
import MembersProfileDropDown from '../Global/MembersDropDown';

// Modern Skeleton Loading Component
const ModernSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6">
    <div className="max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div className="space-y-3">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-12 w-40 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="w-16 h-6 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Status Badge Component
const StatusBadge = ({ lastSyncedAt }) => {
  const isRecent =
    lastSyncedAt && new Date() - new Date(lastSyncedAt) < 3600000;

  return (
    <div
      className={`inline-flex  rounded-full items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
        lastSyncedAt
          ? isRecent
            ? 'bg-green-50 text-green-700 border border-green-200'
            : ' text-black'
          : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          lastSyncedAt
            ? isRecent
              ? 'bg-green-400'
              : 'bg-black'
            : 'bg-yellow-400'
        }`}
      ></div>
      {lastSyncedAt ? `Synced ${formatDate(lastSyncedAt)}` : 'Not synced'}
    </div>
  );
};

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
        setIsLoading(false);
        message.error('Failed to load member data');
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
      message.error(err.message || 'Failed to send invite');
    }
  };

  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    message.success('Connection token copied!');
  };

  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
  };

  const handleRefresh = () => {
    setRefreshMembers(!refreshMembers);
    message.loading('Refreshing data...', 1);
  };

  if (isLoading) {
    return <ModernSkeleton />;
  }

  // Show onboarding when needed
  if (!onboardingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="w-full min-h-screen flex justify-start gap-8 flex-col items-center pb-4">
          <OnboardingGuide
            onAddProfile={() => setIsAddMemberModalOpen(true)}
            isModalOpen={isAddMemberModalOpen}
            onCloseModal={() => setIsAddMemberModalOpen(false)}
            onSubmitModal={handleAddMembers}
            invitedProfiles={invitedProfiles}
            selectedProfile={selectedProfile}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ededed]">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row justify-between w-full items-start lg:items-center gap-6 mb-6">
          <div className="space-y-3 w-full">
            <div className="flex mx-auto w-full lg:flex-row flex-col lg:justify-start justify-center items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                Dashboard
              </h1>
              <StatusBadge
                className="text-black"
                lastSyncedAt={selectedProfile?.lastSyncedAt}
              />
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-400 bg-white rounded-xl hover:text-gray-600 hover:bg-white transition-all hover:"
                title="Refresh data"
              >
                <FiRefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end w-full gap-4">
            <MembersProfileDropDown
              profiles={profiles}
              selectedProfile={selectedProfile}
              onProfileChange={handleProfileChange}
              onCopy={handleCopy}
            />

            <button
              onClick={() => setIsAddMemberModalOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#0c4a6e] text-white px-4 py-2  font-medium"
            >
              <AiOutlinePlus className="w-4 h-4" />
              Add Profile
            </button>
          </div>
        </div>

        {/* Stats Component - Enhanced */}
        <div className="mb-8">
          <Stats
            isLoading={isLoading}
            selectedProfile={selectedProfile}
            stats={stats}
          />
        </div>

        <div className="">
          <PostDetails setStats={setStats} memberId={selectedProfile?._id} />
        </div>

        {/* Add Members Modal */}
        <AddMembersModal
          isOpen={isAddMemberModalOpen}
          onClose={() => setIsAddMemberModalOpen(false)}
          onSubmit={handleAddMembers}
        />
      </div>
    </div>
  );
};

export default Home;
