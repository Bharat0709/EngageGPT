import React from 'react';
import { features } from '../assets/data/features';

const IMG_PADDING = 12;

const TextParallaxContent = ({ children }) => (
  <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
    {children}
  </div>
);

const Content = ({ heading, description }) => (
  <div className="grid lg:mx-16 w-auto grid-cols-1 gap-8 px-8 m-2 mb-2 rounded-xl pt-8 bg-slate-100 pb-8 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">{heading}</h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">{description}</p>
    </div>
  </div>
);

export const MoreFeatures = () => (
  <div className="bg-white w-full grid group-hover:translate-y-2 group-hover:rotate-[2deg]">
    {features.map((feature, index) => (
      <TextParallaxContent key={index}>
        <Content heading={feature.heading} description={feature.description} />
      </TextParallaxContent>
    ))}
  </div>
);

export default MoreFeatures;
