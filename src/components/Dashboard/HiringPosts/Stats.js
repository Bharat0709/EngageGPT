import { Icons } from '@utils/constantData/icons';
import React from 'react';

const SkeletonCard = () => (
  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 border border-gray-200/50">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 rounded-xl bg-gray-200 animate-pulse">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
      </div>
      <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
    </div>

    <div className="space-y-3">
      <div className="h-8 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
    </div>

    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-pulse duration-1000"></div>
  </div>
);

const StatCard = ({ stat, index }) => {
  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-amber-500 to-yellow-500',
    'from-emerald-500 to-green-500',
    'from-purple-500 to-violet-500',
    'from-red-500 to-pink-500',
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <div className="group relative rounded-2xl overflow-hidden p-4 hover:-translate-y-2 transition-all duration-300 ease-out hover:shadow-2xl">
      {/* Background with glassmorphism effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20"></div>

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95"></div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}
        ></div>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 blur-xl`}
        ></div>
      </div>

      {/* Floating orb effect */}
      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={`p-4 rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
          >
            <span className="text-white text-xl">{stat.icon}</span>
          </div>

          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-white transition-colors duration-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-500 opacity-50"></div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="text-4xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300">
            {stat.value}
            {stat.suffix && (
              <span className="text-2xl ml-1 text-gray-300">{stat.suffix}</span>
            )}
          </div>
          <div className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors duration-300 uppercase tracking-wider">
            {stat.title}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-4 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
          <div
            className={`h-1 bg-gradient-to-r ${gradient} transition-all duration-1000 group-hover:w-full`}
            style={{
              width: `${Math.min(
                100,
                (stat.value / Math.max(...[stat.value])) * 100 || 20,
              )}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const UserStats = ({ isLoading, stats }) => {
  const statistics = [
    {
      title: 'New Leads',
      value: stats?.userStats?.statusCounts?.new || 0,
      icon: <Icons.Plus />,
    },
    {
      title: 'Contacted',
      value: stats?.userStats?.statusCounts?.contacted || 0,
      icon: <Icons.Phone />,
    },
    {
      title: 'Responded',
      value: stats?.userStats?.statusCounts?.responded || 0,
      icon: <Icons.CheckCircle />,
    },
    {
      title: 'Closed Deals',
      value: stats?.userStats?.statusCounts?.closed || 0,
      icon: <Icons.CloseCircle />,
    },
    {
      title: 'Rejected',
      value: stats?.userStats?.statusCounts?.rejected || 0,
      icon: <Icons.Stop />,
    },
  ];

  return (
    <div className="py-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : statistics.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
      </div>
    </div>
  );
};

export default UserStats;
