import * as React from 'react';
import heroImage from '../../assets/images/networking.png';

function HeroSection() {
  return (
    <div
      id='home'
      className='lg:md:sm:flex bg-white mt-0 h-full md:lg:mx-14 justify-between gap-24 items-center px-3 text-center min-w-screen-lg'
    >
      <div className='gap-1 m-auto flex flex-col justify-between items-start sm:items-left px-2 text-left sm:text-left max-w-[1186px] min-w-screen-lg'>
        <div className='text-slate-400 lg:mt-[-04rem] mt-[10rem] leading-[2.2rem] self-stretch w-full text-left text-[1.7rem] lg:text-[2.8rem] sm:text-left font-bold lg:font-bold lg:leading-[4rem]'>
          Confused about
          <span className='text-sky-800 leading-[2.7rem]'>
            {' '}
            how to keep your LinkedIn network engaged?
          </span>
        </div>
        <div className='text-slate-800 mt-5 text-left sm:text-left text-[1.2rem] leading-[2.3rem] text-lg lg:text-[1.6rem] font-medium'>
          Simplify your engagement journey using AI.
        </div>
        <div className='flex w-full flex-wrap mt-8 gap-5 justify-start sm:justify-start items-start self-start text-base font-medium tracking-normal leading-8'>
          <div className='flex w-full flex-wrap gap-5 items-center justify-start text-base font-medium tracking-normal leading-8'>
            <div className='p-0 pl-0 items-center flex-wrap rounded-full flex gap-4 lg:sm:xl:pl-0 sm:md:lg:xl:pr-5 text-sky-900'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://chromewebstore.google.com/detail/engagegpt-ai-for-linkedin/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1'
                className={`justify-center shadow-xl rounded-xl p-2 pl-5 pr-5 text-white bg-sky-900 max-md:px-5`}
              >
                Add to Chrome
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='left-portion'>
        <img
          className='h-2/5 mt-4 lg:mt-6 lg:w-[70rem]  sm:[50rem]'
          src={heroImage}
        />
      </div>
    </div>
  );
}

export default HeroSection;
