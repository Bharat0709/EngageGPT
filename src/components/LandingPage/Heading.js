import React from 'react';

function Headings({ content }) {
  return (
    <div className="justify-center self-center font-bold flex px-6 py-3 leading-5 text-5xl text-center text-sky-900 whitespace-nowrap w-fit rounded-xl tracking-[2px]">
      {content}
    </div>
  );
}

export default Headings;
