import React, { useState, useEffect } from 'react';
import { FiX, FiBriefcase, FiClipboard, FiCheck } from 'react-icons/fi';
import { message, Input } from 'antd';
import Select from 'react-select';

const statusOptions = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Responded', value: 'responded' },
  { label: 'Closed', value: 'closed' },
  { label: 'Rejected', value: 'rejected' },
];

const EditHiringPostModal = ({ isOpen, onClose, post, onSave, isEditing }) => {
  const [postData, setPostData] = useState({
    jobRole: '',
    notes: '',
    status: 'new',
  });
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (post) {
      setPostData({
        jobRole: post.jobRole || '',
        notes: post.notes || '',
        status: post.status || 'new',
      });
    }
  }, [post]);

  const handleSave = async () => {
    setLoading(true);
    try {
    
      await onSave(post._id, postData);
      // onClose();
    } catch (error) {
      message.error('Failed to update post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (selected) => {
    setPostData({ ...postData, status: selected.value });
  };

  const handleJobRoleChange = (e) => {
    setPostData({ ...postData, jobRole: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col p-6 rounded-xl max-h-[90vh] overflow-y-auto w-full lg:w-1/2 md:w-2/3 sm:w-5/6 max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 text-xl hover:text-gray-800"
          onClick={onClose}
        >
          <FiX />
        </button>

        <h2 className="text-xl text-center font-semibold mb-6">
          Edit Hiring Post
        </h2>

        {post && (
          <div className="mb-4">
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Post from:
              </p>
              <div className="flex items-center gap-2">
                <span className="font-medium">{post.author}</span>
                {post.authorUrl && (
                  <a
                    href={post.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    View Profile
                  </a>
                )}
              </div>

              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Content:
                </p>
                <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200 max-h-40 overflow-y-auto">
                  {post.content}
                </p>
              </div>

              {post.emailAddresses && post.emailAddresses.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Email Contacts:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.emailAddresses.map((email, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-50 px-2 py-1 rounded"
                      >
                        {email}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {post.formLinks && post.formLinks.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Application Links:
                  </p>
                  <div className="flex flex-col gap-1">
                    {post.formLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs overflow-hidden text-ellipsis text-blue-600 hover:text-blue-800"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-1">
                <FiBriefcase className="text-gray-600" />
                Organization/Role (If any)
              </label>
              <Input
                value={postData.jobRole}
                onChange={handleJobRoleChange}
                placeholder="Enter Organization/Role..."
                className="w-full rounded-lg border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-1">
                <FiCheck className="text-gray-600" />
                Status
              </label>
              <Select
                options={statusOptions}
                value={statusOptions.find(
                  (status) => status.value === postData.status,
                )}
                onChange={handleStatusChange}
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium flex items-center gap-2 mb-1">
                <FiClipboard className="text-gray-600" />
                Notes
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 resize-none"
                rows="4"
                value={postData.notes}
                onChange={(e) =>
                  setPostData({ ...postData, notes: e.target.value })
                }
                placeholder="Add notes about this candidate or opportunity..."
              />
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className={`px-4 py-2 rounded-lg global-button-primary flex items-center gap-2 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHiringPostModal;
