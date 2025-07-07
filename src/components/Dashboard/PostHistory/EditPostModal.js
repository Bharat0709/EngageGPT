import React, { useState, useEffect } from 'react';
import {
  FiX,
  FiCalendar,
  FiClock,
  FiGlobe,
  FiEdit3,
  FiImage,
  FiVideo,
  FiTrash2,
  FiUpload,
  FiFileText,
} from 'react-icons/fi';
import { message } from 'antd';
import Select from 'react-select';
import moment from 'moment-timezone';

const timeZones = moment.tz.names().map((tz) => ({ label: tz, value: tz }));
const statusOptions = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Scheduled', value: 'Scheduled' },
  { label: 'Posted', value: 'Posted' },
];

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
    '&:hover': {
      borderColor: '#3b82f6',
    },
    borderRadius: '12px',
    padding: '2px',
    backgroundColor: '#ffffff',
    minHeight: '48px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#3b82f6'
      : state.isFocused
      ? '#f3f4f6'
      : 'white',
    color: state.isSelected ? 'white' : '#374151',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '12px',
    boxShadow:
      '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  }),
};

const MediaPreview = ({ media, removeMedia }) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <FiImage className="w-4 h-4" />
        Media Files ({media.length})
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {media.map((item, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl  border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
          >
            {/* Preview thumbnail for images */}
            {item.url && item.type?.includes('image') && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={item.url}
                  alt={item.name || 'Preview'}
                  className="w-full h-30 object-cover"
                />
                <button
                  onClick={() => removeMedia(index, !item.file)}
                  className="transition-opacity duration-200 p-2 hover:bg-red-50 hover:text-red-600 rounded-full"
                  title="Remove media"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const EditPostModal = ({ isOpen, onClose, post, onSave, isEditing }) => {
  const [postData, setPostData] = useState({
    postDate: '',
    postTime: '',
    timeZone: 'UTC',
    content: '',
    visibility: 'PUBLIC',
    status: 'Draft',
    mediaUrls: [],
    newMediaFiles: [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (post) {
      setPostData({
        postDate: post.postDate
          ? moment(post.postDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
          : '',
        postTime: post.postTime || '',
        timeZone: post.timeZone || 'UTC',
        content: post.content || '',
        status: post.status || 'Draft',
        mediaUrls: post.media || [],
        visibility: post.visibility || 'PUBLIC',
        newMediaFiles: [],
      });
    }
  }, [post]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newMedia = files.map((file) => ({
      type: file.type,
      size: file.size,
      name: file.name,
      file,
      url: URL.createObjectURL(file),
    }));
    setPostData((prev) => ({
      ...prev,
      newMediaFiles: [...prev.newMediaFiles, ...newMedia],
    }));
  };

  const removeMedia = (index, isExistingMedia) => {
    setPostData((prev) => {
      if (isExistingMedia) {
        const updatedMediaUrls = prev.mediaUrls.filter((_, i) => i !== index);
        return { ...prev, mediaUrls: updatedMediaUrls };
      } else {
        const updatedNewMediaFiles = prev.newMediaFiles.filter(
          (_, i) => i !== index,
        );
        return { ...prev, newMediaFiles: updatedNewMediaFiles };
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Content validation
    if (!postData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    // Date validation
    if (!postData.postDate) {
      newErrors.postDate = 'Date is required';
    }

    // Time validation
    if (!postData.postTime) {
      newErrors.postTime = 'Time is required';
    }

    // DateTime validation
    if (postData.postDate && postData.postTime) {
      const selectedDateTime = moment.tz(
        `${postData.postDate} ${postData.postTime}`,
        'YYYY-MM-DD HH:mm',
        postData.timeZone,
      );
      const now = moment().tz(postData.timeZone);

      if (!selectedDateTime.isValid()) {
        newErrors.datetime = 'Invalid date or time format';
      } else if (selectedDateTime.isBefore(now)) {
        newErrors.datetime = 'Selected date and time must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Convert date format for backend
      const formattedDate = moment(postData.postDate).format('DD-MM-YYYY');
      const formattedTime = postData.postTime;

      await onSave(post.id, {
        ...postData,
        postDate: formattedDate,
        postTime: formattedTime,
        existingMediaUrls: postData.mediaUrls,
        newMediaFiles: postData.newMediaFiles.map((file) => file.file),
      });
      onClose();
    } catch (error) {
      message.error('Failed to update post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Combine existing and new media for display
  const allMedia = [
    ...postData.mediaUrls.map((media, index) => ({
      ...media,
      isExisting: true,
      index,
    })),
    ...postData.newMediaFiles.map((media, index) => ({
      ...media,
      isExisting: false,
      index,
    })),
  ];

  return (
    <div className="fixed inset-0 w-full z-[70] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
      <div className="bg-white flex flex-col rounded-3xl h-[90vh] lg:w-2/3 xl:w-1/2 w-11/12 relative shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0c4a6e] rounded-xl flex items-center justify-center">
              <FiEdit3 className="w-5 h-5 text-white" />
            </div>
            Edit Post
          </h2>
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onClose}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Date and Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                Date
              </label>
              <input
                type="date"
                className={`w-full border-2 rounded-xl p-3 transition-all duration-200 focus:border-black-500 focus:ring-1 focus:ring-blue-500/10 outline-none ${
                  errors.postDate ? 'border-red-500' : 'border-gray-200'
                }`}
                value={postData.postDate}
                onChange={(e) => {
                  setPostData({ ...postData, postDate: e.target.value });
                  if (errors.postDate) {
                    setErrors({ ...errors, postDate: null });
                  }
                }}
              />
              {errors.postDate && (
                <p className="text-red-500 text-xs">{errors.postDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiClock className="w-4 h-4" />
                Time
              </label>
              <input
                type="time"
                className={`w-full border-2 rounded-xl p-3 transition-all duration-200 focus:border-black-500 focus:ring-1 focus:ring-blue-500/10 outline-none ${
                  errors.postTime ? 'border-red-500' : 'border-gray-200'
                }`}
                value={postData.postTime}
                onChange={(e) => {
                  setPostData({ ...postData, postTime: e.target.value });
                  if (errors.postTime) {
                    setErrors({ ...errors, postTime: null });
                  }
                }}
              />
              {errors.postTime && (
                <p className="text-red-500 text-xs">{errors.postTime}</p>
              )}
            </div>
          </div>

          {/* DateTime Error */}
          {errors.datetime && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-600 text-sm">{errors.datetime}</p>
            </div>
          )}

          {/* Time Zone */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FiGlobe className="w-4 h-4" />
              Time Zone
            </label>
            <Select
              options={timeZones}
              value={timeZones.find((tz) => tz.value === postData.timeZone)}
              onChange={(selected) =>
                setPostData({ ...postData, timeZone: selected.value })
              }
              styles={customSelectStyles}
              placeholder="Select timezone..."
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Status
            </label>
            <Select
              options={statusOptions}
              value={statusOptions.find(
                (status) => status.value === postData.status,
              )}
              onChange={(selected) =>
                setPostData({ ...postData, status: selected.value })
              }
              styles={customSelectStyles}
              placeholder="Select status..."
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Content
            </label>
            <textarea
              className={`w-full border-2 leading-8 rounded-xl p-4 transition-all duration-200  outline-none resize-none ${
                errors.content ? 'border-red-500' : 'border-gray-200'
              }`}
              rows="20"
              placeholder="What's on your mind?"
              value={postData.content}
              onChange={(e) => {
                setPostData({ ...postData, content: e.target.value });
                if (errors.content) {
                  setErrors({ ...errors, content: null });
                }
              }}
            />
            {errors.content && (
              <p className="text-red-500 text-xs">{errors.content}</p>
            )}
          </div>

          {/* Media Upload */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-1/2 opacity-0 cursor-pointer"
                id="media-upload"
              />
              <label
                htmlFor="media-upload"
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-[#0c4a6e] rounded-xl flex items-center justify-center mb-4">
                  <FiUpload className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-600 text-center font-medium">
                  Drag & drop or click to upload media
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Support for images only
                </p>
              </label>
            </div>

            {/* Media Preview */}
            {allMedia.length > 0 && (
              <MediaPreview
                media={allMedia}
                removeMedia={(index) => {
                  const mediaItem = allMedia[index];
                  if (mediaItem.isExisting) {
                    // Find the actual index in mediaUrls array
                    const actualIndex = postData.mediaUrls.findIndex(
                      (media, i) => i === mediaItem.index,
                    );
                    removeMedia(actualIndex, true);
                  } else {
                    // Find the actual index in newMediaFiles array
                    const actualIndex = postData.newMediaFiles.findIndex(
                      (media, i) => i === mediaItem.index,
                    );
                    removeMedia(actualIndex, false);
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSave}
            disabled={loading}
            className={`px-6 rounded-full py-3 bg-[#0c4a6e] text-white  font-medium transition-all duration-200 ${
              loading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02]'
            }`}
          >
            {loading ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
