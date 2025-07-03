import React from 'react';
import { Typography } from 'antd';

const { Text, Title } = Typography;

const EmptyState = ({ activeTab, getStatusIcon }) => {
  return (
    <div className="text-center py-12 bg-white rounded-xl">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {getStatusIcon(activeTab)}
      </div>
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
