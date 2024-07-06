import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

export const MoreFeatures = () => {
  return (
    <div className='bg-white w-full grid group-hover:translate-y-2 group-hover:rotate-[2deg] '>
      <TextParallaxContent>
        <Content
          heading={'Tracks Active Days on Linkedin'}
          description={
            'Gain insights into your LinkedIn activity. Monitor your presence and engagement over time.'
          }
        />
      </TextParallaxContent>
      <TextParallaxContent>
        <Content
          heading={'Create Posts Collections'}
          description={
            'Curate and categorize your posts according to themes, campaigns, or target audiences.'
          }
        />
      </TextParallaxContent>
      <TextParallaxContent>
        <Content
          heading={'Custom Connection Note'}
          description={
            'Make a lasting impression by personalizing your connection requests on LinkedIn.'
          }
        />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      {children}
    </div>
  );
};

const Content = ({ heading, description }) => (
  <div className='grid lg:md:xl:mx-16 w-auto grid-cols-1 gap-8 px-8 m-2 mb-2 rounded-xl pt-8 bg-slate-100 pb-8 md:grid-cols-12'>
    <h2 className='col-span-1 text-3xl font-bold md:col-span-4'>{heading}</h2>
    <div className='col-span-1 md:col-span-8'>
      <p className='mb-4 text-xl text-neutral-600 md:text-2xl'>{description}</p>
    </div>
  </div>
);

export default MoreFeatures;
