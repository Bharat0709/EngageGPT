import { Icons } from '@utils/constantData/icons';
import React from 'react';

const PostCardComponent = ({
  post,
  onEdit,
  onDelete,
  onCardClick,
  formatDate,
}) => {
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(post);
    }
  };

  const handleButtonClick = (e, callback) => {
    e.stopPropagation();
    callback();
  };

  return (
    <div
      key={post._id}
      className="p-4 w-full bg-white rounded-lg cursor-pointer transition-shadow"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap start gap-3">
          <div className="flex gap-4 items-start">
            <div className="flex flex-col flex-wrap items-start justify-start">
              <div className="flex flex-wrap gap-4">
                <h3 className="text-md font-semibold">{post.author}</h3>
                <div className="flex items-center gap-2">
                  <a
                    href={post.authorUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-700 text-xs bg-gray-100 text-gray-600 px-4 py-1 rounded-full flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <span
                className={`text-xs px-4 py-1 rounded-full ${
                  post.status === 'new'
                    ? 'bg-blue-100 text-blue-700'
                    : post.status === 'contacted'
                    ? 'bg-yellow-100 text-yellow-700'
                    : post.status === 'responded'
                    ? 'bg-green-100 text-green-700'
                    : post.status === 'closed'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-black p-2  hover:text-black flex items-center gap-1"
            onClick={(e) => handleButtonClick(e, () => onEdit(post))}
            title="Edit"
          >
            <Icons.Edit />
          </button>
          <button
            className="text-red-600 p-2 hover:text-red-800 flex items-center gap-1"
            onClick={(e) => handleButtonClick(e, () => onDelete(post))}
            title="Delete"
          >
            <Icons.Trash />
          </button>
        </div>
      </div>

      {post.jobRole && (
        <div className="mt-2 flex items-center">
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center gap-1">
            <Icons.BriefCase size={12} />
            {post.jobRole}
          </span>
        </div>
      )}

      <p className="text-sm mt-3 text-gray-600 whitespace-pre-line line-clamp-3">
        {post.content.replace(/\n{1,}/g, '\n\n')}
      </p>

      <div className="flex flex-wrap mt-4 items-start gap-3">
        {post.emailAddresses && post.emailAddresses.length > 0 && (
          <div className="flex flex-col">
            <p className="text-xs font-medium text-gray-700">Email Contacts:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {post.emailAddresses.slice(0, 2).map((email, index) => (
                <span
                  key={index}
                  className="text-sm bg-blue-50 px-2 py-1 rounded flex items-center gap-1"
                >
                  <Icons.Mail size={10} className="text-blue-600" />
                  {email.length > 20 ? email.substring(0, 20) + '...' : email}
                </span>
              ))}
              {post.emailAddresses.length > 2 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{post.emailAddresses.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {post.formLinks && post.formLinks.length > 0 && (
          <div className="flex flex-col">
            <p className="text-xs font-medium text-gray-700">
              Extracted Links:
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {post.formLinks.slice(0, 2).map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-green-50 px-2 py-1 rounded flex items-center gap-1 text-green-700 hover:text-green-900"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icons.ArrowRight size={10} />
                  {link.length > 20 ? link.substring(0, 20) + '...' : link}
                </a>
              ))}
              {post.formLinks.length > 2 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{post.formLinks.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap mt-4 items-center font-semibold justify-between text-xs text-gray-500">
        <div>Saved on {formatDate(post.createdAt)}</div>
        <div className="text-blue-600 hover:text-blue-800">
          Click to view details →
        </div>
      </div>

      {post.notes && (
        <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
          <p className="text-xs font-medium text-gray-700">Notes:</p>
          <p className="text-xs text-gray-600 line-clamp-2">{post.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PostCardComponent;
