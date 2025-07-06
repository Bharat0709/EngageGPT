// src/components/common/PageSkeletonLoader.jsx
import React from 'react';

const PageSkeletonLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse space-y-4 w-full max-w-md px-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto" />
      </div>
    </div>
  );
};

export default PageSkeletonLoader;
