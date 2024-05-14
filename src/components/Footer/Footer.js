import { MailIcon, GlobeIcon } from '@heroicons/react/outline';
import Logo from '../../assets/images/EngageGPTLogoIocn.png';

function Footer({ scrollToSection }) {
  return (
    <footer className='bg-[#004182] text-white py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='flex items-start md:lg:xl:justify-center'>
            <img src={Logo} alt='Logo' className='h-8 mr-2' />
            <span className='font-medium text-lg'>EngageGPT</span>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Contact Us</h3>
            <ul>
              <li className='flex items-center mb-2'>
                <MailIcon className='h-5 w-5 mr-2' />
                <a href='mailto:engagegpt@gmail.com'>engagegpt@gmail.com</a>
              </li>
              <li className='flex items-center mb-2'>
                <GlobeIcon className='h-5 w-5 mr-2' />
                <a
                  href='https://www.engagegpt.in'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Our Website
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Important Links</h3>
            <ul>
              <li className='mb-2 cursor-pointer'>
                <p onClick={() => scrollToSection('home')}>About Us</p>
              </li>
              <li className='mb-2 cursor-pointer'>
                <p onClick={() => scrollToSection('features')}>Features</p>
              </li>{' '}
              <li className='mb-2 cursor-pointer'>
                <p onClick={() => scrollToSection('pricing')}>Pricing</p>
              </li>
              <li className='mb-2 cursor-pointer'>
                <p onClick={() => scrollToSection('faqs')}>FAQs</p>
              </li>{' '}
              <li className='mb-2'>
                <a href='#privacy-policy'>Privacy Policy</a>
              </li>
              <li className='mb-2'>
                <a href='#terms-of-service'>Terms of Service</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Connect with Us</h3>
            <ul>
              {/* <li className='mb-2'>
                <a
                  href='https://www.linkedin.com/company/your-company'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  LinkedIn
                </a>
              </li> */}
              <li className='mb-2'>
                <a href='mailto:engagegpt@gmail.com'>Gmail</a>
              </li>
              <li className='mb-2'>
                <a
                  href='https://chrome.google.com/webstore/category/extensions?hl=en-US'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Chrome Web Store
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
