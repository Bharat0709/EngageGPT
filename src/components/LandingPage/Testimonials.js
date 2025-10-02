import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { testimonials } from '../../assets/data/testimonials';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/signup');
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Calculate indexes for carousel display
  const getVisibleIndexes = () => {
    const visibleCount =
      window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const indexes = [];

    for (let i = 0; i < visibleCount; i++) {
      indexes.push((activeIndex + i) % testimonials.length);
    }

    return indexes;
  };

  const [visibleIndexes, setVisibleIndexes] = useState(getVisibleIndexes());

  useEffect(() => {
    const handleResize = () => {
      setVisibleIndexes(getVisibleIndexes());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line
  }, [activeIndex]);

  useEffect(() => {
    setVisibleIndexes(getVisibleIndexes());
    // eslint-disable-next-line
  }, [activeIndex]);

  return (
    <div id="testimonials" className="w-full px-4 py-12">
      <div className="max-w-[74rem] mx-auto px-4 lg:px-0">
        <div className="text-center mb-6">
          <motion.h2
            className="lg:text-3xl lg:mt-1 mt-6 text-xl font-bold text-center mb-8 border-4 border-black shadow-[5px_5px_0px_black] py-2 px-6 max-w-md mx-auto bg-white relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            className="text-gray-600 mt-4 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join our satisfied users who have transformed their networking
            workflow with EngageGPT.
          </motion.p>
        </div>

        <div className="border  w-fit mb-12 border-gray-700 mx-auto p-2 backdrop-blur-lg rounded-full flex items-center justify-center">
          <span className="text-gray-700 font-bold text-xs px-4 lg:text-base ">
            Rated 4.6 ⭐on Chrome Web Store
          </span>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {visibleIndexes.map((index, i) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-full mb-2 md:w-1/2 lg:w-1/3"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="bg-white p-6 px-4 py-2 text-sm font-medium  text-black transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] border border-black flex items-center duration-300 h-full flex-col relative overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 w-full h-1 ${testimonials[index].color}`}
                  />
                  <div className="mb-4 w-full flex mt-2 justify-between items-start">
                    <div className="flex w-full  items-start justify-between">
                      <div className="">
                        <p className="font-bold">{testimonials[index].name}</p>
                        <p className="text-sm text-gray-600">
                          {testimonials[index].designation}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full ${testimonials[index].color} flex items-center justify-center text-white`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 w-full text-left flex-grow">
                    "{testimonials[index].review}"
                  </p>
                  <div className="flex pt-4 items-start w-full mb-2 border-t border-gray-100">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-8 h-8 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button onClick={handleGetStarted}>
            <div className="bg-white  flex items-center justify-center">
              <div className="px-6 py-2 text-lg font-medium bg-[#004182] text-white w-fit transition-all shadow-[5px_5px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                Join us!
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
