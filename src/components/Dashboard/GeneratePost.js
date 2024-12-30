import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomDropdown from './Global/CustomDropDown';
import { generatePost } from '../../network/GenerateContent';
import { message } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LinkedInPostGenerator = () => {
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
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white min-h-screen">
      <div className="flex-1 bg-white rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Create LinkedIn Post</h3>
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

        <div className="mb-4">
          <label className="block text-sm text-gray-500 font-medium mb-2">
            {currentOption?.label}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder={currentOption?.placeholder}
              className="flex-1 text-sm border px-3 rounded-lg p-1 focus:outline-none focus:ring-1 focus:ring-black"
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

        <div className="flex flex-wrap gap-2 mb-4">
          {tones.map((tone) => (
            <button
              key={tone}
              onClick={() => handleToneClick(tone)}
              className={`text-sm px-4 py-2 rounded-lg ${
                selectedTone === tone
                  ? 'bg-sky-100'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tone}
            </button>
          ))}
        </div>

        <div className="my-4 flex w-full items-center gap-2 justify-between">
          <label className="block text-gray-500 text-sm">
            Any post template (optional)
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

      <div className="w-full lg:w-1/3 bg-white rounded-lg">
        <h3 className="text-lg font-medium mb-4">Generated Post</h3>
        <textarea
          value={post}
          readOnly
          placeholder="Your LinkedIn post will be written by AI..."
          className="w-full min-h-96 scrollbar-hide border rounded-lg p-3 text-gray-700 bg-gray-100 focus:outline-none"
        />
        <button
          onClick={() => alert('Proceeding...')}
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
    </div>
  );
};

export default LinkedInPostGenerator;
