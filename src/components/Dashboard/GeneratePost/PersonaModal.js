import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { message } from 'antd';
import CustomDropdownMenu from '../Global/CustomDropDown';

const PersonaModal = ({
  profiles,
  setIsAnalyzing,
  isAnalyzing,
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [preferences, setPreferences] = useState('');
  const [samples, setSamples] = useState([]);
  const [newSample, setNewSample] = useState('');
  const [errors, setErrors] = useState({});

  const handleAddSample = () => {
    if (!newSample.trim()) {
      message.error('Sample post cannot be empty.');
      return;
    }
    setSamples([...samples, newSample.trim()]);
    setNewSample('');
  };

  const handleRemoveSample = (index) => {
    const updatedSamples = [...samples];
    updatedSamples.splice(index, 1);
    setSamples(updatedSamples);
  };

  const validateFields = () => {
    const validationErrors = {};
    if (!selectedProfile) validationErrors.profile = 'Profile is required.';
    if (!preferences.trim())
      validationErrors.preferences = 'Preferences are required.';
    if (samples.length === 0)
      validationErrors.samples = 'At least one sample post is required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateFields()) {
      message.error('Please fill all required fields.');
      return;
    }
    setIsAnalyzing(true);

    onSave({
      profile: selectedProfile,
      preferences,
      samples,
    });
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
          className="text-gray-500 text-xl self-end hover:text-gray-800"
          onClick={onClose}
        >
          <FiX />
        </button>
        <h2 className="text-xl text-center mb-4">
          Analyze Your Writing Persona
        </h2>

        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium text-gray-700">
            Select Profile
          </label>

          <CustomDropdownMenu
            options={profiles}
            selected={selectedProfile}
            onSelect={setSelectedProfile}
            label="Select a profile"
          />

          {errors.profile && (
            <p className="text-red-500 text-xs mt-1">{errors.profile}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Writing Preferences
          </label>
          <input
            type="text"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="e.g., Professional, Casual, Humorous"
            className="mt-1 block w-full border border-gray-300 text-sm rounded-xl p-2"
          />
          {errors.preferences && (
            <p className="text-red-500 text-xs mt-1">{errors.preferences}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Sample Posts
          </label>
          <div className="flex items-start gap-2">
            <textarea
              type="text"
              value={newSample}
              onChange={(e) => setNewSample(e.target.value)}
              placeholder="Add a sample post"
              className="mt-1 h-32 flex-grow border border-gray-300 text-sm rounded-xl p-2"
            />
            <button
              type="button"
              onClick={handleAddSample}
              className="global-button-primary bg-gray-100 text-black"
            >
              Add More
            </button>
          </div>
          {samples.length > 0 && (
            <ul className="mt-2">
              {samples.map((sample, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-100 rounded-lg p-2 mb-2"
                >
                  <span className="text-sm">
                    {sample.length > 50
                      ? `${sample.substring(0, 50)}...`
                      : sample}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSample(index)}
                    className="text-red-500 text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          {errors.samples && (
            <p className="text-red-500 text-xs mt-1">{errors.samples}</p>
          )}
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
            className="global-button-primary"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonaModal;
