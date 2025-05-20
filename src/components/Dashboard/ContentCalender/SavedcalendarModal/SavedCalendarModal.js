import React, { useState } from 'react';
import { deleteContentCalendar } from '../../../../network/Members';
import SearchBar from './SearchBar';
import CalendarGrid from './CalendarGrid';
import ConfirmationModal from './ConfirmationModal';
import AddCalendarDropdown from './AddCalendarEntry';
import { message } from 'antd';

const SavedCalendarModal = ({
  isOpen,
  onClose,
  onSave,
  setCalendarData,
  calendarData,
  selectedPostTopic,
  selectedProfileName,
  onSelectTopic,
  handleAddNewCalendarEntries,
  isSavingNewEntries,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleSave = async () => {
    await onSave();
  };

  const handleDeleteConfirmation = (index) => {
    setShowDeleteConfirmation(true);
    setItemToDelete(index);
  };

  const confirmDelete = async () => {
    try {
      if (itemToDelete !== null) {
        await deleteContentCalendar(calendarData[itemToDelete]);
        const newData = calendarData.filter((_, i) => i !== itemToDelete);
        setCalendarData(newData);
        message.success('Content deleted successfully!');
        setItemToDelete(null);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setShowDeleteConfirmation(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  const handleAddEntries = (newEntries) => {
    handleAddNewCalendarEntries(newEntries);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 w-full overflow-y-scroll z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white flex flex-col lg:w-3/4 w-11/12 p-6 rounded-xl shadow-lg">
            <button
              className="text-gray-500 text-xl self-end hover:text-gray-800"
              onClick={onClose}
            >
              ✕
            </button>
            <div className="flex flex-col gap-4 justify-center items-center pb-2 mb-4">
              <h2 className="text-xl text-center font-semibold">
                Content Calendar{' '}
                {selectedProfileName && <span> of {selectedProfileName}</span>}
              </h2>
            </div>

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <CalendarGrid
              filteredData={calendarData.filter((data) =>
                data.topic.toLowerCase().includes(searchTerm.toLowerCase()),
              )}
              selectedPostTopic={selectedPostTopic}
              onSelectTopic={onSelectTopic}
              onDelete={handleDeleteConfirmation}
              setCalendarData={setCalendarData}
            />
            <AddCalendarDropdown
              isSavingNewEntries={isSavingNewEntries}
              onAddEntry={handleAddEntries}
            />

            <div className="flex justify-end gap-4 mt-4 sticky bottom-0 bg-white pt-4">
              <button
                type="button"
                onClick={handleSave}
                className="global-button-primary"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmationModal
        show={showDeleteConfirmation}
        title="Are you sure you want to delete this Calendar Item ?"
        message="This action cannot be undone."
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default SavedCalendarModal;
