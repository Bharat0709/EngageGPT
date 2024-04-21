import * as React from 'react';
import Slider from './Slider';

function HeroSection() {
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

    // Validate email address
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://linkedai.onrender.com/api/v1/users/addtowaitlist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add email to guest user list');
      }

      setSuccess(true);
      setEmail('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id='home'
      className='h-dvh m-auto flex flex-col justify-between items-center px-5 text-center max-w-[1186px] min-w-screen-lg'
    >
      <div className='self-center gap-1 m-auto flex flex-col justify-between items-center px-5 text-center max-w-[1186px] min-w-screen-lg'>
        <div className='mt-24  sm:text-center leading-[2.6rem]  self-stretch w-full text-[1.5rem] lg:text-5xl lg:text-center font-semibold lg:leading-[5rem] xl:leading-[5rem] text-sky-900 max-md:max-w-full'>
          Enhanced Engagement, Seamless Networking: Powered by ChatGPT | Gemini
        </div>
        <div className='mt-3 sm:text-center sm:mt-8 sm:w-full  lg:text-center md:mt-8 lg:mt-8 text-xl leading-10 sm:text-xl lg:text-2xl text-sky-900 max-md:mt-7 max-md:max-w-full'>
          Revolutionizing Engagement on LinkedIn using AI
        </div>
        <div className='flex w-full flex-wrap gap-5 items-center justify-center mt-10 text-base font-medium tracking-normal leading-8'>
          <div className=' p-0 pl-0 items-center w-full justify-center flex-wrap rounded-full flex sm:p-4 lg:p-4 md:p-4 xl:p-4 gap-4 lg:sm:xl:pl-5 sm:md:lg:xl:pr-5 text-sky-900'>
            <input
              type='email'
              placeholder='Your Email Address'
              value={email}
              onChange={handleInputChange}
              className='border sm:md:xl:w-[17rem] w-auto text-center font-medium hover:shadow-lg rounded-full sm:lg:md:xl:pl-4 sm:lg:md:xl:text-left p-2 focus:outline-none'
            />
            <button
              onClick={handleJoinWaitlist}
              disabled={loading}
              className={`justify-center shadow-xl rounded-full p-2 pl-5 pr-5 text-white bg-sky-900 max-md:px-5 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
            >
              {loading ? 'Joining...' : 'Join Waitlist'}
            </button>
          </div>
          {error && (
            <div className='text-red-500'>
              Failed to add email... Try Again!!
            </div>
          )}
          {success && (
            <div className='text-green-500'>Email added successfully!</div>
          )}
        </div>
      </div>
      <Slider />
    </div>
  );
}

export default HeroSection;
