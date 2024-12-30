import React, { useState } from 'react';
import { DatePicker, TimePicker, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const PostActions = ({ isPosting, onPost, onSaveDraft, onSchedule }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time to schedule the post.');
      return;
    }
    const scheduleDateTime = selectedDate.clone().set({
      hour: selectedTime.hour(),
      minute: selectedTime.minute(),
    });
    onSchedule(scheduleDateTime);
  };

  return (
    <div className="flex flex-col items-center border border-gray-300 rounded-lg gap-2 p-4">
      {/* Schedule Post */}
      <div className="flex flex-col gap-1 w-full">
        <Space className="w-full justify-center">
          <DatePicker
            className="w-full"
            onChange={(date) => setSelectedDate(date)}
            placeholder="Select Date"
          />
          <TimePicker
            className="w-full"
            onChange={(time) => setSelectedTime(time)}
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
