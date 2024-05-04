import React, { useState } from 'react';
import Arrow from '../../assets/images/Arrow.png';
import CuroselGenerateComment from '../../assets/images/CuroseGenerateComments.png';
import CuroselGeneratePost from '../../assets/images/CuroselGeneratePost.png';
import CuroselDailyTargets from '../../assets/images/CuroselDailyTragets.png';
import CuroselMessageTemplates from '../../assets/images/CuroselMessageTemplates.png';
import CuroselMessageReplies from '../../assets/images/CuroseMessageReplies.png';
import CuroselPostCollections from '../../assets/images/CuroselPostCollections.png';

function CuroselFeatures({ scrollToSection }) {
  // Define the features array with text and image URL
  const features = [
    {
      text: 'Generate Comments',
      image: CuroselGenerateComment,
    },
    {
      text: 'Generate Post Content',
      image: CuroselGeneratePost,
    },
    {
      text: 'Generate Message Replies',
      image: CuroselMessageReplies,
    },
    {
      text: 'Generate Message Templates',
      image: CuroselMessageTemplates,
    },
    {
      text: 'Create Post Collections',
      image: CuroselPostCollections,
    },
    {
      text: 'Daily Targets',
      image: CuroselDailyTargets,
    },
  ];

  // State to track the current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle clicking on the arrows
  const handleArrowClick = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? features.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === features.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className='relative'>
      {' '}
      {/* Added ID to the outermost container */}
      <div className='flex flex-col justify-center items-center px-20 py-12 text-2xl font-medium text-center text-sky-90 rounded-3xl max-md:px-5'>
        <div className='justify-center px-8 py-2 shadow-xs bg-blue-50 rounded-full max-md:px-5'>
          {features[currentIndex].text}
        </div>
        <div className='relative'>
          <img
            loading='lazy'
            src={features[currentIndex].image}
            alt={`Feature ${currentIndex + 1}`}
            className='mt-8 w-full aspect-[1.6] max-w-[788px] max-md:max-w-full'
          />
          <button
            onClick={() => {
              handleArrowClick('prev');
              // Scroll to the features section
            }}
            className='absolute top-1/2 left-1 transform translate-x-[-10px] -translate-y-1/2 max-md:translate-x-[-20px]'
          >
            <img
              src={Arrow}
              alt='Left Arrow'
              className=' shadow-lg rounded-full h-10 max-md:h-6'
            />
          </button>
          <button
            onClick={() => {
              handleArrowClick('next');
              // Scroll to the features section
            }}
            className='absolute top-1/2 right-1 transform translate-x-[10px] -translate-y-1/2 max-md:translate-x-[20px]'
          >
            <img
              src={Arrow}
              alt='Right Arrow'
              className='h-10 shadow-lg rounded-full max-md:h-6 rotate-180'
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CuroselFeatures;
