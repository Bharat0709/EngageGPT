import React, { useState } from 'react';
import { Skeleton, message } from 'antd';
import CustomDropdown from '../Global/CustomDropDown';
import { CalendarOutlined } from '@ant-design/icons';
import { FaLinkedin } from 'react-icons/fa';
import ContentCalendarModal from './ContentCalendarModal';
import SavedCalendarModal from './SavedcalendarModal/SavedCalendarModal';
import { addContentCalendar } from '../../../network/Members';

const LinkedInConnection = ({
  selectedPostTopic,
  setSelectedPostTopic,
  isLoading,
  linkedInConnected,
  connectedProfiles,
  selectedProfile,
  selectedProfileName,
  setSelectedProfile,
  calendarData,
  setCalendarData,
  setPostDetails,
}) => {
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [isSavedCalendarModalVisible, setIsSavedCalendarModalVisible] =
    useState(false);
  const [isSavingNewEntries, setIsSavingNewEntries] = useState(false);

  const handleConnectLinkedIn = () => {
    const authUrl = process.env.REACT_APP_LINKEDIN_AUTH_URL;
    window.location.href = authUrl;
  };

  const handleSaveContentCalendar = async (data) => {
    try {
      if (!selectedProfile) {
        message.error('Please select a profile to save the calendar');
      }
      const savedCalendarData = await addContentCalendar(data, selectedProfile);
      message.success('Calendar saved successfully');
      setCalendarData(savedCalendarData.contentCalendar);
      setIsCalendarModalVisible(false);
    } catch (error) {
      console.log(error);
      setIsCalendarModalVisible(true);
      message.error('Error saving calendar');
    }
  };

  const handleNewCalendarEntries = async (data) => {
    setIsSavingNewEntries(true);
    try {
      if (!selectedProfile) {
        message.error('Please select a profile to save the calendar');
      }
      const savedCalendarData = await addContentCalendar(data, selectedProfile);
      message.success('Calendar saved successfully');
      setCalendarData(calendarData, ...savedCalendarData.contentCalendar);
    } catch (error) {
      console.log(error);
      message.error('Error saving calendar');
    }
    setIsSavingNewEntries(false);
  };

  const handleSelectTopic = (topic) => {
    setSelectedPostTopic(topic);
    setPostDetails({
      content: '',
      visibility: 'PUBLIC',
      media: [],
    });
  };

  return (
    <div className="mb-4">
      <div className="flex lg:flex-row flex-wrap gap-2 items-center justify-between mb-2">
        <h3 className="text-xl p-0 m-0 font-medium">Share Content</h3>
        {isLoading ? (
          <Skeleton.Button active size="default" style={{ width: '100px' }} />
        ) : (
          <div className="flex lg:flex-row flex-wrap items-center lg:gap-4 gap-2">
            <div className="flex items-end text-sm gap-4">
              {connectedProfiles?.length > 0 ? (
                <div className="my-2">
                  <CustomDropdown
                    options={connectedProfiles.map((profile) => ({
                      label: profile.name,
                      value: profile._id,
                    }))}
                    selected={selectedProfile}
                    onSelect={setSelectedProfile}
                    label="Select Profile"
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            {selectedProfile && calendarData.length === 0 && (
              <button
                onClick={() => setIsCalendarModalVisible(true)}
                className="global-button-secondary py-2 px-3 text-xs hover:border border-gray-600 bg-white border-1 text-gray-900 rounded-lg flex items-center gap-2"
              >
                <CalendarOutlined className="text-md" />
                Add Content Calendar
              </button>
            )}
            {selectedProfile && calendarData.length > 0 && (
              <button
                onClick={() => setIsSavedCalendarModalVisible(true)}
                className="global-button-secondary py-2 px-3 text-xs hover:border border-gray-600 bg-white border-1 text-gray-900 rounded-lg flex items-center gap-2"
              >
                <CalendarOutlined className="text-md" />
                View Content Calendar
              </button>
            )}
            <button
              onClick={handleConnectLinkedIn}
              disabled={linkedInConnected}
              className={`py-2 flex items-center text-xs gap-2 px-3 rounded-lg transition-all duration-300 ${
                linkedInConnected
                  ? 'global-button-primary bg-green-500 text-white border-green-600 hover:bg-green-600'
                  : selectedProfile
                  ? 'global-button-primary hover:bg-sky-950'
                  : 'global-button-primary text-white hover:bg-sky-950 transition-all'
              }`}
            >
              <FaLinkedin className="text-white " size={18} />
              {linkedInConnected
                ? 'Connected'
                : selectedProfile
                ? 'Connect another account'
                : 'Connect'}
            </button>
          </div>
        )}
      </div>
      <SavedCalendarModal
        isOpen={isSavedCalendarModalVisible}
        onClose={() => setIsSavedCalendarModalVisible(false)}
        onSave={() => setIsSavedCalendarModalVisible(false)}
        setCalendarData={setCalendarData}
        calendarData={calendarData}
        selectedPostTopic={selectedPostTopic}
        selectedProfileName={selectedProfileName}
        onSelectTopic={handleSelectTopic}
        handleAddNewCalendarEntries={handleNewCalendarEntries}
        isSavingNewEntries={isSavingNewEntries}
      />

      <ContentCalendarModal
        selectedProfileName={selectedProfileName}
        isOpen={isCalendarModalVisible}
        onClose={() => setIsCalendarModalVisible(false)}
        onSave={handleSaveContentCalendar}
      />
    </div>
  );
};

export default LinkedInConnection;
