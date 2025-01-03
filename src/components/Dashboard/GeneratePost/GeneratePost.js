import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomDropdown from '../Global/CustomDropDown';
import { generatePost } from '../../../network/GenerateContent';
import { message } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { createMemberPersona } from '../../../network/Members';
import { tones, templateOptions, topicOptions } from './OptionsData';
import { getAllMembers } from '../../../network/Members';
import CustomDropdownMenu from '../Global/CustomDropDown';
import PersonaModal from './PersonaModal';

const LinkedInPostGenerator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTemplate = location?.state?.initialTemplate || null;
  const initialDescription = location?.state?.description || null;
  const [template, setTemplate] = useState(initialTemplate || ' ');
  const [topic, setTopic] = useState(initialDescription || null);
  const [language, setLanguage] = useState('English');
  const [topicType, setTopicType] = useState('description');
  const [selectedTone, setSelectedTone] = useState('Friendly');
  const [selectedFormat, setSelectedFormat] = useState('Use Persona');
  const [loading, setLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [post, setPost] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postPersona, setPostPersona] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchAndSetProfiles = async () => {
      try {
        const data = await getAllMembers();
        const profileOptions = data?.map((profile) => ({
          value: profile._id,
          label: profile.name,
        }));
        if (data.length === 0) {
          message.error('No profiles found. Please add a profile first.');
          return;
        }
        setPostPersona(data[0]?.writingPersona);
        setProfiles(profileOptions);
        setSelectedProfile(profileOptions[0].value);
      } catch (err) {
        message.error('Unable to fetch member details.');
      }
    };

    fetchAndSetProfiles();
  }, []);

  const handleProceed = () => {
    if (!post) {
      message.error('Please generate a post before proceeding.');
      return;
    }
    navigate('/dashboard/quick-post', { state: { content: post } });
  };

  const handleSavePersona = async (values) => {
    if (!values.profile || !values.preferences || values.samples.length === 0) {
      message.error('Please fill out all fields before saving.');
      return;
    }

    try {
      const persona = await createMemberPersona(
        values.preferences,
        values.samples,
        values.profile,
      );
      setPostPersona(persona.writingPersona);
      setIsAnalyzing(false);

      message.success('Persona analyzed and saved successfully!');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error saving persona:', error);
      message.error(
        'An error occurred while creating your persona. Please try again.',
      );
    }
  };

  const currentOption = topicOptions.find(
    (option) => option.value === topicType,
  );

  const handleGeneratePost = async () => {
    try {
      if (!topic) {
        message.error('Please enter a topic.');
        document.querySelector('input[type="text"]').focus();
        return;
      }
      if (!selectedTone) {
        message.error('Please select a tone.');
        return;
      }
      if (!language) {
        message.error('Please select a language.');
        return;
      }
      setLoading(true);
      const generatedPost = await generatePost(
        selectedTone,
        topic,
        language,
        template,
      );
      setPost(generatedPost.generatedPostContent);
      setLoading(false);
    } catch (err) {
      message.error(err.message);
      setLoading(false);
    }
  };

  const handleToneClick = (toneValue) => setSelectedTone(toneValue);

  const handleTemplateClick = (templateValue) =>
    setSelectedFormat(templateValue);

  return (
    <div className="flex w-full flex-col lg:flex-row gap-6 lg:p-6 p-4 bg-gray-50 min-h-screen">
      <div className="flex w-full lg:w-3/4 gap-2 flex-col rounded-lg">
        <div className="flex w-full flex-col lg:flex-row  gap-3 justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Create LinkedIn Post</h3>
          <div className="">
            {selectedProfile && (
              <CustomDropdownMenu
                options={profiles}
                selected={selectedProfile}
                onSelect={setSelectedProfile}
                label="Select a profile"
              />
            )}
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-sm text-gray-500 font-medium mb-2">
            {currentOption?.label}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder={currentOption?.placeholder}
              className="flex-1 text-sm bg-white border px-3 rounded-lg p-1 focus:outline-none focus:ring-1 focus:ring-black"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <CustomDropdown
              options={topicOptions}
              selected={topicType}
              onSelect={setTopicType}
              label="Select Topic Type"
            />
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex gap-2 flex-wrap">
            {tones.map((tone) => (
              <button
                key={tone}
                onClick={() => handleToneClick(tone)}
                className={`lg:text-sm text-xs bg-white px-4 py-2 rounded-lg ${
                  selectedTone === tone
                    ? 'bg-sky-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
          <CustomDropdown
            options={[
              { label: 'English', value: 'English' },
              { label: 'Spanish', value: 'Spanish' },
              { label: 'French', value: 'French' },
            ]}
            selected={language}
            onSelect={setLanguage}
            label="Select Language"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">Select post format:</p>
        <div className="my-2 flex w-full flex-wrap items-center gap-2 justify-between">
          <div className="flex gap-2">
            {templateOptions.map((template) => (
              <button
                key={template}
                onClick={() => handleTemplateClick(template)}
                className={`lg:text-sm text-xs bg-white px-4 py-2 rounded-lg ${
                  selectedFormat === template
                    ? 'bg-sky-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {template}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsModalVisible(true)}
            className="global-button-primary py-2 px-4 text-sm text-white rounded-lg"
          >
            Analyze Persona
          </button>
        </div>

        <textarea
          className="w-full h-52 border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-black mb-2"
          value={postPersona}
          onChange={(e) => setTemplate(e.target.value)}
        ></textarea>

        <button
          onClick={handleGeneratePost}
          className="global-button-primary text-white py-2 rounded-lg hover:bg-gray-800"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center text-sm justify-center">
              <AiOutlineLoading3Quarters className="animate-spin w-5 h-5 mr-2" />
              Generating Post...
            </div>
          ) : (
            'Generate Post'
          )}
        </button>
      </div>

      <div className="border-l-2 border-gray-100"></div>

      <div className="w-full lg:w-1/3  rounded-lg">
        <h3 className="text-lg font-medium mb-4">Generated Post</h3>
        <textarea
          value={post}
          readOnly
          placeholder="Your LinkedIn post will be written by AI..."
          className="w-full min-h-96 scrollbar-hide border rounded-lg p-3 text-gray-700 bg-gray-100 focus:outline-none"
        />
        <button
          onClick={handleProceed}
          disabled={!post}
          className={`w-full mt-4 ${
            post
              ? 'global-button-primary py-2 cursor-pointer text-white'
              : 'bg-gray-300 text-gray-700 cursor-not-allowed'
          } py-2 rounded-lg`}
        >
          Proceed
        </button>
      </div>
      <PersonaModal
        profiles={profiles}
        setIsAnalyzing={setIsAnalyzing}
        isAnalyzing={isAnalyzing}
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSavePersona}
      />
    </div>
  );
};

export default LinkedInPostGenerator;
