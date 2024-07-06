import * as React from 'react';
import { motion } from 'framer-motion';
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
        <div className='text-slate-800 mt-5 text-left sm:text-left text-[1.4rem] leading-[2.6rem] sm:text-xl lg:text-[1.6rem] font-medium'>
          Simplify your engagement journey using AI.
        </div>
        <div className='flex w-full flex-wrap mt-10 gap-5 justify-start sm:justify-start items-start self-start text-base font-medium tracking-normal leading-8'>
          <div className='p-0 pl-0 w-full flex justify-start sm:justify-start flex-wrap rounded-full sm:py-0 items-start gap-4 lg:pl-0 sm:pr-5 text-sky-900'>
            <a
              href='https://chromewebstore.google.com/detail/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1'
              target='_blank'
              rel='noopener noreferrer'
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='whitespace-nowrap rounded-lg bg-sky-900 px-4 py-2 font-medium text-white shadow-xl transition-colors hover:bg-slate-700'
              >
                Add to Chrome for Free
              </motion.button>
            </a>
            <a
              href='https://chat.whatsapp.com/CxMeAkMmAlnBJzVg89hkST'
              target='_blank'
              rel='noopener noreferrer'
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='whitespace-nowrap rounded-lg bg-sky-100 px-4 py-2 font-medium text-sky-900 transition-colors hover:text-sky-900  hover:border-2 hover:border-sky-900'
              >
                Join Community
              </motion.button>
            </a>
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
