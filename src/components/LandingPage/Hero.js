import React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EngageGPTLogo from '@assets/images/EngageGPTLogo.png';
import { goTo } from '@utils/navigator';
import { FaCheck } from 'react-icons/fa';
import OpenAI from '@assets/images/OpenAI-black-monoblossom.png';
import Groq from '@assets/images/groq.svg';
import Mistral from '@assets/images/Mistral-Ai.svg';
import Gemini from '@assets/images/Gemini.svg';
import Perplexity from '@assets/images/perplexity-text.svg';
import InfiniteLogoRibbon from './LogoRibbon';
import { getCalApi } from '@calcom/embed-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '30min' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (!heroSection) return;

      const heroBottom = heroSection.getBoundingClientRect().bottom;
      setIsVisible(heroBottom <= 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    goTo('/signup');
  };

  const handleViewDemo = () => {};

  return (
    <section
      id="home"
      className="w-full flex flex-col items-center px-4 lg:pb-12 pt-4 overflow-hidden"
    >
      <div className="mb-8 flex lg:justify-between justify-center w-full items-center gap-4 flex-wrap animate-fade-in">
        <img className="h-12" src={EngageGPTLogo} alt="EngageGPT Logo" />
        {isVisible && (
          <div className="fixed lg:left-[40vw] top-2 p-2 backdrop-blur-lg rounded-full z-[100] flex items-center justify-center">
            <a
              href="https://chromewebstore.google.com/detail/engagegpt-ai-for-linkedin/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center pr-4 pl-3 py-2 bg-white rounded-full border border-gray-500 hover:border-gray-300 transition-colors"
            >
              <span className="px-3  py-1 bg-[#004182] text-white text-xs lg:text-sm font-medium rounded-full mr-2">
                HEY!
              </span>
              <span className="text-gray-700 mr-2 text-xs lg:text-base font-medium">
                Add to Chrome for Free!
              </span>
            </a>
          </div>
        )}

        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://chromewebstore.google.com/detail/engagegpt-ai-for-linkedin/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1"
          className="inline-flex lg:ml-0 ml-4 items-center pr-4 pl-3 py-2 bg-white rounded-full border border-gray-500 hover:border-gray-300 transition-colors"
        >
          <span className="px-3  py-1 bg-[#004182] text-white text-xs lg:text-sm font-medium rounded-full mr-2">
            HEY!
          </span>
          <span className="text-gray-700 mr-2 flex items-center gap-2 text-xs lg:text-base font-medium">
            Add to Chrome for Free!
          </span>
        </a>

        <button onClick={handleViewDemo}>
          <div className="bg-white   hidden lg:flex items-center justify-center">
            <a
              href="https://www.youtube.com/playlist?list=PLYHoCaYE8EoD6YBlcDrPoHSYTIvAjW3vI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 text-sm font-medium bg-white text-black w-fit transition-all shadow-[5px_5px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              View Demo
            </a>
          </div>
        </button>
      </div>
      {/* Main Hero Content */}
      <div className="text-center max-w-5xl mx-auto mt-8 lg:mt-20 px-4 mb-6 lg:mb-0">
        <div className="grid place-content-center">
          <p className="max-w-3xl font-regular text-black text-center text-[2.3rem] lg:text-6xl leading-[1.3] lg:leading-[1.3]">
            Your{' '}
            <span className="relative ">
              All-in-One
              <svg
                viewBox="0 0 286 73"
                fill="none"
                className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{
                    duration: 1.25,
                    ease: 'easeInOut',
                  }}
                  d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                  stroke="#004182"
                  strokeWidth="3"
                />
              </svg>
            </span>
            {'   '}
            LinkedIn Growth Assistant
          </p>
        </div>
        <p className="text-lg w-full lg:text-2xl text-gray-600 mt-6 max-w-5xl mb-6">
          Engage - Analyze - Automate
        </p>
        <div className="flex flex-col w-full gap-3 items-center justify-center">
          <div className="flex items-center gap-4 justify-center">
            <button onClick={handleGetStarted}>
              <div className="bg-white gap-4 flex flex-col items-center justify-center">
                <div className="px-6 py-2 lg:text-lg text-md font-medium bg-[#004182] text-white w-fit">
                  Get Started
                </div>
              </div>
            </button>
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
          <div className="animate-fade-in mt-3 inline-flex items-center px-4 py-2 rounded-full transition-colors">
            <span className="text-gray-700 flex gap-2 items-center text-sm font-medium">
              <FaCheck className="text-green-500 mr-1" />
              No Credit Card Required
            </span>
          </div>
          <div className="animate-fade-in mb-4 inline-flex items-center px-4 py-1 rounded-full transition-colors">
            <span className="text-gray-700 flex gap-2 items-center text-sm font-medium">
              <FaCheck className="text-green-500 mr-1" />
              200 Credits on Sign Up
            </span>
          </div>
          <p className="text-xl lg:text-xl text-gray-700 flex gap-2 items-center  font-medium">
            Powered By
          </p>
          <div className="flex p-4 w-full lg:flex-nowrap flex-wrap lg:gap-14 gap-10 justify-center items-center">
            <img
              className="lg:h-16 h-12 hover:scale-110 transition-all duration-100"
              src={OpenAI}
              alt="Powered by Groq for fast inference."
            />

            <img
              className="lg:h-16 h-12 hover:scale-110 transition-all duration-100"
              src={Groq}
              alt="Powered by Groq for fast inference."
            />

            <img
              className="lg:h-16 h-12 hover:scale-110 transition-all duration-100"
              src={Mistral}
              alt="Powered by Groq for fast inference."
            />

            <img
              className="lg:h-16 h-12 hover:scale-110 transition-all duration-100"
              src={Gemini}
              alt="Powered by Groq for fast inference."
            />

            <img
              className="lg:h-12 h-12 hover:scale-110 transition-all duration-100"
              src={Perplexity}
              alt="Perplexity"
            />
          </div>
        </div>
      </div>
      {/* <BookDemo /> */}
      <InfiniteLogoRibbon />
    </section>
  );
};

export default HeroSection;
