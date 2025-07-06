import { Icons } from '@utils/constantData/icons';
import React, { useState } from 'react';

const PostDrawerComponent = ({
  isOpen,
  onClose,
  post,
  onEdit,
  onDelete,
  formatDate,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  if (!isOpen || !post) return null;

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-700';
      case 'responded':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-purple-100 text-purple-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl m-0 font-semibold text-gray-900">
              Post Details
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(post)}
                className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
                title="Edit Post"
              >
                <Icons.Edit size={20} />
              </button>
              <button
                onClick={() => onDelete(post)}
                className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
                title="Delete Post"
              >
                <Icons.Trash size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
              >
                <Icons.Cross size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Author Section */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <Icons.User className="text-blue-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {post.author}
                </h3>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${getStatusColor(
                      post.status,
                    )}`}
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                  {post.authorUrl && (
                    <a
                      href={post.authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      View Profile <Icons.ArrowRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Job Role */}
            {post.jobRole && (
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-full">
                  <Icons.BriefCase className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-md mb-0 font-medium text-gray-900">
                    Job Role
                  </h4>
                  <p className="text-gray-600 mb-0 mt-1">{post.jobRole}</p>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 rounded-full">
                <Icons.Filetext className="text-purple-600" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-md m-0 font-medium text-gray-900">
                  Post Content
                </h4>
                <div className="mt-2">
                  <p className="text-gray-600 m-0 leading-8 whitespace-pre-line">
                    {showFullContent
                      ? post.content.replace(/\n{3,}/g, '\n\n')
                      : post.content
                          .replace(/\n{3,}/g, '\n\n')
                          .substring(0, 300)}
                  </p>
                  {post.content.length > 200 && (
                    <button
                      onClick={toggleContent}
                      className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                    >
                      {showFullContent ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Email Addresses */}
            {post.emailAddresses && post.emailAddresses.length > 0 && (
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-full">
                  <Icons.Mail className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-md m-0 font-medium text-gray-900">
                    Email Contacts ({post.emailAddresses.length})
                  </h4>
                  <div className="mt-2 space-y-2">
                    {post.emailAddresses.map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg"
                      >
                        <Icons.Mail size={14} className="text-blue-600" />
                        <span className="text-sm text-gray-700">{email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Form Links */}
            {post.formLinks && post.formLinks.length > 0 && (
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-full">
                  <Icons.Link className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-md font-medium text-gray-900">
                    Extracted Links ({post.formLinks.length})
                  </h4>
                  <div className="mt-2 space-y-2">
                    {post.formLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 bg-green-50 rounded-lg text-green-700 hover:text-green-900 hover:bg-green-100 transition-colors"
                      >
                        <Icons.ArrowRight size={14} />
                        <span className="text-sm break-all">{link}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {post.notes && (
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-50 rounded-full">
                  <Icons.MousePointer className="text-yellow-600" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-md font-medium text-gray-900">Notes</h4>
                  <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm mb-0 text-gray-700 whitespace-pre-line">
                      {post.notes}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Created Date */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-full">
                <Icons.CalendarPlus className="text-gray-600" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-md font-medium text-gray-900">Created</h4>
                <p className="text-gray-600 mb-0 mt-1">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDrawerComponent;
