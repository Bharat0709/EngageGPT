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
    <div className="w-full mb-4 mt-4 max-w-8xl mr-auto space-y-4">
      {/* Credits Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Available Credits - Featured Card */}
        <div className="sm:col-span-2 lg:col-span-1 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2.5">
                <Icons.Credits className="text-white/90" size={20} />
              </div>
              {userData?.credits?.expiresAt && (
                <div
                  className={`px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase border ${
                    isExpired()
                      ? 'bg-red-500/10 border-red-500/20 text-red-400'
                      : isExpiringSoon()
                        ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {isExpired()
                    ? 'Expired'
                    : isExpiringSoon()
                      ? 'Expiring Soon'
                      : 'Active'}
                </div>
              )}
            </div>
            <p className="text-4xl instrument font-medium mb-2 tracking-tight">
              {userData?.credits?.balance || 0}
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-white/80 flex  justify-between gap-6 items-end m-0 p-0 text-xs font-medium tracking-wide m-0 uppercase">
                Available Credits{' '}
                {userData?.credits?.expiresAt && (
                  <p className="text-white/70 text-xs p-0 mb-[0.5] m-0">
                    {isExpired()
                      ? 'Credits have expired'
                      : `Valid until ${formatDate(userData.credits.expiresAt).split(',')[0]}`}
                  </p>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Total Used Card */}
        <div className="bg-[#0A0A0A] border border-white/10 text-white rounded-2xl p-6 group hover:border-white/20 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/5 rounded-xl p-2.5">
              <Icons.TrendingDown className="text-white/70" size={20} />
            </div>
            <p className="text-xs text-white/70 font-medium tracking-wide m-0 uppercase">
              Total Consumed
            </p>
          </div>
          <p className="text-4xl instrument font-medium mb-2">
            {userData?.credits?.totalUsed || 0}
          </p>
          <p className="text-white/70 text-xs tracking-wide m-0 uppercase">
            Lifetime Usage
          </p>
        </div>

        {/* Total Activity Card */}
        <div className="bg-[#0A0A0A]  text-white rounded-2xl p-6 group hover:border-white/20 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/5 rounded-xl p-2.5">
              <Icons.List className="text-white/70" size={20} />
            </div>
            <p className="text-xs text-white/70 font-medium tracking-wide m-0 uppercase">
              All Activity
            </p>
          </div>
          <p className="text-4xl instrument font-medium mb-2">
            {transactions.length}
          </p>
          <p className="text-white/70 text-xs tracking-wide m-0 uppercase">
            Total Events Logged
          </p>
        </div>
      </div>

      {/* History Sections */}
      <div className="bg-white rounded-3xl overflow-hidden">
        {/* Tab Navigation */}
        <div className="px-6 pt-6 border-b border-gray-100">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`pb-4 text-xs font-semibold tracking-widest uppercase transition-all relative ${
                activeTab === 'transactions'
                  ? 'text-black'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Transactions
              {activeTab === 'transactions' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
              )}
            </button>
            {payments.length > 0 && (
              <button
                onClick={() => setActiveTab('payments')}
                className={`pb-4 text-xs font-semibold tracking-widest uppercase transition-all relative ${
                  activeTab === 'payments'
                    ? 'text-black'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Payments
                {activeTab === 'payments' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-0">
          {activeTab === 'transactions' && (
            <div className="divide-y divide-gray-50">
              {transactions.length === 0 ? (
                <div className="text-center py-24">
                  <Icons.List
                    size={32}
                    className="mx-auto mb-4 text-gray-200"
                  />
                  <p className="text-sm font-medium text-gray-900 m-0">
                    No transaction history
                  </p>
                </div>
              ) : (
                <>
                  {displayedTransactions.map((transaction, index) => (
                    <div
                      key={transaction.id || transaction._id || index}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 px-6 py-5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
                            transaction.type === 'purchase' ||
                            transaction.type === 'bonus'
                              ? 'bg-emerald-50 border-emerald-100/50 text-emerald-600'
                              : 'bg-gray-50 border-gray-100 text-gray-400'
                          }`}
                        >
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 m-0 flex items-center gap-2">
                            {transaction.description}
                            {transaction.expiresAt && !isExpired() && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-orange-50 text-orange-600 border border-orange-100/50">
                                Expires{' '}
                                {
                                  formatDate(transaction.expiresAt).split(
                                    ',',
                                  )[0]
                                }
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-gray-400 font-medium tracking-tight m-0 mt-1 uppercase">
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 mt-4 sm:mt-0">
                        <div className="text-right">
                          <p
                            className={`text-sm geist-mono font-medium m-0 ${
                              transaction.type === 'usage' ||
                              transaction.type === 'expiry'
                                ? 'text-gray-400'
                                : 'text-emerald-600'
                            }`}
                          >
                            {transaction.type === 'usage' ||
                            transaction.type === 'expiry'
                              ? '−'
                              : '+'}
                            {Math.abs(transaction.amount).toLocaleString()}
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium m-0 tracking-wide uppercase">
                            Credits
                          </p>
                        </div>
                        <div className="text-right w-24">
                          <p className="text-sm text-gray-900 geist-mono font-medium m-0">
                            {transaction.balance?.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium m-0 tracking-wide uppercase">
                            Balance
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {transactions.length > 5 && (
                    <button
                      onClick={() =>
                        setShowAllTransactions(!showAllTransactions)
                      }
                      className="w-full py-4 text-[11px] font-bold tracking-widest text-gray-400 uppercase hover:text-black transition-colors bg-gray-50/30"
                    >
                      {showAllTransactions
                        ? 'Show fewer activities'
                        : `View all ${transactions.length} activities`}
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="divide-y divide-gray-50">
              {payments.length === 0 ? (
                <div className="text-center py-24">
                  <Icons.CreditCard
                    size={32}
                    className="mx-auto mb-4 text-gray-200"
                  />
                  <p className="text-sm font-medium text-gray-900 m-0">
                    No payment history
                  </p>
                </div>
              ) : (
                payments.map((payment, index) => (
                  <div
                    key={payment.id || payment._id || index}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100  px-6 py-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-600 mt-1">
                        <Icons.CreditCard size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900 m-0">
                            {payment.creditsAdded.toLocaleString()} Credits
                          </p>
                          <span
                            className={`inline-block text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${
                              payment.status === 'succeeded'
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                : 'bg-gray-50 border-gray-100 text-gray-400'
                            }`}
                          >
                            {payment.status}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                              Payment ID
                            </span>
                            <span className="text-[11px] text-gray-600 geist-mono truncate">
                              {payment.paymentId || 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                              Date
                            </span>
                            <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap">
                              {formatDate(payment.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                              Method
                            </span>
                            <span className="text-[11px] text-gray-500 font-medium uppercase">
                              {payment.paymentMethod || 'UPI'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 mt-4 sm:mt-0 sm:ml-6 pl-14 sm:pl-0">
                      <div className="text-right">
                        <p className="text-base text-gray-900 geist-mono font-bold m-0 italic">
                          ₹
                          {(payment.amount / 100).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium m-0 tracking-wide uppercase">
                          Amount Paid
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
