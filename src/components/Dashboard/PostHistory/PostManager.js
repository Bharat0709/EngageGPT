import React, { useState } from 'react';
import PostConfirmationModal from '../QuickPost/PostConfirmationModal';
import EditPostModal from './EditPostModal';
import MediaPreviewModal from './MediaPreview'; // Updated import
import PostDrawer from './PostDrawer'; // Updated import
import SkeletonCards from './SkeletonLoading';
import TabNavigation from './TabNavigation';
import PostsGrid from './PostGrid';
import { usePostHistory, usePostActions } from './usePostHistory';
import {
  formatDateTime,
  getStatusColor,
  getStatusIcon,
  getCurrentPosts,
} from './PostUtils';

const PostHistoryDashboard = ({ selectedProfile }) => {
  // Custom hooks for data management
  const { postHistory, setPostHistory, isLoading, refreshPosts } =
    usePostHistory(selectedProfile);
  const { deletePost, updatePost, isDeleting, isEditing } = usePostActions(
    setPostHistory,
    refreshPosts,
  );

  // UI state
  const [activeTab, setActiveTab] = useState('scheduled');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Event handlers
  const handleDelete = async (post) => {
    console.log('Selected post for deletion:', post);
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const onConfirmDelete = async () => {
    console.log('Deleting post:', selectedPost);
    if (!selectedPost) return;
    await deletePost(selectedPost._id);
    setShowDeleteModal(false);
    setSelectedPost(null);
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    console.log('Selected post for editing:', post);
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

  // Get current posts for active tab
  const currentPosts = getCurrentPosts(postHistory, activeTab);

  // Loading state
  if (isLoading || selectedProfile === null) {
    return <SkeletonCards />;
  }

  return (
    <div className="pt-2 overflow-y-auto">
      {selectedProfile && (
        <div className="rounded-lg">
          {/* Tab Navigation */}
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            postHistory={postHistory}
          />

          {/* Posts Grid */}
          <div className="py-2">
            <PostsGrid
              selectedProfile={selectedProfile}
              currentPosts={currentPosts}
              isLoading={isLoading}
              activeTab={activeTab}
              handleOpenDrawer={handleOpenDrawer}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              formatDateTime={formatDateTime}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          </div>
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

      {/* Delete Confirmation Modal */}
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
        isProcessingText={'Deleting...'}
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
