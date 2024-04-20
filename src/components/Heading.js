import React from 'react';

function Headings({ content }) {
  return (
    <div className="justify-center self-center font-medium flex px-6 py-3 text-base leading-5 text-center text-white whitespace-nowrap w-fit bg-[#004182] rounded-full tracking-[2px]">
      {content}
    </div>
  );
}

export default Headings;
