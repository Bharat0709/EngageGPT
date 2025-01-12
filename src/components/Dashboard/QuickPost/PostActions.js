import React, { useState, useEffect } from 'react';
import { DatePicker, TimePicker, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const PostActions = ({
  selectedPostTopic,
  isPosting,
  onPost,
  onSaveDraft,
  onSchedule,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    if (selectedPostTopic) {
      const formattedDate = dayjs(selectedPostTopic.date);
      const [timeString, period] = selectedPostTopic.time.split(' ');
      const [hour, minute] = timeString.split(':').map(Number);

      const formattedTime = dayjs()
        .hour(
          period === 'PM' && hour !== 12
            ? hour + 12
            : hour === 12
            ? hour
            : hour,
        )
        .minute(minute)
        .second(0);

      setSelectedDate(formattedDate);
      setSelectedTime(formattedTime);
    } else {
      setSelectedDate(null);
      setSelectedTime(null);
    }
  }, [selectedPostTopic]);

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time to schedule the post.');
      return;
    }

    const scheduleDateTime = selectedDate
      .hour(selectedTime.hour())
      .minute(selectedTime.minute());

    onSchedule(scheduleDateTime);
  };

  return (
    <div className="flex w-full flex-col items-center border bg-white border-gray-300 rounded-lg gap-2 p-4">
      <div className="flex flex-col gap-1 w-full">
        <Space className="w-full justify-between">
          <DatePicker
            className="w-full rounded-xl"
            onChange={(date) => setSelectedDate(date)}
            value={selectedDate}
            placeholder="Select Date"
          />
          <TimePicker
            className="w-full rounded-xl"
            onChange={(time) => setSelectedTime(time)}
            value={selectedTime}
            placeholder="Select Time"
          />
        </Space>
        <button
          type="primary"
          className="w-full shadow-none global-button-secondary text-sm mt-2"
          onClick={handleSchedule}
        >
          Schedule Post
        </button>
      </div>

      <button
        className="w-full global-button-secondary text-sm"
        onClick={onSaveDraft}
      >
        Save as Draft
      </button>

      <button
        type="primary"
        icon={isPosting ? <LoadingOutlined /> : null}
        onClick={onPost}
        className="w-full global-button-primary text-sm"
      >
        {isPosting ? 'Posting...' : 'Post on LinkedIn'}
      </button>
    </div>
  );
};

export default PostActions;
