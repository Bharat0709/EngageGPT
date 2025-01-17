import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { message } from 'antd';
import { updateProfile } from '../../../network/Organization';

const EditOrgModal = ({ isOpen, onClose, userData, onSave }) => {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.name) {
      setName(userData.name);
    }
  }, [userData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedDetails = await updateProfile(name, profilePicture);
      onSave({
        name: updatedDetails.organization.name,
        profilePicture: updatedDetails.organization.profilePicture,
      });
      message.success('Profile updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error.message);
      message.error(
        error.message || 'Failed to update profile. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col p-6 rounded-xl lg:w-1/2 w-11/12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 text-xl  self-end hover:text-gray-800"
          onClick={onClose}
        >
          <FiX />
        </button>
        <div className="flex mb-4 justify-between items-center">
          <h2 className="text-xl text-center w-full font-bold">Edit Profile</h2>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update the state on change
              className="mt-1 block w-full border border-gray-300 text-sm rounded-xl p-2"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <div className=" relative mt-1 flex-col border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-100">
            {profilePicture ? (
              <div className="relative flex items-center space-x-2">
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded-full"
                />
              </div>
            ) : (
              <span className="text-gray-600 text-center">Click to upload</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className=" absolute w-full -z-1 h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="global-button-secondary"
          >
            Close
          </button>
          <button
            type="submit"
            onClick={handleSave}
            disabled={loading}
            className={`global-button-primary ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrgModal;
