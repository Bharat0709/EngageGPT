import React from 'react';

const PostContentEditor = ({ postDetails, setPostDetails }) => {
  const handlePostChange = (e) => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      content: e.target.value,
    }));
  };

  return (
    <div className="p-4 border bg-white border-gray-300 rounded-lg">
      <h4 className="mb-2 text-lg font-semibold  text-gray-700 ">
        Post Content
      </h4>
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
