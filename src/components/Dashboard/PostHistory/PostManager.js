import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import linkedInIcon from '../../../assets/images/linkedInIcon.png';
import {
  FiClock,
  FiCheckCircle,
  FiEdit3,
  FiEdit,
  FiTrash,
  FiEye,
  FiArrowRight,
  FiFilter,
} from 'react-icons/fi';
import {
  deleteSchduledPost,
  getScheduledPosts,
  updateScheduledOrDraftPost,
} from '../../../network/LinkedInAuth';
import NoPostsFound from '../../../assets/images/PostNotFound.png';
import PostConfirmationModal from '../QuickPost/PostConfirmationModal';
import EditPostModal from './EditPostModal';
import renderSkeleton from './SkeletonLoading';
import MediaPreviewModal from '../Global/MediaPreviewModal';

const PostHistoryDashboard = ({ selectedProfile }) => {
  const navigate = useNavigate();
  const [postHistory, setPostHistory] = useState({
    scheduled: [],
    posted: [],
    drafts: [],
    failed: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState('scheduled');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPostHistory = async () => {
      try {
        setIsLoading(true);
        const data = await getScheduledPosts(selectedProfile._id);
        const scheduled =
          data?.scheduledPosts?.filter((post) => post.status === 'Scheduled') ||
          [];
        const posted =
          data?.scheduledPosts?.filter((post) => post.status === 'Posted') ||
          [];
        const drafts =
          data?.scheduledPosts?.filter((post) => post.status === 'Draft') || [];
        const failed =
          data?.scheduledPosts?.filter((post) => post.status === 'Failed') ||
          [];
        setPostHistory({ scheduled, posted, drafts, failed });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchPostHistory();
  }, [selectedProfile, refresh]);

  const onDelete = async (post) => {
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const onConfirmDelete = async () => {
    setIsDeleting(true);
    if (!selectedPost) return;
    try {
      await deleteSchduledPost(selectedPost._id);
      setPostHistory((prev) => ({
        ...prev,
        scheduled: prev.scheduled.filter((p) => p._id !== selectedPost._id),
        posted: prev.posted.filter((p) => p._id !== selectedPost._id),
        drafts: prev.drafts.filter((p) => p._id !== selectedPost._id),
        failed: prev.failed.filter((p) => p._id !== selectedPost._id),
      }));
      setIsDeleting(false);
      setRefresh(!refresh);
      message.success('Post deleted successfully!');
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

  const onSavePost = async (postId, updatedPostData) => {
    setIsEditing(true);
    if (!updatedPostData) return;
    try {
      const updatedPost = await updateScheduledOrDraftPost(
        postId,
        updatedPostData,
      );
      setPostHistory((prev) => ({
        ...prev,
        scheduled: prev.scheduled.filter((p) => p._id !== updatedPost._id),
        posted: prev.posted.filter((p) => p._id !== updatedPost._id),
        drafts: prev.drafts.filter((p) => p._id !== updatedPost._id),
      }));
      setIsEditing(false);
      setRefresh(!refresh);
      message.success('Post updated successfully!');
    } catch (error) {
      setIsEditing(false);
      message.error('Failed to update post. Please try again.');
    }
  };

  const openMediaModal = (media) => {
    setSelectedMedia(media);
    setShowMediaModal(true);
  };

  const formatDateTime = (date, time, timeZone) => {
    if (!date || !time || !timeZone) return 'Invalid Date';

    // Convert DD-MM-YYYY format to YYYY-MM-DD for Date object compatibility
    const [day, month, year] = date.split('-');
    let formattedTimeFormat = time; // Assume time is in HH:MM:SS format

    // If time is in HH:MM format, append ":00"
    if (!time.includes(':')) {
      throw new Error('Invalid time format');
    }

    const timeParts = time.split(':');
    if (timeParts.length === 2) {
      formattedTimeFormat = `${time}:00`; // Convert HH:MM → HH:MM:SS
    }

    const formattedDateStr = `${year}-${month}-${day}T${formattedTimeFormat}`;

    // Create a Date object using the provided date and time
    const dateObj = new Date(formattedDateStr);

    // Format date as "Friday, Jan 31, 2025"
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    // Format time as "10:00 PM"
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Return the formatted string with the given time zone (without conversion)
    return `${formattedDate}, ${formattedTime} (${timeZone})`;
  };

  if (isLoading || selectedProfile === null) {
    return renderSkeleton();
  }

  const renderPosts = (posts) => (
    <div className="flex w-full flex-col gap-4">
      {selectedProfile.isConnected === 'connected' ? (
        <div className="flex justify-between p-2 rounded-lg bg-gray-50 items-center">
          <p className="pl-2 lg:text-base text-sm ">
            Sync and view your post analytics on our dashboard
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="min-w-2xl lg:text-sm text-xs  gap-2 px-4 flex  items-center p-2 global-button-primary rounded-lg"
          >
            View Analytics
          </button>
        </div>
      ) : (
        <div className="flex justify-between p-2 rounded-lg bg-gray-50 items-center">
          <p className="pl-2"> Analytics not Connected Yet!</p>
          <a
            href="https://chromewebstore.google.com/detail/engagegpt-ai-for-linkedin/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1"
            target="_blank"
            rel="noreferrer"
            className="min-w-2xl text-sm  gap-2 px-4 flex  items-center p-2 global-button-primary rounded-lg"
          >
            Connect Analytics
          </a>
        </div>
      )}
      {posts?.length === 0 && (
        <div className="flex flex-col items-center gap-4">
          <p className=" mt-4 text-center">No Posts Found</p>{' '}
          <img
            className="h-60 mt-2 w-72 rounded-lg mx-auto"
            src={NoPostsFound}
            alt="Posts Not Found"
          />
          <button
            onClick={() => navigate(`/dashboard/quick-post`)}
            className="mx-auto global-button-primary"
          >
            Start Posting
          </button>
        </div>
      )}
      {posts?.map((post) => (
        <div key={post._id} className="p-4 w-full bg-white rounded-lg">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <img
                src={selectedProfile.profilePicture}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex gap-4 items-center">
                <p className="text-sm font-semibold">{selectedProfile.name}</p>
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="text-sm font-semibold">
                    {' '}
                    • {post.status}
                  </span>
                </div>
              </div>
              <p className="text-sm items-center flex gap-1 rounded-lg text-gray-800 w-fit ">
                <span className="text-sm font-semibold">
                  •{' '}
                  {formatDateTime(
                    post?.postDate,
                    post?.postTime,
                    post?.timeZone,
                  )}{' '}
                </span>
              </p>
              {post?.postId && (
                <div className="flex items-center gap-2 text-gray-500">
                  <a
                    href={`https://www.linkedin.com/feed/update/${post.postId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-800 hover:text-gray-600 transition duration-300 ease-in"
                  >
                    <img
                      className="h-4 w-4 cursor-pointer"
                      src={linkedInIcon}
                      alt="LinkedInIcon"
                    />
                  </a>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                className="text-red-600 p-2 rounded-full border border-gray-400 hover:text-red-800 flex items-center gap-1"
                onClick={() => onDelete(post)}
              >
                <FiTrash />
              </button>
              <button
                className={`text-black p-2 rounded-full border border-gray-400 flex items-center gap-1 
                ${
                  post.status === 'Posted'
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:text-black'
                }`}
                onClick={() => onEdit(post)}
                disabled={post.status === 'Posted'}
              >
                <FiEdit />
              </button>
            </div>
          </div>
          <p className="text-sm mt-4 text-gray-600">
            {post.content.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <div className="flex flex-wrap  mt-4 items-center justify-between w-full">
            <div className="flex flex-wrap">
              {post.media.length > 0 ? (
                <div className="flex flex-wrap items-center gap-4">
                  <p className="text-sm flex items-center gap-2 py-2 rounded-lg">
                    Media <FiArrowRight />
                  </p>
                  {post.media.map((item) => (
                    <div key={item.id} className="rounded-lg overflow-hidden">
                      <button
                        onClick={() => openMediaModal(item)}
                        className="text-sm gap-2 flex items-center p-2 bg-gray-100 px-3 rounded-lg"
                      >
                        View
                        <FiEye className="text-gray-700" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm gap-2 flex items-center p-2 bg-gray-50 px-3 rounded-lg">
                  {' '}
                  No Media Added
                </p>
              )}
            </div>
          </div>
          {/* <div className="flex lg:mt-0  items-center justify-end mt-2 w-full">
            {(post.status === 'Scheduled' || post.status === 'Draft') && (
              <button
                className="text-sm min-w-2xl gap-2 flex items-center p-2 global-button-primary px-3 rounded-lg"
                onClick={() => onPublish(post)}
              >
                Post Now
                <FiSend />
              </button>
            )}
          </div> */}
        </div>
      ))}
    </div>
  );

  return (
    <div className="pt-4 overflow-y-auto">
      {selectedProfile && (
        <div className="rounded-lg">
          <div className="flex gap-1 px-2 py-1 items-center rounded-lg bg-gray-50 justify-start">
            <FiFilter className="text-gray-400 ml-2" />
            <button
              className={`py-2 px-2 text-center text-sm flex items-center justify-center gap-2 ${
                activeTab === 'scheduled'
                  ? 'font-semibold text-black'
                  : ' text-gray-500'
              }`}
              onClick={() => setActiveTab('scheduled')}
            >
              Scheduled ({postHistory.scheduled.length})
            </button>
            <button
              className={` py-2 px-2 text-sm text-center flex items-center justify-center gap-2  ${
                activeTab === 'posted'
                  ? 'font-semibold text-black'
                  : ' text-gray-500'
              }`}
              onClick={() => setActiveTab('posted')}
            >
              Posted ({postHistory.posted.length})
            </button>
            <button
              className={`py-2 px-2 text-sm text-center flex items-center justify-center gap-2  ${
                activeTab === 'drafts'
                  ? 'font-semibold text-black'
                  : ' text-gray-500'
              }`}
              onClick={() => setActiveTab('drafts')}
            >
              Drafts ({postHistory.drafts.length})
            </button>{' '}
            <button
              className={`py-2 px-2 text-sm text-center flex items-center justify-center gap-2  ${
                activeTab === 'failed'
                  ? 'font-semibold text-black'
                  : ' text-gray-500'
              }`}
              onClick={() => setActiveTab('failed')}
            >
              Failed ({postHistory.failed.length})
            </button>
          </div>
          <div className="py-2">
            {activeTab === 'scheduled' &&
              renderPosts(
                postHistory.scheduled,
                <FiClock className="text-blue-500" />,
              )}
            {activeTab === 'posted' &&
              renderPosts(
                postHistory.posted,
                <FiCheckCircle className="text-green-500" />,
              )}
            {activeTab === 'drafts' &&
              renderPosts(
                postHistory.drafts,
                <FiEdit3 className="text-yellow-500" />,
              )}{' '}
            {activeTab === 'failed' &&
              renderPosts(
                postHistory.failed,
                <FiEdit3 className="text-yellow-500" />,
              )}
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <PostConfirmationModal
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={onConfirmDelete}
        title="Delete Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
        confirmButtonText="Delete"
        isProcessing={isDeleting}
        isProcessingText={'Deleting...'}
      />
      <EditPostModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        post={selectedPost}
        onSave={onSavePost}
        isEditing={isEditing}
      />
      <MediaPreviewModal
        isOpen={showMediaModal}
        onClose={() => setShowMediaModal(false)}
        media={selectedMedia}
      />
    </div>
  );
};

export default PostHistoryDashboard;
