import React from 'react';
import { Icons } from '@utils/constantData/icons';

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
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
    'from-cyan-500 to-blue-500',
    'from-emerald-500 to-teal-500',
    'from-violet-500 to-purple-500',
    'from-amber-500 to-orange-500',
    'from-red-500 to-pink-500',
    'from-teal-500 to-cyan-500',
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <div className="group relative rounded-2xl overflow-hidden p-4 hover:-translate-y-1 transition-all duration-300 ease-out hover:shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`}
        ></div>
      </div>

      {/* Animated shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      {/* Floating orb effect */}
      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
          >
            <span className="text-white text-lg">{stat.icon}</span>
          </div>

          <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-white transition-colors duration-300"></div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="text-3xl font-bold ovo-regular  text-white group-hover:text-gray-100 transition-colors duration-300">
            {stat.value}
            {stat.suffix && (
              <span className="text-xl ml-1 text-white group-hover:text-gray-300">
                {stat.suffix}
              </span>
            )}
          </div>
          <div className="text-sm ovo-regular font-medium text-white group-hover:text-gray-200 transition-colors duration-300">
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
                (parseInt(stat.value.replace(/,/g, '')) / 10000) * 100 || 20,
              )}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const Stats = ({ isLoading, selectedProfile, stats }) => {
  const statistics = [
    // {
    //   title: 'Followers',
    //   value: selectedProfile?.followersCount?.toLocaleString('hi-IN') || '0',
    //   icon: <Icons.Users />,
    // },
    // {
    //   title: 'Following',
    //   value: selectedProfile?.followingCount?.toLocaleString('hi-IN') || '0',
    //   icon: <Icons.AiUser />,
    // },
    // {
    //   title: 'Connections',
    //   value: selectedProfile?.connectionsCount?.toLocaleString('hi-IN') || '0',
    //   icon: <Icons.Plus />,
    // },
    // {
    //   title: 'Profile Views',
    //   value: selectedProfile?.profileViews?.toLocaleString('hi-IN') || '0',
    //   icon: <Icons.AiEye />,
    // },
    // {
    //   title: 'Search Appearances',
    //   value: selectedProfile?.searchAppearances?.toLocaleString('hi-IN') || '0',
    //   icon: <Icons.AiSearch />,
    // },
    {
      title: 'Total Likes',
      value: stats?.totalLikes?.toLocaleString('hi-IN') || '0',
      icon: <Icons.Heart />,
    },
    {
      title: 'Total Views',
      value: stats?.totalViews?.toLocaleString('hi-IN') || '0',
      icon: <Icons.AiEye />,
    },
    {
      title: 'Total Impressions',
      value: stats?.totalImpressions?.toLocaleString('hi-IN') || '0',
      icon: <Icons.BarChart />,
    },
    {
      title: 'Total Comments',
      value: stats?.totalComments?.toLocaleString('hi-IN') || '0',
      icon: <Icons.AiMessage />,
    },
  ];

  return (
    <div className="rounded-2xl">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : statistics.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
      </div>
    </div>
  );
};

export default Stats;
