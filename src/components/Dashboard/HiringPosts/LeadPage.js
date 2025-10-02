import { Icons } from '@utils/constantData/icons';
import React from 'react';
import {
  FiMail,
  FiLinkedin,
  FiExternalLink,
  FiCalendar,
  FiTrendingUp,
  FiMessageSquare,
  FiHeart,
  FiTag,
  FiDollarSign,
  FiClock,
  FiTarget,
  FiSettings,
  FiActivity,
  FiCheckCircle,
  FiAlertCircle,
  FiPlay,
  FiPause,
  FiBuilding,
  FiUser,
  FiGlobe,
} from 'react-icons/fi';

const LeadDetailsModal = ({ onClose, leadData }) => {
  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800 border-blue-200',
      contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      responded: 'bg-green-100 text-green-800 border-green-200',
      qualified: 'bg-purple-100 text-purple-800 border-purple-200',
      converted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      closed: 'bg-gray-100 text-gray-800 border-gray-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-slate-100 text-slate-700 border-slate-200',
      medium: 'bg-blue-100 text-blue-700 border-blue-200',
      high: 'bg-orange-100 text-orange-700 border-orange-200',
      urgent: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[priority] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatContent = (content) => {
    return content
      .split('\n')
      .map((line) => line.trim()) // Trim leading/trailing spaces
      .filter((line) => line !== '') // Remove empty lines (optional)
      .join('\n');
  };

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const DetailRow = ({ icon, label, value, type = 'text' }) => {
    if (!value && value !== 0) return null;

    const renderValue = () => {
      if (type === 'email') {
        return (
          <a
            href={`mailto:${value}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {value}
          </a>
        );
      }
      if (type === 'url') {
        return (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            {value} <FiExternalLink className="text-xs" />
          </a>
        );
      }
      if (type === 'date') {
        return (
          <span className="font-medium text-gray-900">{formatDate(value)}</span>
        );
      }
      return <span className="font-medium text-gray-900">{value}</span>;
    };

    return (
      <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-b-0">
        <div className="flex-shrink-0 w-5 h-5 text-gray-400 mt-0.5">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-600 mb-1">{label}</div>
          <div className="text-gray-900">{renderValue()}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl  w-full max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FiUser className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {leadData.author}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                        leadData.leadStatus,
                      )}`}
                    >
                      {leadData.leadStatus?.charAt(0).toUpperCase() +
                        leadData.leadStatus?.slice(1)}
                    </span>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold border ${getPriorityColor(
                        leadData.leadPriority,
                      )}`}
                    >
                      {leadData.leadPriority?.charAt(0).toUpperCase() +
                        leadData.leadPriority?.slice(1)}{' '}
                      Priority
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Engagement Stats */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-red-500 mb-1">
                      <FiHeart className="text-lg" />
                      <span className="text-2xl font-bold text-gray-900">
                        {leadData.likes || 0}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-blue-500 mb-1">
                      <FiMessageSquare className="text-lg" />
                      <span className="text-2xl font-bold text-gray-900">
                        {leadData.comments || 0}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">Comments</div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-xl transition-all duration-200"
                >
                  <Icons.Cross className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto bg-gray-50 max-h-[calc(95vh-140px)]">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-2">
                {/* Lead Content */}
                <div className="bg-white  rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiMessageSquare className="text-blue-600 text-lg" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Lead Content
                    </h2>
                  </div>

                  {leadData.title && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {leadData.title}
                      </h3>
                    </div>
                  )}

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {formatContent(leadData.content) ||
                        'No content available'}
                    </p>
                  </div>

                  {leadData.tags && leadData.tags.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <FiTag className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">
                          Tags
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {leadData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="bg-white  rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <FiMail className="text-green-600 text-lg" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Contact Information
                    </h2>
                  </div>

                  <div className="space-y-1">
                    {leadData.emailAddresses &&
                      leadData.emailAddresses.length > 0 && (
                        <div>
                          <div className="text-sm font-medium text-gray-600 mb-3">
                            Email Addresses
                          </div>
                          <div className="space-y-2">
                            {leadData.emailAddresses.map((email, index) => (
                              <DetailRow
                                key={index}
                                icon={<FiMail />}
                                label={`Email ${index + 1}`}
                                value={email}
                                type="email"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                    {leadData.authorUrl && (
                      <DetailRow
                        icon={<FiLinkedin />}
                        label="Profile URL"
                        value={leadData.authorUrl?.split('?')[0] || ''}
                        type="url"
                      />
                    )}

                    {leadData.formLinks && leadData.formLinks.length > 0 && (
                      <div className="mt-4">
                        <div className="text-sm font-medium text-gray-600 mb-3">
                          Form Links
                        </div>
                        <div className="space-y-2">
                          {leadData.formLinks.map((link, index) => (
                            <DetailRow
                              key={index}
                              icon={<FiGlobe />}
                              label={`Form ${index + 1}`}
                              value={link}
                              type="url"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Automation History */}
                {leadData.automationHistory &&
                  leadData.automationHistory.length > 0 && (
                    <div className="bg-white  rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <FiActivity className="text-indigo-600 text-lg" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          Activity Timeline
                        </h2>
                      </div>

                      <div className="space-y-4">
                        {leadData.automationHistory.map((entry, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                          >
                            <div className="flex-shrink-0 mt-1">
                              {entry.status === 'success' ? (
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                  <FiCheckCircle className="text-green-600 text-lg" />
                                </div>
                              ) : entry.status === 'failed' ? (
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                  <FiAlertCircle className="text-red-600 text-lg" />
                                </div>
                              ) : (
                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                  <FiClock className="text-yellow-600 text-lg" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold text-gray-900">
                                  {entry.action
                                    ?.replace('_', ' ')
                                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                                </span>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    entry.status === 'success'
                                      ? 'bg-green-100 text-green-700'
                                      : entry.status === 'failed'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}
                                >
                                  {entry.status}
                                </span>
                              </div>
                              {entry.details && (
                                <p className="text-gray-600 mb-2">
                                  {entry.details}
                                </p>
                              )}
                              <p className="text-xs text-gray-400">
                                {formatDate(entry.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
              {/* Sidebar */}
              <div className="space-y-2">
                {/* Lead Details */}
                <div className="bg-white  rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FiTrendingUp className="text-purple-600 text-lg" />
                    </div>
                    <h3 className="text-lg mb-0 font-semibold text-gray-900">
                      Lead Details
                    </h3>
                  </div>

                  <div className="space-y-1">
                    <DetailRow
                      icon={<FiTarget />}
                      label="Industry"
                      value={leadData.industry}
                    />
                    <DetailRow
                      icon={<FiTarget />}
                      label="Company Size"
                      value={leadData.companySize}
                    />
                    <DetailRow
                      icon={<FiDollarSign />}
                      label="Budget"
                      value={leadData.budget}
                    />
                    <DetailRow
                      icon={<FiTag />}
                      label="Category"
                      value={leadData.category}
                    />
                    <DetailRow
                      icon={<FiCalendar />}
                      label="Created"
                      value={leadData.createdAt}
                      type="date"
                    />
                    <DetailRow
                      icon={<FiClock />}
                      label="Last Contacted"
                      value={leadData.lastContactedAt}
                      type="date"
                    />
                  </div>
                </div>

                {/* Automation Settings */}
                <div className="bg-white  rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FiSettings className="text-amber-600 text-lg" />
                    </div>
                    <h3 className="text-lg mb-0 font-semibold text-gray-900">
                      Automation
                    </h3>
                  </div>

                  <div className="space-y-1">
                    <DetailRow
                      icon={
                        leadData.automationEnabled === 'none' ? (
                          <FiPause />
                        ) : (
                          <FiPlay />
                        )
                      }
                      label="Status"
                      value={
                        leadData.automationEnabled === 'none'
                          ? 'Disabled'
                          : leadData.automationEnabled === 'semi'
                          ? 'Semi-Automated'
                          : 'Fully Automated'
                      }
                    />
                    <DetailRow
                      icon={<FiCalendar />}
                      label="Follow-up Interval"
                      value={`${leadData.followUpInterval} days`}
                    />
                    <DetailRow
                      icon={<FiTarget />}
                      label="Max Follow-ups"
                      value={leadData.maxFollowUps}
                    />
                    <DetailRow
                      icon={<FiActivity />}
                      label="Completed Follow-ups"
                      value={leadData.followUpCount}
                    />

                    {leadData.followUpCount > 0 &&
                      leadData.maxFollowUps > 0 && (
                        <div className="pt-4 mt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">
                              {Math.round(
                                (leadData.followUpCount /
                                  leadData.maxFollowUps) *
                                  100,
                              )}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${
                                  (leadData.followUpCount /
                                    leadData.maxFollowUps) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                {/* Notes */}
                {leadData.notes && (
                  <div className="bg-white  rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FiMessageSquare className="text-gray-600 text-lg" />
                      </div>
                      <h3 className=" mb-0 text-lg font-semibold text-gray-900">
                        Notes
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {leadData.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsModal;
