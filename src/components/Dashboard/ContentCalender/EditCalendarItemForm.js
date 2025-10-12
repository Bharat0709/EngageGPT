import React, { useState, useEffect } from 'react';
import { Icons } from '@utils/constantData/icons';
import DateTimeSelector from '@components/Common/DateTImePicker';
import { convertTo24Hour } from '@utils/formatTime';

const EditCalendarItemModal = ({
  isOpen,
  item,
  onCancel,
  onSave,
  memberId,
}) => {
  const [formData, setFormData] = useState({
    topic: '',
    date: null,
    time: null,
    status: 'Planned',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset form when modal opens or item changes
  useEffect(() => {
    if (isOpen && item) {
      // Parse the date and time from the item
      let dateTimeObj = null;

      if (item.date && item.time) {
        // Combine date and time strings to create a proper Date object
        const [day, month, year] = item.date.split('-');
        const [time, ampm] = item.time.split(' ');
        const [hours, minutes] = time.split(':');

        let hour24 = parseInt(hours);
        if (ampm === 'PM' && hour24 !== 12) hour24 += 12;
        if (ampm === 'AM' && hour24 === 12) hour24 = 0;

        dateTimeObj = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          hour24,
          parseInt(minutes),
        );
      }

      setFormData({
        topic: item.topic || '',
        dateTime: dateTimeObj,
        status: item.status || 'Planned',
      });
      setErrors({});
    } else if (isOpen && !item) {
      // Reset form for new item
      setFormData({
        topic: '',
        dateTime: null,
        status: 'Planned',
      });
      setErrors({});
    }
  }, [isOpen, item]);

  const handleClose = () => {
    onCancel();
    setFormData({
      topic: '',
      dateTime: null,
      status: 'Planned',
    });
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic/Title is required';
    }

    if (!formData.dateTime) {
      newErrors.dateTime = 'Date and time are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showMessage = (type, text) => {
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Format date and time for API
      const date = formData.dateTime;
      const formattedDate = `${String(date.getDate()).padStart(
        2,
        '0',
      )}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const formattedTime = `${String(displayHours).padStart(2, '0')}:${String(
        minutes,
      ).padStart(2, '0')} ${ampm}`;

      // Prepare data for API
      const updatedItem = {
        ...item,
        topic: formData.topic,
        date: formattedDate,
        time: convertTo24Hour(formattedTime),
        status: formData.status,
      };
      // Call the onSave callback with updated data
      await onSave(updatedItem);
      handleClose();
    } catch (error) {
      showMessage('error', 'Failed to update calendar item');
    } finally {
      setLoading(false);
    }
  };

  const getError = (field) => {
    return errors[field];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
      <div className="bg-white flex flex-col lg:max-h-2xl h-fit overflow-y-scroll scrollbar-hide lg:w-2/5 w-11/12 p-0 rounded-3xl shadow-xl transform transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="bg-blue-50 rounded-t-3xl p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Icons.OutlinedCalendar className="text-blue-800" size={20} />
              <h2 className="text-md lg:text-2xl mb-0 p-0 font-bold text-blue-800">
                {item ? 'Edit Calendar Item' : 'Add Calendar Item'}
              </h2>
            </div>
            <button
              className="text-gray-500 hover:text-gray-800 hover:bg-blue-100 p-2 rounded-full transition-colors"
              onClick={handleClose}
            >
              <Icons.Cross size={20} />
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            {item
              ? 'Update your calendar item details'
              : 'Create a new calendar item'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6">
          <div className="space-y-6">
            {/* Topic/Title Field */}
            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Topic/Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => handleChange('topic', e.target.value)}
                  placeholder="Enter content topic or title"
                  className={`w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    getError('topic') ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {getError('topic') && (
                <p className="mt-1 text-sm text-red-600">{getError('topic')}</p>
              )}
            </div>

            {/* Date and Time Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date and Time
              </label>
              <DateTimeSelector
                value={formData.dateTime}
                onChange={(dateTime) => handleChange('dateTime', dateTime)}
                placeholder="Select date and time"
                showTime={true}
                className={`w-full ${
                  getError('dateTime') ? 'border-red-300' : ''
                }`}
              />
              {getError('dateTime') && (
                <p className="mt-1 text-sm text-red-600">
                  {getError('dateTime')}
                </p>
              )}
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                >
                  <option value="Planned">Planned</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Posted">Posted</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Icons.ForwardArrow className="w-4 h-4 text-gray-400 rotate-90" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-5 py-2 border border-gray-300 text-gray-700 font-medium text-sm rounded-full hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 bg-blue-600 text-white font-medium text-sm rounded-full shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCalendarItemModal;
