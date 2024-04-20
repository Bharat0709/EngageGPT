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
    <div className='h-dvh m-auto flex flex-col justify-between items-center px-5 text-center max-w-[1086px] min-w-screen-lg'>
      <div className='self-center gap-1 m-auto flex flex-col justify-between items-center px-5 text-center max-w-[1086px] min-w-screen-lg'>
        <div className='mt-24 leading-[2.8rem] self-stretch w-full text-[1.5rem] lg:text-5xl font-semibold lg:leading-[5rem] xl:leading-[5rem] text-sky-900 max-md:max-w-full'>
          Cultivate Connections, Elevate Engagement Engage GPT: AI for LinkedIn
        </div>
        <div className='mt-3 sm:mt-8 md:mt-8 lg:mt-8 text-xl leading-10 sm:text-xl lg:text-2xl text-sky-900 max-md:mt-7 max-md:max-w-full'>
          Revolutionizing Engagement on LinkedIn
        </div>
        <div className='flex flex-col w-auto flex-wrap gap-5 items-center justify-center mt-10 text-base font-medium tracking-normal leading-8'>
          <div className='justify-center items-center w-auto flex-wrap rounded-full flex p-4 gap-4 pl-5 pr-5 text-sky-900 max-md:px-5'>
            <input
              type='email'
              placeholder='Your Email Address'
              value={email}
              onChange={handleInputChange}
              className='border w-auto  text-center hover:shadow-lg rounded-full p-2 focus:outline-none'
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
