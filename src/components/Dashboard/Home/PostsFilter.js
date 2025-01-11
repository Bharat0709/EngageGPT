import React from 'react';
import { FiFilter } from 'react-icons/fi';

const PostFilters = ({ posts, handleSortChange }) => {
  const filters = [
    'Date Posted',
    'Likes',
    'Shares',
    'Views',
    'Impressions',
    'Comments',
  ];

  return (
    <div className="rounded-lg flex-col gap-2 py-3">
      <div className="toggle-buttons flex justify-between bg-white border border-gray-300 p-3 rounded-lg  gap-4">
        <p className="text-sm">{posts.length} Posts Collected</p>

        <div className="items-center lg:flex hidden  gap-4">
          <FiFilter className="text-gray-400" />
          {filters.map((filter) => (
            <p
              key={filter}
              className={`text-sm p-0 m-0 cursor-pointer font-semibold ${
                handleSortChange === filter ? 'text-black' : 'text-gray-400'
              }`}
              onClick={() => handleSortChange(filter)}
            >
              {filter}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostFilters;
