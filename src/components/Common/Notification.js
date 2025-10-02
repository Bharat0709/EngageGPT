import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import {
  FiCheckCircle,
  FiX,
  FiAlertTriangle,
  FiInfo,
  FiLoader,
} from 'react-icons/fi';

// Notification Context
const NotificationContext = createContext();

// Notification Types
const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  LOADING: 'loading',
};

// Position Options
const POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
};

// Individual Notification Component
const NotificationItem = ({ notification, onRemove, position }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        handleRemove();
      }, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification.duration]);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 200);
  };

  const getTypeConfig = () => {
    switch (notification.type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return {
          icon: FiCheckCircle,
          iconColor: 'text-white',
          bgColor: 'bg-white',
          borderColor: 'border-green-200',
          accentColor: 'bg-gradient-to-br from-green-400 to-emerald-600',
        };
      case NOTIFICATION_TYPES.ERROR:
        return {
          icon: FaExclamationTriangle,
          iconColor: 'text-white',
          bgColor: 'bg-white',
          borderColor: 'border-red-200',
          accentColor: 'bg-gradient-to-br from-red-400 to-rose-600',
        };
      case NOTIFICATION_TYPES.WARNING:
        return {
          icon: FiAlertTriangle,
          iconColor: 'text-white',
          bgColor: 'bg-white',
          borderColor: 'border-amber-200',
          accentColor: 'bg-gradient-to-br from-yellow-400 to-orange-500',
        };
      case NOTIFICATION_TYPES.INFO:
        return {
          icon: FiInfo,
          iconColor: 'text-white',
          bgColor: 'bg-white',
          borderColor: 'border-blue-200',
          accentColor: 'bg-gradient-to-br from-blue-400 to-indigo-600',
        };
      case NOTIFICATION_TYPES.LOADING:
        return {
          icon: FiLoader,
          iconColor: 'text-white',
          bgColor: 'bg-white',
          borderColor: 'border-gray-200',
          accentColor: 'bg-gradient-to-br from-gray-400 to-slate-600',
        };
      default:
        return {
          icon: FiInfo,
          iconColor: 'text-white',
          bgColor: 'bg-white',
          borderColor: 'border-gray-200',
          accentColor: 'bg-gradient-to-br from-gray-400 to-slate-600',
        };
    }
  };

  const getAnimationClasses = () => {
    const isLeft = position.includes('left');
    const isRight = position.includes('right');
    const isTop = position.includes('top');
    const isBottom = position.includes('bottom');
    const isCenter = position.includes('center');

    if (isExiting) {
      if (isLeft) return 'transform -translate-x-full opacity-0 scale-95';
      if (isRight) return 'transform translate-x-full opacity-0 scale-95';
      if (isCenter && isTop)
        return 'transform -translate-y-full opacity-0 scale-95';
      if (isCenter && isBottom)
        return 'transform translate-y-full opacity-0 scale-95';
    }

    if (!isVisible) {
      if (isLeft) return 'transform -translate-x-full opacity-0 scale-95';
      if (isRight) return 'transform translate-x-full opacity-0 scale-95';
      if (isCenter && isTop)
        return 'transform -translate-y-full opacity-0 scale-95';
      if (isCenter && isBottom)
        return 'transform translate-y-full opacity-0 scale-95';
    }

    return 'transform translate-x-0 translate-y-0 opacity-100 scale-100';
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  return (
    <div
      className={`
        relative w-full min-w-80 max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl shadow-xl border border-white/80
        backdrop-blur-md backdrop-saturate-150
        ${config.accentColor}
        transition-all duration-300 ease-out
        ${getAnimationClasses()}
        hover:shadow-2xl
      `}
      style={{
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        backdropFilter: 'blur(20px) saturate(150%)',
      }}
    >
      {/* Main Content */}
      <div className="p-4 pl-6 relative">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <IconComponent
              className={`w-5 h-5 ${config.iconColor} ${
                notification.type === NOTIFICATION_TYPES.LOADING
                  ? 'animate-spin'
                  : ''
              }`}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-2">
            {notification.title && (
              <h4 className="text-sm font-semibold text-white mb-1 leading-tight">
                {notification.title}
              </h4>
            )}
            <p className="text-sm text-white leading-relaxed break-words">
              {notification.message}
            </p>
            {notification.description && (
              <p className="text-xs text-white mt-1 leading-relaxed break-words">
                {notification.description}
              </p>
            )}
          </div>

          {/* Close Button */}
          {notification.closable !== false && (
            <button
              onClick={handleRemove}
              className="flex-shrink-0 p-1 text-white transition-colors rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        {notification.actions && notification.actions.length > 0 && (
          <div className="mt-3 pt-2 border-t border-white/20">
            <div className="flex space-x-2 justify-end">
              {notification.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    action.handler();
                    if (action.closeOnClick !== false) handleRemove();
                  }}
                  className={`
                    px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200
                    ${
                      action.variant === 'primary'
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }
                  `}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar - Dynamic Island Style */}
        {notification.duration && notification.duration > 0 && (
          <div
            className="absolute bottom-2 left-4 right-4 h-1 rounded-full backdrop-blur-md 
            bg-white/20 border border-white/30 overflow-hidden shadow-inner"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/30 to-transparent opacity-60" />
            <div
              className={`h-full rounded-full bg-white/50 origin-left relative z-10
                shadow-lg transition-all duration-300 ease-out`}
              style={{
                animation: `shrink ${notification.duration}ms linear forwards`,
                filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Notification Container
const NotificationContainer = ({ notifications, position, onRemove }) => {
  const getContainerClasses = () => {
    const baseClasses =
      'fixed z-[9999] flex flex-col space-y-3 pointer-events-none';

    switch (position) {
      case POSITIONS.TOP_LEFT:
        return `${baseClasses} top-4 left-4 max-w-sm sm:max-w-md lg:max-w-lg`;
      case POSITIONS.TOP_RIGHT:
        return `${baseClasses} top-4 right-4 max-w-sm sm:max-w-md lg:max-w-lg`;
      case POSITIONS.TOP_CENTER:
        return `${baseClasses} top-4 left-1/2 transform -translate-x-1/2 max-w-sm sm:max-w-md lg:max-w-lg`;
      case POSITIONS.BOTTOM_LEFT:
        return `${baseClasses} bottom-4 left-4 max-w-sm sm:max-w-md lg:max-w-lg`;
      case POSITIONS.BOTTOM_RIGHT:
        return `${baseClasses} bottom-4 right-4 max-w-sm sm:max-w-md lg:max-w-lg`;
      case POSITIONS.BOTTOM_CENTER:
        return `${baseClasses} bottom-4 left-1/2 transform -translate-x-1/2 max-w-sm sm:max-w-md lg:max-w-lg`;
      default:
        return `${baseClasses} top-4 right-4 max-w-sm sm:max-w-md lg:max-w-lg`;
    }
  };

  return (
    <div className={getContainerClasses()}>
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationItem
            notification={notification}
            onRemove={onRemove}
            position={position}
          />
        </div>
      ))}
    </div>
  );
};

// Notification Provider
export const NotificationProvider = ({
  children,
  position = POSITIONS.TOP_RIGHT,
  maxNotifications = 5,
}) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(
    (notification) => {
      const id = Date.now() + Math.random();
      const newNotification = {
        id,
        duration: 5000,
        closable: true,
        ...notification,
      };

      setNotifications((prev) => {
        const updated = [...prev, newNotification];
        return updated.slice(-maxNotifications);
      });

      return id;
    },
    [maxNotifications],
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const updateNotification = useCallback((id, updates) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, ...updates } : notification,
      ),
    );
  }, []);

  const success = useCallback(
    (message, options = {}) => {
      return addNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        message,
        ...options,
      });
    },
    [addNotification],
  );

  const error = useCallback(
    (message, options = {}) => {
      return addNotification({
        type: NOTIFICATION_TYPES.ERROR,
        message,
        duration: 8000,
        ...options,
      });
    },
    [addNotification],
  );

  const warning = useCallback(
    (message, options = {}) => {
      return addNotification({
        type: NOTIFICATION_TYPES.WARNING,
        message,
        duration: 6000,
        ...options,
      });
    },
    [addNotification],
  );

  const info = useCallback(
    (message, options = {}) => {
      return addNotification({
        type: NOTIFICATION_TYPES.INFO,
        message,
        ...options,
      });
    },
    [addNotification],
  );

  const loading = useCallback(
    (message, options = {}) => {
      return addNotification({
        type: NOTIFICATION_TYPES.LOADING,
        message,
        duration: 3000,
        closable: true,
        ...options,
      });
    },
    [addNotification],
  );

  const contextValue = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    updateNotification,
    success,
    error,
    warning,
    info,
    loading,
    NOTIFICATION_TYPES,
    POSITIONS,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationContainer
        notifications={notifications}
        position={position}
        onRemove={removeNotification}
      />

      <style jsx>{`
        @keyframes shrink {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(400%);
            opacity: 0;
          }
        }
      `}</style>
    </NotificationContext.Provider>
  );
};

// Hook to use notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider',
    );
  }
  return context;
};
