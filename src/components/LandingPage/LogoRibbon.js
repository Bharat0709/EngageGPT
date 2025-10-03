import React from 'react';
import { motion } from 'framer-motion';
import microsoft from '@assets/images/microsoft.png';
import amazon from '@assets/images/amazon.png';
import tiger from '@assets/images/tiger-analytics.png';
import clevrr from '@assets/images/clevrr.png';
import xceedance from '@assets/images/xceedance.png';
import bata from '@assets/images/bata.png';

const InfiniteLogoRibbon = () => {
  // Company logos with their names
  const topRowLogos = [
    { name: 'Amazon', logo: amazon },
    { name: 'Microsoft', logo: microsoft },
    { name: 'Clevrr', logo: clevrr },
    { name: 'Tiger Analytics', logo: tiger },
    { name: 'Xceedance', logo: xceedance },
    { name: 'Bata', logo: bata },
  ];

  // Duplicate arrays for seamless loop
  const topRowDuplicated = [...topRowLogos, ...topRowLogos, ...topRowLogos];
  ``;

  return (
    <div className="w-full py-12 overflow-hidden">
      <div className="mx-auto mb-12">
        <p className="text-center text-gray-600 text-base md:text-base">
          Trusted by professionals from leading companies worldwide
        </p>
        {/* Optional: Stats or CTA */}
        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm">
            Join <span className="font-bold text-gray-900">1,000+</span>{' '}
            professionals already using our platform
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Top Row - Moving Left to Right */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{
              x: ['-33.33%', '0%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 10,
                ease: 'linear',
              },
            }}
          >
            {topRowDuplicated.map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-36  flex flex-col items-center justify-center gap-2  transition-shadow group"
              >
                <img
                  src={company.logo}
                  alt="logo-img"
                  className="h-auto max-h-20 object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteLogoRibbon;
