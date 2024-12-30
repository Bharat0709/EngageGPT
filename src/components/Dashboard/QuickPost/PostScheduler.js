import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { getAllMembers } from '../../../network/Members';
import { shareLinkedInPost } from '../../../network/LinkedInAuth';
import PostContentEditor from './PostEditor';
import LinkedInConnection from './LinkedInConnected';
import MediaUploader from './MediaUploader';
import PostPreviewSection from './LinkedInPostPreview';
import PostActions from './PostActions';

const PostScheduler = () => {
  const [postDetails, setPostDetails] = useState({
    content: '',
    visibility: 'PUBLIC',
    media: [],
  });
  const [isPosting, setIsPosting] = useState(false);
  const [linkedInConnected, setLinkedInConnected] = useState(false);
  const [connectedProfiles, setConnectedProfiles] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isConnected = params.get('isConnected');
    const error = params.get('error');
    if (isConnected === 'true') {
      setLinkedInConnected(true);
      message.success('LinkedIn connected successfully!');
    } else if (isConnected === 'false') {
      setLinkedInConnected(false);
      if (error) {
        message.error(error);
      } else {
        message.error('Failed to connect LinkedIn.');
      }
    }
  }, []);

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMembers();
        const connected = data.filter((member) => member.isLinkedinConnected);
        setConnectedProfiles(connected);
        setSelectedProfile(connected?.[0]?._id || null);

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        message.error('Failed to load user data. Please try again later.');
      }
    };

    fetchAndSetUserData();
  }, []);

  const handleShare = async () => {
    if (!selectedProfile) {
      message.error('Please select a profile to share the post.');
      return;
    }
    if (!postDetails.content) {
      message.error('Please enter some content to share.');
      return;
    }
    try {
      setIsPosting(true);
      await shareLinkedInPost(postDetails, selectedProfile);
      message.success('Post shared successfully!');
      setIsPosting(false);
    } catch (error) {
      setIsPosting(false);
      message.error('Failed to share post. Please try again.');
    }
  };

  const handleSaveDraft = () => {
    message.success('Post saved as draft!');
  };

  const handleSchedulePost = (scheduleDateTime) => {
    message.success(
      `Post scheduled for ${scheduleDateTime.format('YYYY-MM-DD HH:mm')}`,
    );
  };

  return (
    <div className="flex flex-col lg:flex-row py-2 gap-2 bg-white scrollbar-hide h-screen overflow-y-scroll">
      <div className="flex-1 bg-white rounded-lg p-4">
        <>
          <LinkedInConnection
            isLoading={isLoading}
            linkedInConnected={linkedInConnected}
            connectedProfiles={connectedProfiles}
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
          />
          <PostContentEditor
            postDetails={postDetails}
            setPostDetails={setPostDetails}
          />
          <MediaUploader
            postDetails={postDetails}
            setPostDetails={setPostDetails}
          />
        </>
      </div>
      <div className="lg:w-1/3 mx-2 w-full mb-4 bg-white">
        <div>
          <PostPreviewSection
            isLoading={isLoading}
            connectedProfiles={connectedProfiles}
            selectedProfile={selectedProfile}
            postDetails={postDetails}
          />
        </div>
        <PostActions
          isPosting={isPosting}
          onPost={handleShare}
          onSaveDraft={handleSaveDraft}
          onSchedule={handleSchedulePost}
        />
      </div>
    </div>
  );
};

export default PostScheduler;
