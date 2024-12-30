import React, { useState } from 'react';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { message } from 'antd';

const AddMembersModal = ({ isOpen, onClose, onSubmit }) => {
  const [members, setMembers] = useState([{ name: '', email: '' }]);

  // Add a new member input field
  const handleAddMore = () => {
    setMembers([...members, { name: '', email: '' }]);
  };

  const handleClose = () => {
    onClose();
    setMembers([{ name: '', email: '' }]);
  };

  // Update member input values
  const handleChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      members.length === 0 ||
      members.every((member) => !member.name && !member.email)
    ) {
      message.error('At least one member must be present.');
    } else {
      onSubmit(members);
      setMembers([{ name: '', email: '' }]);
    }
  };

  // Handle deleting a member
  const handleDelete = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 w-full z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white flex flex-col lg:w-1/2 w-11/12 p-6 rounded-xl shadow-lg">
          {/* Header */}
          <button
            className="text-gray-500 text-xl self-end hover:text-gray-800"
            onClick={onClose}
          >
            <FiX />
          </button>
          <div className="flex flex-col gap-4 justify-center items-center pb-2 mb-4">
            <h2 className="text-xl text-center font-semibold">Add Profiles</h2>
            <p className="text-center">
              Email must be associated with linkedIn Account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {members.map((member, index) => (
              <div key={index} className="flex gap-4 mb-4 items-center">
                <div className="w-1/2">
                  <label
                    htmlFor={`name-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id={`name-${index}`}
                    value={member.name}
                    onChange={(e) =>
                      handleChange(index, 'name', e.target.value)
                    }
                    required
                    placeholder="Enter name"
                    className="mt-1 p-2 block w-full border rounded-xl shadow-sm focus:ring focus:ring-indigo-300"
                  />
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor={`email-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id={`email-${index}`}
                    value={member.email}
                    onChange={(e) =>
                      handleChange(index, 'email', e.target.value)
                    }
                    required
                    placeholder="Enter email"
                    className="mt-1 p-2 block w-full border rounded-xl shadow-sm focus:ring focus:ring-indigo-300"
                  />
                </div>

                <div className="flex self-end mb-3 items-center">
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="text-red-500  hover:text-red-800"
                    title="Delete Member"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}

            {/* Add More Button */}
            <button
              type="button"
              onClick={handleAddMore}
              className="text-gray-600 p-2 px-3 bg-gray-50 rounded-xl hover:bg-gray-100 text-sm mb-4"
            >
              + Add more
            </button>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleClose}
                className="global-button-secondary"
              >
                Close
              </button>
              <button type="submit" className="global-button-primary">
                Add Profiles
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddMembersModal;
