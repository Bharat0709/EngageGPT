import * as React from 'react';
import { useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { SiGooglechrome } from 'react-icons/si';
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from 'framer-motion';

function FooterCTA() {
  return (
    <div
      className="lg:mx-4 mx-2"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='2' height='40' fill='rgba(0,0,0,0.05)'/%3E%3Crect y='0' x='0' width='40' height='2' fill='rgba(0,0,0,0.05)'/%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px',
      }}
    >
      <AuroraHero />
    </div>
  );
}

const COLORS_TOP = ['#1E67C6'];

const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="rounded-2xl bg-gray-950 px-4 py-16 mx-auto text-gray-200"
    >
      <div className="flex flex-col items-center">
        <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
          EngageGPT
        </span>
        <h1 className="max-w-3xl mb-8 ovo-regular bg-gradient-to-br from-white mt-4 to-gray-500 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-3xl sm:leading-tight md:text-5xl md:leading-tight">
          Supercharge your LinkedIn engagement
        </h1>
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
          <a
            href="https://chromewebstore.google.com/detail/engagegpt-ai-for-linkedin/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1"
            className="flex items-center gap-1.5 font-medium"
          >
            {' '}
            <SiGooglechrome className="text-white" /> Add to Chrome - It's Free{' '}
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </a>
        </motion.button>
      </div>
    </motion.section>
  );
};
export default FooterCTA;
