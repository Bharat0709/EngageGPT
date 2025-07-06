import React from 'react';
import { Icons } from '@utils/constantData/icons';

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
    <div className="flex-col  gap-2 py-3">
      <div className="toggle-buttons  rounded-xl flex justify-between bg-white p-3  gap-4">
        <p className="text-sm p-0 m-0">{posts.length} Posts Collected</p>

        <div className="items-center lg:flex hidden gap-2">
          <Icons.Filter className="text-gray-400" />
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
