import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomDropdown from '../Global/CustomDropDown';
import { generatePost } from '../../../network/GenerateContent';
import ContentCalendarModal from './ContentCalendarModal';
import { message } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import PersonaModal from './PersonaModal';

const LinkedInPostGenerator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTemplate = location?.state?.initialTemplate || null;
  const initialDescription = location?.state?.description || null;
  const [topic, setTopic] = useState(initialDescription || null);
  const [language, setLanguage] = useState('English');
  const [topicType, setTopicType] = useState('description');
  const [template, setTemplate] = useState(initialTemplate || ' ');
  const [post, setPost] = useState('');
  const [selectedTone, setSelectedTone] = useState('Friendly');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [postPersona, setPostPersona] = useState(null);
  const [postSamples, setPostSamples] = useState([]);
  const [calendarData, setCalendarData] = useState([]);

  const handleProceed = () => {
    if (!post) {
      message.error('Please generate a post before proceeding.');
      return;
    }
    navigate('/dashboard/quick-post', { state: { content: post } });
  };

  const handleSavePersona = (values) => {
    if (!values.profile || !values.preferences || values.samples.length === 0) {
      message.error('Please fill out all fields before saving.');
      return;
    }

    setPostPersona({
      name: values.profile.label,
      position: values.profile.position || 'Unknown',
      preferences: values.preferences,
    });

    setPostSamples(values.samples);
    message.success('Post persona and samples saved!');
    setIsModalVisible(false);
    console.log('Persona:', values);
  };

  const handleSaveCalendar = async (data) => {
    setCalendarData(data);
    message.success('Content calendar saved!');
    setIsCalendarModalVisible(false);

    // Generate AI posts for all topics in the calendar
    const generatedPosts = [];
    setLoading(true);
    for (const item of data) {
      const { title, dateTime } = item;
      try {
        const generatedPost = await generatePost(
          selectedTone,
          title,
          language,
          template,
        );
        generatedPosts.push({
          title,
          dateTime,
          content: generatedPost.generatedPostContent,
        });
      } catch (err) {
        message.error(`Error generating post for: ${title}`);
      }
    }
    setLoading(false);

    // Redirect to the Post Scheduler with generated content
    navigate('/dashboard/post-scheduler', { state: { posts: generatedPosts } });
  };

  const topicOptions = [
    {
      value: 'description',
      label: 'Short Prompt',
      placeholder: 'Enter prompt here',
    },
    {
      value: 'paragraph',
      label: 'Paragraph',
      placeholder: 'Enter paragraph here',
    },
    {
      value: 'youtube',
      label: 'YouTube Link',
      placeholder: 'Paste YouTube link',
    },
    { value: 'blog', label: 'Blog Link', placeholder: 'Paste blog link' },
  ];

  const templates = [
    { value: 'top_posts', label: 'Top Posts' },
    { value: 'collection', label: 'Collection' },
    { value: 'all', label: 'All' },
  ];

  const tones = [
    'Friendly',
    'Humorous',
    'Emoji',
    'Formal',
    'Negative',
    'Serious',
    'Curious',
  ];

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

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:p-6 p-4 bg-gray-50 min-h-screen">
      <div className="flex gap-2 flex-col rounded-lg">
        <div className="flex w-full  flex-col lg:flex-row  gap-3 justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Create LinkedIn Post</h3>
          <div className="flex gap-2 lg:w-fit w-full ">
            <button
              onClick={() => setIsModalVisible(true)}
              className="global-button-primary py-2 w-full px-4 text-xs text-white rounded-lg"
            >
              Set Writing Persona
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsCalendarModalVisible(true)}
          className="global-button-secondary py-2 px-4 text-sm text-gray-900 rounded-lg"
        >
          Upload Content Calendar
        </button>
        <p className="text-center text-sm text-gray-500">
          -------- OR --------
        </p>

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

        <div className="flex flex-wrap gap-2">
          {tones.map((tone) => (
            <button
              key={tone}
              onClick={() => handleToneClick(tone)}
              className={`lg:text-sm text-xs bg-white px-4 py-2 rounded-lg ${
                selectedTone === tone
                  ? 'bg-blue-100'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tone}
            </button>
          ))}
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

        <div className="my-2 flex w-full items-center gap-2 justify-between">
          <label className="block text-gray-500 text-sm">
            Post Template (Optional)
          </label>
          <CustomDropdown
            options={templates}
            selected={template}
            onSelect={setTemplate}
            label="Select Template"
          />
        </div>

        <textarea
          placeholder="Paste template here..."
          className="w-full h-52 border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-black mb-2"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        ></textarea>

        <button
          onClick={handleGeneratePost}
          className="w-full global-button-primary text-white py-2 rounded-lg hover:bg-gray-800"
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
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSavePersona}
      />
      <ContentCalendarModal
        isOpen={isCalendarModalVisible}
        onClose={() => setIsCalendarModalVisible(false)}
        onSave={handleSaveCalendar}
      />
    </div>
  );
};

export default LinkedInPostGenerator;
