import React, { useState } from 'react';
import { DatePicker, TimePicker, Space, message } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { AiOutlineDelete } from 'react-icons/ai'; // Import delete icon

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
        Date: entry.Date.format('DD-MM-YYYY'),
        Time: entry.Time.format('hh:mm A'),
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

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      {entries.map((entry, index) => (
        <div key={index} className="flex lg:flex-row flex-col gap-3 mb-4">
          <input
            type="text"
            className="p-2 text-sm lg:w-3/4 border rounded-lg"
            placeholder="Enter Title"
            value={entry.Title}
            onChange={(e) => handleInputChange(index, 'Title', e.target.value)}
          />
          <Space className="lg:w-1/2">
            <DatePicker
              className="rounded-md p-2"
              placeholder="Date"
              format="DD-MM-YYYY"
              value={entry.date}
              onChange={(date) => handleInputChange(index, 'Date', date)}
            />
            <TimePicker
              className="rounded-md p-2"
              placeholder="Time"
              format="hh:mm A"
              value={entry.time}
              onChange={(time) => handleInputChange(index, 'Time', time)}
              use12Hours
            />
          </Space>
          <button
            onClick={() => handleDeleteEntry(index)}
            className="text-red-500 hover:text-red-800"
          >
            <AiOutlineDelete size={20} />
          </button>
        </div>
      ))}
      <div className="flex lg:flex-row flex-col justify-end lg:gap-4 gap-2">
        <button
          type="button"
          className="global-button-secondary text-sm"
          onClick={addNewEntry}
        >
          Add More
        </button>
        <button
          type="button"
          className="global-button-primary text-sm"
          onClick={handleSaveEntries}
        >
          {isSavingNewEntries ? 'Saving...' : 'Save Entries'}
        </button>
      </div>
    </div>
  );
};

const AddCalendarDropdown = ({ isSavingNewEntries, onAddEntry }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 p-4 mt-3 rounded-lg">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <h3 className="text-sm">Add Calendar Entries</h3>
        {isOpen ? (
          <UpOutlined className="text-gray-600 text-md" />
        ) : (
          <DownOutlined className="text-gray-600 text-md" />
        )}
      </div>
      {isOpen && (
        <div className="mt-4">
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
