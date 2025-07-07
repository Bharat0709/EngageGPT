import React from 'react';

const PageSkeletonLoader = () => {
  return (
    <div className="lg:min-h-screen lg:flex-row flex-col flex flex-wrap">
      {/* Sidebar - 1/4 width */}
      <div className=" flex justify-center h-[95vh] items-center  lg:w-1/4 w-full bg-white p-6">
        <div className="space-y-6  self-center">
          <div className="animate-pulse my-auto self-center space-y-4">
            <div className="h-2 bg-gray-300 rounded-lg w-20" />
          </div>
        </div>
      </div>

      <div className="justify-center lg:flex hidden lg:w-3/4 w-full h-[95vh] items-center rounded-2xl p-6 bg-[#ededed]">
        <div className="space-y-6 self-center">
          <div className="animate-pulse my-auto space-y-4">
            <div className="h-2 bg-gray-50 rounded-lg w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeletonLoader;
