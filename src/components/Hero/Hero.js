import * as React from 'react';
import Slider from './Slider';

function HeroSection() {
  return (
    <div className='h-dvh m-auto flex flex-col justify-between items-center px-5 text-center max-w-[1086px] min-w-screen-lg'>
      <div className='self-center gap-3 m-auto flex flex-col justify-between items-center px-5 text-center max-w-[1086px] min-w-screen-lg'>
        <div className='mt-18 leading-[2.8rem] self-stretch w-full text-[1.7rem] lg:text-5xl font-semibold lg:leading-[5rem] xl:leading-[5rem] text-sky-900 max-md:max-w-full'>
          Cultivate Connections, Elevate Engagement Engage GPT: AI for LinkedIn
        </div>
        <div className='mt-6 sm:mt-8 md:mt-10 lg:mt-12 text-xl leading-10 sm:text-xl lg:text-2xl text-sky-900 max-md:mt-10 max-md:max-w-full'>
          Revolutionizing Engagement on LinkedIn
        </div>
        <div className='flex flex-wrap gap-5 items-center justify-center mt-10 text-base font-medium tracking-normal leading-8'>
          <div className='justify-center p-2 pl-5 pr-5 text-white bg-sky-900 rounded-xl max-md:px-5'>
            Get Extension
          </div>
          <div className='justify-center p-2 pl-5 pr-5 text-sky-900 bg-white rounded-xl max-md:px-5'>
            View Demo
          </div>
        </div>
      </div>
      <Slider />
    </div>
  );
}

export default HeroSection;
