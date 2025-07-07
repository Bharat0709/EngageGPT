import {
  FiX,
  FiCopy,
  FiImage,
  FiVideo,
  FiFileText,
  FiEye,
  FiExternalLink,
  FiClock,
  FiCheckCircle,
  FiEdit3,
  FiAlertCircle,
  FiCalendar,
  FiGlobe,
} from 'react-icons/fi';

import React from 'react';
import { message } from 'antd';

// Custom Drawer Component
const CustomDrawer = ({ isOpen, onClose, children, title }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 z-[60] ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[60] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full max-w-md md:max-w-lg lg:max-w-xl`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-50">
            <h2 className="text-lg m-0 p-0 font-semibold text-gray-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
};

const PostDrawer = ({
  isOpen,
  onClose,
  post,
  onPreviewMedia,
  selectedProfile,
}) => {
  console.log('PostDrawer rendered with post:', post);
  if (!post) return null;

  const getStatusConfig = (status) => {
    const configs = {
      Scheduled: {
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        icon: <FiClock className="w-3 h-3" />,
        label: 'Scheduled',
      },
      Posted: {
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        icon: <FiCheckCircle className="w-3 h-3" />,
        label: 'Published',
      },
      Draft: {
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        icon: <FiEdit3 className="w-3 h-3" />,
        label: 'Draft',
      },
      Failed: {
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        icon: <FiAlertCircle className="w-3 h-3" />,
        label: 'Failed',
      },
    };
    return configs[status] || configs['Draft'];
  };

  const formatDateTime = (date, time, timeZone) => {
    if (!date || !time) return 'Not scheduled';

    try {
      let formattedDate;
      if (date.includes('-')) {
        const [day, month, year] = date.split('-');
        formattedDate = new Date(`${year}-${month}-${day}`);
      } else {
        formattedDate = new Date(date);
      }

      if (isNaN(formattedDate.getTime())) {
        return 'Invalid Date';
      }

      const dateStr = formattedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      let formattedTime = time;
      if (time.includes(':')) {
        const [hours, minutes] = time.split(':');
        const timeObj = new Date();
        timeObj.setHours(parseInt(hours), parseInt(minutes));
        formattedTime = timeObj.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
      }

      return `${dateStr} at ${formattedTime}${
        timeZone ? ` (${timeZone})` : ''
      }`;
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getMediaIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'video':
        return <FiVideo className="w-4 h-4" />;
      case 'image':
        return <FiImage className="w-4 h-4" />;
      default:
        return <FiFileText className="w-4 h-4" />;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success('Content copied to clipboard', 2);
  };

  const statusConfig = getStatusConfig(post.status);

  return (
    <CustomDrawer isOpen={isOpen} onClose={onClose} title="Post Details">
      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            {selectedProfile?.profilePicture ? (
              <img
                src={selectedProfile.profilePicture}
                alt={selectedProfile.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-600 font-medium">
                {selectedProfile?.name?.charAt(0) || 'U'}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {selectedProfile?.name || 'Unknown User'}
            </h3>
            <div
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
            >
              {statusConfig.icon}
              <span className="ml-1">{statusConfig.label}</span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Post Content
            </h3>
            <button
              onClick={() => copyToClipboard(post.content)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              title="Copy content"
            >
              <FiCopy className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="whitespace-pre-wrap m-0 text-gray-800 leading-relaxed">
              {post.content}
            </p>
          </div>
        </div>

        {/* Media Files */}
        {post.media && post.media.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Media Files
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({post.media.length})
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {post.media.map((media, index) => (
                <div
                  key={media.id || index}
                  className="group relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                          {getMediaIcon(media.type)}
                        </div>
                        <div>
                          <p className="font-medium m-0 text-gray-900 text-sm">
                            {media.name || `Media ${index + 1}`}
                          </p>
                          <p className="text-xs m-0 text-gray-500 capitalize">
                            {media.type || 'Image'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onPreviewMedia(media)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-blue-50 hover:text-blue-600 rounded-full"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Schedule Details
          </h3>
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <FiCalendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Scheduled Time
                </span>
              </div>
              <p className="text-blue-800 m-0 font-medium">
                {formatDateTime(post.postDate, post.postTime, post.timeZone)}
              </p>
            </div>

            {post.timeZone && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <FiGlobe className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Time Zone
                  </span>
                </div>
                <p className="text-gray-700 m-0 font-medium">{post.timeZone}</p>
              </div>
            )}

            {post.createdAt && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <FiClock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Created
                  </span>
                </div>
                <p className="text-gray-700 m-0 font-medium">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Error Information */}
        {post.status === 'Failed' && post.error && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-red-600">
              Error Details
            </h3>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <div className="flex items-start space-x-3">
                <FiAlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-red-800 p-0 m-0 leading-relaxed">
                  {post.error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 -mx-6 -mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {post.postId && (
              <button
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/feed/update/${post.postId}`,
                    '_blank',
                  )
                }
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <FiExternalLink className="w-4 h-4" />
                View on LinkedIn
              </button>
            )}
          </div>
        </div>
      </div>
    </CustomDrawer>
  );
};
export default PostDrawer;
