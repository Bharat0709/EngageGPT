    import { useState } from 'react';
    import { ChevronDownIcon } from '@heroicons/react/outline';
    import Headings from '../components/Heading';
    import { faqs } from '../assets/data/faq';
    
    function FAQ() {
      const [openIndex, setOpenIndex] = useState(null);
    
      const toggleFAQ = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
      };
    
      return (
        <div id='faqs' className='flex flex-col pb-8 p-2'>
          <Headings content={'FAQs'} />
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b ${
                index === 0 ? 'mt-7' : 'mt-1'
              } border-gray-200`}
            >
              <button
                className={`flex items-center justify-between py-4 px-6 w-full transition-colors duration-300 hover:bg-gray-100 focus:outline-none ${
                  openIndex === index ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  toggleFAQ(index);
                }}
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
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'max-h-40 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className='py-2 px-6'>
                  <p className='text-left'>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    export default FAQ;
