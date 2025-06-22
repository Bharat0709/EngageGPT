import { useEffect, useState } from 'react';
import { message } from 'antd';
import { FiUsers, FiCopy, FiRefreshCw } from 'react-icons/fi';
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

// Modern Profile Dropdown Component
const ModernProfileDropdown = ({ profiles, onProfileChange, onCopy }) => (
  <div className="relative group">
    <div className="flex items-center space-x-3 py-2 px-4 bg-white hover:bg-gray-50 rounded-full  border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
          <FiUsers className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-900 font-semibold">{profiles.length}</span>
          <span className="text-sm text-gray-500 hidden sm:block">
            {profiles.length === 1 ? 'Member' : 'Members'}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <AiOutlineUp className="h-2 w-2 text-gray-400" />
        <AiOutlineDown className="h-2 w-2 text-gray-400" />
      </div>
    </div>

    <div className="absolute -left-9 lg:right-0 lg:top-full mt-2 w-80 bg-white border border-gray-200 rounded-2xl hidden group-hover:block z-20 overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <h3 className="text-sm font-semibold text-gray-900">Team Members</h3>
        <p className="text-xs text-gray-500 mt-1">
          Select a profile to view analytics
        </p>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {profiles.map((profile) => (
          <div
            key={profile.id || profile._id}
            onClick={() => onProfileChange(profile)}
            className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 cursor-pointer transition-all duration-200 group/item"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={
                    profile.profilePicture ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profile.name,
                    )}&background=6366f1&color=fff&size=40`
                  }
                  alt={profile.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profile.name,
                    )}&background=6366f1&color=fff&size=40`;
                  }}
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    profile.isConnected === 'connected'
                      ? 'bg-green-400'
                      : profile.isConnected === 'invited'
                      ? 'bg-yellow-400'
                      : 'bg-gray-400'
                  }`}
                ></div>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-medium text-gray-900 group-hover/item:text-gray-700">
                  {profile.name}
                </h4>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      profile.isConnected === 'connected'
                        ? 'bg-green-400'
                        : profile.isConnected === 'invited'
                        ? 'bg-yellow-400'
                        : 'bg-gray-400'
                    }`}
                  ></div>
                  <p
                    className={`text-xs font-medium ${
                      profile.isConnected === 'connected'
                        ? 'text-green-600'
                        : profile.isConnected === 'invited'
                        ? 'text-yellow-600'
                        : 'text-gray-500'
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
            </div>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white hover: rounded-lg transition-all opacity-0 group-hover/item:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onCopy(profile.connectionToken);
              }}
              title="Copy connection token"
            >
              <FiCopy className="w-4 h-4" />
            </button>
          </div>
        ))}
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
        {/* Modern Header */}
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
            <ModernProfileDropdown
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

        {/* Post Details - Takes more space */}
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
