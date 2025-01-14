import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search topics..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full text-sm p-2 border rounded-lg focus:ring focus:ring-indigo-300"
      />
    </div>
  );
};

export default SearchBar;
