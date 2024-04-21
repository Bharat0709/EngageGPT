import * as React from 'react';
import logo from '../../assets/images/EngageGPTLogo.png';

function FooterCTA() {
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
    <div id='footercta' className='flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 text-center fill-slate-50 min-h-[697px] max-md:px-5'>
      <img
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
        <div className='flex flex-col w-auto flex-wrap gap-5 items-center justify-center mt-10 text-base font-medium tracking-normal leading-8'>
          <div className='justify-center items-center w-auto flex-wrap rounded-full flex p-4 gap-4 pl-5 pr-5 text-sky-900 max-md:px-5'>
            <input
              type='email'
              placeholder='Your Email Address'
              value={email}
              onChange={handleInputChange}
              className='border w-auto text-center hover:shadow-lg rounded-full p-2 focus:outline-none'
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
    </div>
  );
}

export default FooterCTA;
