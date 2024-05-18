import * as React from 'react';
import Slider from './Slider';
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
        console.log(response);
        if (response === 'success') {
          alert('Mail sent successfully');
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
      <div className='self-center gap-1 m-auto flex flex-col justify-between items-center px-5 text-center max-w-[1186px] min-w-screen-lg'>
        <div className='mt-24  sm:text-center leading-[2.6rem]  self-stretch w-full text-[1.5rem] lg:text-5xl lg:text-center font-semibold lg:leading-[5rem] xl:leading-[5rem] text-sky-900 max-md:max-w-full'>
        Struggling to stand out on LinkedIn?
        </div>
        <div className='mt-3 sm:text-center sm:mt-8 sm:w-full  lg:text-center md:mt-8 lg:mt-8 text-xl leading-10 sm:text-xl lg:text-3xl text-sky-900 max-md:mt-7 max-md:max-w-full'>
          EngageGPT simplifies your networking journey using AI.
        </div>
        <div className='flex w-full flex-wrap gap-5 items-center justify-center mt-10 text-base font-medium tracking-normal leading-8'>
          <div className=' p-0 pl-0 items-center w-full justify-center flex-wrap rounded-full flex sm:p-4 lg:p-4 md:p-4 xl:p-4 gap-4 lg:sm:xl:pl-5 sm:md:lg:xl:pr-5 text-sky-900'>
            <input
              type='email'
              placeholder='Your Email Address'
              value={email}
              onChange={handleInputChange}
              className='border-black border sm:md:xl:w-[17rem] w-auto text-center font-medium hover:shadow-lg rounded-full sm:lg:md:xl:pl-4 sm:lg:md:xl:text-left p-2 focus:outline-none'
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
            <div className='text-green-500'>Email added successfully!</div>
          )}
        </div>
        <div>
          <p className='blinking mt-4 mb-4 p-2 border text-sky-950 rounded-full px-3'>
            Join now! Slots are filling up fast!
          </p>
        </div>
      </div>
      <Slider />
    </div>
  );
}

export default HeroSection;
