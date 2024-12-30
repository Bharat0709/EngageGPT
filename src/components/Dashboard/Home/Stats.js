import React from 'react';
import { Skeleton } from 'antd';
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

const Stats = ({ isLoading, selectedProfile, stats }) => {
  const statistics = [
    {
      title: 'Followers',
      value: selectedProfile.followersCount.toLocaleString('hi-IN'),
      icon: <FiUsers />,
    },
    {
      title: 'Following',
      value: selectedProfile.followingCount.toLocaleString('hi-IN'),
      icon: <AiOutlineUser />,
    },
    {
      title: 'Connections',
      value: selectedProfile.connectionsCount.toLocaleString('hi-IN'),
      icon: <AiOutlinePlus />,
    },
    {
      title: 'Profile Views',
      value: selectedProfile.profileViews.toLocaleString('hi-IN'),
      icon: <AiOutlineEye />,
    },
    {
      title: 'Search Appearances',
      value: selectedProfile.searchAppearances.toLocaleString('hi-IN'),
      icon: <AiOutlineSearch />,
    },
    {
      title: 'Total Likes',
      value: stats?.totalLikes?.toLocaleString('hi-IN'),
      icon: <AiOutlineHeart />,
    },
    {
      title: 'Total Shares',
      value: stats?.totalShares?.toLocaleString('hi-IN'),
      icon: <AiOutlineShareAlt />,
    },
    {
      title: 'Total Views',
      value: stats?.totalViews?.toLocaleString('hi-IN'),
      icon: <AiOutlineEye />,
    },
    {
      title: 'Total Impressions',
      value: stats?.totalImpressions?.toLocaleString('hi-IN'),
      icon: <AiOutlineBarChart />,
    },
    {
      title: 'Total Comments',
      value: stats?.totalComments?.toLocaleString('hi-IN'),
      icon: <AiOutlineMessage />,
    },
    {
      title: 'Credits Left (Today)',
      value: selectedProfile?.credits?.toLocaleString('hi-IN'),
      icon: <AiOutlineCreditCard />,
    },
    {
      title: 'Total Credits Used',
      value: selectedProfile?.totalCreditsUsed?.toLocaleString('hi-IN'),
      icon: <AiOutlineRobot />,
    },
  ];

  return (
    <div className="bg-white lg:px-6 lg:py-4 p-3">
      <div className="flex flex-wrap lg:justify-start justify-center gap-4">
        {isLoading
          ? Array(10)
              .fill(null)
              .map((_, index) => (
                <div
                  className="rounded-xl lg:min-w-44 min-w-36 p-3 py-3 bg-gray-50"
                  key={index}
                >
                  <Skeleton active title={false} paragraph={{ rows: 2 }} />
                </div>
              ))
          : statistics.map((stat, index) => (
              <div
                className="rounded-xl hover:bg-gray-50 lg:min-w-44 min-w-36 p-3 py-3 bg-sky-50"
                key={index}
              >
                <div>
                  <div
                    key={index}
                    className="flex flex-col items-start gap-5 rounded"
                  >
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">
                        {stat.icon}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {stat.title}
                      </span>
                    </div>
                    <div className="text-2xl">
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-lg ml-1">{stat.suffix}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Stats;
