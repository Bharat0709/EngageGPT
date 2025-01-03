import React, { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import ContentCalendarModal from '../GeneratePost/ContentCalendarModal';
import { CalendarOutlined } from '@ant-design/icons';

const PostContentEditor = ({ postDetails, setPostDetails }) => {
  const navigate = useNavigate();
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const handlePostChange = (e) => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      content: e.target.value,
    }));
  };

  const handleSaveCalendar = async (data) => {
    // setCalendarData(data);
    message.success('Content calendar saved!');
    setIsCalendarModalVisible(false);
  };

  const TwinStarsIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l1.09 3.27L16 6l-3.27 1.09L12 10l-1.09-2.91L8 6l2.91-1.09L12 2z" />
      <path d="M18 14l0.89 2.67L22 18l-2.67 0.89L18 22l-0.89-2.67L14 18l2.67-0.89L18 14z" />
    </svg>
  );

  return (
    <div className="p-4 border bg-white border-gray-300 rounded-lg">
      <div className="flex lg:flex-row flex-wrap gap-4 items-center justify-between mb-4">
        <h4 className="text-lg font-semibold  text-gray-700 ">Post Content</h4>

        <button
          onClick={() => setIsCalendarModalVisible(true)}
          className="global-button-secondary py-2 px-3 text-xs hover:border bg-gray-100 border-0 text-gray-900 rounded-lg flex items-center gap-2"
        >
          <CalendarOutlined className="text-md" />
          Upload Content Calendar
        </button>
        <button
          onClick={() => navigate('/dashboard/create-post')}
          className="flex items-center text-sm justify-center hover:border bg-gray-100 text-gray-700 px-3 py-1 rounded-lg"
        >
          <TwinStarsIcon />
          Write with AI
        </button>
      </div>

      <textarea
        value={postDetails.content}
        onChange={handlePostChange}
        placeholder="Write your post here"
        className="w-full lg:h-80 h-64 border rounded-lg p-3 text-gray-700"
        maxLength={3000}
      />
      <div className="text-right text-sm text-gray-500 mt-1">
        {postDetails.content.length} / 3000
      </div>
      <ContentCalendarModal
        isOpen={isCalendarModalVisible}
        onClose={() => setIsCalendarModalVisible(false)}
        onSave={handleSaveCalendar}
      />
    </div>
  );
};

export default PostContentEditor;
