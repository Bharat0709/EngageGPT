import { Skeleton } from 'antd';

function SkeletonLoadingMember() {
  return (
    <div className="w-full h-full rounded-xl scrollbar-hide overflow-auto overflow-y-scroll mx-auto lg:p-6 p-4 bg-[#f3f4f6] shadow-md">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton.Button
            active
            style={{ width: 32, height: 32 }}
            shape="circle"
          />
          <Skeleton.Input active style={{ width: 200, height: 30 }} />
        </div>
      </div>

      {/* Member info card skeleton */}
      <div className="mb-3 bg-[#fffcfc] rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Skeleton.Avatar active size={64} shape="circle" />
        <div className="flex flex-col flex-1">
          <Skeleton.Input
            active
            style={{ width: 200, height: 24, marginBottom: 8 }}
          />
          <Skeleton.Input
            active
            style={{ width: 150, height: 16, marginBottom: 4 }}
          />
          <div className="flex gap-2">
            <Skeleton.Button active style={{ width: 80, height: 20 }} />
            <Skeleton.Button active style={{ width: 80, height: 20 }} />
            <Skeleton.Button active style={{ width: 150, height: 20 }} />
          </div>
        </div>
      </div>
      <div className="flex bg-gray-50 rounded-xl p-3 gap-4 mb-4">
        <Skeleton.Button active style={{ width: 100, height: 24 }} />
        <Skeleton.Button active style={{ width: 100, height: 24 }} />
      </div>

      {/* Custom tab skeleton */}
      <div className="bg-white rounded-xl p-4">
        {/* Tab content skeleton */}
        <div className="p-2">
          <Skeleton.Input
            active
            style={{ width: 200, height: 24, marginBottom: 16 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <Skeleton.Input active style={{ width: 150, height: 16 }} />
              <Skeleton.Input active style={{ width: '100%', height: 40 }} />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton.Input active style={{ width: 150, height: 16 }} />
              <Skeleton.Input active style={{ width: '100%', height: 40 }} />
            </div>
          </div>

          <Skeleton.Input
            active
            style={{
              width: '100%',
              height: 1,
              marginBottom: 24,
              marginTop: 24,
            }}
          />

          <div className="flex justify-between">
            <Skeleton.Input active style={{ width: 200, height: 24 }} />
            <Skeleton.Button active style={{ width: 100, height: 40 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoadingMember;
