import React from 'react';
import { Skeleton } from 'antd';

const OrganizationProfileSkeleton = () => {
  return (
    <div className="w-full h-full rounded-xl scrollbar-hide overflow-auto overflow-y-scroll mx-auto lg:p-6 p-4 bg-[#ededed] shadow-md">
      <h2 className="text-2xl p-0 mt-0 text-semibold mb-4">
        Organization Settings
      </h2>

      <div className="flex bg-gray-50 rounded-xl p-3 text-sm justify-start gap-4 items-center mb-2">
        <button className="text-black font-semibold">General</button>
      </div>

      <div className="mb-6 bg-white rounded-xl p-2 pr-4 flex flex-col gap-3 justify-between">
        <div className="p-2 pr-2 rounded-xl flex gap-6 items-start justify-between">
          <div className="flex justify-start items-center gap-4">
            <Skeleton.Avatar
              active
              size="large"
              style={{ height: 64, width: 64 }}
            />
            <div className="flex flex-col gap-1">
              <Skeleton.Input
                style={{ height: 12 }}
                active
                size="small"
                className="w-40"
              />
              <Skeleton.Input
                style={{ height: 12 }}
                active
                size="small"
                className="w-60"
              />
            </div>
          </div>

          <Skeleton.Button
            style={{ width: 12, height: 24 }}
            active
            size="small"
          />
        </div>

        <div className="flex w-full justify-between items-center">
          <p className="w-full text-sm px-2 text-left text-gray-500">
            <div className="flex gap-4">
              <Skeleton.Input
                style={{ height: 12 }}
                active
                size="small"
                className="w-40"
              />
              <Skeleton.Input
                style={{ height: 12 }}
                active
                size="small"
                className="w-40"
              />
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfileSkeleton;
