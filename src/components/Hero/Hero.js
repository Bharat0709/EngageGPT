import * as React from 'react';
import Slider from './Slider';
import { useFirebase } from '../../contexts/Firebase';
import { sendEmailToUser } from '../../MailService/waitlistMail';
import { sendSupportEmail } from '../../MailService/supportMail.js';

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
        const res2 = await sendSupportEmail(email);
        if (response === 'success' || res2 === 'success') {
          alert('Mail sent successfully (Also check spam folder)';
        } else if (response === 'toomanyrequests') {
          alert('Too many requests; unable to send welcome mail.');
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
      className='h-dvh m-auto flex flex-col justify-between items-center px-5 text-center max-w-[1186px] min-w-screen-lg'
    >
      <div className='self-center gap-1 m-auto flex flex-col justify-between items-start sm:items-center px-2 text-left sm:text-center max-w-[1186px] min-w-screen-lg'>
        <div className='lg:mt-[6rem] mt-20 leading-[3.1rem] self-stretch w-full text-left text-[2rem] lg:text-[3.5rem] sm:text-center font-bold lg:font-bold lg:leading-[5rem] text-sky-900'>
          Confused About How to Grow Your LinkedIn Network?
        </div>
        <div className='mt-5 text-left sm:text-center text-[1.5rem] leading-10 sm:text-xl lg:text-3xl font-medium text-sky-900'>
          Simplify your networking journey using AI.
        </div>
        <div className='flex w-full flex-wrap gap-5 justify-start sm:justify-center items-center self-center mt-7 text-base font-medium tracking-normal leading-8'>
          <div className='p-0 pl-0 w-full flex justify-start sm:justify-center flex-wrap rounded-full sm:py-4 items-center gap-4 lg:pl-5 sm:pr-5 text-sky-900'>
            <input
              type='email'
              placeholder='Your Email Address'
              value={email}
              onChange={handleInputChange}
              className='border-black border w-[17rem] sm:w-[15rem] text-left font-medium hover:shadow-lg rounded-full sm:text-center pl-6 sm:pl-3 p-2 focus:outline-none'
            />
            <button
              onClick={handleJoinWaitlist}
              disabled={loading}
              className={`justify-center shadow-xl rounded-full p-2 pl-5 pr-5 text-white bg-sky-900 max-md:px-5 ${
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
            <div className='text-green-500'>Access request in progress...! (Check spam folder)</div>
          )}
        </div>
        <div>
          <p className='blinking mt-6 mb-4 font-medium p-2 border border-sky-200 self-start sm:self-center text-sky-950 rounded-full px-6'>
            Your Network Is Your Net Worth
          </p>
        </div>
      </div>

      <Slider />
    </div>
  );
}

export default HeroSection;
