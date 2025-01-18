import React from 'react';

function Headings({ content }) {
  return (
    <div className="justify-center self-center flex px-6 py-3 text-sm font-bold leading-5 text-center text-black whitespace-nowrap w-fit bg-blue-50 rounded-xl tracking-[2px]">
      {content}
    </div>
  );
}

export default Headings;
