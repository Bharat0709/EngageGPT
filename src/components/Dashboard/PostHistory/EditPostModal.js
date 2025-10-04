import React, { useState, useEffect } from 'react';
import {
  FiX,
  FiCalendar,
  FiClock,
  FiGlobe,
  FiEdit3,
  FiImage,
  FiTrash2,
  FiUpload,
  FiAlertCircle,
} from 'react-icons/fi';
import { useNotifications } from '@components/Common/Notification';
import TimezonePicker from '@components/Common/TimeZonePicker';
import DateTimeSelector from '@components/Common/DateTImePicker';

const statusOptions = [
  { label: 'Draft', value: 'Draft', color: 'bg-gray-100 text-gray-700' },
  {
    label: 'Scheduled',
    value: 'Scheduled',
    color: 'bg-blue-100 text-blue-700',
  },
  { label: 'Posted', value: 'Posted', color: 'bg-green-100 text-green-700' },
];

const MediaPreview = ({ media, removeMedia }) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <FiImage className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-semibold text-gray-800">
          Media Files ({media.length})
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg overflow-hidden"
          >
            {item.url && item.type?.includes('image') && (
              <>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.name || 'Preview'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => removeMedia(index, !item.file)}
                    className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                    title="Remove media"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                    <p className="text-white text-xs font-medium truncate">
                      {item.name || 'Image'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Utility function to format date time for API
export const formatDateTimeForAPI = (dateTime) => {
  if (!dateTime) return { date: null, time: null };

  const day = String(dateTime.getDate()).padStart(2, '0');
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const year = dateTime.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const seconds = String(dateTime.getSeconds()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return { date: formattedDate, time: formattedTime };
};

const EditPostModal = ({ isOpen, onClose, post, onSave, isEditing }) => {
  const message = useNotifications();
  const [postData, setPostData] = useState({
    dateTime: null,
    timeZone: 'Asia/Kolkata',
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
      // Parse existing date and time into Date object
      let dateTimeObj = null;
      if (post.postDate && post.postTime) {
        const [day, month, year] = post.postDate.split('-');
        const [hours, minutes, seconds = '00'] = post.postTime.split(':');
        dateTimeObj = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(hours),
          parseInt(minutes),
          parseInt(seconds),
        );
      }

      setPostData({
        dateTime: dateTimeObj,
        timeZone: post.timeZone || 'Asia/Kolkata',
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

    // DateTime validation
    if (!postData.dateTime) {
      newErrors.dateTime = 'Date and time are required';
    } else {
      const now = new Date();
      if (postData.dateTime <= now) {
        newErrors.dateTime = 'Selected date and time must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { date, time } = formatDateTimeForAPI(postData.dateTime);
      await onSave(post.id, {
        postDate: date,
        postTime: time,
        timeZone: postData.timeZone,
        content: postData.content,
        status: postData.status,
        visibility: postData.visibility,
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

  const selectedStatus = statusOptions.find(
    (opt) => opt.value === postData.status,
  );

  return (
    <div className="fixed inset-0 w-full z-[70] flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300">
      <div className="bg-white flex flex-col rounded-3xl  h-[95vh] lg:w-3/4 xl:w-2/3 2xl:w-1/2 w-11/12 relative shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative p-4">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12  backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FiEdit3 className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black m-0 ">
                  Edit Post
                </h2>
                <p className="text-black  text-sm mt-1 mb-0">
                  Update your scheduled post
                </p>
              </div>
            </div>
            <button
              className="p-3 text-black/80 hover:text-black hover:bg-white/20 rounded-2xl transition-all duration-200"
              onClick={onClose}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-2 overflow-y-auto">
          <div className="p-4 space-y-2">
            {/* Date Time and Timezone Section */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-start justify-start flex-wrap gap-4 w-full">
                <div className="space-y-2 w-1/2">
                  <label className="text-xs font-semibold w-full text-gray-700 flex items-center gap-2">
                    Date & Time
                  </label>
                  <DateTimeSelector
                    value={postData.dateTime}
                    onChange={(dateTime) => {
                      setPostData({ ...postData, dateTime });
                      if (errors.dateTime) {
                        setErrors({ ...errors, dateTime: null });
                      }
                    }}
                    placeholder="Select date and time"
                    showTime={true}
                  />
                  {errors.dateTime && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.dateTime}
                    </div>
                  )}
                </div>

                <div className="space-y-2 min-w-[16rem]">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                    Timezone
                  </label>
                  <TimezonePicker
                    value={postData.timeZone}
                    onChange={(timeZone) =>
                      setPostData({ ...postData, timeZone })
                    }
                    placeholder="Select timezone"
                  />
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="w-full p-2 px-4 bg-gradient-to-r from-gray-50 to-blue-50  flex items-center rounded-2xl justify-start gap-4">
              <label className="text-sm font-semibold text-gray-700">
                Status
              </label>
              <div className="flex gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    onClick={() =>
                      setPostData({ ...postData, status: status.value })
                    }
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 border ${
                      postData.status === status.value
                        ? `${status.color} border-current `
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">
                Content
              </label>
              <div className="relative">
                <textarea
                  className={`w-full font-normal leading-8 border-2 rounded-2xl p-6 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none resize-none bg-white/50 backdrop-blur-sm ${
                    errors.content ? 'border-red-500' : 'border-gray-200'
                  }`}
                  rows="12"
                  placeholder="What's on your mind? Share your thoughts..."
                  value={postData.content}
                  onChange={(e) => {
                    setPostData({ ...postData, content: e.target.value });
                    if (errors.content) {
                      setErrors({ ...errors, content: null });
                    }
                  }}
                />
                <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                  {postData.content.length} characters
                </div>
              </div>
              {errors.content && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl">
                  <FiAlertCircle className="w-4 h-4" />
                  {errors.content}
                </div>
              )}
            </div>

            {/* Media Upload Section */}
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="media-upload"
                />
                <label
                  htmlFor="media-upload"
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group-hover:scale-[1.02]"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FiUpload className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-700 text-center m-0 font-semibold text-lg">
                    Drag & drop or click to upload media
                  </p>
                  <p className="text-gray-500 text-sm  mb-0 mt-2">
                    Support for images • Max 10MB per file
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
                      const actualIndex = postData.mediaUrls.findIndex(
                        (media, i) => i === mediaItem.index,
                      );
                      removeMedia(actualIndex, true);
                    } else {
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
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white p-2 py-4 px-4 pt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {postData.dateTime && (
                <span>Scheduled for {postData.dateTime.toLocaleString()}</span>
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSave}
                disabled={loading}
                className={`px-6 py-3 bg-[#0c4a6e] text-white rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-md ${
                  loading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-105 active:scale-95'
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Updating...
                  </div>
                ) : (
                  'Update Post'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
