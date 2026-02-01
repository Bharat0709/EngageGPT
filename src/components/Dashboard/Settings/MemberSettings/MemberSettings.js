import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMemberDetails, getFeedFilterSettings } from '@services/Members';
import SkeletonLoadingMember from '../../SkeletonLoaders/SkeletonLoadingMember';
import MemberProfile from './MemberProfile';
import AccountSettings from './MemberAccountSettings';
import { useNotifications } from '@components/Common/Notification';

const MemberSettings = () => {
  const { memberId } = useParams();
  const [loading, setLoading] = useState(true);
  const [memberData, setMemberData] = useState(null);
  const [view, setView] = useState('postsaving');
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  const [leadGenerationGoals, setLeadGenerationGoals] = useState({
    primaryObjective: 'networking',
    targetAudience: {
      roles: [],
      industries: [],
      companySizes: [],
      seniority: [],
    },
    serviceOfferings: [],
    businessType: 'b2b',
  });

  const [postSettings, setPostSettings] = useState({
    enabled: true,
    enableCustomKeywords: false,
    keywords: ['hiring'],
    excludeKeywords: [],
    saveAllPosts: false,
    maxPostsPerDay: 100,
    minCharCount: 50,
    postTypes: ['all'],
    autoTagPosts: false,
    customCategories: [],
    autoDetectEmailAddresses: true,
    autoDetectFormLinks: true,
    saveFrequency: 'realtime',
  });

  const [professionalProfile, setProfessionalProfile] = useState({
    currentRole: '',
    profileDescription: '',
    experienceLevel: 'entry',
    industry: '',
    functionalArea: [],
    companySize: 'small',
    location: {
      city: '',
      country: 'India',
      workMode: 'hybrid',
    },
  });

  const [feedFilterSettings, setFeedFilterSettings] = useState({
    enabled: false,
    hideKeywords: [],
  });

  const handleViewToggle = (viewName) => {
    if (viewName === 'accountSettings') {
      setShowAccountSettings(true);
    } else {
      setView(viewName);
      setShowAccountSettings(false);
    }
  };

  const handleCloseAccountSettings = () => {
    setShowAccountSettings(false);
  };
  const message = useNotifications();

  useEffect(() => {
    const fetchMemberData = async () => {
      setLoading(true);
      try {
        const data = await getMemberDetails(memberId);
        setMemberData(data);

        if (data.summary) {
          if (data.summary.professionalProfile) {
            setProfessionalProfile(data.summary.professionalProfile);
          }
          if (data.leadGenerationGoals) {
            setLeadGenerationGoals(data.leadGenerationGoals);
          }
        }
        if (data.postSavingPreferences) {
          setPostSettings(data.postSavingPreferences);
        }
        try {
          const feedFilterData = await getFeedFilterSettings(memberId);
          if (feedFilterData && feedFilterData.feedFilterSettings) {
            setFeedFilterSettings(feedFilterData.feedFilterSettings);
          } else if (data.feedFilterSettings) {
            setFeedFilterSettings(data.feedFilterSettings);
          }
        } catch (filterError) {
          if (data.feedFilterSettings) {
            setFeedFilterSettings(data.feedFilterSettings);
          }
        }
        setLoading(false);
      } catch (error) {
        message.error('Failed to fetch member data');
        setLoading(false);
      }
    };

    if (memberId) {
      fetchMemberData();
    }
  }, [memberId]);

  if (loading) {
    return <SkeletonLoadingMember />;
  }

  return (
    <div className="w-full h-full flex">
      {/* Main Settings Panel */}
      <div
        className={`${
          showAccountSettings ? 'w-1/2' : 'w-full'
        } h-full rounded-xl scrollbar-hide overflow-auto overflow-y-scroll mx-auto lg:p-6 p-4 bg-[#ededed] shadow-md transition-all duration-300`}
      >
        <MemberProfile
          memberData={memberData}
          handleViewToggle={handleViewToggle}
          view={view}
          showAccountOption={true}
        />
      </div>

      {/* Account Settings Panel */}
      {showAccountSettings && (
        <div className="w-1/2 h-full bg-white border-l border-gray-200 relative">
          <AccountSettings
            memberData={memberData}
            onClose={handleCloseAccountSettings}
          />
        </div>
      )}
    </div>
  );
};

export default MemberSettings;
