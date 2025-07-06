import React, { useState, useEffect } from 'react';
import {
  FiX,
  FiBriefcase,
  FiCheck,
  FiEdit3,
  FiUser,
  FiMail,
  FiLink,
  FiSave,
  FiLoader,
} from 'react-icons/fi';
import { FaBuilding, FaRegStickyNote } from 'react-icons/fa';

const statusOptions = [
  { label: 'New', value: 'new', color: 'bg-blue-500' },
  { label: 'Contacted', value: 'contacted', color: 'bg-yellow-500' },
  { label: 'Responded', value: 'responded', color: 'bg-green-500' },
  { label: 'Closed', value: 'closed', color: 'bg-gray-500' },
  { label: 'Rejected', value: 'rejected', color: 'bg-red-500' },
];

const EditHiringPostModal = ({ isOpen, onClose, post, onSave, isEditing }) => {
  const [postData, setPostData] = useState({
    jobRole: '',
    notes: '',
    status: 'new',
  });
  const [loading, setLoading] = useState(isEditing);
  const [activeTab, setActiveTab] = useState('details');

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
    } catch (error) {
      console.error('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (selected) => {
    setPostData({ ...postData, status: selected });
  };

  const handleJobRoleChange = (e) => {
    setPostData({ ...postData, jobRole: e.target.value });
  };

  const getStatusColor = (status) => {
    return (
      statusOptions.find((s) => s.value === status)?.color || 'bg-gray-500'
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="relative  p-2 text-black">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all duration-200"
          >
            <FiX size={20} />
          </button>

          <div className="flex items-center px-6 pb-2 pt-6  gap-3">
            <div>
              <h2 className="text-2xl m-0 font-bold">Edit Saved Post</h2>
              <p className="text-gray-700 mb-0 mt-1">
                Update post status and details
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6  overflow-y-auto max-h-[calc(95vh-200px)]">
          {post && (
            <div className="space-y-6">
              {/* Post Preview Card */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FiUser className="text-black" size={18} />
                    </div>
                    <div>
                      <p className="font-semibold m-0 text-gray-800">
                        {post.author}
                      </p>
                      {post.authorUrl && (
                        <a
                          href={post.authorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-black hover:text-indigo-800 flex items-center gap-1 mt-1"
                        >
                          <FiLink size={12} />
                          View Profile
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        postData.status,
                      )}`}
                    ></div>
                    <span className="text-sm font-medium capitalize text-gray-700">
                      {postData.status}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Contact Information */}
                {(post.emailAddresses?.length > 0 ||
                  post.formLinks?.length > 0) && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {post.emailAddresses?.length > 0 && (
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          <FiMail className="text-black" size={16} />
                          <h4 className="font-semibold text-gray-800">
                            Email Contacts
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {post.emailAddresses.map((email, index) => (
                            <div
                              key={index}
                              className="bg-indigo-50 px-3 py-2 rounded-lg"
                            >
                              <span className="text-sm text-indigo-700">
                                {email}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {post.formLinks?.length > 0 && (
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          <FiLink className="text-black" size={16} />
                          <h4 className="font-semibold text-gray-800">
                            Application Links
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {post.formLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-sm text-black hover:text-indigo-800 truncate bg-indigo-50 px-3 py-2 rounded-lg transition-colors"
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Edit Form */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Job Role */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FaBuilding className="text-black" size={16} />
                    Organization/Role
                  </label>
                  <input
                    type="text"
                    value={postData.jobRole}
                    onChange={handleJobRoleChange}
                    placeholder="Enter organization or role..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white"
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FiCheck className="text-black" size={16} />
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={postData.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white appearance-none"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <div
                        className={`w-3 h-3 rounded-full ${getStatusColor(
                          postData.status,
                        )}`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaRegStickyNote className="text-black" size={16} />
                  Notes
                </label>
                <textarea
                  rows="6"
                  value={postData.notes}
                  onChange={(e) =>
                    setPostData({ ...postData, notes: e.target.value })
                  }
                  placeholder="Add your notes about this opportunity..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-6 py-2.5 rounded-full bg-[#0c4a6e] text-white font-medium flex items-center gap-2 transition-all duration-200 ${
              loading
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg'
            }`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" size={16} />
                Saving...
              </>
            ) : (
              <>Save Changes</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHiringPostModal;
