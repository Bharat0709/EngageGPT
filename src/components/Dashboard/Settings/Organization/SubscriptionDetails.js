import { Icons } from '@utils/constantData/icons';
import { useState } from 'react';

export const SubscriptionCard = ({ userData }) => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);

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
        return <Icons.Plus className="text-green-600" size={20} />;
      case 'usage':
        return <Icons.Minus className="text-red-600" size={20} />;
      case 'bonus':
        return <Icons.Gift className="text-purple-600" size={20} />;
      case 'expiry':
        return <Icons.Clock className="text-orange-600" size={20} />;
      case 'refund':
        return <Icons.Refresh className="text-blue-600" size={20} />;
      case 'adjustment':
        return <Icons.Edit className="text-gray-600" size={20} />;
      default:
        return <Icons.Info className="text-gray-600" size={20} />;
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
    <div className="bg-[#f6f6f6] rounded-2xl overflow-hidden border border-gray-100">
      <div className="p-4 w-full space-y-6">
        {/* Credits Overview */}
        <div className="flex lg:flex-row flex-col w-full gap-4">
          {/* Current Balance */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 lg:w-1/3 flex flex-col items-center justify-center gap-2 rounded-xl p-6 border border-purple-100">
            <Icons.Credits className="text-purple-600" size={32} />
            <p className="text-3xl font-bold text-gray-900 m-0">
              {userData?.credits?.balance || 0}
            </p>
            <p className="text-sm text-gray-600 m-0">Available Credits</p>
            {userData?.credits?.expiresAt && (
              <p
                className={`text-xs m-0 ${
                  isExpired()
                    ? 'text-red-600'
                    : isExpiringSoon()
                    ? 'text-orange-600'
                    : 'text-gray-500'
                }`}
              >
                {isExpired()
                  ? 'Expired'
                  : `Expires: ${
                      formatDate(userData.credits.expiresAt).split(',')[0]
                    }`}
              </p>
            )}
          </div>

          {/* Total Used */}
          <div className="bg-white lg:w-1/3 flex flex-col items-center justify-center gap-2 rounded-xl p-6 border border-gray-200">
            <Icons.TrendingDown className="text-red-600" size={32} />
            <p className="text-3xl font-bold text-gray-900 m-0">
              {userData?.credits?.totalUsed || 0}
            </p>
            <p className="text-sm text-gray-600 m-0">Total Used</p>
          </div>

          {/* Total Transactions */}
          <div className="bg-white lg:w-1/3 flex flex-col items-center justify-center gap-2 rounded-xl p-6 border border-gray-200">
            <Icons.List className="text-blue-600" size={32} />
            <p className="text-3xl font-bold text-gray-900 m-0">
              {transactions.length}
            </p>
            <p className="text-sm text-gray-600 m-0">Transactions</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800 text-lg m-0">
              Transaction History
            </h4>
            {transactions.length > 5 && (
              <button
                onClick={() => setShowAllTransactions(!showAllTransactions)}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                {showAllTransactions
                  ? 'Show Less'
                  : `Show All (${transactions.length})`}
              </button>
            )}
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Icons.List size={24} />
              </div>
              <p className="m-0">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {displayedTransactions.map((transaction, index) => (
                <div
                  key={transaction.id || transaction._id || index}
                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 m-0">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500 m-0 mt-1">
                        {formatDate(transaction.createdAt)}
                      </p>
                      {transaction.expiresAt && (
                        <p className="text-xs text-orange-600 m-0 mt-1">
                          Expires:{' '}
                          {formatDate(transaction.expiresAt).split(',')[0]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p
                      className={`text-lg font-bold m-0 ${getTransactionColor(
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
                      Balance: {transaction.balance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment History */}
        {userData?.payments && userData.payments.length > 0 && (
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 text-lg mb-4 m-0">
              Payment History
            </h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {userData.payments.map((payment, index) => (
                <div
                  key={payment.id || payment._id || index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Icons.CreditCard className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 m-0">
                        {payment.creditsAdded} Credits Added
                      </p>
                      <p className="text-xs text-gray-500 m-0 mt-1">
                        {formatDate(payment.createdAt)}
                      </p>
                      <p className="text-xs text-gray-400 m-0 mt-1">
                        {payment.paymentMethod?.toUpperCase()} • ID:{' '}
                        {payment.paymentId?.slice(0, 15)}...
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 m-0">
                      ₹{(payment.amount / 100).toFixed(2)}
                    </p>
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded mt-1 ${
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
          </div>
        )}
      </div>
    </div>
  );
};
