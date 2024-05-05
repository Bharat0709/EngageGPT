import * as React from 'react';
import logo from '../../assets/images/EngageGPTLogo.png';
import { useFirebase } from '../../contexts/Firebase';
import { sendEmailToUser } from '../../MailService/waitlistMail';

function FooterCTA() {
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
      id='footercta'
      className='flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 text-center fill-slate-50 min-h-[697px] max-md:px-5'
    >
      <img
        alt='footer'
        loading='lazy'
        src='https://cdn.builder.io/api/v1/image/assets/TEMP/a5a163a55b06fe58ecb6719ccc945a065b29d705623d155d233aa1f2fa374e9d?'
        className='object-cover absolute inset-0 size-full'
      />
      <div className='flex relative justify-center items-center flex-col max-w-full w-[701px] max-md:mt-10'>
        <div className='flex items-center'>
          <img src={logo} alt='Logo' className='m-3 h-16' />
        </div>
        <div className='mt-7 text-4xl font-bold tracking-tighter leading-normal text-black max-md:max-w-full'>
          Free 100 credits per day! Join Waitlist Nowwwww
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
        <div>
          <p className='mt-4 mb-4 p-2 border text-sky-950 rounded-full px-8'>
            Join now! Slots are filling up fast! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterCTA;
