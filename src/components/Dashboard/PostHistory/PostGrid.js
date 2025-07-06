import PostCard from './PostCard';
import EmptyState from './EmptyState';
import SkeletonCards from '../SkeletonLoaders/SkeletonLoadingPostHistory';

const PostsGrid = ({
  selectedProfile,
  currentPosts,
  isLoading,
  activeTab,
  handleOpenDrawer,
  handleEdit,
  handleDelete,
  formatDateTime,
  getStatusColor,
  getStatusIcon,
}) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid gap-2">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCards key={index} />
          ))
        ) : currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              selectedProfile={selectedProfile}
              onOpenDrawer={handleOpenDrawer}
              onEdit={handleEdit}
              onDelete={handleDelete}
              formatDateTime={formatDateTime}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          ))
        ) : (
          <EmptyState activeTab={activeTab} getStatusIcon={getStatusIcon} />
        )}
      </div>
    </div>
  );
};

export default PostsGrid;
