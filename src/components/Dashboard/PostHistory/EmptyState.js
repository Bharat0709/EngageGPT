import React from 'react';
import { Typography } from 'antd';
import NotFound from '../../../assets/images/PostNotFound.png';

const { Text, Title } = Typography;

const EmptyState = ({ activeTab, getStatusIcon }) => {
  return (
    <div className="text-center py-12 bg-white rounded-xl">
      <img
        src={NotFound}
        alt="No posts"
        className="mx-auto lg:h-60 h-30 mb-4"
      />
      <Title level={4} className="text-gray-600 mb-2">
        No {activeTab} posts found
      </Title>
      <Text className="text-gray-500">
        Your {activeTab} posts will appear here
      </Text>
    </div>
  );
};

export default EmptyState;
