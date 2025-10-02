import { Skeleton } from 'antd';

const SavedPostsSkeleton = () => (
  <div className="dashboard-container rounded-xl lg:p-6 p-4">
    {/* Tabs skeleton */}
    <div className="mt-2 mb-2">
      <div className="flex bg-gray-50 rounded-lg p-2">
        <Skeleton.Button
          active
          size="small"
          style={{ width: 60, height: 20, marginRight: 10 }}
        />
        <Skeleton.Button
          active
          size="small"
          style={{ width: 70, height: 20, marginRight: 10 }}
        />
        <Skeleton.Button
          active
          size="small"
          style={{ width: 80, height: 20, marginRight: 10 }}
        />
        <Skeleton.Button
          active
          size="small"
          style={{ width: 60, height: 20, marginRight: 10 }}
        />
        <Skeleton.Button
          active
          size="small"
          style={{ width: 70, height: 20 }}
        />
      </div>
    </div>

    {/* Info card skeleton */}
    <div className="person-card w-full bg-gray-50 p-4 rounded-xl flex justify-between items-center mb-3">
      <div className="flex-grow items-center mt-1 gap-4">
        <Skeleton.Input
          active
          style={{
            width: 150,
            height: 16,
            marginBottom: 8,
          }}
        />
        <Skeleton.Input
          active
          style={{
            width: 200,
            height: 14,
          }}
        />
      </div>

      <Skeleton.Button
        active
        size="small"
        style={{
          width: 100,
          height: 32,
          borderRadius: 8,
        }}
      />
    </div>

    {/* Posts skeletons */}
    <div className="flex bg-[#ededed flex-wrap gap-4 mt-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="person-card w-full bg-white p-4 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <Skeleton.Avatar active size="small" />
              <div>
                <Skeleton.Input
                  active
                  style={{
                    width: 120,
                    height: 16,
                    marginBottom: 8,
                  }}
                />
                <Skeleton.Input
                  active
                  style={{
                    width: 80,
                    height: 14,
                  }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton.Button
                active
                size="small"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                }}
              />
              <Skeleton.Button
                active
                size="small"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                }}
              />
            </div>
          </div>

          <Skeleton
            active
            paragraph={{ rows: 3, width: ['100%', '90%', '80%'] }}
            title={false}
          />

          <div className="flex justify-between items-center mt-4">
            <Skeleton.Input
              active
              style={{
                width: 120,
                height: 24,
                borderRadius: 12,
              }}
            />

            <Skeleton.Input
              active
              style={{
                width: 100,
                height: 24,
                borderRadius: 12,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SavedPostsSkeleton;
