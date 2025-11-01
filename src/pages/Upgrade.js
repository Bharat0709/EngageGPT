import React, { useState, useEffect } from 'react';
import { FiX, FiLoader, FiZap, FiTrendingUp, FiShield } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import visa from '@assets/images/visa-classic-svgrepo-com.svg';
import mastercard from '@assets/images/mastercard-svgrepo-com.svg';
import rupay from '@assets/images/rupay-seeklogo.png';
import upi from '@assets/images/unified-payment-interface-upi-seeklogo.png';

import {
  createCheckoutSession,
  fetchDodoProducts,
} from '@services/Organization';

const Upgrade = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [currencyView, setCurrencyView] = useState('USD');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const products = await fetchDodoProducts();

      const formattedPlans = products
        .filter((product) => product.name !== 'Test Product')
        .map((product) => {
          const creditsMatch = product.description.match(/(\d+)\s*Credits/i);
          const credits = creditsMatch ? parseInt(creditsMatch[1]) : 0;

          return {
            product_id: product.product_id,
            name: product.name,
            credits,
            description: product.description,
            price: product.price, // paise
            currency: product.currency,
          };
        })
        .sort((a, b) => a.credits - b.credits);

      setPlans(formattedPlans);
    } catch (err) {
      setError('Failed to load plans. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopUp = async (productId) => {
    setIsProcessing(true);
    try {
      const checkoutSession = await createCheckoutSession(productId);
      window.location.href = checkoutSession.session.checkout_url;
    } catch (err) {
      alert('Failed to create checkout session. Please try again.');
      setIsProcessing(false);
    }
  };

  const formatPrice = (priceInCents) => {
    const inrPrice = priceInCents / 100;
    if (currencyView === 'INR') {
      return `₹${inrPrice.toLocaleString('en-IN')}`;
    }
    const approxUsd = inrPrice / 89;
    return `$${approxUsd.toFixed(2)} USD`;
  };

  const getPlanIcon = (index) => {
    const icons = [
      { icon: FiZap, color: 'from-blue-500 to-blue-600' },
      { icon: FiTrendingUp, color: 'from-purple-500 to-purple-600' },
      { icon: FiZap, color: 'from-pink-500 to-pink-600' },
      { icon: FiTrendingUp, color: 'from-orange-500 to-orange-600' },
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white p-6 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <FiZap className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Top Up Credits
              </h1>
              <p className="text-base text-gray-500">
                Choose a plan and power up instantly
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gray-100 rounded-lg flex p-1">
              {['INR', 'USD'].map((cur) => (
                <motion.button
                  key={cur}
                  onClick={() => setCurrencyView(cur)}
                  className={`px-5 py-2 text-base font-medium rounded-md ${
                    currencyView === cur
                      ? 'bg-white text-black shadow-sm'
                      : 'text-gray-500'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  {cur}
                </motion.button>
              ))}
            </div>
            <p className="text-base text-gray-600 font-medium">
              Limited time Offer!
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-5xl">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-purple-500 animate-spin"></div>
                <FiZap className="absolute inset-0 m-auto text-purple-500" size={26} />
              </div>
              <p className="text-base text-gray-500 mt-4">
                Loading options...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
                <FiX className="text-red-500" size={26} />
              </div>
              <p className="text-red-600 mb-4 text-base">{error}</p>
              <button
                onClick={fetchProducts}
                className="px-8 py-3 text-base font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                {plans.map((plan, index) => {
                  const { icon: Icon } = getPlanIcon(index);
                  const isPopular = index === 1;

                  return (
                    <div
                      key={plan.product_id}
                      className={`relative flex items-center justify-between p-6 rounded-xl border-2 transition-all ${
                        isPopular
                          ? 'border-purple-200 bg-purple-50/40 hover:border-purple-300'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-md">
                          POPULAR
                        </div>
                      )}

                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 hidden lg:flex rounded-xl bg-gray-100 items-center justify-center">
                          <Icon className="text-black" size={22} />
                        </div>

                        <div>
                          <p className="text-xl font-semibold text-gray-900">
                            {plan.name}
                          </p>
                          <motion.span
                            key={currencyView + plan.product_id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="text-lg mt-1 block text-gray-800"
                          >
                            {formatPrice(plan.price)}
                          </motion.span>
                        </div>
                      </div>

                      <div className="flex items-center gap-5">
                        <p className="text-xl font-bold text-gray-600">
                          {plan.credits} credits
                        </p>
                        <button
                          onClick={() => handleTopUp(plan.product_id)}
                          disabled={isProcessing}
                          className={`px-7 py-2.5 text-base font-medium rounded-lg transition-all min-w-[130px] ${
                            isPopular
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                              : 'bg-gray-900 text-white hover:bg-gray-800'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isProcessing ? (
                            <FiLoader className="animate-spin mx-auto" size={18} />
                          ) : (
                            'Top Up'
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 text-center text-base text-gray-600">
                <p>Validity - 1 Month</p>
                <p className="mt-1">
                  Secure & Instant checkout • Pay in your preferred currency and mode (
                  <strong>including UPI</strong>)
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
                <img src={visa} alt="Visa" className="h-12 object-contain" />
                <img src={mastercard} alt="Mastercard" className="h-12 object-contain" />
                <img src={rupay} alt="Rupay" className="h-8 object-contain" />
                <img src={upi} alt="UPI" className="h-8 object-contain" />
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-5">
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <FiShield size={16} />
          Secure payment powered by{' '}
          <span className="font-semibold text-gray-700">DodoPayments</span>
        </div>
      </footer>
    </div>
  );
};

export default Upgrade;