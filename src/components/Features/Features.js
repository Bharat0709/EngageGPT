import React from 'react';
import Headings from '../Heading';
import FeatCustomNote from '../../assets/images/FeatCustomNote.png';
import FeatMessageReplies from '../../assets/images/FeatGenerateMessageReplies.png';
import FeatPostContent from '../../assets/images/FeatPostContent.png';
import FeatGenerateComments from '../../assets/images/FeatGenerateComments.png';
import FeatPostCollections from '../../assets/images/FeatPostCollections.png';
import FeatTrackActivity from '../../assets/images/FeatTrackActivity.png';
import CuroselFeatures from './FeaturesCurosel';
const featuresData = [
  {
    iconUrl: FeatPostCollections,
    title: 'Custom Post Collections',
    description:
      'Curate and categorize your posts according to themes, campaigns, or target audiences.',
  },
  {
    iconUrl: FeatTrackActivity,
    title: 'Tracks Active Days',
    description:
      "Gain insights into your LinkedIn activity. Monitor your presence and engagement over time.",
  },
  {
    iconUrl: FeatGenerateComments,
    title: 'Generate Comments',
    description:
      'Crafts authentic and engaging comments tailored to your content, saving you time and effort.',
  },
  {
    iconUrl: FeatMessageReplies,
    title: 'Generate Message Replies',
    description:
      'EngageGPT provides intelligent replies to incoming messages, maintaining seamless communication.',
  },
  {
    iconUrl: FeatPostContent,
    title: 'Generate Post Content',
    description:
      'Generate compelling posts effortlessly, ensuring consistent quality and relevance across all your platforms.',
  },
  {
    iconUrl: FeatCustomNote,
    title: 'Custom Connection Note',
    description:
      "Make a lasting impression by personalizing your connection requests on LinkedIn.",
  },
];

const Features = () => {
  return (
    <div className='flex h-auto justify-center items-center self-center mt-5 flex-col gap-10'>
      <Headings content='FEATURES' />
      <CuroselFeatures />
      <div className='flex flex-wrap justify-center items-center w-full gap-6 px-4 sm:px-0'>
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className={`flex p-4 sm:p-6 h-auto sm:h-30 w-full sm:w-5/12 rounded-xl self-start justify-items-start ${
              index === 0 || index === 4 || index === 3
                ? 'bg-white border-[.4px] border-slate-300'
                : 'bg-blue-50'
            }`}
          >
            <img
              src={feature.iconUrl}
              alt='Feature Icon'
              className={`w-13 h-10 sm:w-15 sm:h-14 p-1 mr-4 sm:mr-6 rounded-xl ${
                index === 0 || index === 4 || index === 3
                  ? 'bg-blue-50'
                  : 'bg-white'
              }`}
            />
            <div>
              <h3 className='text-xl font-medium text-[#004182]'>
                {feature.title}
              </h3>
              <p className='text-sm mt-2 sm:mt-3 decoration-slate-200 w-full sm:w-11/12'>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
