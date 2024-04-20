import * as React from 'react';

function FooterCTA() {
  return (
    <div className='flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 text-center fill-slate-50 min-h-[697px] max-md:px-5'>
      <img
        loading='lazy'
        src='https://cdn.builder.io/api/v1/image/assets/TEMP/a5a163a55b06fe58ecb6719ccc945a065b29d705623d155d233aa1f2fa374e9d?'
        className='object-cover absolute inset-0 size-full'
      />
      <div className='flex relative flex-col mt-28 max-w-full w-[701px] max-md:mt-10'>
        <div className='self-center text-xl font-bold text-[#004182]uppercase'>
          Engage GPT
        </div>
        <div className='mt-7 text-4xl font-bold tracking-tighter leading-10 text-black max-md:max-w-full'>
          Install our extension and get 100 free credits to get started today!
        </div>
        <div className='mt-7 text-2xl leading-10 text-sky-900 max-md:max-w-full'>
          Revolutionizing Engagement on LinkedIn
        </div>
        <div className='justify-center tracking-wide font-bold self-center px-6 py-3 mt-7 text-base leading-8 text-white bg-[#001482] rounded-xl max-md:px-5'>
          Install Extension
        </div>
      </div>
    </div>
  );
}

export default FooterCTA;
