import { useState, useEffect } from 'react';
import { Icons } from '@utils/constantData/icons';
import { goTo } from '@utils/navigator';
import { BiUnlink } from 'react-icons/bi';
import { Button, Skeleton } from 'antd';
import AddPeopleModal from '../Global/AddPeopleModal';
import DisconnectConfirmationModal from './DisconnectModal';
import { getAllMembers, addNewMember } from '@services/Members';
import 'antd/dist/reset.css';
import { useNotifications } from '@components/Common/Notification';

export const People = () => {
  const [people, setPeople] = useState([]);
  const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disconnectModalVisible, setDisconnectModalVisible] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [refreshPeoplePage, setRefreshPeoplePage] = useState(false);
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
      message.info('Check spam folder as well ');
      setIsAddPeopleModalOpen(false);
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleDisconnectLinkedIn = (personId) => {
    setSelectedPersonId(personId);
    setDisconnectModalVisible(true);
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
      <div className="h-full mt-4 flex justify-between items-center mb-4">
        <h1 className="text-xl text-semibold text-gray-800">People</h1>

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
      <div className="toggles bg-gray-50 p-3 lg:flex hidden rounded-xl  justify-between items-center mb-2">
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
            <div className="toggle-buttons bg-gray-50 flex gap-4">
              {['All', 'Profiles', 'Invites', 'Disconnected'].map((filter) => (
                <p
                  key={filter}
                  className={`text-sm p-0 m-0 cursor-pointer font-semibold ${
                    selectedFilter === filter ? 'text-black' : 'text-gray-500'
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
      <div className="people-list flex flex-col gap-2">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="person-card w-full bg-gray-50 p-4 rounded-xl flex justify-between items-center"
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
              className="person-card w-full bg-[#f6f6f6] p-4 gap-4 rounded-xl lg:flex-row flex-col flex-wrap flex justify-between items-center"
            >
              <div className="flex lg:w-fit w-full lg:flex-row flex-col gap-4 items-center">
                <div className="flex lg:w-fit w-full items-center gap-4 justify-start">
                  <img
                    src={person?.profilePicture}
                    alt={`${person?.name}'s profile`}
                    className="w-12 h-12 rounded-full border border-gray-300"
                  />
                  <div className="flex flex-col items-start lg:gap-1 gap-1">
                    <h3 className="text-sm p-0 m-0 font-semibold text-gray-800">
                      {person?.name}
                    </h3>
                    <p className="text-sm rounded-lg p-0 m-0 text-gray-600">
                      {person?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center lg:flex-row flex-wrap gap-3 lg:w-max w-full">
                  <p className="text-xs font-semibold rounded-lg bg-gray-200 p-1 px-3 m-0 text-gray-600">
                    {person?.totalCreditsUsed} credits used
                  </p>{' '}
                  <p className="text-xs font-semibold rounded-lg bg-gray-200 p-1 px-3 m-0 text-gray-600">
                    {person?.daysActive} days active
                  </p>
                  <p className="text-xs font-semibold rounded-lg bg-gray-200 p-1 px-3 m-0 text-gray-600">
                    {person?.timeZone || 'Asia/Kolkata'}
                  </p>
                  <div className="flex w-max rounded-full text-green-600 items-center">
                    <p
                      className={`text-sm p-0 m-0 font-medium ${
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
              <div className="flex flex-wrap gap-2 lg:w-fit w-full justify-between lg:mt-0 mt-2 items-center">
                <div className="copy-token text-xs bg-white pl-2 rounded-lg flex items-center">
                  Extension Connection Token
                  <Button
                    className="text-black hover:text-black"
                    icon={<Icons.Copy />}
                    onClick={() => handleCopy(person.connectionToken)}
                    type="link"
                  ></Button>
                </div>
                {person?.isLinkedinConnected ? (
                  <button
                    onClick={() => handleDisconnectLinkedIn(person._id)}
                    className={`rounded-lg text-black p-2 bg-white flex items-center gap-2 text-xs`}
                  >
                    <BiUnlink size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleConnectLinkedIn}
                    disabled={false}
                    className={`rounded-lg text-black bg-white p-2 px-2 flex items-center gap-2 text-xs`}
                  >
                    Connect
                    <Icons.LinkedIn className="text-sky-800" size={16} />
                  </button>
                )}

                <button
                  onClick={() => handleNavigateToSettings(person._id)}
                  className="rounded-lg text-black bg-white p-2 px-2 flex items-center gap-2 text-xs"
                >
                  {' '}
                  <Icons.Settings size={16} />
                  Member Settings
                </button>
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
        refreshPage={setRefreshPeoplePage}
      />
    </div>
  );
};
