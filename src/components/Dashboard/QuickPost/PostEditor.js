import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostContentEditor = ({
  selectedPostTopic,
  postDetails,
  setPostDetails,
}) => {
  const navigate = useNavigate();

  const handlePostChange = (e) => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      content: e.target.value,
    }));
  };

  const handleWriteWithAI = () => {
    navigate('/dashboard/create-post', {
      state: { selectedPostTopic },
    });
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
        <div className="flex items-center justify-between w-full">
          <h4 className="text-lg font-semibold  text-gray-700 ">
            Post Content
          </h4>
        </div>
        {selectedPostTopic && (
          <p className="text-sm text-gray-500">
            Post Topic:{' '}
            <span className="font-semibold text-black">
              {selectedPostTopic?.topic}
            </span>
          </p>
        )}
        <button
          onClick={handleWriteWithAI}
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
    </div>
  );
};

export default PostContentEditor;
