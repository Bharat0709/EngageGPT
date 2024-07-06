import React from 'react';
import { motion } from 'framer-motion';
import videoFileComment from '../../assets/images/commentVideo.mp4';
import videoFileReply from '../../assets/images/replyVideo.mp4';
import videoFilePost from '../../assets/images/postVideo.mp4';
import commentIcon from '../../assets/images/commenticon.png';
import postIcon from '../../assets/images/postIcon.png';
import replyIcon from '../../assets/images/replyIcon.png';
import MoreFeatures from './FeaturesCurosel';

export const Features = () => {
  return (
    <section id='features'>
      <section className='mx-auto max-w-[14xl] px-4 lg:px-[4.5rem] pt-12 pb-4 text-sky-900'>
        <div className='mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end sm:leading-22 md:px-2'>
          <h2 className='max-w-lg text-3xl mb-4 leading-[3rem] lg:md:xl:leading-[4.4rem] font-bold md:text-5xl'>
            Engage faster with our
            <span className='text-slate-400 leading-16'>
              {' '}
              all in one solution
            </span>
          </h2>
          <a
            href='https://chromewebstore.google.com/detail/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1'
            target='_blank'
            rel='noopener noreferrer'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='whitespace-nowrap mb-8 rounded-lg bg-sky-900 px-4 py-2 font-medium text-white shadow-xl transition-colors hover:bg-slate-700'
            >
              Add Extension
            </motion.button>
          </a>
        </div>
        <div className='mb-6 grid grid-cols-12 gap-4'>
          <BounceCard className='col-span-12 md:col-span-4'>
            <CardTitle>Generate Comments</CardTitle>
            <div className='absolute bottom-0 left-4 right-4 sm:text-[12px] top-16 translate-y-1 rounded-t-2xl p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]'>
              <span className='block text-center font-semibold text-indigo-50'>
                <img className='h-44 m-auto' src={commentIcon}></img>
              </span>
            </div>
          </BounceCard>
          <BounceCard className='col-span-12 md:col-span-8'>
            <div className='absolute bottom-0 left-4 right-4 top-4 translate-y-1 rounded-t-2xl bg-gradient-to-br from-pink-400 to-red-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]'>
              <span className='block text-center font-semibold text-orange-50'>
                <div className='rounded-xl mt-2 '>
                  <video
                    className='rounded-xl self-center w-full mx-auto'
                    autoPlay
                    muted
                    loop
                    width='600'
                  >
                    <source src={videoFileComment} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </span>
            </div>
          </BounceCard>
        </div>
        <div className='mb-6 grid grid-cols-12 gap-4'>
          <BounceCard className='col-span-12 md:col-span-4 order-1 md:order-none'>
            <CardTitle>Generate Reply</CardTitle>
            <div className='absolute bottom-0 left-4 right-4 top-12 translate-y-8 rounded-t-2xl b p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]'>
              <span className='block text-center font-semibold text-red-50'>
                <img className='h-44 m-auto' src={replyIcon}></img>
              </span>
            </div>
          </BounceCard>
          <BounceCard className='col-span-12 md:col-span-8 order-2 md:order-none'>
            <div className='absolute bottom-0 left-4 right-4 top-4 translate-y-1 rounded-t-2xl bg-gradient-to-br from-green-400 to-emerald-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]'>
              <span className='block text-center font-semibold text-emerald-50'>
                <video
                  className='rounded-xl self-center w-full mx-auto'
                  autoPlay
                  muted
                  loop
                  width='600'
                >
                  <source src={videoFileReply} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              </span>
            </div>
          </BounceCard>
        </div>
        <div className='grid grid-cols-12 gap-4'>
          <BounceCard className='col-span-12 md:col-span-4'>
            <CardTitle>Generate Post</CardTitle>
            <div className='absolute bottom-0 left-4 right-4 top-10 translate-y-8 rounded-t-2xl b p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]'>
              <span className='block text-center font-semibold text-red-50'>
                <img className='h-44 m-auto' src={postIcon}></img>
              </span>
            </div>
          </BounceCard>
          <BounceCard className='col-span-12 md:col-span-8'>
            <div className='absolute bottom-0 left-4 right-4 top-4 translate-y-1 rounded-t-2xl bg-gradient-to-br from-orange-400 to-yellow-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]'>
              <span className='block text-center font-semibold text-emerald-50'>
                <video
                  className='rounded-xl self-center w-full mx-auto'
                  autoPlay
                  muted
                  loop
                  width='600'
                >
                  <source src={videoFilePost} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              </span>
            </div>
          </BounceCard>
        </div>
      </section>
      <MoreFeatures />
    </section>
  );
};

const BounceCard = ({ className, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: '-1deg' }}
      className={`group relative min-h-[300px] cursor-default overflow-hidden rounded-2xl bg-slate-100 p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h3 className='mx-auto text-black  text-center text-2xl font-semibold'>
      {children}
    </h3>
  );
};

export default Features;
