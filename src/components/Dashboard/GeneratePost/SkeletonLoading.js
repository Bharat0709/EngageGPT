import React from 'react';
import { Skeleton } from 'antd';

const SkeletonLoading = () => {
  return (
    <div className="flex w-full flex-col lg:flex-row gap-6 lg:p-6 p-4 bg-gray-50 min-h-screen">
      {/* Left Section */}
      <div className="flex w-full lg:w-3/4 gap-4 flex-col rounded-lg">
        {/* Header */}
        <div className="flex w-full flex-wrap lg:flex-row gap-3 justify-between items-center mb-4">
          <Skeleton.Input active style={{ width: '128px', height: '24px' }} />
          <Skeleton.Input active style={{ width: '160px', height: '30px' }} />
        </div>

        {/* Input Fields */}
        <div className="mb-2">
          <Skeleton.Input
            active
            style={{ width: '96px', height: '16px', marginBottom: '8px' }}
          />
          <div className="flex gap-2">
            <Skeleton.Input active style={{ width: '50vw', height: '30px' }} />
            <Skeleton.Input active style={{ width: '25%', height: '30px' }} />
          </div>
        </div>

        {/* Tones and Language Selection */}
        <div className="flex justify-between gap-2 mb-4">
          <div className="flex gap-2 flex-wrap w-3/4">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton.Button
                  key={index}
                  active
                  style={{ width: '80px', height: '30px' }}
                />
              ))}
          </div>
          <Skeleton.Input active style={{ width: '25%', height: '30px' }} />
        </div>

        {/* Post Format Options */}
        <div className="my-2 flex w-full flex-wrap items-center gap-2 justify-between">
          <div className="flex gap-2 w-3/4">
            {Array(2)
              .fill(null)
              .map((_, index) => (
                <Skeleton.Button
                  key={index}
                  active
                  style={{ width: '96px', height: '30px' }}
                />
              ))}
          </div>
          <Skeleton.Input active style={{ width: '25%', height: '30px' }} />
        </div>

        {/* Text Area */}
        <Skeleton.Input
          active
          style={{ width: '100%', height: '208px', marginBottom: '16px' }}
        />

        <div className="flex lg:flex-row flex-col gap-2 items-center">
          <Skeleton.Input active style={{ width: '50vw', height: '30px' }} />
          <Skeleton.Input active style={{ width: '25%', height: '30px' }} />
        </div>
      </div>

      <div className="border-l border-gray-200"></div>

      <div className="w-full flex gap-4 flex-col lg:w-1/3 rounded-lg">
        <Skeleton.Input
          active
          style={{ width: '128px', height: '24px', marginBottom: '16px' }}
        />
        <Skeleton.Input
          active
          style={{ width: '100%', height: '384px', marginBottom: '16px' }}
        />
        <Skeleton.Input active style={{ width: '100%', height: '30px' }} />
      </div>
    </div>
  );
};

export default SkeletonLoading;
