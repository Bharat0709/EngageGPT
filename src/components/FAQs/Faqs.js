import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import Headings from '../Heading';

function FAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className='flex flex-col pb-8 p-2'>
      <Headings content={'FAQs'} />
      {faqs.map((faq, index) => (
        <div key={index} className='border-b mt-1 border-gray-200'>
          <button
            className={`flex items-center justify-between py-4 px-6 w-full transition-colors duration-300 hover:bg-gray-100 focus:outline-none ${
              openIndex === index ? 'bg-gray-100' : ''
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className={`text-lg text-left font-semibold sm:text-left`}>
              {faq.question}
            </div>
            <ChevronDownIcon
              className={`h-6 w-6 transform transition-transform ${
                openIndex === index ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-height duration-300 ${
              openIndex === index ? 'max-h-[200px]' : 'max-h-0'
            }`}
          >
            {openIndex === index && (
              <div className='py-2 px-6'>
                <p className='text-left'>{faq.answer}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQ;
