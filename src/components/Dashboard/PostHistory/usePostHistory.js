import { useState, useEffect } from 'react';
import {
  deleteSchduledPost,
  getScheduledPosts,
  updateScheduledOrDraftPost,
} from '../../../network/LinkedIn';
import { useNotifications } from '@components/Common/Notification';

export const usePostHistory = (selectedProfile) => {
  const message = useNotifications();
  const [postHistory, setPostHistory] = useState({
    scheduled: [],
    posted: [],
    drafts: [],
    failed: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch post history data
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
        message.error('Failed to fetch post history');
      }
    };

    if (selectedProfile?._id) {
      fetchPostHistory();
    }
  }, [selectedProfile, refresh]);

  // Refresh posts
  const refreshPosts = () => {
    setRefresh(!refresh);
  };

  return {
    postHistory,
    setPostHistory,
    isLoading,
    refreshPosts,
  };
};

export const usePostActions = (setPostHistory, refreshPosts) => {
  const message = useNotifications();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Delete post
  const deletePost = async (postId) => {
    setIsDeleting(true);
    try {
      await deleteSchduledPost(postId);
      setPostHistory((prev) => ({
        ...prev,
        scheduled: prev.scheduled.filter((p) => p._id !== postId),
        posted: prev.posted.filter((p) => p._id !== postId),
        drafts: prev.drafts.filter((p) => p._id !== postId),
        failed: prev.failed.filter((p) => p._id !== postId),
      }));
      refreshPosts();
      message.success('Post deleted successfully!');
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Update post
  const updatePost = async (postId, updatedPostData) => {
    setIsEditing(true);
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
      refreshPosts();
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsEditing(false);
    }
  };

  return {
    deletePost,
    updatePost,
    isDeleting,
    isEditing,
  };
};
