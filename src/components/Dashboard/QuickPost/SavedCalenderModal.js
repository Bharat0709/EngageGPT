import React, { useState } from 'react';

const SavedCalendarModal = ({
  isOpen,
  onClose,
  onSave,
  calendarData,
  selectedPostTopic,
  onSelectTopic,
  onUpdate,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdate = async () => {
    setIsUpdating(true);
    await onUpdate();
    setIsUpdating(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  const filteredData = calendarData.filter((data) =>
    data.topic.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  

  return (
    isOpen && (
      <div className="fixed inset-0 w-full z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white flex flex-col lg:w-3/4 w-11/12 p-6 rounded-xl shadow-lg">
          {/* Header */}
          <button
            className="text-gray-500 text-xl self-end hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
          <div className="flex flex-col gap-4 justify-center items-center pb-2 mb-4">
            <h2 className="text-xl text-center font-semibold">
              Content Calendar
            </h2>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
            />
          </div>

          <div>
            {filteredData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 h-80 gap-4 overflow-y-scroll scrollbar-hide">
                {filteredData.map((data, index) => {
                  const formattedDate = new Date(data.date).toLocaleDateString(
                    'en-GB',
                    {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    },
                  );
                  return (
                    <div
                      onClick={() => onSelectTopic(data)}
                      key={index}
                      className={`flex gap-4 cursor-pointer justify-between bg-gray-100 p-4 rounded-lg transition ${
                        selectedPostTopic?.topic === data.topic
                          ? 'border border-black'
                          : ''
                      }`}
                    >
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {data.topic}
                      </h3>
                      <div className="flex gap-2 justify-between items-center">
                        <div className="flex items-center gap-3">
                          <p className="text-sm py-1 px-2 bg-white rounded-md text-gray-600">
                            {formattedDate} - {data.time}
                          </p>
                          {/* Display status */}
                          <p
                            className={`text-xs p-2 py-1  text-white rounded-md w-fit font-medium ${
                              data.status === 'Posted'
                                ? 'bg-green-500'
                                : data.status === 'Scheduled'
                                ? 'bg-blue-500'
                                : 'bg-gray-500'
                            }`}
                          >
                            {data.status}
                          </p>
                        </div>
                        {data.status === 'Planned' && (
                          <div
                            className={`relative w-5 h-5 flex items-center justify-center border-2 rounded-lg cursor-pointer ${
                              selectedPostTopic?.topic === data.topic
                                ? 'bg-[#0c4a6e] border-[#0c4a6e'
                                : 'bg-white border-gray-300'
                            }`}
                            onClick={() => onSelectTopic(data)}
                          >
                            {selectedPostTopic?.topic === data.topic && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.793-6.793a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No matching topics found.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4 sticky bottom-0 bg-white pt-4">
            <button
              type="button"
              onClick={handleUpdate}
              disabled={isUpdating}
              className="global-button-secondary"
            >
              {isUpdating ? 'Updating...' : 'Update Calendar'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="global-button-primary"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SavedCalendarModal;
