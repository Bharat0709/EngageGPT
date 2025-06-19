import { useState } from 'react';
import {
  FiX,
  FiUser,
  FiSettings,
  FiShield,
  FiTrash2,
  FiGlobe,
  FiCreditCard,
  FiAlertTriangle,
  FiActivity,
} from 'react-icons/fi';

// Custom Components
const Button = ({
  children,
  onClick,
  variant = 'primary',
  loading = false,
  className = '',
  disabled = false,
  size = 'md',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
  };
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500',
    secondary:
      'bg-[#f6f6f6] text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    outline:
      'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-sky-50 rounded-xl p-4 ${className}`}>{children}</div>
);

const CardHeader = ({ title, subtitle, icon: Icon, action }) => (
  <div className="mb-4 pb-4 border-b border-gray-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-gray-700" />}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>{children}</div>
);

const StatCard = ({ icon: Icon, label, value, trend, color = 'blue' }) => {
  return (
    <div className="p-3 rounded-lg bg-white border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-600">{label}</p>
          <p className="text-lg font-semibold mt-1 text-gray-900">{value}</p>
          {trend && <p className="text-xs mt-1 text-gray-500">{trend}</p>}
        </div>
        <Icon className="w-6 h-6 text-gray-500" />
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
        <div
          className={`relative bg-white rounded-xl shadow-xl ${maxWidth} w-full`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

const AccountSettings = ({ onClose, memberData }) => {
  const [userData, setUserData] = useState(memberData || {});
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [loading, setLoading] = useState({});

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${day}${getOrdinal(day)} ${month}, ${year}`;
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'danger', label: 'Account', icon: FiSettings },
  ];

  const handleDisconnectLinkedIn = async () => {
    setLoading({ ...loading, linkedin: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUserData({ ...userData, isLinkedinConnected: false });
    setLoading({ ...loading, linkedin: false });
    setShowDisconnectModal(false);
  };

  const handleDeleteAccount = async () => {
    setLoading({ ...loading, delete: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert('Account deletion initiated. You will receive a confirmation email.');
    setShowDeleteModal(false);
    setLoading({ ...loading, delete: false });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader
                title="Profile Information"
                subtitle="Your basic account information"
                icon={FiUser}
              />
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={userData.profilePicture}
                      alt={userData.name}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        userData.active ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between w-full">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {userData.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {userData.email}
                        </p>
                      </div>
                      <div>
                        <p className="p-1 px-3 lg:mt-0 mt-2 mb-2 bg-[#ededed] rounded-md text-sm">
                          Member since {formatDate(userData.accountCreatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard
                    icon={FiActivity}
                    label="Days Active"
                    value={userData.daysActive}
                  />
                  <StatCard
                    icon={FiCreditCard}
                    label="Credits"
                    value={userData.credits}
                  />
                  <StatCard
                    icon={FiShield}
                    label="Credits Used"
                    value={userData.totalCreditsUsed}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card>
              <CardHeader
                title="Account Details"
                subtitle="Manage your account preferences"
                icon={FiSettings}
              />
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">Time Zone</p>
                    <p className="text-sm text-gray-600">{userData.timeZone}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">Email Provider</p>
                    <p className="text-sm text-gray-600">
                      {userData.emailProvider || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">Profile Link</p>
                    <p className="text-sm text-gray-600">
                      {userData.profileLink || 'Not set'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'danger':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader
                title="Data Export"
                subtitle="Download your data"
                icon={FiGlobe}
              />
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  You can request a copy of all your data including posts,
                  connections, and analytics.
                </p>
                <Button variant="outline">Request Data Export</Button>
              </CardContent>
            </Card>
            <Card className="border-red-200">
              <CardHeader
                title="Dangerous Actions"
                subtitle="These actions cannot be undone"
                icon={FiAlertTriangle}
              />
              <CardContent className="space-y-6">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <FiTrash2 className="w-5 h-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-red-900">
                        Delete Account
                      </h4>
                      <p className="text-sm text-red-700 mt-1">
                        Permanently delete your account and all associated data.
                        This action cannot be undone.
                      </p>
                      <Button
                        variant="danger"
                        size="sm"
                        className="mt-3"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0  z-50 overflow-hidden  bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl  w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {/* <Settings className="w-6 h-6 text-blue-600" /> */}
            <h2 className="text-2xl font-semibold text-gray-900">
              Account Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            X
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-slate-50 rounded-bl-2xl  p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id  
                        ? 'bg-[#0c4a6e] text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-scroll scrollbar-hide p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Modals */}
        <Modal
          isOpen={showDisconnectModal}
          onClose={() => setShowDisconnectModal(false)}
          title="Disconnect LinkedIn"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
              {/* <AlertTriangle className="w-5 h-5 text-red-500" /> */}
              <p className="text-sm text-red-700">
                This will revoke access to your LinkedIn account and stop all
                data syncing.
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDisconnectModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDisconnectLinkedIn}
                loading={loading.linkedin}
              >
                Disconnect LinkedIn
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Account"
          className="bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
          maxWidth="max-w-lg"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
              <FiTrash2 className="w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-sm text-red-700">
                This will permanently delete your account and all associated
                data. This action cannot be undone.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Before deleting your account, please consider:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• All your saved posts will be permanently deleted</li>
                <li>• Your analytics and activity data will be lost</li>
                <li>• LinkedIn connections will be revoked</li>
                <li>• This action cannot be reversed</li>
              </ul>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                className="rounded-full p-2 bg-white px-4 text-black text-sm font-medium hover:bg-gray-50 border border-gray-300 transition-colors flex items-center gap-2"
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-full p-2 bg-red-600 px-4 text-white text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                variant="danger"
                onClick={handleDeleteAccount}
                loading={loading.delete}
              >
                Delete My Account
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AccountSettings;
