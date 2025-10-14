import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  FiX,
  FiVideo,
  FiBook,
  FiInfo,
  FiBell,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMasterData } from '@services/Organization';

const FeatureUpdatesModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenUpdates, setHasSeenUpdates] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch updates from backend
  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const data = await fetchMasterData();
      
      // Check if featureUpdates exists and is enabled
      if (data?.featureUpdates && data.featureUpdates.enabled) {
        const activeUpdates = data.featureUpdates.updates
          .filter(update => update.isActive)
          .sort((a, b) => a.priority - b.priority);
        
        setUpdates(activeUpdates);
      } else {
        setUpdates([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching updates:', error);
      setUpdates([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch updates on mount
    fetchUpdates();

    // Check if user has seen updates
    const seen = localStorage.getItem('hasSeenFeatureUpdates');
    if (!seen) {
      // Show modal after a brief delay
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    } else {
      setHasSeenUpdates(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (!hasSeenUpdates) {
      localStorage.setItem('hasSeenFeatureUpdates', 'true');
      setHasSeenUpdates(true);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (error) {
      return '';
    }
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400, y: 100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 400, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-[9999] w-[420px] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          style={{ maxWidth: 'calc(100vw - 48px)' }}
        >
          {/* Header */}
          <div className="relative border-b border-gray-100 p-5 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <FiBell className="text-white" size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 m-0">
                    What's New
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5 m-0">
                    Latest features & tutorials
                  </p>
                </div>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white/50 transition-all"
                onClick={handleClose}
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[480px] scrollbar-hide">
            {loading ? (
              <div className="p-6 text-center">
                <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500 mt-3 m-0">Loading updates...</p>
              </div>
            ) : !updates || updates.length === 0 ? (
              <div className="p-6 text-center">
                <FiInfo className="mx-auto text-gray-300 mb-3" size={40} />
                <p className="text-sm text-gray-500 m-0">No updates available</p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {updates.map((update) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all bg-white group"
                  >
                    {/* Badge */}
                    <div className="flex items-start justify-between mb-2">
                      <div
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${update.badgeColor || 'from-purple-500 to-pink-500'}`}
                      >
                        {update.badge || 'Update'}
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatDate(update.date)}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-semibold text-gray-900 mb-1.5 m-0">
                      {update.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 m-0 leading-relaxed">
                      {update.description}
                    </p>

                    {/* Coming Soon Badge */}
                    {update.type === 'comingsoon' && update.estimatedRelease && (
                      <div className="mb-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                          Expected: {update.estimatedRelease}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {update.videoUrl && (
                        <a
                          href={update.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg text-xs font-medium transition-all"
                        >
                          <FiVideo size={14} />
                          Watch Video
                        </a>
                      )}
                      {update.guideUrl && (
                        <a
                          href={update.guideUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-medium transition-all"
                        >
                          <FiBook size={14} />
                          Read Guide
                        </a>
                      )}
                    </div>

                    {/* Tags */}
                    {update.tags && update.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                        {update.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-5 py-3 bg-gray-50">
            <p className="text-xs text-gray-500 text-center m-0">
              Stay updated with the latest features and improvements
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Floating Info Button */}
      <AnimatePresence>
        {!isOpen && hasSeenUpdates && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-20 z-[9998] w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all"
            title="View Updates"
          >
            <FiInfo size={24} />
            {/* Notification Badge */}
            {updates && updates.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                {updates.length}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      {createPortal(modalContent, document.body)}
    </>
  );
};

export default FeatureUpdatesModal;