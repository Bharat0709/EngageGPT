export const SidebarSkeletonLoader = ({ isOpen }) => (
  <div className="animate-pulse">
    {/* Organization Section Skeleton */}
    <div className="mt-8 space-y-4">
      <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          {isOpen && (
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
          )}
        </div>
        {isOpen && (
          <div className="space-y-2">
            <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
          </div>
        )}
      </div>
    </div>
  </div>
);
