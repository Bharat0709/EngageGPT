import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      const footerSection = document.querySelector('footer');

      if (!heroSection || !footerSection) return;

      const heroBottom = heroSection.getBoundingClientRect().bottom;
      const footerTop = footerSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Show FloatingNav only if the hero section has scrolled past AND footer is NOT visible
      setIsVisible(heroBottom <= 0 && footerTop > windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed lg:bottom-3 bottom-0  w-full mx-auto justify-center items-center lg:w-fit p-2 backdrop-blur-lg lg:rounded-full left-0 right-0  z-50">
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="flex gap-3 p-2 px-2 justify-center backdrop-blur-lg rounded-full items-center ">
      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
        className="relative mx-auto lg:flex rounded-full hidden px-2 w-fit  border border-[#004182] lg:bg-white p-0"
      >
        <Tab setPosition={setPosition} section="features">
          Features
        </Tab>
        <Tab setPosition={setPosition} section="pricing">
          Pricing
        </Tab>
        <Tab setPosition={setPosition} section="faqs">
          FAQs
        </Tab>
        <Cursor position={position} />
      </ul>
      <button>
        <div className="px-4 flex mx-auto items-center justify-center">
          <button
            onClick={handleGetStarted}
            className="px-6 py-2 text-md lg:text-lg lg:rounded-full rounded-none font-medium bg-[#004182] text-white w-fit transition-all shadow-[5px_5px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            Get Started
          </button>
        </div>
      </button>
    </div>
  );
};

const Tab = ({ children, setPosition, section }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElement = document.getElementById(section);
      if (!sectionElement || !ref.current) return;

      const rect = sectionElement.getBoundingClientRect();
      const isInView =
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2;

      if (isInView) {
        document
          .querySelectorAll('.nav-item')
          .forEach((item) => item.classList.remove('active'));
        ref.current.classList.add('active');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [section]);

  const handleClick = () => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={handleClick}
      className="nav-item lg:flex hidden relative z-10 cursor-pointer px-3 py-1.5 text-sm text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      initial={false}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="absolute z-0 top-[5px] py-4 h-7 rounded-full bg-[#004182] md:h-9"
    />
  );
};

export default FloatingNav;
