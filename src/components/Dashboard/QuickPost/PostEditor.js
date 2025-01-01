import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostContentEditor = ({ postDetails, setPostDetails }) => {
  const navigate = useNavigate();
  const handlePostChange = (e) => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      content: e.target.value,
    }));
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
      <div className="flex items-center justify-between mb-4">
        <h4 className="mb-2 text-lg font-semibold  text-gray-700 ">
          Post Content
        </h4>
        <button
          onClick={() => navigate('/dashboard/create-post')}
          className="flex items-center text-sm justify-center bg-gray-100 text-gray-700 px-3 py-1 rounded-lg mb-2"
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
    </div>
  );
};

export default PostContentEditor;
