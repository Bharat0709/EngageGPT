import React from 'react';
import { Modal, Button } from 'antd';

const SavedCalendarModal = ({
  isOpen,
  onClose,
  onSave,
  calendarData,
  selectedTopic,
  onSelectTopic,
  onUpdate,
}) => {
  return (
    <Modal
      title="Content Calendar"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="update" onClick={onUpdate} type="primary">
          Update Calendar
        </Button>,
        <Button key="save" onClick={onSave} type="default">
          Save Calendar
        </Button>,
      ]}
    >
      <div>
        {calendarData.length > 0 ? (
          <div className="h-52 overflow-y-scroll scrollbar-hide ">
            <ul className="mt-2">
              {calendarData.map((data, index) => {
                const formattedDate = new Date(data.date).toLocaleDateString(
                  'en-GB',
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                  },
                );
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 rounded-lg p-2 mb-2"
                  >
                    <span className="text-sm">{data.topic}</span>
                    <span className="text-sm">
                      {formattedDate} - {data.time}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p>No calendar data available</p>
        )}
      </div>
    </Modal>
  );
};

export default SavedCalendarModal;
