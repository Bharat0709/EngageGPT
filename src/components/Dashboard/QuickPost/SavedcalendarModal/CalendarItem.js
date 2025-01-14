import React, { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const CalendarItem = ({
  index,
  data,
  onSelect,
  onDelete,
  isEditing,
  onStartEditing,
  onSaveEditing,
  onChange,
  editableData,
  selectedPostTopic,
  isSaving,
  setEditingIndex,
  setEditableData,
}) => {
  const [editDate, setEditDate] = useState(data.date);

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    setEditDate(inputDate);
    onChange('date', inputDate);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditableData({});
  };

  return (
    <div
      onClick={() => onSelect(data)}
      className={`flex cursor-pointer lg:flex-row flex-col gap-2 justify-between bg-gray-50 p-4 rounded-lg transition ${
        selectedPostTopic?.topic === data.topic ? 'border border-black' : ''
      }`}
    >
      {isEditing ? (
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            required
            value={editableData.topic || ''}
            onChange={(e) => onChange('topic', e.target.value)}
            className="p-2 text-sm border rounded-lg"
            placeholder="Edit topic"
          />
          <div className=" flex lg:flex-row flex-col  w-full gap-3">
            <input
              type="text"
              required
              value={editDate}
              onChange={handleDateChange}
              className="p-2 lg:w-1/3 text-sm border rounded-lg"
              placeholder="DD-MM-YYYY"
            />
            <input
              required
              type="text"
              value={editableData.time || ''}
              onChange={(e) => onChange('time', e.target.value)}
              className="p-2 lg:w-1/3 text-sm border rounded-lg"
              placeholder="HH:MM AM/PM"
            />
            <select
              value={editableData.status || ''}
              onChange={(e) => onChange('status', e.target.value)}
              className="p-2 lg:w-1/3 text-sm border rounded-lg"
            >
              <option value="Planned">Planned</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Posted">Posted</option>
            </select>
          </div>

          <div className="flex flex-end justify-end gap-3">
            <button
              className="global-button-secondary text-sm"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="global-button-primary text-sm"
              onClick={() => onSaveEditing(index)}
            >
              {isSaving ? 'Saving..' : 'Save Changes'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <div
              className={`relative w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                selectedPostTopic?.topic === data.topic
                  ? 'bg-[#0c4a6e]'
                  : 'bg-white'
              }`}
              onClick={() => onSelect(data)}
            >
              {selectedPostTopic?.topic === data.topic && (
                <FiCheck size={14} className="text-white" />
              )}
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">
              {data.topic}
            </h3>
          </div>
          <div className="flex gap-3 lg:flex-row flex-col justify-between items-center">
            <div className="flex justify-between lg:w-fit w-full items-center gap-3">
              <p className="text-xs py-1 px-2 bg-white rounded-md text-gray-600">
                {data.date} - {data.time}
              </p>
              <p
                className={`text-xs p-2 py-1 text-black rounded-md w-fit font-medium ${
                  data.status === 'Posted'
                    ? 'bg-green-600 text-white'
                    : data.status === 'Scheduled'
                    ? 'bg-blue-100'
                    : 'bg-white'
                }`}
              >
                {data.status}
              </p>
            </div>
            <div className="flex gap-3 justify-between lg:w-fit w-full items-center">
              <button
                disabled={data.status === 'Posted'}
                onClick={() => onStartEditing(index, data)}
                className={`text-gray-800 ${
                  data?.status === 'Posted'
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                } hover:text-gray-800`}
              >
                <AiOutlineEdit className="text-md" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(index);
                }}
                className="text-red-500 hover:text-red-800"
              >
                <AiOutlineDelete className="text-md" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarItem;
