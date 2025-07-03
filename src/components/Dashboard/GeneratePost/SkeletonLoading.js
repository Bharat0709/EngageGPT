import React from 'react';
import { Skeleton, Card, Divider } from 'antd';

const GeneratePostSkeletonLoading = () => {
  return (
    <div className="bg-[#ededed] h-screen p-2 sm:p-4">
      <div className="mx-auto h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] bg-white rounded-xl sm:rounded-2xl overflow-hidden flex flex-col">
        {/* Header Skeleton */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Skeleton.Avatar size={48} />
              <div>
                <Skeleton.Input
                  style={{ width: 200, height: 24, marginBottom: 8 }}
                  active
                />
                <Skeleton.Input
                  style={{ width: 150, height: 16 }}
                  active
                  className="hidden sm:block"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <Skeleton.Avatar size={32} />
                <Skeleton.Input style={{ width: 80, height: 16 }} active />
              </div>
              <Skeleton.Button style={{ width: 80, height: 36 }} active />
              <Skeleton.Button
                style={{ width: 40, height: 36 }}
                active
                className="lg:hidden"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Chat Section Skeleton */}
          <div className="flex-1 flex flex-col">
            {/* Tone Selection Skeleton */}
            <div className="p-3 sm:p-4 border-b bg-gray-50 flex-shrink-0">
              <div className="flex items-center space-x-2 mb-3">
                <Skeleton.Avatar size={20} />
                <Skeleton.Input style={{ width: 100, height: 16 }} active />
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Skeleton.Button
                    key={item}
                    style={{ width: 80, height: 32, borderRadius: 16 }}
                    active
                  />
                ))}
              </div>
            </div>

            {/* Messages Skeleton */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* User Message Skeleton */}
              <div className="flex justify-end">
                <div className="flex items-start space-x-3 max-w-[85%] flex-row-reverse space-x-reverse">
                  <Skeleton.Avatar size={32} />
                  <div className="bg-[#0c4a6e] rounded-2xl rounded-br-md p-3 sm:p-4 min-w-[200px]">
                    <Skeleton.Input
                      style={{ width: '100%', height: 16 }}
                      active
                    />
                    <Skeleton.Input
                      style={{ width: '80%', height: 16, marginTop: 8 }}
                      active
                    />
                    <Skeleton.Input
                      style={{ width: 60, height: 12, marginTop: 8 }}
                      active
                    />
                  </div>
                </div>
              </div>

              {/* AI Response Skeleton */}
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[85%]">
                  <Skeleton.Avatar size={32} />
                  <div className="bg-white rounded-2xl rounded-bl-md p-3 sm:p-4 border border-gray-100 min-w-[300px]">
                    <Skeleton
                      paragraph={{
                        rows: 4,
                        width: ['100%', '90%', '95%', '80%'],
                      }}
                      active
                    />
                    <Skeleton.Input
                      style={{ width: 60, height: 12, marginTop: 8 }}
                      active
                    />
                  </div>
                </div>
              </div>

              {/* Loading Animation Skeleton */}
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[85%]">
                  <Skeleton.Avatar size={32} />
                  <div className="bg-white rounded-2xl rounded-bl-md p-4 border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#0c4a6e] rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-[#0c4a6e] rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-[#0c4a6e] rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                      <Skeleton.Input
                        style={{ width: 150, height: 16 }}
                        active
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Messages Skeleton */}
            <div className="p-4 border-t bg-gray-50 flex-shrink-0">
              <div className="flex items-center space-x-2 mb-3">
                <Skeleton.Avatar size={16} />
                <Skeleton.Input style={{ width: 150, height: 16 }} active />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <Card
                    key={item}
                    className="hover:bg-blue-50 transition-all duration-200"
                  >
                    <Skeleton
                      paragraph={{ rows: 2, width: ['100%', '80%'] }}
                      active
                    />
                  </Card>
                ))}
              </div>
            </div>

            {/* Input Skeleton */}
            <div className="p-4 border-t bg-white flex-shrink-0">
              <div className="flex space-x-3">
                <Skeleton.Input
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 12,
                  }}
                  active
                />
                <Skeleton.Button
                  style={{
                    width: 50,
                    height: 48,
                    borderRadius: 12,
                  }}
                  active
                />
              </div>
              <Skeleton.Input
                style={{ width: 250, height: 12, marginTop: 8 }}
                active
                className="lg:hidden"
              />
            </div>
          </div>

          {/* Preview Section Skeleton */}
          <div className="w-full lg:w-96 border-l overflow-y-auto bg-gray-50 flex flex-col hidden lg:flex">
            <div className="p-4 border-b bg-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <Skeleton.Input style={{ width: 120, height: 20 }} active />
                <div className="flex space-x-2">
                  <Skeleton.Button style={{ width: 32, height: 32 }} active />
                  <Skeleton.Button style={{ width: 32, height: 32 }} active />
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <Card className="bg-white rounded-xl border">
                {/* Profile Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <Skeleton.Avatar size={48} />
                  <div>
                    <Skeleton.Input
                      style={{ width: 120, height: 16, marginBottom: 4 }}
                      active
                    />
                    <div className="flex items-center space-x-1">
                      <Skeleton.Input
                        style={{ width: 60, height: 12 }}
                        active
                      />
                      <span className="text-gray-300">•</span>
                      <Skeleton.Avatar size={12} />
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-6">
                  <Skeleton
                    paragraph={{
                      rows: 6,
                      width: ['100%', '95%', '90%', '100%', '85%', '70%'],
                    }}
                    active
                  />
                </div>

                <Divider className="my-4" />

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  {[1].map((item) => (
                    <div key={item} className="flex items-center space-x-1">
                      <Skeleton.Avatar size={16} />
                      <Skeleton.Input
                        style={{ width: 50, height: 12 }}
                        active
                        className="hidden sm:inline"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Action Button */}
            <div className="p-4 border-t bg-white flex-shrink-0">
              <Skeleton.Button
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 12,
                }}
                active
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePostSkeletonLoading;
