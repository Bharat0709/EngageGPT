export const SubscriptionCard = ({ userData }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-[#f6f6f6] rounded-2xl overflow-hidden border border-gray-100">
      {/* Main Content */}
      <div className="p-4 w-full space-y-6">
        {/* Account Overview */}
        <div className="flex w-full gap-4">
          {/* Subscription Info */}
          <div className="bg-[#feffff]  w-1/3 flex flex-col items-center justify-between gap-4 rounded-xl p-4">
            <div className="flex w-full items-center justify-between gap-3">
              <h4 className="w-full font-semibold text-gray-800  m-0 ">
                Transactions Details
              </h4>
            </div>  
          </div>  
        </div>
      </div>
    </div>
  );
};
