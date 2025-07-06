import { useEffect, useState } from 'react';
import { message } from 'antd';
import {
  getHiringPosts,
  updateHiringPostStatus,
  deleteHiringPost,
  updateHiringPostNotes,
  updateJobRole,
} from '@services/HiringPosts';
import { PostSavingGuide, formatDate } from '@utils/constantData/savedPosts';
import NoPostsFound from '@assets/images/PostNotFound.png';
import PostConfirmationModal from '../QuickPost/PostConfirmationModal';
import EditHiringPostModal from './EditPostModal';
import SavedPostsSkeleton from '../SkeletonLoaders/SavedPostsSkeletonLoading';
import PostCardComponent from './PostCard';
import PostDrawerComponent from './PostDrawer';
import ActiveTabsComponent from './ActiveTabComponent';

const HiringPostsDashboard = ({ memberId }) => {
  const [hiringPosts, setHiringPosts] = useState({
    new: [],
    contacted: [],
    responded: [],
    closed: [],
    rejected: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState('new');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [totalStats, setTotalStats] = useState({
    new: 0,
    contacted: 0,
    responded: 0,
    closed: 0,
    rejected: 0,
  });

  useEffect(() => {
    if (memberId !== undefined && memberId !== null) {
      fetchHiringPosts();
    }
  }, [memberId, refresh]);

  const fetchHiringPosts = async () => {
    try {
      setIsLoading(true);
      const params = {};
      if (memberId) {
        params.memberId = memberId;
      }

      const data = await getHiringPosts(params);

      const newPosts = data.data.filter((post) => post.status === 'new') || [];
      const contactedPosts =
        data.data.filter((post) => post.status === 'contacted') || [];
      const respondedPosts =
        data.data.filter((post) => post.status === 'responded') || [];
      const closedPosts =
        data.data.filter((post) => post.status === 'closed') || [];
      const rejectedPosts =
        data.data.filter((post) => post.status === 'rejected') || [];

      setHiringPosts({
        new: newPosts,
        contacted: contactedPosts,
        responded: respondedPosts,
        closed: closedPosts,
        rejected: rejectedPosts,
      });

      setTotalStats({
        new: newPosts.length,
        contacted: contactedPosts.length,
        responded: respondedPosts.length,
        closed: closedPosts.length,
        rejected: rejectedPosts.length,
      });

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
      await deleteHiringPost(selectedPost._id);

      setHiringPosts((prev) => {
        const updatedStatus = prev[selectedPost.status].filter(
          (p) => p._id !== selectedPost._id,
        );
        return {
          ...prev,
          [selectedPost.status]: updatedStatus,
        };
      });

      setTotalStats((prev) => ({
        ...prev,
        [selectedPost.status]: Math.max(0, prev[selectedPost.status] - 1),
      }));

      setIsDeleting(false);
      setRefresh(!refresh);
      message.success('Hiring post deleted successfully!');
    } catch (error) {
      setIsDeleting(false);
      message.error('Failed to delete post. Please try again.');
    }
    setShowDeleteModal(false);
  };

  const onEdit = (post) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };

  const onCardClick = (post) => {
    setSelectedPost(post);
    setIsDrawerOpen(true);
  };

  const onSavePost = async (postId, updatedPostData) => {
    setIsEditing(true);
    if (!updatedPostData) return;
    try {
      const oldStatus = selectedPost.status;

      if (updatedPostData.jobRole) {
        await updateJobRole(postId, updatedPostData.jobRole);
      }

      if (updatedPostData.notes !== undefined) {
        await updateHiringPostNotes(postId, updatedPostData.notes);
      }

      if (updatedPostData.status && updatedPostData.status !== oldStatus) {
        await updateHiringPostStatus(postId, updatedPostData.status);

        const updatedPost = { ...selectedPost, ...updatedPostData };

        setHiringPosts((prev) => {
          const oldStatusArray = prev[oldStatus].filter(
            (p) => p._id !== postId,
          );
          const newStatusArray = [...prev[updatedPostData.status], updatedPost];

          return {
            ...prev,
            [oldStatus]: oldStatusArray,
            [updatedPostData.status]: newStatusArray,
          };
        });

        setTotalStats((prev) => ({
          ...prev,
          [oldStatus]: Math.max(0, prev[oldStatus] - 1),
          [updatedPostData.status]: prev[updatedPostData.status] + 1,
        }));
      } else {
        setHiringPosts((prev) => {
          const updatedArray = prev[oldStatus].map((p) =>
            p._id === postId ? { ...p, ...updatedPostData } : p,
          );

          return {
            ...prev,
            [oldStatus]: updatedArray,
          };
        });
      }

      setIsEditing(false);
      setRefresh(!refresh);
      message.success('Post updated successfully!');
      setShowEditModal(false);
    } catch (error) {
      setIsEditing(false);
      message.error('Failed to update post. Please try again.');
    }
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center gap-4">
      <p className="mt-4 text-center">
        No {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Posts Found
      </p>
      <img
        className="h-60 mt-2 w-72 rounded-lg mx-auto"
        src={NoPostsFound}
        alt="Posts Not Found"
      />
    </div>
  );

  const renderHiringPosts = (posts) => (
    <div className="flex w-full flex-col gap-4">
      {posts?.length === 0
        ? renderEmptyState()
        : posts?.map((post) => (
            <PostCardComponent
              key={post._id}
              post={post}
              onEdit={onEdit}
              onDelete={onDelete}
              onCardClick={onCardClick}
              formatDate={formatDate}
            />
          ))}
    </div>
  );

  if (isLoading) {
    return <SavedPostsSkeleton />;
  }

  return (
    <div className="overflow-y-auto">
      <ActiveTabsComponent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalStats={totalStats}
      />

      <div className="py-2">
        {activeTab === 'new' && renderHiringPosts(hiringPosts.new)}
        {activeTab === 'contacted' && renderHiringPosts(hiringPosts.contacted)}
        {activeTab === 'responded' && renderHiringPosts(hiringPosts.responded)}
        {activeTab === 'closed' && renderHiringPosts(hiringPosts.closed)}
        {activeTab === 'rejected' && renderHiringPosts(hiringPosts.rejected)}
      </div>

      <PostDrawerComponent
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        post={selectedPost}
        onEdit={onEdit}
        onDelete={onDelete}
        formatDate={formatDate}
      />

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
