import { useState, useEffect } from 'react';
import { Icons } from '@utils/constantData/icons';
import { message } from 'antd';
import { updateProfile } from '@services/Organization';
import FullLengthButton from '@components/Common/FullLengthButton';

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
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col rounded-3xl lg:w-1/4 w-11/12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex bg-gray-50  rounded-t-3xl w-full  pt-4 p-3 justify-between items-center">
          <h2 className="lg:text-lg m-0 p-0 ovo-regular text-xl text-left w-full font-bold">
            Edit Profile
          </h2>
          <button
            className="text-gray-500 text-xl mb-1 self-end hover:text-gray-800"
            onClick={onClose}
          >
            <Icons.Cross />
          </button>
        </div>

        <div className="mb-2 mt-4 px-3">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mb-4">
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update the state on change
              className="mt-1 block w-full border border-gray-300 text-sm rounded-xl p-2"
            />
          </div>
        </div>
        <div className="mb-2 px-3">
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
        <div className="flex justify-end gap-2">
          <FullLengthButton
            theme="dark"
            type="submit"
            buttonText="Save"
            isLoading={loading}
            onClick={handleSave}
            loadingText="Saving..."
            disabled={loading}
            className={`rounded-b-3xl px-6 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default EditOrgModal;
