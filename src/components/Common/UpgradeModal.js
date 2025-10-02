import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiZap, FiLoader, FiTrendingUp } from 'react-icons/fi';
import {
  createCheckoutSession,
  fetchDodoProducts,
} from '@services/Organization';

const UpgradeModal = ({ isOpen, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);

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
            price: product.price,
            currency: product.currency,
            priceUSD:
              product.currency === 'INR'
                ? Math.ceil(product.price / 100)
                : product.price,
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

  const formatPrice = (priceInCents, currency) => {
    const price = priceInCents / 100;
    if (currency === 'INR') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const formatUSDApprox = (priceInCents) => {
    const price = priceInCents / 88.67;
    return `~$${price.toFixed(2)}`;
  };

  const getFilteredPlans = () => {
    return plans.filter((plan) => plan.currency === selectedCurrency);
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity p-4">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto scrollbar-hide rounded-3xl shadow-2xl transform transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-t-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

          <div className="relative flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-4 ring-white/30">
                <FiZap className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-3xl mb-2 p-0 font-bold text-white">
                  Top Up Credits
                </h2>
                <p className="text-white/90 m-0 p-0 text-base">
                  Power up your account instantly
                </p>
              </div>
            </div>
            <button
              className="text-white/80 hover:text-white hover:bg-white/20 p-2.5 rounded-full transition-all"
              onClick={onClose}
              disabled={isProcessing}
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <FiLoader
                className="animate-spin text-indigo-600 mb-4"
                size={48}
              />
              <p className="text-gray-500">Loading top-up options...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiX className="text-red-600" size={32} />
              </div>
              <p className="text-red-600 mb-6 text-lg font-medium">{error}</p>
              <button
                onClick={fetchProducts}
                className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Try Again
              </button>
            </div>
          ) : getFilteredPlans().length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No top-up options available in {selectedCurrency}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {getFilteredPlans().map((plan, index) => (
                <div
                  key={plan.product_id}
                  className="group relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-3xl p-6 transition-all duration-300 hover:border-indigo-400 hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Best Value Badge */}
                  {index === 1 && (
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg rotate-12 animate-pulse">
                      BEST VALUE
                    </div>
                  )}

                  <div className="relative">
                    {/* Credits Badge */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-xl">
                          <div className="flex items-center gap-2">
                            <FiTrendingUp size={20} />
                            <span className="text-3xl font-black">
                              {plan.credits}
                            </span>
                          </div>
                          <p className="text-xs text-indigo-100 text-center mt-1 font-medium">
                            CREDITS
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {formatPrice(plan.price, plan.currency)} OR  ~{' '}
                          {formatUSDApprox(plan.priceUSD)}
                        </span>
                      </div>
                      {plan.currency === 'INR' && (
                        <p className="text-sm text-gray-500 font-medium"></p>
                      )}
                    </div>

                    {/* Top Up Button */}
                    <button
                      onClick={() => handleTopUp(plan.product_id)}
                      disabled={isProcessing}
                      className="w-full py-4 rounded-2xl font-bold text-lg transition-all transform bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-2xl group-hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isProcessing ? (
                        <FiLoader className="animate-spin mx-auto" size={24} />
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <FiZap size={20} />
                          Top Up Now
                        </span>
                      )}
                    </button>

                    {/* Per Credit Cost */}
                    <p className="text-center text-md text-gray-500 mt-4">
                      {(plan.price / plan.credits / 100).toFixed(2)*5}{' '}
                      {plan.currency === 'INR' ? '₹' : '$'} per 5 credits
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-3xl p-6">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-medium">
              Secure payment powered by DodoPayments
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default UpgradeModal;
