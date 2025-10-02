import { useState } from 'react';
import { Modal, message } from 'antd';
import { FiPlus, FiTrash2, FiCalendar, FiClock, FiType } from 'react-icons/fi';
import dayjs from 'dayjs';
import DateTimeSelector from '@components/Common/DateTImePicker';

const AddCalendarEntryModal = ({
  isVisible,
  onClose,
  onAddEntry,
  isSavingNewEntries,
}) => {
  const [entries, setEntries] = useState([{ Title: '', DateTime: null }]);

  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const addNewEntry = () => {
    setEntries([...entries, { Title: '', DateTime: null }]);
  };

  const handleSaveEntries = () => {
    const validEntries = entries.filter(
      (entry) => entry.Title && entry.Date && entry.Time,
    );

    if (validEntries.length === 0) {
      message.error('Please fill out all fields before saving.');
      return;
    }

    const formattedEntries = validEntries.map((entry) => ({
      Title: entry.Title,
      Date: dayjs(entry.Date).format('DD-MM-YYYY'),
      Time: dayjs(entry.Time).format('hh:mm A'),
    }));

    onAddEntry(formattedEntries);
    setEntries([{ Title: '', Date: null, Time: null }]); // Reset form
  };

  const handleDeleteEntry = (index) => {
    if (entries.length > 1) {
      const updatedEntries = entries.filter((_, i) => i !== index);
      setEntries(updatedEntries);
    }
  };

  const handleCancel = () => {
    setEntries([{ Title: '', DateTime: null }]);
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3 pb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <FiCalendar className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Add Content Ideas
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Schedule your content topics with dates and times
            </p>
          </div>
        </div>
      }
      open={isVisible}
      onCancel={handleCancel}
      width={800}
      centered
      footer={null}
      className="add-calendar-modal"
      styles={{
        header: {
          borderBottom: '1px solid #f0f0f0',
          paddingBottom: '16px',
          marginBottom: '24px',
        },
        body: {
          padding: '0 24px 24px 24px',
        },
      }}
    >
      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
        {entries.map((entry, index) => (
          <div key={index} className="relative group">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
              {/* Header with item number and delete button */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Content Item #{index + 1}
                  </span>
                </div>

                {entries.length > 1 && (
                  <button
                    onClick={() => handleDeleteEntry(index)}
                    className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 flex items-center justify-center"
                    title="Delete entry"
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>

              {/* Content Topic Input */}
              <div className="mb-5">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FiType size={16} className="text-gray-500" />
                  Content Topic
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-400"
                  placeholder="Enter your content topic or idea..."
                  value={entry.Title}
                  onChange={(e) =>
                    handleInputChange(index, 'Title', e.target.value)
                  }
                />
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FiCalendar size={16} className="text-gray-500" />
                    Scheduled Date & Time
                  </label>
                  <DateTimeSelector
                    value={entry.DateTime}
                    onChange={(dateTime) =>
                      handleInputChange(index, 'DateTime', dateTime)
                    }
                    placeholder="Select date and time"
                    showTime={true}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Another Item Button */}
      <div className="flex justify-center mt-6 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={addNewEntry}
          className="flex items-center gap-2 px-6 py-3 text-blue-600 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 font-medium"
        >
          <FiPlus size={18} />
          <span>Add Another Item</span>
        </button>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          className="px-6 py-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 font-medium"
          onClick={handleCancel}
          disabled={isSavingNewEntries}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSaveEntries}
          disabled={isSavingNewEntries}
        >
          {isSavingNewEntries ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <FiCalendar size={16} />
              <span>Save {entries.length > 1 ? 'Entries' : 'Entry'}</span>
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        .add-calendar-modal .ant-modal-content {
          border-radius: 20px;
          overflow: hidden;
        }

        .add-calendar-modal .ant-modal-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }

        .add-calendar-modal .ant-picker {
          border-radius: 12px;
        }

        .add-calendar-modal .ant-picker:hover {
          border-color: #9ca3af;
        }

        .add-calendar-modal .ant-picker-focused {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </Modal>
  );
};

export default AddCalendarEntryModal;
