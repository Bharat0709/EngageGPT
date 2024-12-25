import * as React from 'react';
import logo from '../assets/images/EngageGPTLogo.png';

function FooterCTA() {

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
          Free 100 credits per d<span className='text-gray-400'>y</span>ay<span className='text-gray-400'>yyyy</span>!
        </div>
        <div className='flex w-full flex-wrap mt-8 gap-5 justify-start sm:justify-start items-start self-start text-base font-medium tracking-normal leading-8'>
          <div className='flex w-full flex-wrap gap-5 items-center justify-center text-base font-medium tracking-normal leading-8'>
            <div className='p-0 pl-0 items-center flex-wrap rounded-full flex gap-4 lg:sm:xl:pl-0 sm:md:lg:xl:pr-5 text-sky-900'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://chromewebstore.google.com/detail/engagegpt-ai-for-linkedin/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1'
                className={`justify-center shadow-xl rounded-xl p-2 pl-5 pr-5 text-white bg-sky-900 max-md:px-5`}
              >
                Add to chrome for free
              </a>
            </div>
          </div>
        </div>
        <div>
          <p className='blinking mt-6 mb-4 font-medium p-2 border border-sky-200 self-start sm:self-center text-sky-950 rounded-full px-6'>
            Your Network Is Your Net Worth
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterCTA;
