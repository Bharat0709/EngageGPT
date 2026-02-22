import React from 'react';

const EngageGPTMCPSkeleton = () => {
  return (
    <div className="px-4 py-4 bg-[#fafafa] min-h-screen mx-auto">
      {/* Header Skeleton */}
      <div className="flex justify-between gap-4 items-center mb-6">
        <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-10 w-48 bg-gray-200 rounded-xl animate-pulse mr-4"></div>
      </div>

      <div className="grid lg:grid-cols-2 mt-6 gap-8">
        <div className="space-y-8">
          {/* Claude Config Section Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-48 w-full bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>

          {/* Token Section Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-20 w-full bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="space-y-8">
          {/* Sample Prompt Section Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-32 w-full bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>

          {/* Activity Section Skeleton */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm p-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="px-6 py-4 flex flex-col gap-2">
                  <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="h-3 w-20 bg-gray-50 rounded animate-pulse"></div>
                    <div className="h-3 w-24 bg-gray-50 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngageGPTMCPSkeleton;
