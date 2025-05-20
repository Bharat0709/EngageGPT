import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  getContentCalendar,
  deleteContentCalendar,
  updateContentCalendar,
  addContentCalendar,
} from '../../../network/Members';
import { FaRegCalendarAlt, FaLinkedin } from 'react-icons/fa';
import { FiList, FiChevronDown, FiAlertTriangle } from 'react-icons/fi';
import { getAllMembers } from '../../../network/Members';
import ContentCalendarModal from './ContentCalendarModal';
import AddCalendarDropdown from './SavedcalendarModal/AddCalendarEntry';
import ConfirmationModal from './SavedcalendarModal/ConfirmationModal';
import CalendarGrid from './SavedcalendarModal/CalendarGrid';
import ListView from './SavedcalendarModal/ListView';
import EditCalendarItemForm from './EditCalendarItemForm';

const ContentCalendarPage = () => {
  const navigate = useNavigate();
  const [calendarData, setCalendarData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [isAddEntryVisible, setIsAddEntryVisible] = useState(false);
  const [isSavingNewEntries, setIsSavingNewEntries] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectedProfiles, setConnectedProfiles] = useState([]);
  const [selectedProfileName, setSelectedProfileName] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContentItem, setSelectedContentItem] = useState(null);

  // Load profiles and calendar data
  useEffect(() => {
    const fetchAndSetUserData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMembers();
        const connected = data.filter((member) => member.isLinkedinConnected);
        setConnectedProfiles(connected);
        if (connected.length > 0) {
          setSelectedProfile(connected[0]._id);
          setSelectedProfileName(connected[0].name);
        }
      } catch (err) {
        message.error('Failed to load user data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetUserData();
  }, []);

  // Load calendar data when profile changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (selectedProfile) {
      const fetchCalendarData = async () => {
        setIsLoading(true);
        try {
          const profileData = connectedProfiles.find(
            (profile) => profile._id === selectedProfile,
          );
          setSelectedProfileName(profileData?.name || '');

          const response = await getContentCalendar(selectedProfile);
          if (
            response &&
            response.contentCalendar &&
            response.contentCalendar.length > 0
          ) {
            setCalendarData(response.contentCalendar);
            applyFilters(response.contentCalendar, statusFilter);
          } else {
            setCalendarData([]);
            setFilteredData([]);
          }
        } catch (error) {
          message.error('Failed to load calendar data');
        } finally {
          setIsLoading(false);
        }
      };

      fetchCalendarData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProfile]);

  const applyFilters = (data, status) => {
    let filtered = [...data];

    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter((item) => item.status === status);
    }

    setFilteredData(filtered);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    applyFilters(calendarData, status);
  };

  const handleProfileChange = (profileId) => {
    setSelectedProfile(profileId);
  };

  const handleConnectLinkedIn = () => {
    const authUrl = process.env.REACT_APP_LINKEDIN_AUTH_URL;
    window.location.href = authUrl;
  };

  const handleSaveContentCalendar = async (data) => {
    try {
      if (!selectedProfile) {
        message.error('Please select a profile to save the calendar');
        return;
      }
      setIsLoading(true);
      const savedCalendarData = await addContentCalendar(data, selectedProfile);
      message.success('Calendar saved successfully');
      setCalendarData(savedCalendarData.contentCalendar);
      applyFilters(savedCalendarData.contentCalendar, statusFilter);
      setIsCalendarModalVisible(false);
    } catch (error) {
      message.error('Error saving calendar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewCalendarEntries = async (data) => {
    setIsSavingNewEntries(true);
    try {
      if (!selectedProfile) {
        message.error('Please select a profile to save the calendar');
        return;
      }
      const savedCalendarData = await addContentCalendar(data, selectedProfile);
      message.success('Calendar items added successfully');
      setCalendarData(savedCalendarData.contentCalendar);
      applyFilters(savedCalendarData.contentCalendar, statusFilter);
      setIsAddEntryVisible(false);
    } catch (error) {
      message.error('Error saving calendar entries');
    } finally {
      setIsSavingNewEntries(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleSaveEditedItem = async (updatedItem) => {
    try {
      // API call to update the item
      await updateContentCalendar(
        updatedItem._id,
        selectedProfile,
        updatedItem,
      );

      // Update local state
      const updatedData = calendarData.map((item) =>
        item._id === updatedItem._id ? updatedItem : item,
      );

      setCalendarData(updatedData);
      applyFilters(updatedData, statusFilter);

      // If the edited item was selected, update the selection
      if (selectedContentItem && selectedContentItem._id === updatedItem._id) {
        setSelectedContentItem(updatedItem);
      }

      // Close the edit modal
      setEditingItem(null);

      message.success('Calendar item updated successfully');
    } catch (error) {
      message.error('Failed to update calendar item');
    }
  };

  const handleDeleteConfirmation = (item) => {
    setShowDeleteConfirmation(true);
    setItemToDelete(item);
  };

  const confirmDelete = async () => {
    try {
      if (itemToDelete) {
        await deleteContentCalendar(itemToDelete);
        const newData = calendarData.filter(
          (item) => item._id !== itemToDelete._id,
        );
        setCalendarData(newData);
        applyFilters(newData, statusFilter);

        // If the deleted item was selected, clear the selection
        if (
          selectedContentItem &&
          selectedContentItem._id === itemToDelete._id
        ) {
          setSelectedContentItem(null);
        }

        message.success('Content deleted successfully!');
      }
    } catch (error) {
      message.error(error.message || 'Error deleting item');
    } finally {
      setShowDeleteConfirmation(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  const handleSelectContentItem = (item) => {
    setSelectedContentItem(item);
  };

  const handleUseForPost = () => {
    if (!selectedContentItem) {
      message.warning('Please select a content item first');
      return;
    }

    // Navigate to Quick Post with the selected content
    navigate('/dashboard/quick-post', {
      state: {
        postContents: selectedContentItem,
        content: `Today's topic: ${selectedContentItem.topic}\n\n`, // Pre-populate with topic
      },
    });
  };

  // No connected profiles state
  const renderNoProfilesState = () => {
    return (
      <div className="bg-white rounded-xl h-[80vh] shadow-sm p-8 mb-6 text-center">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <FiAlertTriangle size={36} className="text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No LinkedIn Profiles Connected
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Connect your LinkedIn profile to manage your content calendar and
            schedule posts.
          </p>
          <button
            onClick={handleConnectLinkedIn}
            className="btn-primary flex items-center gap-2 whitespace-nowrap px-6 py-2 text-sm font-medium bg-white border border-black text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            <FaLinkedin size={20} />
            Connect LinkedIn Profile
          </button>
        </div>
      </div>
    );
  };

  // Empty calendar state
  const renderEmptyCalendarState = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 mb-6 text-center">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
            <FaRegCalendarAlt size={36} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Your Content Calendar is Empty
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Start by adding content ideas to your calendar. You can import from
            a template or add them individually.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setIsCalendarModalVisible(true)}
              className="btn-primary flex items-center gap-2 whitespace-nowrap px-6 py-2 text-sm font-medium bg-white border border-black text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              <PlusOutlined />
              Import From Template
            </button>
            <button
              onClick={() => setIsAddEntryVisible(true)}
              className="bg-[#004182] text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] border border-black rounded-none px-6 py-2 text-sm font-medium flex items-center gap-2"
            >
              <PlusOutlined />
              Add Content
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Content Calendar
        </h1>

        {connectedProfiles?.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {!isLoading && (
              <select
                className="border rounded-lg p-2 text-sm"
                value={selectedProfile || ''}
                onChange={(e) => handleProfileChange(e.target.value)}
              >
                {connectedProfiles.map((profile) => (
                  <option key={profile._id} value={profile._id}>
                    {profile.name}
                  </option>
                ))}
              </select>
            )}

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCalendarModalVisible(true)}
              className="global-button-primary"
              disabled={!selectedProfile}
            >
              Import From Template
            </Button>

            <Button
              type="default"
              icon={<PlusOutlined />}
              onClick={() => setIsAddEntryVisible(true)}
              className="global-button-secondary"
              disabled={!selectedProfile}
            >
              Add Content
            </Button>

            {selectedContentItem && (
              <Button
                type="primary"
                onClick={handleUseForPost}
                className="bg-green-600 rounded-full hover:bg-green-700 text-white border-green-600"
              >
                Use For Post
              </Button>
            )}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading calendar data...</p>
          </div>
        </div>
      ) : connectedProfiles.length === 0 ? (
        renderNoProfilesState()
      ) : calendarData.length === 0 ? (
        renderEmptyCalendarState()
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div className="flex gap-4">
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                  viewMode === 'calendar'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaRegCalendarAlt size={14} />
                <span>Calendar</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiList size={14} />
                <span>List</span>
              </button>
            </div>

            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Status:</span>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusFilterChange(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="Planned">Planned</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Posted">Posted</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <FiChevronDown className="text-gray-500" size={14} />
                </div>
              </div>
            </div>
          </div>

          {viewMode === 'calendar' ? (
            <CalendarGrid
              calendarData={filteredData}
              selectedContentItem={selectedContentItem}
              onSelectItem={handleSelectContentItem}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteConfirmation}
            />
          ) : (
            <ListView
              calendarData={filteredData}
              selectedContentItem={selectedContentItem}
              onSelectItem={handleSelectContentItem}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteConfirmation}
            />
          )}
        </div>
      )}

      {/* Calendar Upload Modal */}
      <ContentCalendarModal
        selectedProfileDetails={connectedProfiles.find(
          (profile) => profile._id === selectedProfile,
        )}
        selectedProfileName={selectedProfileName}
        isOpen={isCalendarModalVisible}
        onClose={() => setIsCalendarModalVisible(false)}
        onSave={handleSaveContentCalendar}
      />
      {/* Add Calendar Entry Modal */}
      <Modal
        title="Add Content Ideas"
        open={isAddEntryVisible}
        onCancel={() => setIsAddEntryVisible(false)}
        footer={null}
        width={700}
      >
        <AddCalendarDropdown
          isSavingNewEntries={isSavingNewEntries}
          onAddEntry={handleAddNewCalendarEntries}
        />
      </Modal>
      {/* Edit Entry Modal */}
      <Modal
        title="Edit Content Item"
        open={!!editingItem}
        onCancel={() => setEditingItem(null)}
        footer={null}
        width={600}
      >
        {editingItem && (
          <EditCalendarItemForm
            item={editingItem}
            onCancel={() => setEditingItem(null)}
            onSave={handleSaveEditedItem}
            memberId={selectedProfile}
          />
        )}
      </Modal>
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        show={showDeleteConfirmation}
        title="Are you sure you want to delete this calendar item?"
        message="This action cannot be undone."
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ContentCalendarPage;
