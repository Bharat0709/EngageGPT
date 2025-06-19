import React from 'react';
import { useNavigate } from 'react-router-dom';
import { featuresFree, featuresPro } from '../../assets/data/pricingfeatures';

const PricingCard = ({ tier, price, features, buttonText, isPrimary }) => {
  const Navigate = useNavigate();
  const handleNavigate = () => {
    Navigate('/login');
  };
  return (
    <div
      className={`flex flex-col overflow-hidden transition-all hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] max-w-md w-full ${
        isPrimary
          ? 'bg-gradient-to-br from-blue-100 to-indigo-200 text-black'
          : 'bg-white'
      }`}
    >
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">{tier}</h3>
          {/* {!isPrimary && (
            <span className="px-3 py-1 text-xs font-semibold bg-indigo-800 text-white rounded-full">
              RECOMMENDED
            </span>
          )} */}
        </div>
        <div className="mb-4">
          <span className="text-4xl font-bold">{price}</span>
          {price !== 'Coming Soon' && (
            <span className="text-lg ml-1">/month</span>
          )}
        </div>
        <p className={`text-sm  text-black}`}>
          {isPrimary
            ? 'Get access to all premium features to boost your productivity'
            : 'Perfect for individuals just getting started'}
        </p>
      </div>

      {/* Divider */}
      <div
        className={`w-full h-px ${isPrimary ? 'bg-blue-400' : 'bg-gray-200'}`}
      ></div>

      {/* Features */}
      <div className="flex-grow px-8 py-6">
        <p
          className={`text-sm font-medium mb-4 ${
            isPrimary ? '' : 'text-gray-700'
          }`}
        >
          INCLUDES:
        </p>
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className={`mr-3 mt-1 flex-shrink-0 ${'text-black'}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className={isPrimary ? 'text-black' : 'text-black'}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <div className="px-8 pb-8">
        <button
          onClick={handleNavigate}
          className={`w-full py-4 overflow-hidden hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] shadow-[5px_5px_0px_black] font-medium transition-all ${
            isPrimary
              ? 'bg-white text-indigo-700  hover:bg-indigo-50'
              : 'bg-[#004182] text-white hover:bg-indigo-700'
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const Pricing = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='2' height='40' fill='rgba(0,0,0,0.05)'/%3E%3Crect y='0' x='0' width='40' height='2' fill='rgba(0,0,0,0.05)'/%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px',
      }}
      id="pricing"
      className="pb-12 lg:pt-12 pt-8 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="lg:text-3xl lg:mt-1 mt-6 text-xl font-bold text-center mb-8 border-4 border-black shadow-[5px_5px_0px_black] py-2 px-6 max-w-md mx-auto bg-white">
            Pricing
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <PricingCard
            tier="FREE"
            price="$0"
            features={featuresFree}
            buttonText="Get Started for Free"
            isPrimary={false}
          />

          <PricingCard
            tier="PRO"
            price="Coming Soon"
            features={featuresPro}
            buttonText="Try Free Plan"
            isPrimary={true}
          />
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-6">
            Need a custom solution for your enterprise?
          </p>
          <button
            className="px-8 py-3 overflow-hidden hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] bg-white text-black font-medium transition-all shadow-[5px_5px_0px_black]"
            onClick={() => scrollToSection('footercta')}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
