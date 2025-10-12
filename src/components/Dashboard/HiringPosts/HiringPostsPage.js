import { useEffect, useState } from 'react';
import { getAllMembers, addNewMember } from '@services/Members';
import HiringPostsDashboard from './PostsManager';
import AddMembersModal from '../Global/AddPeopleModal';
import SavedPostsSkeleton from '../SkeletonLoaders/SavedPostsSkeletonLoading';
import LeadsPageHeader from './LeadsPageHeader';
import NotFound from '@assets/images/PostNotFound.png';
import { useNotifications } from '@components/Common/Notification';
import LeadGenerationSetup from './LeadsSettings/LeadGenerationSetup';
import EmailSendModal from './MailLeads/MailModal';

const HiringPostsPage = () => {
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [memberProfiles, setMemberProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLead, setCurrentLead] = useState(null);
  const [refreshMembers, setRefreshMembers] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('leads');
  const message = useNotifications();

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

  const handleAddMembers = async (newPersons) => {
    try {
      for (const person of newPersons) {
        await addNewMember(person);
      }
      message.success('Invite sent successfully!');
      setRefreshMembers(!refreshMembers);
      setIsAddMemberModalOpen(false);
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleRefresh = () => {
    setRefreshMembers(!refreshMembers);
  };

  const handleProfileChange = (profile) => {
    const selectedProfile = memberProfiles.find((p) => p._id === profile._id);
    if (selectedProfile) {
      setSelectedMemberId(selectedProfile._id);
    }
  };

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'leads':
        return selectedMemberId ? (
          <HiringPostsDashboard
            setCurrentLead={setCurrentLead}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            memberId={selectedMemberId}
          />
        ) : (
          <NoMemberSelected />
        );
      case 'settings':
        return selectedMemberId ? (
          <LeadGenerationSetup
            memberId={selectedMemberId}
            onComplete={(data) => console.log('Setup complete:', data)}
            onCancel={() => navigate('/dashboard')}
          />
        ) : (
          <NoMemberSelected />
        );
      case 'editor':
        return (
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Editor</h3>
            <p className="text-gray-600">
              Editor functionality will be implemented here.
            </p>
          </div>
        );
      case 'mail':
        return (
          <div className="bg-gray-50 rounded-2xl">
            <EmailSendModal
              memberId={selectedMemberId}
              postData={currentLead}
            />
          </div>
        );
      default:
        return selectedMemberId ? (
          <HiringPostsDashboard
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            memberId={selectedMemberId}
          />
        ) : (
          <NoMemberSelected />
        );
    }
  };

  // No member selected component
  const NoMemberSelected = () => (
    <div className="bg-white p-8 m-2  rounded-2xl flex flex-col justify-center gap-2 text-center">
      <img src={NotFound} alt="Not Found" className="h-50 w-60 mx-auto" />
      <h3 className="text-lg font-medium mb-2">No Member Selected</h3>
      <p className="text-gray-600 mb-4">
        Please select a member to view their saved leads or add a new member.
      </p>
      <button
        onClick={() => setIsAddMemberModalOpen(true)}
        className="btn-primary flex items-center gap-2 self-center mx-auto whitespace-nowrap px-6 py-2 text-sm font-medium bg-white border border-black text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
      >
        Add Member
      </button>
    </div>
  );

  if (isLoading) {
    return <SavedPostsSkeleton />;
  }

  return (
    <div className="bg-[#fafafa] min-h-screen rounded-xl p-0">
      {/* Use the new header component */}
      <LeadsPageHeader
        handleRefresh={handleRefresh}
        selectedMemberId={selectedMemberId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        memberProfiles={memberProfiles}
        handleProfileChange={handleProfileChange}
        setIsAddMemberModalOpen={setIsAddMemberModalOpen}
      />

      <div>{renderTabContent()}</div>

      <AddMembersModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMembers}
      />
    </div>
  );
};

export default HiringPostsPage;
