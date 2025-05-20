import React, { useState, useEffect } from 'react';
import { DatePicker, TimePicker, Input, Select, Button, message } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { Option } = Select;

const EditCalendarItemForm = ({ item, onCancel, onSave, memberId }) => {
  const [formData, setFormData] = useState({
    topic: '',
    date: null,
    time: null,
    status: 'Planned',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      // Parse the date string into a dayjs object
      const dateObj = item.date ? dayjs(item.date, 'DD-MM-YYYY') : null;

      // Parse the time string into a dayjs object
      const timeObj = item.time ? dayjs(item.time, 'hh:mm A') : null;

      setFormData({
        topic: item.topic || '',
        date: dateObj,
        time: timeObj,
        status: item.status || 'Planned',
      });
    }
  }, [item]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Basic validation
    if (!formData.topic || !formData.date || !formData.time) {
      message.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      // Format date and time for API
      const formattedDate = formData.date.format('DD-MM-YYYY');
      const formattedTime = formData.time.format('hh:mm A');

      // Prepare data for API
      const updatedItem = {
        ...item,
        topic: formData.topic,
        date: formattedDate,
        time: formattedTime,
        status: formData.status,
      };

      // Call the onSave callback with updated data
      await onSave(updatedItem);
    } catch (error) {
      message.error('Failed to update calendar item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Topic/Title
        </label>
        <Input
          value={formData.topic}
          onChange={(e) => handleChange('topic', e.target.value)}
          placeholder="Enter content topic or title"
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <DatePicker
            value={formData.date}
            onChange={(date) => handleChange('date', date)}
            format="DD-MM-YYYY"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <TimePicker
            value={formData.time}
            onChange={(time) => handleChange('time', time)}
            format="hh:mm A"
            use12Hours
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <Select
          value={formData.status}
          onChange={(value) => handleChange('status', value)}
          className="w-full"
        >
          <Option value="Planned">Planned</Option>
          <Option value="Scheduled">Scheduled</Option>
          <Option value="Posted">Posted</Option>
        </Select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          type="primary"
          onClick={handleSave}
          loading={loading}
          className="global-button-primary"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditCalendarItemForm;
