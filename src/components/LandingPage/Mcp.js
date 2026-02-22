import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const McpFeature = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-4 rounded-3xl  justify-center bg-neutral-50 px-8 py-8 text-neutral-800">
      <BlockInTextCard
        tag="/ MCP Integration"
        text={
          <p className="ovo-regular italics font-bold">
            <em> Bring your LinkedIn DNA to Claude.</em> <br />
            <br />
            <p className="geist !text-md">
              Connect your post history to <em>Claude AI</em> using our MCP
              server to generate content that feels authentically yours.
            </p>
          </p>
        }
        examples={[
          'Analyze my writing style from my last 25 posts.',
          'Write a post about AI Trends in my unique voice.',
          'Suggest 5 hooks for a new post based on my history.',
          'Draft a personalized reply in my signature style.',
        ]}
        onAction={() => navigate('/login')}
      />
    </div>
  );
};

const BlockInTextCard = ({ tag, text, examples, onAction }) => {
  return (
    <div className="w-full max-w-xl space-y-6">
      <div>
        <p className="mb-1.5 text-sm font-light uppercase tracking-wider">
          {tag}
        </p>
        <hr className="border-neutral-700" />
      </div>
      <p className="max-w-lg text-xl leading-relaxed geist">{text}</p>
      <div>
        <Typewrite examples={examples} />
        <hr className="border-neutral-300" />
      </div>
      <button
        onClick={onAction}
        className="w-full border bg-white border-neutral-950 py-3 text-sm font-medium transition-colors hover:bg-neutral-950 hover:text-neutral-100 uppercase tracking-widest geist"
      >
        Explore MCP Integration
      </button>
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
