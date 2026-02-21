import { useEffect, useState } from 'react';
import { useNotifications } from '@components/Common/Notification';
import { Icons } from '@utils/constantData/icons';
import { formatDate } from '@utils/formatDate';
import { Copy } from '@utils/copyText';
import { getAllMembers, addNewMember } from '@services/Members';
import AddMembersModal from '../Global/AddPeopleModal';
import PostDetails from './PostsAnalytics';
import Stats from './Stats';
import OnboardingGuide from './OnboardingGuide';
import MembersProfileDropDown from '../Global/MembersDropDown';
import { ModernSkeleton } from '../SkeletonLoaders/SkeletonLoadingDashboard';
import ConnectionInfoModal from './ConnectionInfoModal';

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
  const message = useNotifications();
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [invitedProfiles, setInvitedProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshMembers, setRefreshMembers] = useState(false);
  const [stats, setStats] = useState([]);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

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

        const hasProfiles = data.length > 0;
        const hasConnected = connected !== undefined;
        const isProfileSynced = connected?.lastSyncedAt;

        setOnboardingComplete(hasProfiles && hasConnected && isProfileSynced);
      } catch (err) {
        setIsLoading(false);
        // message.error('Failed to load member data');
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
      setIsInfoModalOpen(true);
      setRefreshMembers(!refreshMembers);
      setIsAddMemberModalOpen(false);
    } catch (err) {
      message.error(err.message || 'Failed to send invite');
    }
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

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {!onboardingComplete ? (
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
      ) : (
        <section>
          <div className="mx-auto p-4">
            <div className="flex flex-col lg:flex-row justify-between w-full items-start lg:items-center gap-6 mb-6">
              <div className="space-y-3 w-full">
                <div className="flex mx-auto w-full lg:flex-row flex-col lg:justify-start justify-center items-center gap-3">
                  <h1 className="text-2xl ovo-regular p-0 m-0 font-semibold text-gray-900 tracking-tight">
                    Dashboard
                  </h1>
                  <StatusBadge
                    className="text-black"
                    lastSyncedAt={selectedProfile?.lastSyncedAt}
                  />
                  <button
                    onClick={handleRefresh}
                    className="p-2 text-gray-400 bg-white rounded-xl hover:text-gray-600 hover:bg-white transition-all"
                    title="Refresh data"
                  >
                    <Icons.Refresh className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end w-full gap-4">
                <MembersProfileDropDown
                  selectedProfileId={selectedProfile._id}
                  profiles={profiles}
                  onProfileChange={handleProfileChange}
                  onCopy={() =>
                    Copy(
                      selectedProfile.connectionToken,
                      'Connection Token Copied',
                    )
                  }
                />

                <button
                  onClick={() => setIsAddMemberModalOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-[#0c4a6e] text-sm text-white px-4 py-2"
                >
                  <Icons.Plus className="w-4 h-4" />
                  Add Profile
                </button>
              </div>
            </div>

            <div className="mb-8">
              <Stats
                isLoading={isLoading}
                selectedProfile={selectedProfile}
                stats={stats}
              />
            </div>

            <div>
              <PostDetails
                setStats={setStats}
                memberId={selectedProfile?._id}
              />
            </div>

            <AddMembersModal
              isOpen={isAddMemberModalOpen}
              onClose={() => setIsAddMemberModalOpen(false)}
              onSubmit={handleAddMembers}
            />
          </div>
        </section>
      )}

      <ConnectionInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
};

export default Home;
