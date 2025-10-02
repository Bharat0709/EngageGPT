import { useEffect, useState } from 'react';
import {
  getSavedPosts,
  deleteSavedPost,
  bulkDeletePosts,
  bulkUpdateStatus,
  bulkUpdatePriority,
  bulkUpdateAutomation,
  updateSavedPost,
} from '@services/SavePosts';
import { formatDate } from '@utils/constantData/savedPosts';
import PostConfirmationModal from '../QuickPost/PostConfirmationModal';
import EditHiringPostModal from './EditSavedPost/EditPostModal';
import SavedPostsSkeleton from '../SkeletonLoaders/SavedPostsSkeletonLoading';
import LeadsTable from './LeadsTable/LeadsTable';
import { useNotifications } from '@components/Common/Notification';

const HiringPostsDashboard = ({ memberId, activeTab, setActiveTab , setCurrentLead }) => {
  const [refresh, setRefresh] = useState(false);
  const [allSavedPosts, setAllSavedPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const message = useNotifications();

  useEffect(() => {
    if (memberId !== undefined && memberId !== null) {
      fetchSavedPosts();
    }
  }, [memberId, refresh]);

  const fetchSavedPosts = async () => {
    try {
      setIsLoading(true);
      const params = {};
      if (memberId) {
        params.memberId = memberId;
      }

      const data = await getSavedPosts(params);
      console.log(data.data);
      setAllSavedPosts(data.data);
      setIsLoading(false);
    } catch (error) {
      message.error('Failed to load posts');
      setIsLoading(false);
    }
  };

  const onDelete = async (post) => {
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const onConfirmDelete = async () => {
    setIsDeleting(true);
    if (!selectedPost) return;
    try {
      await deleteSavedPost(selectedPost._id);
      setIsDeleting(false);
      setRefresh(!refresh);
      message.success('Lead deleted successfully!');
    } catch (error) {
      setIsDeleting(false);
      message.error('Failed to delete post. Please try again.');
    }
    setShowDeleteModal(false);
  };

  const onConfirmBulkDelete = async (postIds) => {
    setIsUpdating(true);
    if (postIds.length <= 0) {
      message.error('No posts selected for deletion.');
      setIsUpdating(false);
      return;
    }
    try {
      await bulkDeletePosts(postIds);
      setIsUpdating(false);
      setRefresh(!refresh);
      message.success('Leads deleted successfully!');
    } catch (error) {
      setIsUpdating(false);
      message.error('Failed to delete post. Please try again.');
    }
  };

  const onConfirmBulkStatusUpdate = async (postIds, status) => {
    setIsUpdating(true);
    if (postIds.length <= 0) {
      message.error('No posts selected for deletion.');
      setIsUpdating(false);
      return;
    }
    try {
      await bulkUpdateStatus(postIds, status);
      setIsUpdating(false);
      setRefresh(!refresh);
      message.success('Status deleted successfully!');
    } catch (error) {
      setIsUpdating(false);
      message.error('Failed to update status Please try again.');
    }
  };

  const onConfirmBulkPriorityUpdate = async (postIds, priority) => {
    setIsUpdating(true);
    if (postIds.length <= 0) {
      message.error('No posts selected for deletion.');
      setIsUpdating(false);
      return;
    }
    try {
      await bulkUpdatePriority(postIds, priority);
      setIsUpdating(false);
      setRefresh(!refresh);
      message.success('Priority updated successfully!');
    } catch (error) {
      setIsUpdating(false);
      message.error('Failed to update priority Please try again.');
    }
  };

  const onConfirmBulkAutomationUpdate = async (postIds, automationData) => {
    setIsUpdating(true);
    if (postIds.length <= 0) {
      message.error('No posts selected for automation update');
      setIsUpdating(false);
      return;
    }
    try {
      console.log('Bulk automation update:', postIds, automationData);
      await bulkUpdateAutomation(postIds, automationData);
      setIsUpdating(false);
      setRefresh(!refresh);
      message.success('Automation Config updated successfully!');
    } catch (error) {
      setIsUpdating(false);
      message.error(
        'Failed to update Automation Configuration Please try again.',
      );
    }
  };

  const onEdit = (post) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };

  const onCardClick = (post) => {
    setSelectedPost(post);
  };

  const onSavePost = async (postId, updatedPostData) => {
    setIsEditing(true);
    if (!updatedPostData) return;
    try {
      const updatedPost = await updateSavedPost(postId, updatedPostData);
      console.log(updatedPost);
      setIsEditing(false);
      setRefresh(!refresh);
      message.success('Post updated successfully!');
      setShowEditModal(false);
    } catch (error) {
      setIsEditing(false);
      message.error('Failed to update post. Please try again.');
    }
  };

  if (isLoading) {
    return <SavedPostsSkeleton />;
  }

  return (
    <div className="overflow-y-auto p-2">
      {allSavedPosts && (
        <div className="flex w-full flex-col gap-4">
          <LeadsTable
            posts={allSavedPosts}
            setCurrentLead = {setCurrentLead}
            onBulkDelete={(leadIds) => onConfirmBulkDelete(leadIds)}
            onBulkUpdateStatus={(leadIds, status) =>
              onConfirmBulkStatusUpdate(leadIds, status)
            }
            onBulkUpdatePriority={(leadIds, priority) =>
              onConfirmBulkPriorityUpdate(leadIds, priority)
            }
            onBulkUpdateAutomation={(leadIds, automationData) =>
              onConfirmBulkAutomationUpdate(leadIds, automationData)
            }
            onBulkCopy={(leadIds) => console.log('Copy:', leadIds)}
            onEdit={onEdit}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onDelete={onDelete}
            isUpdating={isUpdating}
            onCardClick={onCardClick}
            formatDate={formatDate}
            memberId={memberId}
          />
        </div>
      )}

      <PostConfirmationModal
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={onConfirmDelete}
        title="Delete Saved Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
        confirmButtonText="Delete"
        isProcessing={isDeleting}
        isProcessingText={'Deleting...'}
      />

      <EditHiringPostModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        post={selectedPost}
        onSave={onSavePost}
        isEditing={isEditing}
      />
    </div>
  );
};

export default HiringPostsDashboard;
