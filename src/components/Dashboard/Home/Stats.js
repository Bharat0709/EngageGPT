import React from 'react';
import { FiUsers } from 'react-icons/fi';
import {
  AiOutlinePlus,
  AiOutlineEye,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineBarChart,
  AiOutlineMessage,
  AiOutlineCreditCard,
  AiOutlineRobot,
} from 'react-icons/ai';

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
    <div className="group relative rounded-2xl overflow-hidden p-4 hover:-translate-y-1 transition-all duration-300 ease-out">
      {/* Background Pattern */}
      <div className="absolute inset-0  bg-black text-white"></div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`}
        ></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300`}
          >
            <span className="text-white text-lg">{stat.icon}</span>
          </div>

          <div className="w-2 h-2 rounded-full bg-gray-300  transition-colors duration-300"></div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white  transition-colors duration-300">
            {stat.value}
            {stat.suffix && (
              <span className="text-xl ml-1 text-white">{stat.suffix}</span>
            )}
          </div>
          <div className="text-sm font-medium text-white  transition-colors duration-300">
            {stat.title}
          </div>
        </div>
      </div>
    </div>
  );
};

const Stats = ({ isLoading, selectedProfile, stats }) => {
  const statistics = [
    {
      title: 'Followers',
      value: selectedProfile?.followersCount?.toLocaleString('hi-IN') || '0',
      icon: <FiUsers />,
    },
    {
      title: 'Following',
      value: selectedProfile?.followingCount?.toLocaleString('hi-IN') || '0',
      icon: <AiOutlineUser />,
    },
    {
      title: 'Connections',
      value: selectedProfile?.connectionsCount?.toLocaleString('hi-IN') || '0',
      icon: <AiOutlinePlus />,
    },
    {
      title: 'Profile Views',
      value: selectedProfile?.profileViews?.toLocaleString('hi-IN') || '0',
      icon: <AiOutlineEye />,
    },
    {
      title: 'Search Appearances',
      value: selectedProfile?.searchAppearances?.toLocaleString('hi-IN') || '0',
      icon: <AiOutlineSearch />,
    },
    {
      title: 'Total Likes',
      value: stats?.totalLikes?.toLocaleString('hi-IN') || '0',
      icon: <AiOutlineHeart />,
    },
    {
      title: 'Total Shares',
      value: stats?.totalShares?.toLocaleString('hi-IN') || '0',
      icon: <AiOutlineShareAlt />,
    },
    {
      title: 'Total Views',
      value: stats?.totalViews?.toLocaleString('hi-IN') || '0',
      icon: <AiOutlineEye />,
    },
    {
      title: 'Total Impressions',
      value: stats?.totalImpressions?.toLocaleString('hi-IN') || '0',
      icon: <AiOutlineBarChart />,
    },
    {
      title: 'Total Comments',
      value: stats?.totalComments?.toLocaleString('hi-IN') || '0',
      icon: <AiOutlineMessage />,
    },
    {
      title: 'Credits Left (Today)',
      value: selectedProfile?.credits?.toLocaleString('hi-IN') || '0',
      icon: <AiOutlineCreditCard />,
    },
    {
      title: 'Total Credits Used',
      value: selectedProfile?.totalCreditsUsed?.toLocaleString('hi-IN') || '0',
      icon: <AiOutlineRobot />,
    },
  ];

  return (
    <div className="p-2lg:p-2">
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
