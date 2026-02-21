import { useState, useEffect } from 'react';
import { Icons } from '@utils/constantData/icons';
import { goTo } from '@utils/navigator';
import { BiUnlink } from 'react-icons/bi';
import { Skeleton } from 'antd';
import Button from '@components/Common/Button';
import AddPeopleModal from '../Global/AddPeopleModal';
import DisconnectConfirmationModal from './DisconnectModal';
import {
  getAllMembers,
  addNewMember,
  resetMemberCredits,
  disconnectGmailAccount,
} from '@services/Members';

import axios from 'axios';
import ResetCreditsModal from './ResetCreditsModal';
import 'antd/dist/reset.css';
import { useNotifications } from '@components/Common/Notification';
import { disconnectLinkedIn } from '@services/LinkedIn';

export const People = () => {
  const [people, setPeople] = useState([]);
  const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disconnectModalVisible, setDisconnectModalVisible] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [resetCreditsModalVisible, setResetCreditsModalVisible] =
    useState(false);
  const [selectedPersonForReset, setSelectedPersonForReset] = useState(null);
  const [isResetting, setIsResetting] = useState(false);
  const [refreshPeoplePage, setRefreshPeoplePage] = useState(false);
  const [disconnectAccountType, setDisconnectAccountType] =
    useState('LinkedIn');
  const message = useNotifications();

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const members = await getAllMembers();
        if (members.length > 0) {
          setPeople(members);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        message.error(error.message);
      }
    };
    fetchMembers();
  }, [refreshPeoplePage]);

  const handleAddPerson = async (newPerson) => {
    try {
      for (const person of newPerson) {
        const addMember = await addNewMember(person);
        if (addMember) {
          setPeople([...people, addMember]);
        }
      }
      message.success('Invite sent successfully!');
      setIsAddPeopleModalOpen(false);
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleGmailConnect = async (person) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_GOOGLE_GMAIL_CONNECT_URL,
        { params: { userId: person._id } },
      );
      const { url } = response.data;
      if (url) {
        window.location.href = url;
      } else {
        console.error('No OAuth URL received from backend');
      }
    } catch (error) {
      console.error(
        'Gmail connect error:',
        error?.response?.data || error.message,
      );
      alert('Failed to connect Gmail. Please try again.');
    }
  };

  const handleDisconnectLinkedIn = (personId) => {
    setSelectedPersonId(personId);
    setDisconnectAccountType('LinkedIn');
    setDisconnectModalVisible(true);
  };

  // Open modal for Gmail
  const handleDisconnectGmailModal = (personId) => {
    setSelectedPersonId(personId);
    setDisconnectAccountType('Gmail');
    setDisconnectModalVisible(true);
  };

  const handleConfirmDisconnect = async (memberId) => {
    if (disconnectAccountType === 'LinkedIn') {
      await disconnectLinkedIn(memberId);
    } else if (disconnectAccountType === 'Gmail') {
      await disconnectGmailAccount(memberId);
    }
    setRefreshPeoplePage((prev) => !prev);
  };

  const handleResetCredits = (person) => {
    setSelectedPersonForReset(person);
    setResetCreditsModalVisible(true);
  };

  const handleConfirmResetCredits = async () => {
    if (!selectedPersonForReset) return;

    setIsResetting(true);
    try {
      const response = await resetMemberCredits(selectedPersonForReset._id);

      // Refresh the people list
      setRefreshPeoplePage((prev) => !prev);

      // Close modal
      setResetCreditsModalVisible(false);
      setSelectedPersonForReset(null);
    } catch (error) {
      message.error(error.message);
      // Handle error (you can show error toast here)
    } finally {
      setIsResetting(false);
    }
  };

  const handleConnectLinkedIn = () => {
    const authUrl = `${process.env.REACT_APP_LINKEDIN_AUTH_URL}`;
    window.location.href = authUrl;
  };

  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    message.success('Connection token copied!');
  };

  const handleNavigateToSettings = (memberId) => {
    goTo(`/dashboard/member-settings/${memberId}`);
  };

  const filterPeople = (filter) => {
    switch (filter) {
      case 'All':
        return people;
      case 'Profiles':
        return people.filter((p) => p.role === 'profile');
      case 'Invites':
        return people.filter((p) => p.isConnected === 'invited');
      case 'Disconnected':
        return people.filter((p) => p.isConnected === 'disconnected');
      default:
        return people;
    }
  };

  const filteredPeople = filterPeople(selectedFilter);

  return (
    <div>
      <div className="h-full  flex justify-between items-center ">
        <h1 className="text-xl ovo-regular text-semibold text-gray-800">
          People
        </h1>

        <div className="actions flex items-center gap-4">
          <button
            type="primary"
            onClick={() => setIsAddPeopleModalOpen(true)}
            className="global-button-primary rounded-full text-sm flex items-center gap-1 py-2 px-4"
          >
            <Icons.Plus size={14} />
            Add Profile
          </button>
        </div>
      </div>

      {/* Toggle Section */}
      <div className="toggles geist  bg-gray-50 pt-3 lg:flex hidden rounded-xl  justify-between items-center mb-2">
        {isLoading ? (
          <div className="flex items-center gap-4">
            <Skeleton.Input
              active
              style={{ width: 20, height: 12, marginTop: 3 }}
            />
            <Skeleton.Input
              active
              style={{ width: 20, height: 12, marginTop: 3 }}
            />
            <Skeleton.Input
              active
              style={{ width: 20, height: 12, marginTop: 3 }}
            />
            <Skeleton.Input
              active
              style={{ width: 20, height: 12, marginTop: 3 }}
            />
          </div>
        ) : (
          <>
            <div className="toggle-buttons text-sm mb-4 geist bg-gray-50 flex gap-4">
              {['All', 'Profiles', 'Invites', 'Disconnected'].map((filter) => (
                <p
                  key={filter}
                  className={`text-md p-0 m-0 cursor-pointer ${
                    selectedFilter === filter
                      ? 'text-blue-600  pb-3 border-b border-blue-600  !font-semibold geist '
                      : 'text-gray-500'
                  }`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </p>
              ))}
            </div>
            <div className="connected-info text-sm mr-2 text-black">
              Total Users: {filteredPeople.length}
            </div>
          </>
        )}
      </div>

      {/* People List */}
      <div className="people-list flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="person-card w-full bg-white p-4 rounded-xl flex justify-between items-center"
            >
              <Skeleton.Avatar active size="large" />
              <div className="flex-grow items-center mt-1 gap-4">
                <Skeleton.Input
                  active
                  style={{
                    width: 120,
                    height: 10,
                    marginLeft: 12,
                    marginTop: 3,
                  }}
                />
                <Skeleton.Input
                  active
                  style={{
                    width: 100,
                    height: 10,
                    marginLeft: 12,
                    marginTop: 3,
                  }}
                />
              </div>
            </div>
          ))
        ) : filteredPeople.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Icons.Plus size={48} className="text-gray-300 mb-4" />
            <p className="text-lg text-gray-600 mb-4">No Data Found.</p>
          </div>
        ) : (
          filteredPeople.map((person) => (
            <div
              key={person?._id}
              className="person-card w-full bg-white p-4 gap-4 rounded-xl lg:flex-row flex-col flex-wrap flex justify-between items-center"
            >
              <div className="flex lg:w-fit w-full lg:flex-row flex-col gap-4 items-center">
                <div className="flex lg:w-fit w-full items-center gap-3 justify-start">
                  <img
                    src={
                      person?.profilePicture ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        person?.name || 'User',
                      )}&background=6366f1&color=fff&size=40`
                    }
                    alt={`${person?.name}'s profile`}
                    className="w-12 h-12 rounded-full border border-gray-300"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        person?.name || 'User',
                      )}&background=6366f1&color=fff&size=40`;
                    }}
                  />
                  <div className="flex flex-col items-start lg:gap-1 gap-1">
                    <h3 className="text-md p-0 m-0 font-semibold text-gray-800">
                      {person?.name}
                    </h3>
                    <p className="text-sm rounded-lg p-0 m-0 text-gray-600">
                      {person?.email}
                    </p>
                  </div>
                </div>{' '}
                <div className="flex items-center lg:flex-row flex-wrap gap-2 lg:w-max w-full">
                  <p className="text-xs font-semibold rounded-lg bg-blue-50 p-1 px-3 m-0 text-gray-600">
                    {person?.totalCreditsUsed} credits used
                  </p>{' '}
                  <p
                    className={`${
                      person.creditsUsedToday === person.creditLimitperDay
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 text-black'
                    } text-xs font-semibold rounded-lg bg-orange-100 p-1 px-3 m-0 text-gray-600`}
                  >
                    {person?.creditsUsedToday}/{person.creditLimitperDay}{' '}
                    credits used today
                  </p>{' '}
                  {person.creditsUsedToday !== 0 && (
                    <Button
                      theme="dark"
                      buttonText={'Reset Credits Used'}
                      className="text-xs !p-1 !rounded-lg !px-3"
                      onClick={() => handleResetCredits(person)}
                    />
                  )}
                  <p className="text-xs font-semibold rounded-lg bg-purple-100 p-1 px-3 m-0 text-gray-600">
                    {person?.daysActive} days active
                  </p>
                  <p className="text-xs font-semibold rounded-lg bg-slate-50  p-1 px-3 m-0 text-gray-600">
                    {person?.timeZone || 'Asia/Kolkata'}
                  </p>
                  <div className="flex w-max rounded-full text-green-600 items-center">
                    <p
                      className={`text-sm ml-2 p-0 m-0 font-medium ${
                        person.isConnected === 'connected'
                          ? 'text-green-700'
                          : 'text-red-600'
                      }`}
                    >
                      •{' '}
                      {person.isConnected === 'connected'
                        ? 'Analytics Connected'
                        : person.isConnected === 'invited'
                          ? 'Invited'
                          : 'Disconnected'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 lg:w-fit w-full justify-start lg:mt-0 mt-2 items-center">
                <div className="copy-token text-xs rounded-lg flex items-center">
                  <Button
                    buttonText={'Copy connection token'}
                    className="text-black border-none !bg-slate-50  !rounded-lg hover:text-black text-sm"
                    icon={<Icons.Copy />}
                    onClick={() => handleCopy(person.connectionToken)}
                  />
                </div>
                {person?.isLinkedinConnected ? (
                  <button
                    title="Disconnect Linkedin"
                    onClick={() => handleDisconnectLinkedIn(person._id)}
                    className="rounded-lg border-none !bg-slate-50  text-black p-2 px-4 bg-white flex items-center gap-2 text-sm"
                  >
                    <BiUnlink size={16} />
                    Disconnect LinkedIn
                  </button>
                ) : (
                  <button
                    onClick={handleConnectLinkedIn}
                    disabled={false}
                    className="rounded-lg border-none !bg-slate-50  text-black bg-white p-2 px-4 flex items-center gap-2 text-sm"
                  >
                    <Icons.LinkedIn className="text-sky-800" size={18} />
                    Connect
                  </button>
                )}

                {person?.gmailTokens ? (
                  <button
                    title="Disconnect Gmail"
                    onClick={() => handleDisconnectGmailModal(person._id)}
                    className="rounded-lg border-none !bg-gray-100 text-black p-2 px-4 bg-white flex items-center gap-2 text-sm"
                  >
                    <BiUnlink size={16} />
                    Disconnect Gmail
                  </button>
                ) : (
                  <button
                    onClick={() => handleGmailConnect(person)}
                    className="rounded-lg border-none !bg-slate-50  text-black bg-white p-2 px-4 flex items-center gap-2 text-sm"
                  >
                    <Icons.Google size={18} />
                    Connect Gmail
                  </button>
                )}
                <button
                  onClick={() => handleNavigateToSettings(person._id)}
                  className="rounded-lg text-black border-none !bg-slate-50    p-2 px-4 flex items-center gap-2 text-sm"
                >
                  {' '}
                  <Icons.Settings size={18} />
                  Member Settings
                </button>

                {person?.lastActive && (
                  <p className="text-sm font-semibold rounded-lg p-1 m-0 text-gray-600">
                    Last Active:{' '}
                    {new Intl.DateTimeFormat('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      timeZone: person?.timeZone || 'Asia/Kolkata',
                    }).format(new Date(person.lastActive))}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <AddPeopleModal
        isOpen={isAddPeopleModalOpen}
        onClose={() => setIsAddPeopleModalOpen(false)}
        onSubmit={handleAddPerson}
      />
      <DisconnectConfirmationModal
        isVisible={disconnectModalVisible}
        onClose={() => setDisconnectModalVisible(false)}
        memberId={selectedPersonId}
        accountType={disconnectAccountType}
        onConfirmDisconnect={handleConfirmDisconnect}
      />
      <ResetCreditsModal
        isVisible={resetCreditsModalVisible}
        onClose={() => {
          setResetCreditsModalVisible(false);
          setSelectedPersonForReset(null);
        }}
        onConfirm={handleConfirmResetCredits}
        personName={selectedPersonForReset?.name || ''}
        isResetting={isResetting}
      />
    </div>
  );
};
