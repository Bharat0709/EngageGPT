import React, { useState } from 'react';
import CalendarItem from './CalendarItem';
import { message } from 'antd';
import { updateContentCalendar } from '../../../../network/Members';

const CalendarGrid = ({
  filteredData,
  selectedPostTopic,
  onSelectTopic,
  onDelete,
  setCalendarData,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const startEditing = (index, data) => {
    setEditingIndex(index);
    setEditableData({ ...data });
  };

  const saveEditing = async (index) => {
    try {
      const updatedData = [...filteredData];
      updatedData[index] = { ...editableData };
      const dataToUpdate = updatedData[index];
      if (
        dataToUpdate.topic === '' ||
        dataToUpdate.date === '' ||
        dataToUpdate.time === ''
      ) {
        message.error('Please fill in all fields');
        return;
      }

      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(am|pm|AM|PM)$/;
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
      const date = dataToUpdate.date;
      if (!dateRegex.test(date)) {
        message.error('Invalid Date Format');
        return;
      }
      if (!timeRegex.test(dataToUpdate.time)) {
        message.error('Invalid Time Format');
        return;
      }

      setIsSaving(true);

      await updateContentCalendar(
        dataToUpdate._id,
        dataToUpdate.memberId,
        dataToUpdate,
      );
      setIsSaving(false);
      setCalendarData(updatedData);
      setEditingIndex(null);
      setEditableData({});
    } catch (error) {
      setIsSaving(false);
      // Handle the error appropriately, e.g., display an error message to the user
      console.error('Error updating calendar entry:', error);
      message.error('Failed to update calendar entry. Please try again.');
    }
  };

  const handleChange = (field, value) => {
    setEditableData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 h-80 gap-2 overflow-y-scroll scrollbar-hide">
      {filteredData.map((data, index) => (
        <CalendarItem
          key={index}
          index={index}
          data={data}
          onSelect={onSelectTopic}
          onDelete={onDelete}
          isEditing={editingIndex === index}
          onStartEditing={startEditing}
          onSaveEditing={saveEditing}
          onChange={handleChange}
          editableData={editableData}
          selectedPostTopic={selectedPostTopic}
          isSaving={isSaving}
          setEditingIndex={setEditingIndex}
          setEditableData={setEditableData}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
