import * as React from 'react';
import Headings from '../Heading';

function Pricing({ scrollToSection }) {
  // Define the icon URL
  const iconUrl =
    'https://cdn.builder.io/api/v1/image/assets/TEMP/e902688c5d7078b6c835b36f9323d644bbc6ba67f0a1f893d08fa44cf66d036d?';

  // Define an array of features
  const featuresPro = [
    '500 Credits/Day',
    'Custom Post Collections (Unlimited)',
    'Custom Daily Targets',
    'Active Days Leaderboard',
    'Comment Generation',
    '24/7 Customer Support',
    'Post Generation',
    'Custom Connection Note',
    'Custom Message Replies',
    'Generate Message Templates',
    'Track Active Days',
  ];
  const featuresFree = [
    '100 Credits/Day',
    'Custom Post Collections (Max 10)',
    'Daily Targets',
    'Comment Generation',
    'Post Generation',
    'Custom Connection Note',
    'Custom Message Replies',
    'Generate Message Templates',
    'Track Active Days',
  ];

  return (
    <div id='pricing' className='flex items-center flex-col gap-[4rem] mt-10'>
      <Headings content='PRICING' />
      <div className='flex justify-center gap-10 flex-wrap items-start'>
        <div className='flex flex-col justify-center px-7 pt-9 pb-5 bg-blue-50 max-w-[442px] rounded-[50px] text-indigo-950'>
          <div className='-ml-3 flex justify-center gap-5'>
            <img
              loading='lazy'
              src='https://cdn.builder.io/api/v1/image/assets/TEMP/0afd338468d800971f2bb1e20366de0ad534f1e0d13a72bc1fb1ff2a5020a912?'
              className='shrink-0 aspect-square w-[90px]'
            />
            <div className='flex flex-col shrink-0 my-auto basis-0 w-min'>
              <div className='text-xl w-fit font-bold'>FREE</div>
              <div className='mt-5 text-3xl w-max'>0$/month</div>
            </div>
          </div>
          <div className='flex flex-col gap-1 p-4 items-start justify-start'>
            {/* Loop over features and render each one */}
            {featuresFree.map((feature, index) => (
              <div
                key={index}
                className='flex gap-5 mt-5 text-base font-medium'
              >
                <img
                  loading='lazy'
                  src={iconUrl}
                  className='shrink-0 w-6 aspect-square'
                />
                <div className='flex-auto my-auto'>{feature}</div>
              </div>
            ))}
          </div>
          <div
            onClick={() => scrollToSection('footercta')} // Scroll to home section when clicked
            className='justify-center w-full items-center self-center px-16 py-4 mt-4 ml-3 text-lg font-medium text-center text-white bg-[#001482] rounded-[61px] cursor-pointer'
          >
            Get Started
          </div>
        </div>
        <div className='flex flex-col items-center justify-center px-7 pt-9 pb-5 bg-blue-100 max-w-[442px] rounded-[50px] text-indigo-950'>
          <div className='-ml-3 flex gap-5'>
            <img
              loading='lazy'
              src='https://cdn.builder.io/api/v1/image/assets/TEMP/0afd338468d800971f2bb1e20366de0ad534f1e0d13a72bc1fb1ff2a5020a912?'
              className='shrink-0 aspect-square w-[90px]'
            />
            <div className='flex flex-col shrink-0 my-auto basis-0 w-min'>
              <div className='text-xl w-fit font-bold'>PRO</div>
              <div className='mt-5 text-3xl w-max'>Coming Soon</div>
            </div>
          </div>
          <div className='flex flex-col gap-1 p-4 items-start justify-center'>
            {/* Loop over features and render each one */}
            {featuresPro.map((feature, index) => (
              <div
                key={index}
                className='flex gap-5 mt-5 text-base font-medium'
              >
                <img
                  loading='lazy'
                  src={iconUrl}
                  className='shrink-0 w-6 aspect-square'
                />
                <div className='flex-auto my-auto'>{feature}</div>
              </div>
            ))}
          </div>
          <div className='justify-center items-center self-center px-16 w-full py-4 mt-4 ml-3 text-lg font-medium text-center text-sky-900 bg-white rounded-[61px]'>
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
