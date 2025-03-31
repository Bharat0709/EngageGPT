import { Skeleton } from 'antd';
export const renderSkeleton = () => (
  <div className="dashboard-container bg-white min-h-screen p-3">
    <div className="flex items-center justify-between pr-3">
      <Skeleton.Input style={{ width: 100, height: 24 }} active />
      <Skeleton.Button style={{ height: 24, width: 100 }} active />
    </div>
    <div className="mt-4">
      <div className="flex w-full flex-wrap gap-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-50 lg:w-fit w-full  rounded-lg p-3 flex flex-col justify-between"
          >
            <div className="flex gap-2 items-center">
              <Skeleton.Avatar active size="small" shape="circle" />
              <Skeleton.Input
                className="w-1/2 mt-1"
                style={{ height: 10, width: 10 }}
                active
              />
            </div>
            <Skeleton.Input
              className="w-1/2 mt-2 my-0 "
              style={{ height: 10, width: 10 }}
              active
            />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-4 ">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="person-card w-full bg-gray-50 p-4 rounded-xl flex justify-between items-center"
          >
            <Skeleton.Avatar active size="large" />
            <div className="flex-grow items-center mt-1 gap-4">
              <Skeleton.Input
                active
                style={{
                  width: 120,
                  height: 10,
                  marginLeft: 12,
                  marginTop: 3,
                }}
              />
              <Skeleton.Input
                active
                style={{
                  width: 100,
                  height: 10,
                  marginLeft: 12,
                  marginTop: 3,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
