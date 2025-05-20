import { useState } from 'react';
import { message } from 'antd';
import {
  FiCalendar,
  FiClock,
  FiPlus,
  FiTrash2,
  FiChevronUp,
  FiChevronDown,
} from 'react-icons/fi';
import dayjs from 'dayjs';

const AddCalendarEntry = ({ setIsOpen, onAddEntry, isSavingNewEntries }) => {
  const [entries, setEntries] = useState([
    { Title: '', Date: null, Time: null },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const addNewEntry = () => {
    setEntries([...entries, { Title: '', Date: null, Time: null }]);
  };

  const handleSaveEntries = () => {
    const validEntries = entries.filter(
      (entry) => entry.Title && entry.Date && entry.Time,
    );
    if (validEntries.length) {
      const formattedEntries = validEntries.map((entry) => ({
        Title: entry.Title,
        Date: dayjs(entry.Date).format('DD-MM-YYYY'),
        Time: dayjs(entry.Time).format('hh:mm A'),
      }));
      setIsOpen(false);
      onAddEntry(formattedEntries);
      setEntries([{ Title: '', Date: null, Time: null }]); // Reset form
    } else {
      message.error('Please fill out all fields before saving.');
    }
  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  // Custom date picker
  const CustomDatePicker = ({ value, onChange, index }) => {
    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiCalendar className="text-gray-500" />
        </div>
        <input
          type="date"
          className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          value={value ? dayjs(value).format('YYYY-MM-DD') : ''}
          onChange={(e) => {
            if (e.target.value) {
              onChange(index, 'Date', dayjs(e.target.value));
            }
          }}
        />
      </div>
    );
  };

  // Custom time picker
  const CustomTimePicker = ({ value, onChange, index }) => {
    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiClock className="text-gray-500" />
        </div>
        <input
          type="time"
          className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          value={value ? dayjs(value).format('HH:mm') : ''}
          onChange={(e) => {
            if (e.target.value) {
              onChange(index, 'Time', dayjs(`2023-01-01 ${e.target.value}`));
            }
          }}
        />
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Add Content Calendar Items
      </h3>

      <div className="space-y-6">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between mb-2">
              <div className="text-sm font-medium text-gray-700">
                Item #{index + 1}
              </div>
              <button
                onClick={() => handleDeleteEntry(index)}
                className="text-gray-400 hover:text-red-600 transition-colors"
                title="Delete entry"
              >
                <FiTrash2 size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content Topic/Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter topic or title for your content"
                  value={entry.Title}
                  onChange={(e) =>
                    handleInputChange(index, 'Title', e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Scheduled Date
                  </label>
                  <CustomDatePicker
                    value={entry.Date}
                    onChange={handleInputChange}
                    index={index}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Scheduled Time
                  </label>
                  <CustomTimePicker
                    value={entry.Time}
                    onChange={handleInputChange}
                    index={index}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-6 mb-2">
        <button
          type="button"
          onClick={addNewEntry}
          className="flex items-center justify-center gap-2 text-blue-600 px-4 py-2 border border-blue-300 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
        >
          <FiPlus size={16} />
          <span>Add Another Item</span>
        </button>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <button
          type="button"
          className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-5 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={handleSaveEntries}
          disabled={isSavingNewEntries}
        >
          {isSavingNewEntries ? 'Saving...' : 'Save Entries'}
        </button>
      </div>
    </div>
  );
};

const AddCalendarDropdown = ({ isSavingNewEntries, onAddEntry }) => {
  const [isOpen, setIsOpen] = useState(true); // Start expanded by default in the modal

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-lg">
      <div
        className="flex justify-between items-center cursor-pointer px-6 py-3 border-b border-gray-200"
        onClick={toggleDropdown}
      >
        <h3 className="text-lg font-medium text-gray-800">
          Content Calendar Entries
        </h3>
        <button className="p-1 rounded-full hover:bg-gray-100">
          {isOpen ? (
            <FiChevronUp className="text-gray-600" size={20} />
          ) : (
            <FiChevronDown className="text-gray-600" size={20} />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="p-2">
          <AddCalendarEntry
            setIsOpen={setIsOpen}
            isSavingNewEntries={isSavingNewEntries}
            onAddEntry={onAddEntry}
          />
        </div>
      )}
    </div>
  );
};

export default AddCalendarDropdown;
