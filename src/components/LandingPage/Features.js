import React from 'react';
import { features } from '@assets/data/features';

const Features = () => {
  return (
    <div id="features" className="px-6 py-12 w-full justify-center">
      <h2 className="lg:text-3xl geist lg:mt-1 mt-6 text-xl font-bold text-center mb-8 border-4 border-black shadow-[5px_5px_0px_black] py-2 px-6 max-w-md mx-auto bg-white">
        Features
      </h2>
      <div className="grid grid-cols-1 lg:p-6 p-0  md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`border border-gray-200 rounded-xl p-6 flex flex-col text-white ${feature.gradient} transition-all hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer`}
            style={{ minHeight: '220px', position: 'relative' }}
          >
            <div className="mb-4 flex items-start justify-between">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/40">
                {feature.icon}
              </span>
              <div
                className={`-top-6 relative left-6 px-3 py-1 ${feature.tagColor} text-sm font-bold text-white bg-black rounded-bl-xl`}
              >
                {feature.tag}
              </div>
            </div>
            <h3 className="text-2xl ovo-regular text-black !font-bold mb-2">
              {feature.title}
            </h3>
            <p className="mb-6  geist text-black/70 flex-grow">
              {feature.description}
            </p>
            <div className="mt-auto flex">
              <a
                href={feature.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm geist font-medium bg-white text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] border border-black flex items-center"
              >
                {feature.learnMoreText} <span className="ml-1">&gt;</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
