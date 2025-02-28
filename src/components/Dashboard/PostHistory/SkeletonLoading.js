import { Skeleton } from 'antd';

const renderSkeleton = () => (
  <div className="dashboard-container bg-gray-100 rounded-xl mt-4">
    <div className="mt-4">
      <div className="person-card w-full bg-gray-50 p-4 rounded-xl flex justify-between items-center">
        <div className="flex-grow items-center mt-1 gap-4">
          <Skeleton.Input
            active
            style={{
              width: 80,
              height: 10,
              marginLeft: 12,
              marginTop: 3,
            }}
          />{' '}
          <Skeleton.Input
            active
            style={{
              width: 80,
              height: 10,
              marginLeft: 12,
              marginTop: 3,
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: 80,
              height: 10,
              marginLeft: 12,
              marginTop: 3,
            }}
          />
        </div>
      </div>
      <div className="flex bg-gray-100 flex-wrap gap-4 mt-4 ">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="person-card w-full bg-white p-4 rounded-xl flex justify-between items-start"
          >
            <Skeleton.Avatar active size="large" />
            <div className="flex-grow items-center mt-1 h-36 gap-4">
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

export default renderSkeleton;
