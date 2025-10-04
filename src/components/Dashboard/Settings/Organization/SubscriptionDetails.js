import { Icons } from '@utils/constantData/icons';
import { useState } from 'react';

export const SubscriptionCard = ({ userData }) => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [activeTab, setActiveTab] = useState('transactions'); // 'transactions' or 'payments'

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'purchase':
        return <Icons.Plus className="text-green-600" size={18} />;
      case 'usage':
        return <Icons.Minus className="text-red-600" size={18} />;
      case 'bonus':
        return <Icons.Gift className="text-purple-600" size={18} />;
      case 'expiry':
        return <Icons.Clock className="text-orange-600" size={18} />;
      case 'refund':
        return <Icons.Refresh className="text-blue-600" size={18} />;
      case 'adjustment':
        return <Icons.Edit className="text-gray-600" size={18} />;
      default:
        return <Icons.Info className="text-gray-600" size={18} />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'purchase':
        return 'text-green-600';
      case 'usage':
        return 'text-red-600';
      case 'bonus':
        return 'text-purple-600';
      case 'expiry':
        return 'text-orange-600';
      case 'refund':
        return 'text-blue-600';
      case 'adjustment':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const transactions = userData?.credits?.transactions || [];
  const payments = userData?.payments || [];
  const displayedTransactions = showAllTransactions
    ? transactions
    : transactions.slice(0, 5);

  const isExpiringSoon = () => {
    if (!userData?.credits?.expiresAt) return false;
    const expiryDate = new Date(userData.credits.expiresAt);
    const today = new Date();
    const daysUntilExpiry = Math.ceil(
      (expiryDate - today) / (1000 * 60 * 60 * 24),
    );
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  };

  const isExpired = () => {
    if (!userData?.credits?.expiresAt) return false;
    return new Date(userData.credits.expiresAt) < new Date();
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-2 sm:space-y-2">
      {/* Credits Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {/* Available Credits - Featured Card */}
        <div className="sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 text-white  transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
              <Icons.Credits className="text-white" size={20} />
            </div>
            {userData?.credits?.expiresAt && (
              <div className="bg-white/20 backdrop-blur-sm rounded-md px-2 py-0.5">
                <p className="text-xs font-medium m-0">
                  {isExpired()
                    ? '❌ Expired'
                    : isExpiringSoon()
                    ? '⚠️ Expiring Soon'
                    : '✓ Active'}
                </p>
              </div>
            )}
          </div>
          <p className="text-3xl sm:text-4xl font-bold mb-1">
            {userData?.credits?.balance || 0}
          </p>
          <p className="text-white/80 text-xs mb-1">Available Credits</p>
          {userData?.credits?.expiresAt && (
            <p className="text-white/60 text-xs">
              {isExpired()
                ? 'Credits have expired'
                : `Expires on ${
                    formatDate(userData.credits.expiresAt).split(',')[0]
                  }`}
            </p>
          )}
        </div>

        {/* Total Used Card */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 hover: transition-shadow">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-red-50 rounded-lg p-2">
              <Icons.TrendingDown className="text-red-600" size={20} />
            </div>
            <p className="text-xs text-gray-600 font-medium m-0">Total Used</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {userData?.credits?.totalUsed || 0}
          </p>
          <p className="text-xs text-gray-500 m-0">Credits consumed</p>
        </div>

        {/* Total Transactions Card */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 hover: transition-shadow">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-blue-50 rounded-lg p-2">
              <Icons.List className="text-blue-600" size={20} />
            </div>
            <p className="text-xs text-gray-600 font-medium m-0">
              All Activity
            </p>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {transactions.length}
          </p>
          <p className="text-xs text-gray-500 m-0">Total transactions</p>
        </div>
      </div>

      {/* Transaction & Payment History Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50/50">
          <div className="flex overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`flex-1 min-w-fit px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'transactions'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Icons.List size={18} />
                Transactions ({transactions.length})
              </span>
            </button>
            {payments.length > 0 && (
              <button
                onClick={() => setActiveTab('payments')}
                className={`flex-1 min-w-fit px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'payments'
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Icons.CreditCard size={18} />
                  Payments ({payments.length})
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900 text-base sm:text-lg m-0">
                  Transaction History
                </h4>
                {transactions.length > 5 && (
                  <button
                    onClick={() => setShowAllTransactions(!showAllTransactions)}
                    className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-medium px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    {showAllTransactions
                      ? 'Show Less'
                      : `View All (${transactions.length})`}
                  </button>
                )}
              </div>

              {transactions.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icons.List size={28} className="text-gray-400" />
                  </div>
                  <p className="text-gray-900 font-medium mb-1">
                    No transactions yet
                  </p>
                  <p className="text-sm text-gray-500 m-0">
                    Your transaction history will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3 max-h-[500px] overflow-y-auto">
                  {displayedTransactions.map((transaction, index) => (
                    <div
                      key={transaction.id || transaction._id || index}
                      className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 m-0 truncate">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-500 m-0 mt-1">
                          {formatDate(transaction.createdAt)}
                        </p>
                        {transaction.expiresAt && (
                          <div className="flex items-center gap-1 mt-1">
                            <Icons.Clock
                              size={12}
                              className="text-orange-600"
                            />
                            <p className="text-xs text-orange-600 m-0">
                              Expires{' '}
                              {formatDate(transaction.expiresAt).split(',')[0]}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p
                          className={`text-base sm:text-lg font-bold m-0 ${getTransactionColor(
                            transaction.type,
                          )}`}
                        >
                          {transaction.type === 'usage' ||
                          transaction.type === 'expiry'
                            ? '-'
                            : '+'}
                          {Math.abs(transaction.amount)}
                        </p>
                        <p className="text-xs text-gray-500 m-0 mt-1">
                          Bal: {transaction.balance}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 text-base sm:text-lg m-0">
                  Payment History
                </h4>
              </div>

              {payments.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icons.CreditCard size={28} className="text-gray-400" />
                  </div>
                  <p className="text-gray-900 font-medium mb-1">
                    No payments yet
                  </p>
                  <p className="text-sm text-gray-500 m-0">
                    Your payment history will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3 max-h-[500px] overflow-y-auto">
                  {payments.map((payment, index) => (
                    <div
                      key={payment.id || payment._id || index}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all hover"
                    >
                      <div className="flex items-start sm:items-center gap-3 flex-1">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Icons.CreditCard
                            className="text-green-600"
                            size={20}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 m-0">
                            +{payment.creditsAdded} Credits Added
                          </p>
                          <p className="text-xs text-gray-500 m-0 mt-1">
                            {formatDate(payment.createdAt)}
                          </p>
                          <p className="text-xs text-gray-400 m-0 mt-1 truncate">
                            {payment.paymentMethod?.toUpperCase()} • ID:{' '}
                            {payment.paymentId?.slice(0, 15)}...
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-1 flex-shrink-0">
                        <p className="text-base sm:text-lg font-bold text-gray-900 m-0">
                          ₹{(payment.amount / 100).toFixed(2)}
                        </p>
                        <span
                          className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                            payment.status === 'succeeded'
                              ? 'bg-green-100 text-green-700'
                              : payment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : payment.status === 'failed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
