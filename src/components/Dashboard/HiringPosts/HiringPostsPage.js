import { useEffect, useState } from 'react';
import { Skeleton, message } from 'antd';
import { FiUsers } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';

import { getAllMembers, addNewMember } from '../../../network/Members';
import { getHiringStats } from '../../../network/HiringPosts';
import HiringPostsDashboard from './PostsManager';
import AddMembersModal from '../Global/AddPeopleModal';
import CustomDropdownMenu from '../Global/CustomDropDown';

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

        // Format members for dropdown
        const memberOptions = data.map((member) => ({
          value: member._id,
          label: member.name,
          profilePicture: member.profilePicture,
        }));

        setMemberProfiles(memberOptions);

        // Set the first member as default if available
        if (memberOptions.length > 0) {
          setSelectedMemberId(memberOptions[0].value);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error getting member details!', err);
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
        // Pass memberId as a parameter to get stats for specific member
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

  if (isLoading) {
    return (
      <div className="dashboard-container bg-gray-100 rounded-xl p-3">
        <div className="flex bg-gray-100 items-center justify-between pr-3">
          <Skeleton.Input style={{ width: 180, height: 24 }} active />
          <div className="flex gap-2">
            <Skeleton.Button style={{ height: 32, width: 100 }} active />
            <Skeleton.Button style={{ height: 32, width: 100 }} active />
          </div>
        </div>
        <Skeleton.Input
          style={{ width: '100%', height: 200, marginTop: 16 }}
          active
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen rounded-xl lg:px-6 py-4 p-4">
      <div className="flex lg:flex-row flex-col gap-3 justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl flex items-center text-black font-semibold">
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
              <CustomDropdownMenu
                options={memberProfiles}
                selected={selectedMemberId}
                onSelect={setSelectedMemberId}
                label="Select Member"
                customRender={(option) => (
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        option.profilePicture ||
                        'https://via.placeholder.com/30'
                      }
                      alt={option.label}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{option.label}</span>
                  </div>
                )}
              />
            ) : (
              <div className="text-gray-500">
                No members available. Please add a member.
              </div>
            )}
          </div>

          {/* Add Member button */}
          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="global-button-primary text-xs flex items-center gap-1 py-2 px-3 rounded-lg"
          >
            <AiOutlinePlus size={14} />
            Add Member
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="flex flex-wrap gap-2 w-full justify-start items-start mt-6 mb-4">
        <div className="bg-white p-4 lg:w-1/6 rounded-xl flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-blue-600">
            {stats.userStats?.statusCounts?.new || 0}
          </div>
          <div className="text-sm text-gray-600">New</div>
        </div>
        <div className="bg-white p-4 lg:w-1/6 rounded-lg flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-yellow-600">
            {stats.userStats?.statusCounts?.contacted || 0}
          </div>
          <div className="text-sm text-gray-600">Contacted</div>
        </div>
        <div className="bg-white p-4 lg:w-1/6 rounded-lg flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.userStats?.statusCounts?.responded || 0}
          </div>
          <div className="text-sm text-gray-600">Responded</div>
        </div>
        <div className="bg-white p-4 lg:w-1/6 rounded-lg flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-purple-600">
            {stats.userStats?.statusCounts?.closed || 0}
          </div>
          <div className="text-sm text-gray-600">Closed</div>
        </div>
        <div className="bg-white p-4 lg:w-1/6 rounded-lg flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-red-600">
            {stats.userStats?.statusCounts?.rejected || 0}
          </div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Hiring Posts Dashboard */}
      {selectedMemberId ? (
        <HiringPostsDashboard memberId={selectedMemberId} />
      ) : (
        <div className="bg-white p-8 rounded-lg flex flex-col justify-center gap-2 text-center">
          <FiUsers size={40} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Member Selected</h3>
          <p className="text-gray-600 mb-4">
            Please select a member to view their saved posts or add a new
            member.
          </p>
          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="btn-primary flex items-center gap-2 self-center mx-auto whitespace-nowrap px-6 py-2 text-sm font-medium bg-white border border-black text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            Add Member
          </button>
        </div>
      )}

      {/* Add Member Modal */}
      <AddMembersModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMembers}
      />
    </div>
  );
};

export default HiringPostsPage;
