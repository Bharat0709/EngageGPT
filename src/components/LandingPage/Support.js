import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getCalApi } from '@calcom/embed-react';

const BookDemo = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '30min' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);
  return (
    <div className="w-full bg-white max-w-2xl lg:mb-0 mb-4  rounded-2xl flex flex-col items-center justify-center  mt-4 mx-auto p-4 space-y-6">
      <div>
        <p className="mb-1.5 text-sm font-light uppercase">{'/BOOK A DEMO'}</p>
        <hr className="border-neutral-700" />
      </div>
      <p className="max-w-lg text-xl leading-relaxed">
        <>
          <strong>Have questions?</strong> We'd love to answer! Book a demo now
        </>
      </p>
      <div>
        <Typewrite
          examples={[
            'How Does EngageGPT works?',
            'How to connect EngageGPT with LinkedIn?',
            'Is it safe to use EngageGPT Chrome Extension?',
            'What are the pricing plans for EngageGPT?',
          ]}
        />
        <hr className="border-neutral-300" />
      </div>

      <div className="bg-white lg:flex items-center  mt-1 justify-center">
        <div className="px-6 cursor-pointer py-2 lg:text-lg text-md font-medium border  border-gray-300 bg-white text-black w-fit">
          <button
            data-cal-namespace="30min"
            data-cal-link="engagegpt-pbr2vh/30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          >
            Book a Demo
          </button>
        </div>
      </div>
    </div>
  );
};

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;

const SWAP_DELAY_IN_MS = 5500;

const Typewrite = ({ examples }) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="mb-2.5 text-sm font-light uppercase">
      <span className="inline-block size-2 bg-neutral-950" />
      <span className="ml-3">
        EXAMPLE:{' '}
        {examples[exampleIndex].split('').map((l, i) => (
          <motion.span
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: 'easeInOut',
            }}
            key={`${exampleIndex}-${i}`}
            className="relative"
          >
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: 'easeInOut',
              }}
              className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-950"
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};

export default BookDemo;
