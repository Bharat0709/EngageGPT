import * as React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../../assets/images/networking.png';
import { useFirebase } from '../../contexts/Firebase';
import { sendEmailToUser } from '../../MailService/waitlistMail';

function HeroSection() {
  const { handleAddUser } = useFirebase();
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleJoinWaitlist = async () => {
    setError(null);
    setSuccess(false);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      const res = await handleAddUser(email);
      if (res === 'success') {
        setSuccess(true);
        setLoading(false);
        const response = await sendEmailToUser(email);
        if (response === 'success') {
          alert('Mail sent successfully');
        } else {
          alert('Error sending welcome mail!');
        }
        setEmail('');
      } else if (res === 'error') {
        setError('Error Adding your Email! Please Try Again');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      id='home'
      className='lg:md:sm:flex bg-white mt-0 h-full md:lg:mx-14 justify-between gap-24 items-center px-3 text-center min-w-screen-lg'
    >
      <div className='gap-1 m-auto flex flex-col justify-between items-start sm:items-left px-2 text-left sm:text-left max-w-[1186px] min-w-screen-lg'>
        <div className='text-slate-400 lg:mt-[-04rem] mt-[10rem] leading-[2.2rem] self-stretch w-full text-left text-[1.7rem] lg:text-[2.8rem] sm:text-left font-bold lg:font-bold lg:leading-[4rem]'>
          Confused about
          <span className='text-sky-800 leading-[2.7rem]'>
            {' '}
            how to keep your LinkedIn network engaged?
          </span>
        </div>
        <div className='text-slate-800 mt-5 text-left sm:text-left text-[1.4rem] leading-[2.6rem] sm:text-xl lg:text-[1.6rem] font-medium'>
          Simplify your engagement journey using AI.
        </div>
        <div className='flex w-full flex-wrap mt-10 gap-5 justify-start sm:justify-start items-start self-start text-base font-medium tracking-normal leading-8'>
          <div className='flex w-full flex-wrap gap-5 items-center justify-start text-base font-medium tracking-normal leading-8'>
            <div className='p-0 pl-0 items-center flex-wrap rounded-full flex gap-4 lg:sm:xl:pl-0 sm:md:lg:xl:pr-5 text-sky-900'>
              <input
                type='email'
                placeholder='Your Email Address'
                value={email}
                onChange={handleInputChange}
                className='border sm:md:xl:w-[17rem] w-auto text-center font-medium hover:shadow-lg rounded-xl sm:lg:md:xl:pl-4 sm:lg:md:xl:text-left p-2 focus:outline-none'
              />
              <button
                onClick={handleJoinWaitlist}
                disabled={loading}
                className={`justify-center shadow-xl rounded-xl p-2 pl-5 pr-5 text-white bg-sky-900 max-md:px-5 ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                }`}
              >
                {loading ? 'Joining...' : 'Get Access'}
              </button>
            </div>
            {error && (
              <div className='text-red-500'>
                Failed to add email... Try Again!!
              </div>
            )}
            {success && (
              <div className='text-green-500'>Email added successfully! (Check Spam Folder Also)</div>
            )}
          </div>
        </div>
      </div>
      <div className='left-portion'>
        <img
          className='h-2/5 mt-4 lg:mt-6 lg:w-[70rem]  sm:[50rem]'
          src={heroImage}
        />
      </div>
    </div>
  );
}

export default HeroSection;
