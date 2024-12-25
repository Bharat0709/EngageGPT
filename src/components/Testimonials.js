import React from 'react';
import testimonials from '../assets/data/testimonials';
import Headings from './Heading';

function Testimonials() {

const maxColumns = 4; // Maximum number of columns

  return (
    <div className=' flex justify-center items-center flex-col mt-4'>
      <Headings content={'TESTIMONIALS'} />
      <div className='flex w-full p-4 mb-4  bg-blue-50 justify-center items-center flex-col mt-10'>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${maxColumns} gap-4`}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white gap-5 rounded-xl p-4 flex flex-col justify-between ${
                index % 2 === 0 ? 'right-to-left' : 'left-to-right'
              }`}
            >
              <div className='review text-xs leading-8'>{testimonial.review}</div>
              <div className='flex items-center mt-4'>
                <div>
                  <div className='name'>{testimonial.name}</div>
                  <div className='designation'>{testimonial.designation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
