import { useEffect, useState } from 'react';
import { message } from 'antd';
import { getAllMembers, addNewMember } from '@services/Members';
import { getHiringStats } from '@services/HiringPosts';
import HiringPostsDashboard from './PostsManager';
import AddMembersModal from '../Global/AddPeopleModal';
import MembersProfileDropDown from '../Global/MembersDropDown';
import SavedPostsSkeleton from '../SkeletonLoaders/SavedPostsSkeletonLoading';
import UserStats from './Stats';
import { Icons } from '@utils/constantData/icons';

const HiringPostsPage = () => {
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [memberProfiles, setMemberProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshMembers, setRefreshMembers] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [stats, setStats] = useState({
    userStats: {
      statusCounts: {
        new: 0,
        contacted: 0,
        responded: 0,
        closed: 0,
        rejected: 0,
      },
      totalPosts: 0,
    },
  });

  useEffect(() => {
    const fetchAndSetMemberData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMembers();
        setMemberProfiles(data);
        setSelectedMemberId(data[0]?._id || null);
        setIsLoading(false);
      } catch (err) {
        message.error('Unable to fetch member details');
        setIsLoading(false);
      }
    };

    fetchAndSetMemberData();
  }, [refreshMembers]);

  useEffect(() => {
    const fetchHiringStats = async () => {
      if (!selectedMemberId) return;
      try {
        const statsData = await getHiringStats('month', selectedMemberId);
        setStats(statsData);
      } catch (err) {
        message.error('Failed to load hiring statistics');
      }
    };

    if (selectedMemberId) {
      fetchHiringStats();
    }
  }, [selectedMemberId]);

  const handleAddMembers = async (newPersons) => {
    try {
      for (const person of newPersons) {
        await addNewMember(person);
      }
      message.success('Invite sent successfully!');
      message.info('Please check spam folder as well');
      setRefreshMembers(!refreshMembers);
      setIsAddMemberModalOpen(false);
    } catch (err) {
      message.error('Failed to add member. Please try again.');
    }
  };

  const handleProfileChange = (profile) => {
    const selectedProfile = memberProfiles.find((p) => p._id === profile._id);
    if (selectedProfile) {
      setSelectedMemberId(selectedProfile._id);
    }
  };

  if (isLoading) {
    return <SavedPostsSkeleton />;
  }

  return (
    <div className="bg-[#ededed] min-h-screen rounded-xl lg:px-6 py-4 p-4">
      <div className="flex lg:flex-row flex-col gap-3 justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="lg:text-2xl text-xl flex items-center text-black font-semibold">
            Saved Posts{' '}
            <span className="text-sm ml-2 text-gray-500">
              ({stats.userStats?.totalPosts || 0} total)
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4">
          {/* Member Dropdown */}
          <div className="relative">
            {memberProfiles.length > 0 ? (
              <MembersProfileDropDown
                profiles={memberProfiles}
                onProfileChange={handleProfileChange}
                onCopy={() => message.success('Profile copied!')}
              />
            ) : (
              <div className="text-gray-500">
                No members available. Please add a member.
              </div>
            )}
          </div>

          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="global-button-primary text-sm flex items-center gap-1 py-2 px-4 rounded-full"
          >
            <Icons.Plus size={14} />
            Add Member
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <UserStats isLoading={isLoading} stats={stats} />

      {selectedMemberId ? (
        <HiringPostsDashboard memberId={selectedMemberId} />
      ) : (
        <div className="bg-white p-8 rounded-lg flex flex-col justify-center gap-2 text-center">
          <Icons.Users size={40} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Member Selected</h3>
          <p className="text-gray-600 mb-4">
            Please select a member to view their saved posts or add a new
            member.
          </p>
          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="btn-primary flex items-center gap-2  self-center mx-auto whitespace-nowrap px-6 py-2 text-sm font-medium bg-white border border-black text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            Add Member
          </button>
        </div>
      )}
      <AddMembersModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMembers}
      />
    </div>
  );
};

export default HiringPostsPage;
