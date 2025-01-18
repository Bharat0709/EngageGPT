import React, { useState } from 'react';
import logo from '../../assets/images/EngageGPTLogo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='p-4 self-center left-3 right-3 top-3 justify-between fixed w-full text-black rounded-xl bg-white/75 flex b items-center z-50 backdrop-blur-lg'>
      <div className='flex items-center'>
        <img src={logo} alt='Logo' className='h-10' />
      </div>

      {/* Mobile Menu Button */}
      <div className='lg:hidden'>
        <button
          onClick={toggleMenu}
          className='text-black hover:text-gray-300 focus:outline-none focus:text-gray-300'
        >
          <svg
            className='h-6 w-6 fill-current mr-2'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            {isOpen ? (
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4 6h16v1H4V6zm0 5h16v1H4v-1zm16 4H4v1h16v-1z'
              />
            ) : (
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4 6h16v2H4v-2zm0 5h16v2H4v-2zm16 5H4v2h16v-2z'
              />
            )}
          </svg>
        </button>
      </div>

      {/* Desktop Menu Items */}
      <div className='hidden lg:flex lg:items-center lg:space-x-6'>
        <a href='#home' className='text-base text-black hover:text-gray-300'>
          Home
        </a>
        <a href='#features' className='text-base text-black hover:text-gray-300'>
          Features
        </a>
        <a href='#pricing' className='text-base text-black hover:text-gray-300'>
          Pricing
        </a>
        <a href='#faqs' className='text-base text-black hover:text-gray-300'>
          FAQs
        </a>
      </div>

      {/* View Demo Button */}
      <button className='hidden lg:block mr-2 text-sm text-white bg-[#004182] p-2 pl-4 pr-4 rounded-lg'>
        View Demo
      </button>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className='lg:hidden absolute rounded-xl top-16 right-0 m-auto left-0 bg-white w-10/12 text-black'>
          <div className='flex flex-col p-4 space-y-2'>
            <a
              href='#home'
              className='text-base hover:text-gray-300 border-t border-gray-200 pt-2'
            >
              Home
            </a>
            <a
              href='#features'
              className='text-base hover:text-gray-300 border-t border-gray-200 pt-2'
            >
              Features
            </a>
            <a
              href='#pricing'
              className='text-base hover:text-gray-300 border-t border-gray-200 pt-2'
            >
              Pricing
            </a>
            <a
              href='#faqs'
              className='text-base hover:text-gray-300 border-t border-gray-200 pt-2'
            >
              FAQs
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
