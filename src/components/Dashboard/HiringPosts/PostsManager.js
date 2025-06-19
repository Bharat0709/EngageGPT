import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  FiEdit,
  FiTrash,
  FiArrowRight,
  FiMail,
  FiFilter,
  FiBriefcase,
} from 'react-icons/fi';
import {
  getHiringPosts,
  updateHiringPostStatus,
  deleteHiringPost,
  updateHiringPostNotes,
  updateJobRole,
} from '../../../network/HiringPosts';
import NoPostsFound from '../../../assets/images/PostNotFound.png';
import PostConfirmationModal from '../QuickPost/PostConfirmationModal';
import EditHiringPostModal from './EditPostModal';
import renderHiringPostsSkeleton from './SkeletonLoading';
// import EmailComposer from './EmailComposer';

const HiringPostsDashboard = ({ memberId }) => {
  const navigate = useNavigate();
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
  // const [isContacting, setIsContacting] = useState(false);
  // const [showEmailComposer, setShowEmailComposer] = useState(false);
  // const [selectedEmail, setSelectedEmail] = useState('');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, refresh]);

  const fetchHiringPosts = async () => {
    try {
      setIsLoading(true);
      // Prepare params object with memberId if available
      const params = {};
      if (memberId) {
        params.memberId = memberId;
      }

      // Get hiring posts with optional member filter
      const data = await getHiringPosts(params);

      // Group posts by status
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

      // Set total counts
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

      // Update state by removing the deleted post
      setHiringPosts((prev) => {
        const updatedStatus = prev[selectedPost.status].filter(
          (p) => p._id !== selectedPost._id,
        );
        return {
          ...prev,
          [selectedPost.status]: updatedStatus,
        };
      });

      // Update total counts
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

  const onSavePost = async (postId, updatedPostData) => {
    setIsEditing(true);
    if (!updatedPostData) return;
    try {
      const oldStatus = selectedPost.status;

      // Update job role if changed
      if (updatedPostData.jobRole) {
        await updateJobRole(postId, updatedPostData.jobRole);
      }

      // Update notes if changed
      if (updatedPostData.notes !== undefined) {
        await updateHiringPostNotes(postId, updatedPostData.notes);
      }

      // Update status if changed
      if (updatedPostData.status && updatedPostData.status !== oldStatus) {
        await updateHiringPostStatus(postId, updatedPostData.status);

        // Update local state to reflect the status change
        const updatedPost = { ...selectedPost, ...updatedPostData };

        // Remove from old status category and add to new one
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

        // Update total counts
        setTotalStats((prev) => ({
          ...prev,
          [oldStatus]: Math.max(0, prev[oldStatus] - 1),
          [updatedPostData.status]: prev[updatedPostData.status] + 1,
        }));
      } else {
        // If only notes or job role changed, update the post in the current status array
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

  // const onContact = (post, email = '') => {
  //   setSelectedPost(post);
  //   setSelectedEmail(email);
  //   setShowEmailComposer(true);
  // };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return renderHiringPostsSkeleton();
  }

  const renderHiringPosts = (posts) => (
    <div className="flex w-full flex-col gap-4">
      {/* LinkedIn Post Saver Guide */}
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">
          Guide: How to Save LinkedIn Posts by Keywords
        </h3>

        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Setting Up Keywords</h4>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
            <li>
              <span className="font-medium">Add Keywords You Want:</span> Go to
              your settings page and enter keywords related to posts you want to
              save automatically.
            </li>
            <li>
              <span className="font-medium">Filter Unwanted Content:</span> In
              the feed filter section, add keywords for posts you don't want to
              see.
            </li>
          </ol>
        </div>

        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">How to Collect Posts</h4>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
            <li>
              <span className="font-medium">Browse Your LinkedIn Feed:</span>{' '}
              Simply scroll through your regular LinkedIn feed. Posts containing
              your keywords will be saved automatically.
            </li>
            <li>
              <span className="font-medium">Search Specific Keywords:</span>{' '}
              Type your saved keywords in the LinkedIn search bar and browse
              through the results.
            </li>
            <li>
              <span className="font-medium">Check Keyword Settings:</span> Your
              saved keywords are visible in the right sidebar of your LinkedIn
              feed.
            </li>
          </ol>
        </div>

        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Troubleshooting</h4>
          <p className="text-sm text-gray-600">
            If posts aren't being saved, reload the LinkedIn page and continue
            scrolling after the page refreshes.
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(`/dashboard/member-settings/${memberId}`)}
            className="btn-primary flex items-center gap-2 whitespace-nowrap px-6 py-2 text-sm font-medium bg-white border border-black text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            Go to Post Saving Settings
          </button>
        </div>
      </div>
      {posts?.length === 0 && (
        <div className="flex flex-col items-center gap-4">
          <p className="mt-4 text-center">
            No {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Posts
            Found
          </p>
          <img
            className="h-60 mt-2 w-72 rounded-lg mx-auto"
            src={NoPostsFound}
            alt="Posts Not Found"
          />
        </div>
      )}

      {posts?.map((post) => (
        <div key={post._id} className="p-4 w-full bg-white rounded-lg">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap start gap-3">
              <div className="flex gap-4 items-start">
                <div className="flex flex-col flex-wrap items-start justify-start">
                  <div className="flex flex-wrap gap-4">
                    <h3 className="text-md font-semibold">{post.author}</h3>
                    <div className="flex items-center gap-2">
                      <a
                        href={post.authorUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-700 text-xs bg-gray-100 text-gray-600 px-4 py-1 rounded-full flex items-center gap-1"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <span
                    className={`text-xs px-4 py-1 rounded-full ${
                      post.status === 'new'
                        ? 'bg-blue-100 text-blue-700'
                        : post.status === 'contacted'
                        ? 'bg-yellow-100 text-yellow-700'
                        : post.status === 'responded'
                        ? 'bg-green-100 text-green-700'
                        : post.status === 'closed'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* <button
                className="text-blue-600 p-2 rounded-full border border-gray-400 hover:text-blue-800 flex items-center gap-1"
                onClick={() => onContact(post)}
                title="Contact"
              >
                <FiMail />
              </button> */}
              <button
                className="text-black p-2 rounded-full border border-gray-400 hover:text-black flex items-center gap-1"
                onClick={() => onEdit(post)}
                title="Edit"
              >
                <FiEdit />
              </button>
              <button
                className="text-red-600 p-2 rounded-full border border-gray-400 hover:text-red-800 flex items-center gap-1"
                onClick={() => onDelete(post)}
                title="Delete"
              >
                <FiTrash />
              </button>
            </div>
          </div>

          {post.jobRole && (
            <div className="mt-2 flex items-center">
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center gap-1">
                <FiBriefcase size={12} />
                {post.jobRole}
              </span>
            </div>
          )}

          <p className="text-sm mt-3 text-gray-600 whitespace-pre-line">
            {post.content.replace(/\n{3,}/g, '\n\n')}
          </p>

          <div className="flex flex-wrap mt-4 items-start gap-3">
            {post.emailAddresses && post.emailAddresses.length > 0 && (
              <div className="flex flex-col">
                <p className="text-xs font-medium text-gray-700">
                  Email Contacts:
                </p>
                {post.emailAddresses.map((email, index) => (
                  <span
                    key={index}
                    className="text-sm bg-blue-50 px-2 py-1 rounded flex items-center gap-1 mt-1"
                  >
                    <FiMail size={10} className="text-blue-600" />
                    {email}
                  </span>
                ))}
              </div>
            )}

            {post.formLinks && post.formLinks.length > 0 && (
              <div className="flex flex-col">
                <p className="text-xs font-medium text-gray-700">
                  Extracted Links:
                </p>
                {post.formLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-green-50 px-2 py-1 rounded flex items-center gap-1 text-green-700 hover:text-green-900 mt-1"
                  >
                    <FiArrowRight size={10} />
                    {link.length > 30 ? link.substring(0, 30) + '...' : link}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap mt-4 items-center font-semibold justify-between text-xs text-gray-500">
            <div>Saved on {formatDate(post.createdAt)}</div>
          </div>

          {post.notes && (
            <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
              <p className="text-xs font-medium text-gray-700">Notes:</p>
              <p className="text-xs text-gray-600">{post.notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="overflow-y-auto">
      <div className="rounded-lg">
        <div className="flex gap-1 px-2 py-1 items-center rounded-lg bg-gray-50 justify-start overflow-x-auto">
          <FiFilter className="text-gray-400 ml-2" />
          <button
            className={`py-2 px-2 text-center text-sm flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'new' ? 'font-semibold text-black' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('new')}
          >
            New ({totalStats.new})
          </button>
          <button
            className={`py-2 px-2 text-sm text-center flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'contacted'
                ? 'font-semibold text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('contacted')}
          >
            Contacted ({totalStats.contacted})
          </button>
          <button
            className={`py-2 px-2 text-sm text-center flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'responded'
                ? 'font-semibold text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('responded')}
          >
            Responded ({totalStats.responded})
          </button>
          <button
            className={`py-2 px-2 text-sm text-center flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'closed'
                ? 'font-semibold text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('closed')}
          >
            Closed ({totalStats.closed})
          </button>
          <button
            className={`py-2 px-2 text-sm text-center flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'rejected'
                ? 'font-semibold text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected ({totalStats.rejected})
          </button>
        </div>
        <div className="py-2">
          {activeTab === 'new' && renderHiringPosts(hiringPosts.new)}
          {activeTab === 'contacted' &&
            renderHiringPosts(hiringPosts.contacted)}
          {activeTab === 'responded' &&
            renderHiringPosts(hiringPosts.responded)}
          {activeTab === 'closed' && renderHiringPosts(hiringPosts.closed)}
          {activeTab === 'rejected' && renderHiringPosts(hiringPosts.rejected)}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
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

      {/* Edit Modal */}
      <EditHiringPostModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        post={selectedPost}
        onSave={onSavePost}
        isEditing={isEditing}
      />

      {/* <EmailComposer
        isOpen={isContacting || showEmailComposer}
        onClose={() => setIsContacting(false)}
        initialEmail={selectedEmail}
      /> */}
    </div>
  );
};

export default HiringPostsDashboard;
