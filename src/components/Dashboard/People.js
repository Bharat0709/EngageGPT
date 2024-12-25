import React, { useState, useEffect } from 'react';
import { MdContentCopy } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiUserPlus } from 'react-icons/fi';
import { Button, message, Tooltip, Skeleton } from 'antd';
import AddPeopleModal from './AddPeopleModal';
import { getAllMembers, addNewMember } from '../../network/Members';
import 'antd/dist/reset.css';

const People = () => {
  const [people, setPeople] = useState([]);
  const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      const members = await getAllMembers();
      if (members.length > 0) {
        setPeople(members);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    fetchMembers();
  }, []);

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
      console.error('Failed to fetch user data:', err.message);
      message.error(err.message);
    }
  };

  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    message.success('Connection token copied!');
  };

  const filterPeople = (filter) => {
    switch (filter) {
      case 'All':
        return people;
      case 'Members':
        return people.filter((p) => p.role === 'member');
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
            className="global-button-primary text-sm flex items-center gap-1 py-1 px-2 rounded-md"
          >
            <AiOutlinePlus size={14} />
            Add
          </button>
        </div>
      </div>

      {/* Toggle Section */}
      <div className="toggles bg-gray-50 p-3 rounded-xl flex justify-between items-center mb-2">
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
              {['All', 'Members', 'Profiles', 'Invites', 'Disconnected'].map(
                (filter) => (
                  <p
                    key={filter}
                    className={`text-sm p-0 m-0 cursor-pointer font-semibold ${
                      selectedFilter === filter ? 'text-black' : 'text-gray-500'
                    }`}
                    onClick={() => setSelectedFilter(filter)}
                  >
                    {filter}
                  </p>
                ),
              )}
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
              <div className="flex-grow items-center gap-4">
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
                    width: 250,
                    height: 12,
                    marginLeft: 12,
                    marginTop: 3,
                  }}
                />
                <Skeleton.Input
                  active
                  style={{
                    width: 100,
                    height: 12,
                    marginLeft: 12,
                    marginTop: 3,
                  }}
                />
              </div>
              <Skeleton.Input
                active
                style={{ width: 100, height: 12, marginLeft: 12, marginTop: 3 }}
              />
            </div>
          ))
        ) : filteredPeople.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <FiUserPlus size={48} className="text-gray-300 mb-4" />
            <p className="text-lg text-gray-600 mb-4">No Data Found.</p>
          </div>
        ) : (
          filteredPeople.map((person) => (
            <div
              key={person?.id}
              className="person-card w-full bg-white p-4 rounded-xl flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={person?.profilePicture}
                  alt={`${person?.name}'s profile`}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <h3 className="text-sm p-0 m-0 font-semibold text-gray-800">
                  {person?.name}
                </h3>
                <p className="text-sm rounded-lg p-0 m-0 text-gray-600">
                  {person?.email}
                </p>
                <Tooltip title="Role">
                  <p className="text-sm rounded-lg bg-gray-200 p-1 px-3 m-0 text-gray-600">
                    {person?.role?.charAt(0).toUpperCase() +
                      person?.role?.slice(1)}
                  </p>
                </Tooltip>
                <div className="flex rounded-full text-green-600 items-center">
                  <p
                    className={`text-sm p-0 m-0 font-medium ${
                      person.isConnected === true
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    •{' '}
                    {person.isConnected === 'connected'
                      ? 'Connected'
                      : person.isConnected === 'invited'
                      ? 'Invited'
                      : 'Disconnected'}
                  </p>
                </div>
              </div>
              <div className="copy-token text-sm">
                Connection Token
                <Tooltip title="Copy Connection Token">
                  <Button
                    className="text-black hover:text-black"
                    icon={<MdContentCopy />}
                    onClick={() => handleCopy(person.connectionToken)}
                    type="link"
                  ></Button>
                </Tooltip>
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
    </div>
  );
};

export default People;
