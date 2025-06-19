import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { message, Select } from 'antd';
import { format } from 'date-fns';
import { EditOutlined } from '@ant-design/icons';
import 'react-datepicker/dist/react-datepicker.css';
import timeZones from 'timezones-list';
import PostConfirmationModal from './PostConfirmationModal';

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
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [editingTimeZone, setEditingTimeZone] = useState(false);
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
  }, [connectedProfiles, selectedProfile]);

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
          const formattedDate = new Date(year, month - 1, day);

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

              const formattedTime = new Date();
              formattedTime.setHours(adjustedHour, minute, 0, 0);

              setSelectedDate(formattedDate);
              setSelectedTime(formattedTime);
            }
          }
        }
      } catch (error) {
        console.error('Error parsing selectedPostTopic:', error);
        setSelectedDate(null);
        setSelectedTime(null);
      }
    } else {
      setSelectedDate(null);
      setSelectedTime(null);
    }
  }, [selectedPostTopic]);

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) {
      message.info('Please select both date and time to schedule the post.');
      return;
    }

    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      0,
      0,
    );

    // Validation: Prevent selecting past dates
    if (selectedDateTime < now) {
      message.error(
        'You cannot schedule a post in the past. Please select a valid date and time.',
      );
      return;
    }

    // Format Date as DD-MM-YYYY
    const formattedDate = format(selectedDate, 'dd-MM-yyyy');

    // Format Time as HH:MM (24-hour format)
    const formattedTime = format(selectedTime, 'HH:mm');

    onSchedule(formattedDate, formattedTime, selectedTimeZone);
  };

  const handleSaveDraft = () => {
    if (!selectedDate || !selectedTime) {
      message.info('Please select both date and time to save as draft.');
      return;
    }

    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      0,
      0,
    );

    // Validation: Prevent selecting past dates
    if (selectedDateTime < now) {
      message.error('You cannot save a draft with a past date and time.');
      return;
    }

    // Format Date as DD-MM-YYYY
    const formattedDate = format(selectedDate, 'dd-MM-yyyy');

    // Format Time as HH:MM (24-hour format)
    const formattedTime = format(selectedTime, 'HH:mm');

    onSaveDraft(formattedDate, formattedTime, selectedTimeZone);
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
    <div className="flex w-full flex-col rounded-xl items-center bg-white gap-2 p-4">
      <div className="flex flex-col gap-1 w-full">
        <div className="w-full flex gap-2 justify-between">
          <div className="w-full">
            <label className="text-xs">Select Date</label>
            <DatePicker
              className="w-full text-sm rounded-xl border p-2"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
            />
          </div>
          <div className="w-full">
            <label className="text-xs">Select Time</label>
            <DatePicker
              className="w-full rounded-xl text-sm border p-2"
              selected={selectedTime}
              onChange={(time) => setSelectedTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="Select Time"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 w-full bg-gray-100 rounded-lg p-2">
          {editingTimeZone ? (
            <Select
              showSearch
              className="w-full text-sm"
              value={selectedTimeZone}
              onChange={(value) => {
                setSelectedTimeZone(value);
                setEditingTimeZone(false);
              }}
              options={timeZones.map((tz) => ({
                value: tz.tzCode,
                label: tz.label,
              }))}
            />
          ) : (
            <p className="w-full text-sm text-center">
              Time Zone - {selectedTimeZone}
            </p>
          )}
          <EditOutlined
            className="cursor-pointer w-6"
            onClick={() => setEditingTimeZone(true)}
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3 py-2">
        <button
          className="w-full global-button-secondary rounded-full text-sm"
          onClick={() => showModal('draft')}
        >
          {isSavingDraft ? 'Saving Draft...' : 'Save as Draft'}
        </button>
        <button
          className="w-full global-button-secondary rounded-full text-sm"
          onClick={() => showModal('schedule')}
          disabled={isScheduling}
        >
          {isScheduling ? 'Scheduling...' : 'Schedule Post'}
        </button>
        <button
          className="w-full global-button-primary rounded-full text-sm"
          onClick={() => showModal('post')}
          disabled={isPosting}
        >
          {isPosting ? 'Posting...' : 'Post on LinkedIn'}
        </button>

        {/* Reusable Modal */}
        <PostConfirmationModal
          {...modalConfig}
          onClose={() => setModalConfig({ ...modalConfig, isVisible: false })}
        />
      </div>
    </div>
  );
};

export default PostActions;
