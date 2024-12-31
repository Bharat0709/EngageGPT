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

  //   // Helper function to extract months, years, days, weeks from the 'postedAround' field
  //   const extractTimeUnits = (time) => {
  //     const match = time.match(
  //       /(\d+)\s*(year|month|week|day|hour|minute)s?\s*ago/,
  //     );
  //     if (!match) return { amount: 0, unit: '' };

  //     return {
  //       amount: parseInt(match[1]),
  //       unit: match[2],
  //     };
  //   };

  //   let oldestAmount = Infinity;
  //   let oldestUnit = '';

  //   posts.forEach((post) => {
  //     const { amount, unit } = extractTimeUnits(post.postedAround);
  //     if (
  //       amount < oldestAmount ||
  //       (amount === oldestAmount && unit < oldestUnit)
  //     ) {
  //       oldestAmount = amount;
  //       oldestUnit = unit;
  //     }
  //   });
  //   return `${oldestAmount} ${oldestUnit}`;
  // }

  // const oldestPost = getOldestPostTime(posts);

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
