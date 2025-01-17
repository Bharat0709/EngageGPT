import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomDropdown from '../Global/CustomDropDown';
import { generatePost } from '../../../network/GenerateContent';
import { AiOutlinePlus } from 'react-icons/ai';
import { message } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiCopy } from 'react-icons/fi';
import { tones, templateOptions, topicOptions } from './OptionsData';
import { createMemberPersona } from '../../../network/Members';
import { fetchOrganizationData } from '../../../network/Organization';
import { getAllMembers, addNewMember } from '../../../network/Members';
import AddMembersModal from '../Global/AddPeopleModal';
import CustomDropdownMenu from '../Global/CustomDropDown';
import PersonaModal from './PersonaModal';
import SkeletonLoading from './SkeletonLoading';

const LinkedInPostGenerator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTemplate = location?.state?.initialTemplate || null;
  const postContents = location?.state?.selectedPostTopic || null;
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const [topic, setTopic] = useState(null);
  const [language, setLanguage] = useState('English');
  const [topicType, setTopicType] = useState('description');
  const [selectedTone, setSelectedTone] = useState('Friendly');
  const [selectedFormat, setSelectedFormat] = useState('');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [post, setPost] = useState('');
  const [postPersona, setPostPersona] = useState(initialTemplate || ' ');

  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const [profiles, setProfiles] = useState([]);
  const [detailedProfiles, setDetailedProfiles] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [refreshMembers, setRefreshMembers] = useState(false);
  const [creditsLeft, setCreditsLeft] = useState(null);

  useEffect(() => {
    const fetchAndSetProfiles = async () => {
      try {
        setIsloading(true);
        const data = await getAllMembers();
        const organizationProfile = await fetchOrganizationData();
        setCreditsLeft(organizationProfile.credits);
        const profileOptions = data?.map((profile) => ({
          value: profile._id,
          label: profile.name,
        }));
        if (data.length === 0) {
          setSelectedFormat('Use Template');
          setIsloading(false);
          return;
        }

        if (initialTemplate) {
          setPostPersona(initialTemplate);
          setSelectedFormat('Use Template');
        } else if (postContents) {
          setTopic(postContents.topic);
        }
        setDetailedProfiles(data);
        setProfiles(profileOptions);
        setSelectedProfileId(profileOptions[0].value);
        setIsloading(false);
      } catch (err) {
        setIsloading(false);
        message.error('Unable to fetch member details.');
      }
    };

    fetchAndSetProfiles();
  }, [refreshMembers, initialTemplate, postContents]);

  useEffect(() => {
    const setProfilePersona = async () => {
      const selectedProfile = detailedProfiles?.find(
        (profile) => profile._id === selectedProfileId,
      );
      if (selectedProfile?.writingPersona && selectedFormat === 'Use Persona') {
        setSelectedFormat('Use Persona');
        setPostPersona(selectedProfile.writingPersona);
      }
    };

    setProfilePersona();
    // eslint-disable-next-line
  }, [selectedProfileId]);

  const handleProceed = () => {
    if (!post) {
      message.error('Please generate a post before proceeding.');
      return;
    }
    navigate('/dashboard/quick-post', {
      state: { content: post, postContents: postContents },
    });
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
      setSelectedFormat('Use Persona');
      setRefreshMembers(!refreshMembers);
      message.success('Persona analyzed and saved successfully!');
      setIsModalVisible(false);
    } catch (error) {
      message.error(
        'An error occurred while creating your persona. Please try again.',
      );
    }
  };

  const currentOption = topicOptions.find(
    (option) => option.value === topicType,
  );

  const handleAddMembers = async (newPerson) => {
    try {
      for (const person of newPerson) {
        await addNewMember(person);
      }
      message.success('Invite sent successfully!');
      message.info('Please check spam folder as well');
      setRefreshMembers(!refreshMembers);
      setIsAddMemberModalOpen(false);
    } catch (err) {
      message.error('Something went wrong try again');
    }
  };

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
        postPersona,
        selectedFormat,
      );
      setTopic();
      setCreditsLeft(creditsLeft - 10);
      setPost(generatedPost.generatedPostContent);
      setLoading(false);
    } catch (err) {
      message.error(err.message);
      setLoading(false);
    }
  };

  const handleToneClick = (toneValue) => setSelectedTone(toneValue);

  const handleTemplateClick = (templateValue) => {
    const selectedProfile = detailedProfiles?.find(
      (profile) => profile._id === selectedProfileId,
    );

    if (initialTemplate && templateValue === 'Use Template') {
      setPostPersona(initialTemplate);
      setSelectedFormat('Use Template');
      return;
    }
    if (selectedProfile?.writingPersona && templateValue === 'Use Persona') {
      setSelectedFormat('Use Persona');
      setPostPersona(selectedProfile.writingPersona);
      return;
    }
    setSelectedFormat(templateValue);
    setPostPersona('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(post);
    message.success('Copied to clipboard');
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="flex w-full flex-col lg:flex-row gap-6 lg:p-6 p-4 bg-gray-50 min-h-screen">
      <div className="flex w-full lg:w-3/4 gap-2 flex-col rounded-lg">
        <div className="flex w-full flex-wrap lg:flex-row  gap-3 justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Create LinkedIn Post</h3>
          <div className="">
            {selectedProfileId ? (
              <CustomDropdownMenu
                options={profiles}
                selected={selectedProfileId}
                onSelect={setSelectedProfileId}
                label="Select a profile"
              />
            ) : (
              <button
                type="primary"
                onClick={() => setIsAddMemberModalOpen(true)}
                className="global-button-primary text-sm flex items-center gap-1 py-2 px-3 rounded-lg"
              >
                <AiOutlinePlus size={14} />
                Add Profile
              </button>
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
                    ? 'bg-slate-200 border border-gray-700'
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

        <p className="text-sm text-gray-500 mt-2">
          Select post format (optional):
        </p>
        {!selectedProfileId && (
          <p className="text-xs  text-gray-400 p-2 text-center bg-gray-100 self-end rounded-lg w-full px-4">
            Add Profile to analyze your writing persona, you can add custom
            persona as well
          </p>
        )}
        <div className="my-2 flex w-full flex-wrap items-center gap-2 justify-between">
          <div className="flex gap-2">
            {templateOptions.map((template) => (
              <button
                key={template}
                onClick={() => handleTemplateClick(template)}
                className={`lg:text-sm text-xs bg-white px-4 py-2 rounded-lg ${
                  selectedFormat === template
                    ? 'bg-slate-200 border border-gray-700'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {template}
              </button>
            ))}
          </div>
          <button
            disabled={!selectedProfileId}
            onClick={() => setIsModalVisible(true)}
            className={`global-button-primary  py-2 px-4 text-sm text-white rounded-lg ${
              !selectedProfileId === true
                ? 'cursor-not-allowed '
                : 'cursor-pointer flex'
            }`}
          >
            Analyze Persona
          </button>
        </div>

        <textarea
          placeholder={
            selectedFormat === 'Use Persona'
              ? 'Add your custom writing persona here... '
              : 'Add post template here...'
          }
          className="w-full h-52 border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-black mb-2"
          value={postPersona}
          onChange={(e) => setPostPersona(e.target.value)}
        ></textarea>

        <div className="flex lg:flex-row flex-col gap-2 items-center">
          <button
            onClick={handleGeneratePost}
            className={`global-button-primary lg:w-11/12 w-full text-white py-2 rounded-lg hover:bg-gray-800 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
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
          <p className="py-3 lg:w-3/12 w-full bg-white rounded-lg px-4 text-sm text-center">
            {creditsLeft} Credits Left
          </p>
        </div>
      </div>

      <div className="border-l border-gray-500"></div>

      <div className="w-full lg:w-1/3  rounded-lg">
        <div className="flex items-center mb-4 justify-between">
          <h3 className="text-lg font-medium ">Generated Post</h3>

          {post && (
            <button
              onClick={handleCopy}
              className="text-gray-600 hover:text-gray-800"
              title="Copy to clipboard"
            >
              <FiCopy size={20} />
            </button>
          )}
        </div>

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
      <AddMembersModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMembers}
      />
    </div>
  );
};

export default LinkedInPostGenerator;
