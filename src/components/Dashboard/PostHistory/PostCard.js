import React from 'react';
import { Avatar, Tag, Button, Tooltip } from 'antd';
import {
  FiEdit,
  FiTrash,
  FiEye,
  FiArrowRight,
  FiCalendar,
} from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';

const PostCard = ({
  post,
  selectedProfile,
  onOpenDrawer,
  onEdit,
  onDelete,
  formatDateTime,
  getStatusColor,
  getStatusIcon,
}) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(post);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(post);
  };

  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-white lg:p-4 p-4 border border-gray-200 hover:border-blue-300 transition-all duration-300 ease-out cursor-pointer"
      onClick={() => onOpenDrawer(post)}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar
                src={selectedProfile?.profilePicture}
                size={48}
                className="ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
              >
                {selectedProfile?.name?.charAt(0)}
              </Avatar>
              {/* Status indicator dot */}
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  post.status === 'Posted'
                    ? 'bg-green-500'
                    : post.status === 'Scheduled'
                    ? 'bg-blue-500'
                    : post.status === 'Failed'
                    ? 'bg-red-500'
                    : 'bg-orange-500'
                }`}
              ></div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                {selectedProfile?.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <Tag
                  color={getStatusColor(post.status)}
                  className="text-xs border-0 flex items-center gap-2 rounded-full px-3 py-1"
                  icon={getStatusIcon(post.status)}
                >
                  {post.status}
                </Tag>
              </div>
            </div>
          </div>

          {/* Action buttons - visible on hover */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Tooltip title="Edit Post">
              <Button
                type="text"
                size="small"
                icon={<FiEdit className="w-4 h-4" />}
                onClick={handleEdit}
                disabled={post.status === 'Posted'}
                className="rounded-full hover:bg-blue-50 hover:text-blue-600 hover:scale-110 transition-all duration-200"
              />
            </Tooltip>
            <Tooltip title="Delete Post">
              <Button
                type="text"
                size="small"
                icon={<FiTrash className="w-4 h-4" />}
                onClick={handleDelete}
                className="rounded-full hover:bg-red-50 hover:text-red-600 hover:scale-110 transition-all duration-200"
              />
            </Tooltip>
          </div>
        </div>

        {/* Content Preview */}
        <div className="space-y-3">
          <div className="text-gray-700 text-sm leading-relaxed">
            <div className="line-clamp-3 group-hover:text-gray-900 transition-colors duration-200">
              {post.content?.split(' ').slice(0, 25).join(' ')}
              {post.content?.split(' ').length > 25 && (
                <span className="text-blue-600 font-medium">... read more</span>
              )}
            </div>
          </div>

          {/* Media Indicator */}
          {post.media && post.media.length > 0 && (
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-200">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FiEye className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {post.media.length} media file
                {post.media.length > 1 ? 's' : ''} attached
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-200">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="flex items-center gap-1 text-xs">
              <FiCalendar className="w-4 h-4" />
              <span className="font-medium">
                {formatDateTime(post.postDate, post.postTime, post.timeZone)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* LinkedIn link */}
            {post.postId && (
              <Tooltip title="View on LinkedIn">
                <Button
                  type="text"
                  size="small"
                  icon={<FaLinkedin className="w-4 h-4 text-blue-600" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://www.linkedin.com/feed/update/${post.postId}`,
                      '_blank',
                    );
                  }}
                  className="rounded-full hover:bg-blue-50 hover:scale-110 transition-all duration-200"
                />
              </Tooltip>
            )}

            {/* View details indicator */}
            <div className="flex items-center gap-2 text-gray-400 group-hover:text-blue-600 transition-colors duration-200">
              <span className="text-xs font-medium hidden lg:block">
                View Details
              </span>
              <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
