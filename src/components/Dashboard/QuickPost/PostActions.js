import React, { useState, useEffect } from 'react';
import { useNotifications } from '@components/Common/Notification';
import PostConfirmationModal from './PostConfirmationModal';
import DateTimeSelector from '../../Common/DateTImePicker';
import TimezonePicker from '@components/Common/TimeZonePicker';
import { formatDateTimeForAPI } from '@utils/formatDateTIme';

const PostActions = ({
  connectedProfiles = [],
  selectedProfile,
  selectedPostTopic,
  onPost = () => {},
  onSaveDraft = () => {},
  onSchedule = () => {},
  isScheduling = false,
  isSavingDraft = false,
  isPosting = false,
  orgData,
}) => {
  const message = useNotifications();
  const [disabled, setIsDisabled] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState('Asia/Kolkata');
  const [modalConfig, setModalConfig] = useState({
    isVisible: false,
    title: '',
    description: '',
    confirmButtonText: '',
    isProcessingText: '',
    isProcessing: false,
    onConfirm: () => {},
  });

  useEffect(() => {
    if (connectedProfiles?.length > 0 && selectedProfile) {
      const profileDetails = connectedProfiles.find(
        (profile) => profile?._id === selectedProfile,
      );
      setSelectedTimeZone(profileDetails?.timeZone || 'Asia/Kolkata');
    }
  }, [connectedProfiles, selectedProfile, orgData]);

  // Handle existing selectedPostTopic data
  useEffect(() => {
    if (
      selectedPostTopic &&
      typeof selectedPostTopic.date === 'string' &&
      typeof selectedPostTopic.time === 'string'
    ) {
      try {
        const dateParts = selectedPostTopic.date.split('-');
        if (dateParts.length === 3) {
          const [day, month, year] = dateParts.map(Number);

          const timeParts = selectedPostTopic.time.split(' ');
          if (timeParts.length === 2) {
            const [timeString, period] = timeParts;
            const timeComponents = timeString.split(':');
            if (timeComponents.length === 2) {
              const [hour, minute] = timeComponents.map(Number);
              const adjustedHour =
                period === 'PM' && hour !== 12
                  ? hour + 12
                  : period === 'AM' && hour === 12
                  ? 0
                  : hour;

              // Create combined DateTime object
              const combinedDateTime = new Date(
                year,
                month - 1,
                day,
                adjustedHour,
                minute,
                0,
                0,
              );
              setSelectedDateTime(combinedDateTime);
            }
          }
        }
      } catch (error) {
        console.error('Error parsing selectedPostTopic:', error);
        setSelectedDateTime(null);
      }
    } else {
      setSelectedDateTime(null);
    }

    // Handle timezone from selectedPostTopic if available
    if (selectedPostTopic?.timeZone) {
      setSelectedTimeZone(selectedPostTopic.timeZone);
    }
  }, [selectedPostTopic]);

  // Handle DateTime change from picker
  const handleDateTimeChange = (dateTime) => {
    console.log('Selected DateTime:', dateTime);
    setSelectedDateTime(dateTime);
  };

  // Handle timezone change
  const handleTimezoneChange = (timezone) => {
    setSelectedTimeZone(timezone);
  };

  // Validate selected date and time
  const validateDateTime = () => {
    if (!selectedProfile) {
      message.info('No Profile Selected');
      return false;
    }

    if (!selectedDateTime) {
      message.info('Please select date and time.');
      return false;
    }

    const now = new Date();
    if (selectedDateTime < now) {
      message.error(
        'You cannot schedule a post in the past. Please select a valid date and time.',
      );
      return false;
    }

    return true;
  };

  const handleSchedule = () => {
    if (!validateDateTime()) return;

    const { date, time } = formatDateTimeForAPI(selectedDateTime);
    onSchedule(date, time, selectedTimeZone);
  };

  const handleSaveDraft = () => {
    if (!validateDateTime()) return;
    const { date, time } = formatDateTimeForAPI(selectedDateTime);
    onSaveDraft(date, time, selectedTimeZone);
  };

  const showModal = (type) => {
    if (type === 'post') {
      setModalConfig({
        isVisible: true,
        title: 'Confirm Post',
        description: 'Are you sure you want to post this on LinkedIn?',
        confirmButtonText: 'Post Now',
        isProcessingText: 'Posting...',
        isProcessing: isPosting,
        onConfirm: () => {
          setModalConfig({ ...modalConfig, isVisible: false });
          onPost();
        },
      });
    } else if (type === 'schedule') {
      setModalConfig({
        isVisible: true,
        title: 'Confirm Scheduling',
        description: 'Are you sure you want to schedule this post?',
        confirmButtonText: 'Schedule',
        isProcessingText: 'Scheduling...',
        isProcessing: isScheduling,
        onConfirm: () => {
          setModalConfig({ ...modalConfig, isVisible: false });
          handleSchedule();
        },
      });
    } else if (type === 'draft') {
      setModalConfig({
        isVisible: true,
        title: 'Save as Draft',
        description: 'Are you sure you want to save this post as a draft?',
        confirmButtonText: 'Save Draft',
        isProcessingText: 'Saving Draft...',
        isProcessing: isSavingDraft,
        onConfirm: () => {
          setModalConfig({ ...modalConfig, isVisible: false });
          handleSaveDraft();
        },
      });
    }
  };

  return (
    <div className="flex w-full flex-col 0 rounded-2xl items-center bg-white gap-2 p-2">
      <div className="flex flex-col bg-slate-100 p-3 rounded-2xl gap-2 w-full">
        <div className="w-full flex gap-2 flex-col justify-between">
          <DateTimeSelector
            value={selectedDateTime}
            onChange={handleDateTimeChange}
            placeholder="Select date and time"
            showTime={true}
            className="w-full !rounded-full "
          />
          <TimezonePicker
            value={selectedTimeZone}
            onChange={handleTimezoneChange}
            placeholder="Choose your timezone"
            className="w-full rounded-full bg-gray-200"
          />
        </div>
        <div className="w-full flex gap-2 flex-col justify-between">
          <button
            disabled={disabled}
            className={`w-full ${
              disabled ? 'cursor-not-allowed opacity-50' : ''
            } global-button-secondary rounded-full text-sm`}
            onClick={() => showModal('draft')}
          >
            {isSavingDraft ? 'Saving Draft...' : 'Save as Draft'}
          </button>
          <button
            className={`w-full ${
              disabled ? 'cursor-not-allowed opacity-50' : ''
            } global-button-secondary rounded-full text-sm`}
            onClick={() => showModal('schedule')}
            disabled={isScheduling || disabled}
          >
            {isScheduling ? 'Scheduling...' : 'Schedule Post'}
          </button>
          <button
            className={`w-full ${
              disabled ? 'cursor-not-allowed opacity-50' : ''
            } global-button-secondary rounded-full hover:bg-sky-800 bg-sky-900 text-white text-sm`}
            onClick={() => showModal('post')}
            disabled={isPosting || disabled}
          >
            {isPosting ? 'Posting...' : 'Post on LinkedIn'}
          </button>
        </div>
      </div>

      <PostConfirmationModal
        {...modalConfig}
        onClose={() => setModalConfig({ ...modalConfig, isVisible: false })}
      />
    </div>
  );
};

export default PostActions;
