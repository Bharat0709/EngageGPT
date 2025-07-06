import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostContentEditor from './PostEditor';
import LinkedInConnection from './LinkedInConnected';
import MediaUploader from './MediaUploader';
import PostPreviewSection from './LinkedInPostPreview';
import PostActions from './PostActions';
import { message } from 'antd';
import { getContentCalendar } from '@services/Members';
import {
  saveDraftLinkedInPost,
  scheduleLinkedInPost,
  shareLinkedInPost,
} from '@services/LinkedInAuth';
import { getAllMembers } from '@services/Members';

const PostScheduler = () => {
  const location = useLocation();
  const content = location?.state?.content;
  const postContents = location?.state?.postContents;
  const [postDetails, setPostDetails] = useState({
    content: content || '',
    visibility: 'PUBLIC',
    media: [],
    timeZone: '',
  });
  const [connectedProfiles, setConnectedProfiles] = useState(null);
  const [invitedProfiles, setInvitedProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarData, setCalendarData] = useState([]);
  const [selectedPostTopic, setSelectedPostTopic] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isConnected = params.get('isConnected');
    const error = params.get('error');
    if (isConnected === 'true') {
      message.success('LinkedIn connected successfully!');
    } else if (isConnected === 'false') {
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
        const invited = data.filter((member) => !member.isLinkedinConnected);
        setInvitedProfiles(invited);
        setConnectedProfiles(connected);
        setSelectedProfile(connected?.[0]?._id || null);
        setIsLoading(false);
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
          const response = await getContentCalendar(selectedProfile);
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
    // eslint-disable-next-line
  }, [selectedProfile]);

  useEffect(() => {
    const selectNearestTopic = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const sortedData = calendarData
        .map((entry) => {
          // Parse the date string (DD-MM-YYYY) into a Date object
          const [day, month, year] = entry.date.split('-').map(Number);
          const dateObject = new Date(year, month - 1, day);

          return {
            ...entry,
            dateObject,
          };
        })
        .sort((a, b) => a.dateObject - b.dateObject);

      const plannedEntries = sortedData.filter(
        (entry) => entry.status === 'Planned',
      );
      const closestEntry =
        plannedEntries.find((entry) => entry.dateObject >= today) || null;

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
      content: content || '',
      visibility: 'PUBLIC',
      media: [],
    });
    if (calendarData.length > 0) {
      selectNearestTopic();
    } else {
      setSelectedPostTopic(null);
    }
    // eslint-disable-next-line
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
      message.loading('Sharing post...');
      await shareLinkedInPost(postDetails, selectedProfile);
      message.success('Post shared successfully!');
      setIsPosting(false);
      setPostDetails({
        content: '',
        visibility: 'PUBLIC',
        media: [],
        timeZone: '',
      });
      setSelectedPostTopic(null);
      location.state = null;
    } catch (error) {
      setIsPosting(false);
      message.error('Failed to share post. Please try again.');
    }
  };

  const handleSaveDraft = async (date, time, timeZone) => {
    if (!selectedProfile) {
      message.error('Please select a profile to share the post.');
      return;
    }
    if (!postDetails.content) {
      message.error('Please enter some content to save.');
      return;
    }
    try {
      message.loading('Saving draft...');
      setIsSavingDraft(true);
      await saveDraftLinkedInPost(
        date,
        time,
        postDetails,
        timeZone,
        selectedProfile,
      );
      message.success('Post Saved as Draft!');
      setPostDetails({
        content: '',
        visibility: 'PUBLIC',
        media: [],
        timeZone: '',
      });
      setIsSavingDraft(false);
      setSelectedPostTopic(null);
      location.state = null;
    } catch (error) {
      setIsSavingDraft(false);
      message.error('Failed to save post as draft. Please try again.');
    }
  };

  const handleSchedulePost = async (date, time, timeZone) => {
    if (!selectedProfile) {
      message.error('Please select a profile to share the post.');
      return;
    }
    if (!postDetails.content) {
      message.error('Please enter some content to share.');
      return;
    }
    try {
      message.loading('Scheduling post...');
      setIsScheduling(true);
      await scheduleLinkedInPost(
        date,
        time,
        postDetails,
        timeZone,
        selectedProfile,
      );
      message.success('Post scheduled successfully!');
      setIsScheduling(false);
      setPostDetails({
        content: '',
        visibility: 'PUBLIC',
        media: [],
        timeZone: '',
      });
      setIsSavingDraft(false);
      setSelectedPostTopic(null);
      location.state = null;
    } catch (error) {
      setIsScheduling(false);
      message.error('Failed to schedule post. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#ededed]">
      <div className="flex rounded-xl mt-2 flex-col lg:flex-row justify-between gap-3 lg:p-2 lg:pt-0 p-2 scrollbar-hide h-screen overflow-y-scroll">
        <div className="flex-1 mb-2 rounded-lg ">
          <>
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
        <div className="lg:w-1/3 w-full mb-4">
          <div>
            <LinkedInConnection
              invitedProfiles={invitedProfiles}
              isLoading={isLoading}
              connectedProfiles={connectedProfiles}
              selectedProfile={selectedProfile}
              setSelectedProfile={setSelectedProfile}
            />
            <PostPreviewSection
              isLoading={isLoading}
              connectedProfiles={connectedProfiles}
              selectedProfile={selectedProfile}
              postDetails={postDetails}
            />
          </div>
          <PostActions
            isSavingDraft={isSavingDraft}
            isScheduling={isScheduling}
            isPosting={isPosting}
            connectedProfiles={connectedProfiles}
            selectedProfile={selectedProfile}
            selectedPostTopic={selectedPostTopic}
            onPost={handleShare}
            onSaveDraft={handleSaveDraft}
            onSchedule={handleSchedulePost}
          />
        </div>
      </div>
    </div>
  );
};

export default PostScheduler;
