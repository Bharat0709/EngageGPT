import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import 'react-datepicker/dist/react-datepicker.css';

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
      const [day, month, year] = selectedPostTopic.date.split('-').map(Number); // Split DD-MM-YYYY
      const formattedDate = new Date(year, month - 1, day); // Create Date object
      const [timeString, period] = selectedPostTopic.time.split(' ');
      const [hour, minute] = timeString.split(':').map(Number);

      // Adjust the hour based on the period (AM/PM)
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

    const scheduleDateTime = new Date(selectedDate);
    scheduleDateTime.setHours(
      selectedTime.getHours(),
      selectedTime.getMinutes(),
    );

    onSchedule(scheduleDateTime);
  };

  return (
    <div className="flex w-full flex-col items-center border bg-white border-gray-300 rounded-lg gap-2 p-4">
      <div className="flex flex-col gap-1 w-full">
        <div className="w-full flex  gap-2 justify-between">
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

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 shadow-none global-button-secondary text-sm mt-2"
          onClick={handleSchedule}
        >
          Schedule Post <LockOutlined className="inline-block mr-2" />
        </button>
      </div>

      <button
        className="w-full flex items-center justify-center gap-2 global-button-secondary text-sm"
        onClick={onSaveDraft}
      >
        Save as Draft <LockOutlined className="inline-block mr-2" />
      </button>

      <button
        type="button"
        disabled={isPosting}
        onClick={onPost}
        className={`w-full global-button-primary text-sm ${
          isPosting ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        {isPosting ? 'Posting...' : 'Post on LinkedIn'}
      </button>
    </div>
  );
};

export default PostActions;
