import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

const UpgradeModal = ({ isOpen, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [currencyView, setCurrencyView] = useState('INR'); // "USD" or "INR"

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

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
            credits: credits,
            description: product.description,
            price: product.price, // in paise
            currency: product.currency,
          };
        })
        .sort((a, b) => a.credits - b.credits);

      setPlans(formattedPlans);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load plans. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopUp = async (productId) => {
    setIsProcessing(true);
    try {
      const checkoutSession = await createCheckoutSession(productId);
      const checkoutUrl = checkoutSession.session.checkout_url;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to create checkout session. Please try again.');
      setIsProcessing(false);
    }
  };

  const formatPrice = (priceInCents) => {
    const inrPrice = priceInCents / 100; // paise → INR
    if (currencyView === 'INR') {
      return `₹${inrPrice.toLocaleString('en-IN')}`;
    }
    const approxUsd = inrPrice / 87; // rough conversion
    return `≈ $${approxUsd.toFixed(2)} USD`;
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

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] scrollbar-hide flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full scrollbar-hide max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="relative border-b border-gray-100 p-6 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex w-full lg:flex-row flex-col gap-4 items-center justify-between">
            <div className="flex w-full items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <FiZap className="text-white" size={20} />
              </div>
              <div>
                <h2 className=" text-lg lg:text-xl font-semibold text-gray-900 m-0">
                  Top Up Credits
                </h2>
                <p className="text-xs lg:text-sm text-gray-500 mt-0.5 m-0">
                  Choose a plan and power up instantly
                </p>
              </div>
              <button
                className="text-gray-400 lg:hidden flex hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all"
                onClick={onClose}
                disabled={isProcessing}
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="flex items-center gap-4 justify-between w-full ">
              <div className="flex justify-center">
                <div className="bg-gray-100 rounded-lg flex p-1">
                  {['INR', 'USD'].map((cur) => (
                    <motion.button
                      key={cur}
                      onClick={() => setCurrencyView(cur)}
                      className={`px-4 py-1 text-sm font-medium rounded-md relative ${
                        currencyView === cur ? 'text-black' : 'text-gray-500'
                      }`}
                      whileTap={{ scale: 0.9 }}
                    >
                      {currencyView === cur && (
                        <motion.div
                          layoutId="currencyToggle"
                          className="absolute inset-0 rounded-md z-[-1]"
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      {cur}
                    </motion.button>
                  ))}
                </div>
              </div>
              <button
                className="text-gray-400 lg:flex hidden hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all"
                onClick={onClose}
                disabled={isProcessing}
              >
                <FiX size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-purple-500 animate-spin"></div>
                <FiZap
                  className="absolute inset-0 m-auto text-purple-500"
                  size={24}
                />
              </div>
              <p className="text-sm text-gray-500 mt-4">Loading options...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
                <FiX className="text-red-500" size={24} />
              </div>
              <p className="text-red-600 mb-4 text-sm">{error}</p>
              <button
                onClick={fetchProducts}
                className="px-6 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {plans.map((plan, index) => {
                const { icon: Icon, color } = getPlanIcon(index);
                const isPopular = index === 1;

                return (
                  <div
                    key={plan.product_id}
                    className={`relative flex items-center justify-between p-5 rounded-xl border-2 transition-all group ${
                      isPopular
                        ? 'border-purple-200 bg-purple-50/30 hover:border-purple-300 hover:bg-purple-50/50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    {/* Popular Badge */}
                    {isPopular && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-lg">
                        POPULAR
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 lg:flex hidden  rounded-xl bg-gray-100 items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="text-black" size={20} />
                      </div>

                      {/* Plan Info */}
                      <div>
                        <p className="text-md font-semibold text-gray-900 m-0">
                          {plan.name}
                        </p>
                        <p className="text-sm lg:text-lg text-gray-500 m-0 mt-0.5 flex items-center gap-1">
                          {plan.credits} credits
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Price */}
                      <div className="text-right">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={currencyView + plan.product_id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="text-lg font-bold text-gray-900 block"
                          >
                            {formatPrice(plan.price)}
                          </motion.span>
                        </AnimatePresence>
                      </div>

                      {/* Button */}
                      <button
                        onClick={() => handleTopUp(plan.product_id)}
                        disabled={isProcessing}
                        className={`px-2 lg:px-6 py-2 lg:py-2.5 text-xs lg:text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px] ${
                          isPopular
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        {isProcessing ? (
                          <FiLoader
                            className="animate-spin mx-auto"
                            size={16}
                          />
                        ) : (
                          'Top Up'
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
              <p className="mt-2 text-sm text-gray-500 text-left">
                Validity - 1 Month
              </p>
              {/* Extra Security & Options Note */}
              <div className="mt-2 text-left text-sm text-gray-600">
                Secure & Instant checkout • Pay in your preferred currency and
                mode (including <strong>UPI</strong>) <br />
              </div>
              {/* Payment Logos */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                <img
                  src={visa}
                  alt="Visa"
                  className="h-14 w-auto object-contain"
                />
                <img
                  src={mastercard}
                  alt="Mastercard"
                  className="h-14 w-auto object-contain"
                />
                <img
                  src={rupay}
                  alt="Rupay"
                  className="h-6 w-auto object-contain"
                />
                <img
                  src={upi}
                  alt="UPI"
                  className="h-6 w-auto object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50">
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <FiShield size={14} />
            <p className="text-xs m-0">
              Secure payment powered by{' '}
              <span className="font-semibold text-gray-700">DodoPayments</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default UpgradeModal;
