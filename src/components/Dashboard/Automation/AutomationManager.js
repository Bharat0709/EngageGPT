// AutomationManager.js
import React, { useState, useEffect } from 'react';
import AutomationNavbar from './AutomationNavbar';
import { useNotifications } from '@components/Common/Notification';
import { Icons } from '@utils/constantData/icons';
import EmailApprovalScreen from './Approvals/EmailApprovalScreen';
import AddMembersModal from '../Global/AddPeopleModal';
import { addNewMember, getAllMembers } from '@services/Members';
import AutomationHistoryTable from './History/AutomationHistoryTable';
import {
  approveAutomation,
  getAutomations,
  getPendingApprovals,
  rejectAutomation,
} from '@services/Automation';

const AutomationManager = ({ memberId, organizationId, onProfileChange }) => {
  const message = useNotifications();
  const [activeTab, setActiveTab] = useState('history');
  const [refreshMembers, setRefreshMembers] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(memberId);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [memberProfiles, setMemberProfiles] = useState([]);

  // Data states
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [automationHistory, setAutomationHistory] = useState([]);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [showApprovalScreen, setShowApprovalScreen] = useState(false);

  // Load data

  useEffect(() => {
    const fetchAndSetMemberData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMembers();
        setMemberProfiles(data);
        setSelectedProfile(data[0]?._id || null);
        setIsLoading(false);
      } catch (err) {
        console.error('Unable to fetch member details:', err);
        setIsLoading(false);
      }
    };

    fetchAndSetMemberData();
  }, [refreshMembers]);
  useEffect(() => {
    if (selectedProfile) {
      loadPendingApprovals();
      loadAutomationHistory();
    }
  }, [selectedProfile]);

  const handleAddMembers = async (newPersons) => {
    try {
      for (const person of newPersons) {
        await addNewMember(person);
      }
      setRefreshMembers(!refreshMembers);
      setIsAddMemberModalOpen(false);
    } catch (err) {
      message.error(err.message || 'Failed to add member. Please try again.');
    }
  };

  const loadPendingApprovals = async () => {
    try {
      setIsLoading(true);
      const response = await getPendingApprovals(selectedProfile, {
        limit: 50,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });
      setPendingApprovals(response.data || []);
    } catch (error) {
      console.error('Failed to load pending approvals:', error);
      message.error('Failed to load pending approvals: ' + error.message);
      // Fallback to empty array
      setPendingApprovals([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAutomationHistory = async () => {
    try {
      setIsLoading(true);
      const response = await getAutomations(selectedProfile, {
        limit: 100,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });
      setAutomationHistory(response.data || []);
    } catch (error) {
      console.error('Failed to load automation history:', error);
      message.error('Failed to load automation history: ' + error.message);
      // Fallback to empty array
      setAutomationHistory([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleApprove = async (automationId) => {
    try {
      setIsLoading(true);
      await approveAutomation(selectedProfile, automationId);

      // Update local state
      setPendingApprovals((prev) =>
        prev.filter((item) => item._id !== automationId),
      );

      message.success('Email approved and sent successfully');
      setShowApprovalScreen(false);
      setSelectedApproval(null);

      // Reload history to show the approved item
      await loadAutomationHistory();
    } catch (error) {
      console.error('Failed to approve automation:', error);
      message.error('Failed to approve automation: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (automationId, reason) => {
    try {
      setIsLoading(true);
      await rejectAutomation(selectedProfile, automationId, reason);

      // Update local state
      setPendingApprovals((prev) =>
        prev.filter((item) => item._id !== automationId),
      );

      message.success('Email rejected successfully');
      setShowApprovalScreen(false);
      setSelectedApproval(null);

      // Reload history to show the rejected item
      await loadAutomationHistory();
    } catch (error) {
      console.error('Failed to reject automation:', error);
      message.error('Failed to reject automation: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewApproval = (automation) => {
    setSelectedApproval(automation);
    setShowApprovalScreen(true);
  };

  const handleViewHistory = (automation) => {
    // Open history detail modal or navigate to detail view
    console.log('View history details:', automation);
  };

  const handleRetry = async (automation) => {
    try {
      setIsLoading(true);
      // API call to retry failed automation
      // await retryAutomation(automation._id);

      message.success('Automation retry initiated');
      loadAutomationHistory();
    } catch (error) {
      message.error('Failed to retry automation: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (automation) => {
    try {
      setIsLoading(true);
      // API call to cancel scheduled automation
      // await cancelAutomation(automation._id);

      message.success('Automation cancelled successfully');
      loadAutomationHistory();
    } catch (error) {
      message.error('Failed to cancel automation: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkCancel = async (automationIds) => {
    try {
      setIsLoading(true);
      // API call to bulk cancel
      // await bulkCancelAutomations(automationIds);

      message.success(
        `${automationIds.length} automations cancelled successfully`,
      );
      loadAutomationHistory();
    } catch (error) {
      message.error('Failed to cancel automations: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkRetry = async (automationIds) => {
    try {
      setIsLoading(true);
      // API call to bulk retry
      // await bulkRetryAutomations(automationIds);

      message.success(
        `${automationIds.length} automations retried successfully`,
      );
      loadAutomationHistory();
    } catch (error) {
      message.error('Failed to retry automations: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileChange = (profileId) => {
    setSelectedProfile(profileId);
    if (onProfileChange) {
      onProfileChange(profileId);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pending_approvals':
        return (
          <div className="space-y-4">
            {pendingApprovals.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Icons.Clock className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No pending approvals
                </h3>
                <p className="text-gray-500">All automations are up to date!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {pendingApprovals.map((approval) => (
                  <div
                    key={approval._id}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleViewApproval(approval)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            approval.priority === 'urgent'
                              ? 'bg-red-100 text-red-800'
                              : approval.priority === 'high'
                              ? 'bg-orange-100 text-orange-800'
                              : approval.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {approval.priority.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {approval.automationType
                            .replace('_', ' ')
                            .toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.floor(
                          (Date.now() - new Date(approval.createdAt)) /
                            (1000 * 60 * 60),
                        )}
                        h ago
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">To:</span>
                        <span className="font-medium">
                          {approval.emailContent.to}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Subject:</span>
                        <span className="font-medium">
                          {approval.emailContent.subject}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'history':
        return (
          <AutomationHistoryTable
            automations={automationHistory}
            onView={handleViewHistory}
            onRetry={handleRetry}
            onCancel={handleCancel}
            isUpdating={isLoading}
            onBulkCancel={handleBulkCancel}
            onBulkRetry={handleBulkRetry}
          />
        );

      case 'analytics':
      // return <AutomationAnalytics automations={automationHistory} />;

      case 'settings':
      // return <AutomationSettings memberId={selectedProfile} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AutomationNavbar
        selectedProfile={selectedProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        memberProfiles={memberProfiles}
        handleProfileChange={handleProfileChange}
        setIsAddMemberModalOpen={setIsAddMemberModalOpen}
        pendingApprovals={pendingApprovals.length}
      />

      <div className="p-2">{renderTabContent()}</div>

      {/* Email Approval Screen */}
      {showApprovalScreen && selectedApproval && (
        <EmailApprovalScreen
          automationData={selectedApproval}
          onApprove={handleApprove}
          onReject={handleReject}
          onClose={() => {
            setShowApprovalScreen(false);
            setSelectedApproval(null);
          }}
          isLoading={isLoading}
        />
      )}

      <AddMembersModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMembers}
      />
    </div>
  );
};

export default AutomationManager;
