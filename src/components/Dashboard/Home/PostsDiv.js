import React from 'react';
import { Icons } from '@utils/constantData/icons';

// Custom Skeleton Components
const SkeletonAvatar = () => (
  <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full"></div>
);

const SkeletonText = ({ width = '100%', height = '16px' }) => (
  <div
    className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-lg"
    style={{ width, height }}
  ></div>
);

const SkeletonButton = ({ width = '60px', height = '32px' }) => (
  <div
    className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-lg"
    style={{ width, height }}
  ></div>
);

const SkeletonPost = () => (
  <div className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-gray-200/50">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0"></div>

    <div className="relative z-10 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SkeletonAvatar />
          <div className="space-y-2">
            <SkeletonText width="120px" height="14px" />
            <SkeletonText width="80px" height="12px" />
          </div>
        </div>
        <SkeletonButton width="24px" height="24px" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <SkeletonText width="90%" height="16px" />
        <SkeletonText width="70%" height="16px" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-6">
          <SkeletonButton width="60px" height="20px" />
          <SkeletonButton width="60px" height="20px" />
          <SkeletonButton width="60px" height="20px" />
        </div>
        <SkeletonButton width="24px" height="24px" />
      </div>
    </div>

    {/* Shimmer overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_ease-in-out_infinite]"></div>
  </div>
);

const PostCard = ({ post, handlePostClick }) => {
  const linkedInIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230077b5'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E";

  return (
    <div
      className="group relative rounded-xl overflow-hidden  bg-white lg:p-6 p-4  transition-all duration-300 ease-out cursor-pointer"
      onClick={() => handlePostClick(post._id)}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
                src={post.author.profilePicture}
                alt={post.author.name}
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h4 className="font-semibold p-0 m-0  text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                {post.author.name}
              </h4>
              <p className="text-sm p-0 m-0 text-gray-500">
                {post.postedAround}
              </p>
            </div>
          </div>

          <a
            href={post.shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200 group-hover:scale-110"
            onClick={(e) => e.stopPropagation()}
          >
            <img className="w-5 h-5" src={linkedInIcon} alt="LinkedIn" />
          </a>
        </div>

        {/* Content Preview */}
        <div className="space-y-2">
          <p className="text-gray-700 m-0 text-sm leading-relaxed line-clamp-2">
            {post.textContent.split(' ').slice(0, 15).join(' ')}
            {post.textContent.split(' ').length > 15 && '...'}
          </p>
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-200">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <Icons.BarChart className="w-4 h-4" />
              <span className="text-sm font-medium">
                {post.numImpressions >= 1000
                  ? `${(post.numImpressions / 1000).toFixed(1)}k`
                  : post.numImpressions?.toLocaleString() || '0'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-200">
              <Icons.Heart className="w-4 h-4" />
              <span className="text-sm font-medium">
                {post.numLikes >= 1000
                  ? `${(post.numLikes / 1000).toFixed(1)}k`
                  : post.numLikes?.toLocaleString() || '0'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors duration-200">
              <Icons.AiMessage className="w-4 h-4" />
              <span className="text-sm font-medium">
                {post.numComments?.toLocaleString() || '0'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-400  transition-colors duration-200">
            <span className="text-xs lg:flex hdden font-medium">
              View Details
            </span>
            <Icons.ArrowRight className="w-4 h-4 duration-200" />
          </div>
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent  transition-colors duration-300"></div>
    </div>
  );
};

const PostsDiv = ({ handlePostClick, posts, isLoading }) => {
  return (
    <div className="space-y-1 mt-2">
      {/* Posts Grid */}
      <div className="grid gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonPost key={index} />
            ))
          : posts?.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                handlePostClick={handlePostClick}
              />
            ))}
      </div>

      {/* Empty State */}
      {!isLoading && (!posts || posts.length === 0) && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.BarChart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No posts available
          </h3>
          <p className="text-gray-600">
            Your posts will appear here once you start sharing content.
          </p>
        </div>
      )}

      {/* Custom keyframes for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PostsDiv;
