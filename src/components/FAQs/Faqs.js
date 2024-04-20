import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline'; // Import the ChevronDownIcon from Heroicons
import Headings from '../Heading';

function FAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null); // State to track the index of the open FAQ item

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle open/close state
  };
  

  return (
    <div className='flex flex-col pb-8 p-2'>
      <Headings content={'FAQs'} />
      {faqs.map((faq, index) => (
        <div key={index} className='border-b mt-1 border-gray-200'>
          <button
            className='flex items-center justify-between py-4 px-6 w-full'
            onClick={() => toggleFAQ(index)} // Call toggleFAQ function when clicked
          >
            <div className='text-lg font-semibold'>{faq.question}</div>
            <ChevronDownIcon
              className={`h-6 w-6 transform transition-transform ${
                openIndex === index ? 'rotate-180' : 'rotate-0' // Rotate the arrow based on open/close state
              }`}
            />
          </button>
          {openIndex === index && ( // Render the answer if the FAQ item is open
            <div className='py-2 px-6'>
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQ;
