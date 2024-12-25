    import React from 'react';
    import { motion } from 'framer-motion';
    import MoreFeatures from './FeaturesCurosel';
    import { featureCards } from '../assets/data/featureCards';
    
    export const Features = () => {
      return (
        <section id='features'>
          <section className='mx-auto max-w-[14xl] px-4 lg:px-[4.5rem] pt-12 pb-4 text-sky-900'>
            <div className='mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end sm:leading-22 md:px-2'>
              <h2 className='max-w-lg text-3xl mb-4 leading-[3rem] lg:md:xl:leading-[4.4rem] font-bold md:text-5xl'>
                Engage faster with our
                <span className='text-slate-400 leading-16'> all in one solution</span>
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
            <div className='mb-3 grid grid-cols-12 gap-4'>
              {featureCards.map(({ title, src, additionalClasses }, index) => (
                <BounceCard key={index} className='col-span-12 md:col-span-4'>
                  <CardTitle>{title}</CardTitle>
                  <div
                    className={`absolute bottom-0 left-4 right-4 sm:text-[12px] ${additionalClasses} rounded-t-2xl p-2 transition-transform duration-250 group-hover:translate-y-4 group-hover:rotate-[2deg]`}
                  >
                    <iframe
                      height="200"
                      width="550"
                      className='rounded-xl self-center w-full mx-auto'
                      src={src}
                      title={title}
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                </BounceCard>
              ))}
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
          className={`group relative min-h-[300px] cursor-default overflow-hidden rounded-2xl bg-slate-100 p-4 ${className}`}
        >
          {children}
        </motion.div>
      );
    };
    
    const CardTitle = ({ children }) => {
      return (
        <h3 className='mx-auto text-black mt-0 text-center text-xl font-semibold'>
          {children}
        </h3>
      );
    };
    
    export default Features;
