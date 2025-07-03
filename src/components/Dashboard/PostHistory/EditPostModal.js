import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { message } from 'antd';
import Select from 'react-select';
import moment from 'moment-timezone';
import MediaPreview from './MediaPreview';

const timeZones = moment.tz.names().map((tz) => ({ label: tz, value: tz }));
const statusOptions = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Scheduled', value: 'Scheduled' },
  { label: 'Posted', value: 'Posted' },
];

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
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState('');

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

  const validateDateTime = () => {
    const { postDate, postTime, timeZone } = postData;
    if (!postDate || !postTime) {
      setError('Date and Time are required.');
      return false;
    }

    const selectedDateTime = moment.tz(
      `${postDate} ${postTime}`,
      'YYYY-MM-DD HH:mm',
      timeZone,
    );
    const now = moment().tz(timeZone);

    if (!selectedDateTime.isValid()) {
      setError('Invalid date or time format.');
      return false;
    }
    if (selectedDateTime.isBefore(now)) {
      setError('Selected date and time must be in the future.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = async () => {
    if (!validateDateTime()) return;
    setLoading(true);
    try {
      await onSave(post.id, {
        ...postData,
        mediaUrls: postData.mediaUrls,
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

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col p-6 rounded-3xl h-3/4 overflow-y-scroll scrollbar-hide lg:w-1/2 w-11/12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 text-xl self-end hover:text-gray-800"
          onClick={onClose}
        >
          <FiX />
        </button>
        <h2 className="text-2xl text-center font-semibold mb-4">Edit Post</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              value={postData.postDate}
              onChange={(e) =>
                setPostData({ ...postData, postDate: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">Time</label>
            <input
              type="time"
              className="w-full border rounded-lg p-2"
              value={postData.postTime}
              onChange={(e) =>
                setPostData({ ...postData, postTime: e.target.value })
              }
            />
          </div>
        </div>
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
        <div className="mb-4">
          <label className="text-sm font-medium">Time Zone</label>
          <Select
            options={timeZones}
            value={timeZones.find((tz) => tz.value === postData.timeZone)}
            onChange={(selected) =>
              setPostData({ ...postData, timeZone: selected.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">Status</label>
          <Select
            options={statusOptions}
            value={statusOptions.find(
              (status) => status.value === postData.status,
            )}
            onChange={(selected) =>
              setPostData({ ...postData, status: selected.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">Content</label>
          <textarea
            className="w-full scrollbar-hide border rounded-lg p-2"
            rows="4"
            value={postData.content}
            onChange={(e) =>
              setPostData({ ...postData, content: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-6 p-4 mt-2 border-dashed border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 relative">
          <span className="text-gray-600 text-center">
            Drag & drop or click to upload media
          </span>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <MediaPreview
          className="mb-2"
          media={[
            ...postData.mediaUrls.map((url) => ({ url })),
            ...postData.newMediaFiles,
          ]}
          removeMedia={removeMedia}
        />
        <div className="flex mt-2 justify-end items-center">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="global-button-secondary roundeed-full border-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSave}
              disabled={loading}
              className={`global-button-primary rounded-full ${
                loading ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
