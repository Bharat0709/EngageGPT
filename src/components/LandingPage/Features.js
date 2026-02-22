import React from 'react';
import { motion } from 'framer-motion';
import { features } from '@assets/data/features';
import { McpFeature } from './Mcp';

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative border-b border-r border-gray-100 p-8 flex flex-col min-h-[300px] hover:bg-neutral-50/50 transition-colors"
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Content */}
      <div className="mb-6 flex items-center justify-between">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 group-hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>
        {feature.tag && (
          <span className="text-[10px] font-bold tracking-widest uppercase py-1 px-2 bg-black text-white rounded-sm">
            {feature.tag}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold ovo-regular mb-3 text-neutral-900 geist">
        {feature.title}
      </h3>
      <p className="text-sm text-neutral-500 leading-relaxed geist mb-8 flex-grow">
        {feature.description}
      </p>

      <div className="mt-auto">
        <a
          href={feature.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs font-bold tracking-wider uppercase text-neutral-900 group-hover:gap-2 transition-all geist"
        >
          {feature.learnMoreText || 'Learn More'}
          <span className="ml-1 transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <div id="features" className="w-full bg-white  pt-12">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="lg:text-4xl text-2xl font-bold text-center mb-4 tracking-tight geist">
            Everything you need to <span className="italic">dominate</span>{' '}
            LinkedIn
          </h2>
          <p className="text-neutral-500 text-center max-w-2xl mx-auto geist text-sm lg:text-base">
            Engineered for high-performing creators and businesses.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-l border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>

      <div className="py-8  mx-6">
        <McpFeature />
      </div>
    </div>
  );
};

export default Features;
