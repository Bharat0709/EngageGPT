import React, { useState, useEffect } from 'react';
import { Skeleton, message } from 'antd';
import CustomDropdown from '../Global/CustomDropDown';
import { CalendarOutlined } from '@ant-design/icons';
import { FaLinkedin } from 'react-icons/fa';
import ContentCalendarModal from './ContentCalendarModal';
import {
  addContentCalender,
  getContentCalender,
} from '../../../network/Members';
import SavedCalendarModal from './SavedCalenderModal';

const LinkedInConnection = ({
  isLoading,
  linkedInConnected,
  connectedProfiles,
  selectedProfile,
  setSelectedProfile,
}) => {
  const [calendarData, setCalendarData] = useState([]);
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [isSavedCalendarModalVisible, setIsSavedCalendarModalVisible] =
    useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    if (selectedProfile) {
      const fetchCalendarData = async () => {
        try {
          const response = await getContentCalender(selectedProfile);
          if (response) {
            setCalendarData(response.contentCalendar);
          } else {
            setCalendarData([]);
          }
        } catch (error) {
          console.error('Error fetching content calendar:', error);
          message.error('Failed to fetch content calendar data.');
        }
      };

      fetchCalendarData();
    }
  }, [selectedProfile]);

  const handleConnectLinkedIn = () => {
    const authUrl = process.env.REACT_APP_LINKEDIN_AUTH_URL;
    window.location.href = authUrl;
  };

  const handleSaveCalendar = async (data) => {
    try {
      if (!selectedProfile) {
        message.error('Please select a profile to save the calendar');
        return;
      }
      await addContentCalender(data, selectedProfile);
      message.success('Content calendar saved!');
      setIsCalendarModalVisible(false);
    } catch (error) {
      console.error('Error saving content calendar:', error);
      message.error('Failed to save the content calendar. Please try again.');
    }
  };

  const handleUpdateCalendar = async () => {
    try {
      if (!selectedTopic) {
        message.error('Please select a topic to update.');
        return;
      }
      message.success('Content calendar updated!');
    } catch (error) {
      console.error('Error updating content calendar:', error);
      message.error('Failed to update the content calendar. Please try again.');
    }
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
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
        onClose={() => setIsCalendarModalVisible(false)}
        onSave={handleSaveCalendar}
        calendarData={calendarData}
        selectedTopic={selectedTopic}
        onSelectTopic={handleSelectTopic}
        onUpdate={handleUpdateCalendar}
      />

      <ContentCalendarModal
        isOpen={isCalendarModalVisible}
        onClose={() => setIsCalendarModalVisible(false)}
        onSave={handleSaveCalendar}
      />
    </div>
  );
};

export default LinkedInConnection;
