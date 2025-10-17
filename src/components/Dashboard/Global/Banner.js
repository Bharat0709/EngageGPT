import { Icons } from '@utils/constantData/icons';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'updateBannerDismissCount';
const MAX_DISMISSALS = 5;

export default function UpdateBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    if (dismissCount >= MAX_DISMISSALS) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    const currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    const newCount = currentCount + 1;
    localStorage.setItem(STORAGE_KEY, newCount.toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative mb-2 overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 mt-0.5">
              <Icons.Info className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-1">
                Important Update Required
              </h3>
              <p className="text-white/95 text-sm leading-relaxed">
                For existing users who installed the extension before <strong>October 17, 2025</strong>: 
                Please <strong>remove and reinstall the extension from the chrome web store </strong>OR clear the extension storage (From the LinkedIn Website) before reconnecting to continue using the service.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
            aria-label="Close banner"
          >
            <Icons.CloseCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}