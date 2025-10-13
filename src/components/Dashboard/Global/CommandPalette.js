import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@utils/constantData/icons';

// Import your navigation data
import { navigationRoutes } from '@utils/navigationRoutes';

const CommandPalette = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearchQuery('');
      setFilteredRoutes(navigationRoutes);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRoutes(navigationRoutes);
    } else {
      const filtered = navigationRoutes.filter(
        (route) =>
          route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          route.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          route.keywords?.some((keyword) =>
            keyword.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
      setFilteredRoutes(filtered);
    }
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredRoutes.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredRoutes[selectedIndex]) {
        handleNavigate(filteredRoutes[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleNavigate = (route) => {
    // Handle special actions that don't navigate
    if (route.isAction) {
      onClose();

      // Trigger appropriate action based on path
      switch (route.path) {
        case '#help':
          // Trigger help modal (you can pass a prop or use a global state)
          window.dispatchEvent(new CustomEvent('openHelpModal'));
          break;
        case '#feedback':
          // Trigger feedback modal
          window.dispatchEvent(new CustomEvent('openFeedbackModal'));
          break;
        case '#logout':
          // Trigger logout modal
          window.dispatchEvent(new CustomEvent('openLogoutModal'));
          break;
        case '#upgrade':
          window.dispatchEvent(new CustomEvent('openUpgradeModal'));
          break;
        case '#usage':
          window.dispatchEvent(new CustomEvent('openCreditUsage'));
          break;
        default:
          break;
      }
      return;
    }
    navigate(route.path);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-[9999] pt-32"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
          <Icons.Search className="text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="What you want to do?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 outline-none text-base text-gray-800 placeholder-gray-400"
          />
          <kbd className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredRoutes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Icons.Search size={48} className="mb-3 opacity-30" />
              <p className="text-sm">No results found</p>
            </div>
          ) : (
            <div className="py-2">
              {filteredRoutes.map((route, index) => (
                <button
                  key={route.path}
                  onClick={() => handleNavigate(route)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center gap-4 px-4 py-3 transition-colors ${
                    index === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      index === selectedIndex ? 'bg-white' : 'bg-gray-100'
                    }`}
                  >
                    {route.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-base m-0 p-0 font-medium text-gray-900">
                      {route.title}
                    </h4>
                    <p className="text-sm m-0 p-0 text-gray-500 mt-0.5">
                      {route.description}
                    </p>
                  </div>
                  {index === selectedIndex && (
                    <Icons.ArrowRight size={16} className="text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-semibold bg-white border border-gray-200 rounded">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 font-semibold bg-white border border-gray-200 rounded">
                ↓
              </kbd>
              <span className="ml-1">to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-semibold bg-white border border-gray-200 rounded">
                ↵
              </kbd>
              <span className="ml-1">to select</span>
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 font-semibold bg-white border border-gray-200 rounded">
              ESC
            </kbd>
            <span className="ml-1">to close</span>
          </span>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CommandPalette;
