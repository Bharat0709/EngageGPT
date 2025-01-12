import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';
import { getAllMembers } from '../../../network/Members';
import { shareLinkedInPost } from '../../../network/LinkedInAuth';
import PostContentEditor from './PostEditor';
import LinkedInConnection from './LinkedInConnected';
import MediaUploader from './MediaUploader';
import PostPreviewSection from './LinkedInPostPreview';
import PostActions from './PostActions';
import { getContentCalender } from '../../../network/Members';

const PostScheduler = () => {
  const location = useLocation();
  const [postDetails, setPostDetails] = useState({
    content: location?.state?.content || '',
    visibility: 'PUBLIC',
    media: [],
  });
  const postContents = location?.state?.postContents;
  const [isPosting, setIsPosting] = useState(false);
  const [linkedInConnected, setLinkedInConnected] = useState(false);
  const [connectedProfiles, setConnectedProfiles] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarData, setCalendarData] = useState([]);
  const [selectedPostTopic, setSelectedPostTopic] = useState(null);
  const [selectedProfileName, setSelectedProfileName] = useState('');

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

  useEffect(() => {
    if (selectedProfile) {
      const fetchCalendarData = async () => {
        try {
          const ProfileName = connectedProfiles.find(
            (profile) => profile._id === selectedProfile,
          );

          setSelectedProfileName(ProfileName.name);
          const response = await getContentCalender(selectedProfile);
          if (response && response.contentCalendar.length > 0) {
            setCalendarData(response.contentCalendar);
          } else {
            setSelectedPostTopic(null);
            setCalendarData([]);
          }
        } catch (error) {
          console.error('Error fetching content calendar:', error);
        }
      };

      fetchCalendarData();
    }
  }, [selectedProfile]);

  useEffect(() => {
    const selectNearestTopic = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const sortedData = calendarData
        .map((entry) => ({
          ...entry,
          dateObject: new Date(entry.date),
        }))
        .sort((a, b) => a.dateObject - b.dateObject);

      const closestEntry =
        sortedData.find((entry) => entry.dateObject >= today) || null;

      if (!postContents && location?.state?.content) {
        setSelectedPostTopic(null);
      } else if (postContents) {
        setSelectedPostTopic(postContents);
      } else if (closestEntry) {
        setSelectedPostTopic(closestEntry);
      } else {
        setSelectedPostTopic(null);
      }
    };

    setPostDetails({
      content: location?.state?.content || '',
      visibility: 'PUBLIC',
      media: [],
    });
    if (calendarData.length > 0) {
      selectNearestTopic();
    } else {
      setSelectedPostTopic(null);
    }
  }, [calendarData]);

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
    <div className="flex flex-col bg-gray-50 lg:flex-row justify-between gap-3 lg:p-6 p-4 scrollbar-hide h-screen overflow-y-scroll">
      <div className="flex-1 bg-gray-50 rounded-lg ">
        <>
          <LinkedInConnection
            selectedPostTopic={selectedPostTopic}
            setSelectedPostTopic={setSelectedPostTopic}
            isLoading={isLoading}
            linkedInConnected={linkedInConnected}
            connectedProfiles={connectedProfiles}
            selectedProfile={selectedProfile}
            selectedProfileName={selectedProfileName}
            setSelectedProfile={setSelectedProfile}
            calendarData={calendarData}
            setCalendarData={setCalendarData}
            setPostDetails={setPostDetails}
          />
          <PostContentEditor
            selectedPostTopic={selectedPostTopic}
            postDetails={postDetails}
            setPostDetails={setPostDetails}
          />
          <MediaUploader
            postDetails={postDetails}
            setPostDetails={setPostDetails}
          />
        </>
      </div>
      <div className="lg:w-1/3 w-full mb-4 bg-gray-50">
        <div>
          <PostPreviewSection
            isLoading={isLoading}
            connectedProfiles={connectedProfiles}
            selectedProfile={selectedProfile}
            postDetails={postDetails}
          />
        </div>
        <PostActions
          selectedPostTopic={selectedPostTopic}
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
