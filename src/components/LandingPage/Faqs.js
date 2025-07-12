import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { faqs } from '@assets/data/faq';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='2' height='40' fill='rgba(0,0,0,0.05)'/%3E%3Crect y='0' x='0' width='40' height='2' fill='rgba(0,0,0,0.05)'/%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px',
      }}
      id="faqs"
      className="pb-12 lg:pt-12 pt-8 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="lg:text-3xl lg:mt-1 mt-6 text-xl font-bold text-center mb-8 border-4 border-black shadow-[5px_5px_0px_black] py-2 px-6 max-w-md mx-auto bg-white">
            FAQs
          </h2>
        </div>
        <div className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-gray-200  bg-white transition-all hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] shadow-[5px_5px_0px_black] mb-4`}
            >
              <button
                className="flex items-center justify-between py-4 px-6 w-full text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <ChevronDownIcon
                  className={`h-6 w-6 transition-transform ${
                    openIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'max-h-40 opacity-100 p-4'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
