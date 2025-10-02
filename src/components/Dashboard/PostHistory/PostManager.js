import React, { useState } from 'react';
import PostConfirmationModal from '../QuickPost/PostConfirmationModal';
import EditPostModal from './EditPostModal';
import MediaPreviewModal from './MediaPreview';
import PostDrawer from './PostDrawer';
import SkeletonCardsPostHistory from '../SkeletonLoaders/SkeletonLoadingPostHistory';
import PostHistoryTable from './PostHistoryTable/PostHistoryTable';
import { usePostHistory, usePostActions } from './usePostHistory';
import {
  formatDateTime,
  getStatusColor,
  getStatusIcon,
  getCurrentPosts,
} from './PostUtils';

const PostHistoryDashboard = ({ activeTab, selectedProfile }) => {
  const { postHistory, setPostHistory, isLoading, refreshPosts } =
    usePostHistory(selectedProfile);
  const { deletePost, updatePost, isDeleting, isEditing } = usePostActions(
    setPostHistory,
    refreshPosts,
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Single post event handlers
  const handleDelete = async (post) => {
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const onConfirmDelete = async () => {
    if (!selectedPost) return;
    await deletePost(selectedPost._id);
    setShowDeleteModal(false);
    setSelectedPost(null);
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };

  const handleOpenDrawer = (post) => {
    setSelectedPost(post);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedPost(null);
  };

  const onSavePost = async (postId, updatedPostData) => {
    if (!updatedPostData) return;
    await updatePost(postId, updatedPostData);
    setShowEditModal(false);
    setSelectedPost(null);
  };

  const openMediaModal = (media) => {
    setSelectedMedia(media);
    setShowMediaModal(true);
  };

  const closeMediaModal = () => {
    setShowMediaModal(false);
    setSelectedMedia(null);
  };

  // Bulk action handlers
  const handleBulkDelete = async (postIds) => {
    setSelectedPostIds(postIds);
    setShowBulkDeleteModal(true);
  };

  const onConfirmBulkDelete = async () => {
    if (!selectedPostIds || selectedPostIds.length === 0) return;

    try {
      // Delete all selected posts
      for (const postId of selectedPostIds) {
        await deletePost(postId);
      }
      setShowBulkDeleteModal(false);
      setSelectedPostIds([]);
    } catch (error) {
      console.error('Error deleting posts:', error);
    }
  };


  // Get current posts for active tab
  const currentPosts = getCurrentPosts(postHistory, activeTab);

  // Loading state
  if (isLoading || selectedProfile === null) {
    return <SkeletonCardsPostHistory />;
  }

  return (
    <div className="overflow-y-auto">
      {selectedProfile && (
        <div className="rounded-lg">
          {/* Posts Table */}
          <PostHistoryTable
            posts={currentPosts}
            selectedProfile={selectedProfile}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onOpenDrawer={handleOpenDrawer}
            formatDateTime={formatDateTime}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            activeTab={activeTab}
            onBulkDelete={handleBulkDelete}
          />
        </div>
      )}

      {/* Modern Post Drawer */}
      <PostDrawer
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        post={selectedPost}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPreviewMedia={openMediaModal}
        selectedProfile={selectedProfile}
      />

      {/* Single Delete Confirmation Modal */}
      <PostConfirmationModal
        isVisible={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedPost(null);
        }}
        onConfirm={onConfirmDelete}
        title="Delete Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
        confirmButtonText="Delete"
        isProcessing={isDeleting}
        isProcessingText="Deleting..."
      />

      {/* Bulk Delete Confirmation Modal */}
      <PostConfirmationModal
        isVisible={showBulkDeleteModal}
        onClose={() => {
          setShowBulkDeleteModal(false);
          setSelectedPostIds([]);
        }}
        onConfirm={onConfirmBulkDelete}
        title="Delete Multiple Posts"
        description={`Are you sure you want to delete ${
          selectedPostIds.length
        } post${
          selectedPostIds.length > 1 ? 's' : ''
        }? This action cannot be undone.`}
        confirmButtonText="Delete All"
        isProcessing={isDeleting}
        isProcessingText="Deleting..."
      />

      {/* Edit Post Modal */}
      <EditPostModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedPost(null);
        }}
        post={selectedPost}
        onSave={onSavePost}
        isEditing={isEditing}
      />

      {/* Modern Media Preview Modal */}
      <MediaPreviewModal
        isOpen={showMediaModal}
        onClose={closeMediaModal}
        media={selectedMedia}
      />
    </div>
  );
};

export default PostHistoryDashboard;
