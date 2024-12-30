import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts';

const ChartComponent = ({ posts }) => {
  // Helper function to parse relative time strings into actual date objects
  const parseRelativeTime = (relativeTime) => {
    const currentDate = new Date();
    let date;

    try {
      if (relativeTime.includes('mins ago')) {
        const minutes = parseInt(relativeTime.split(' ')[0]);
        date = new Date(currentDate - minutes * 60000);
      } else if (relativeTime.includes('hours ago')) {
        const hours = parseInt(relativeTime.split(' ')[0]);
        date = new Date(currentDate - hours * 3600000);
      } else if (relativeTime.includes('days ago')) {
        const days = parseInt(relativeTime.split(' ')[0]);
        date = new Date(currentDate - days * 86400000);
      } else if (relativeTime.includes('months ago')) {
        const months = parseInt(relativeTime.split(' ')[0]);
        date = new Date(currentDate.setMonth(currentDate.getMonth() - months));
      } else {
        return undefined; // Handle unexpected relative time format
      }
    } catch (error) {
      console.error('Error parsing relative time:', error);
      return undefined;
    }

    return date;
  };

  // Function to group posts by relative time and aggregate likes/comments
  const groupPostsByRelativeTime = (posts) => {
    const groupedPosts = {};

    posts.forEach(post => {
      const parsedDate = parseRelativeTime(post.postedAround);
      if (!parsedDate) return;

      const now = new Date();
      const monthsAgo = Math.floor((now.getTime() - parsedDate.getTime()) / (1000 * 60 * 60 * 24 * 30));

      if (!groupedPosts[monthsAgo]) {
        groupedPosts[monthsAgo] = { months: getMonthName(monthsAgo), posts: [] };
      }

      groupedPosts[monthsAgo].posts.push(post);
    });

    return Object.values(groupedPosts).sort((a, b) => a.monthsAgo - b.monthsAgo);
  };

  // Function to get the month name based on monthsAgo
  const getMonthName = (monthsAgo) => {
    const currentMonthIndex = new Date().getMonth();
    const monthIndex = (currentMonthIndex - monthsAgo + 12) % 12;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[monthIndex];
  };

  // Function to aggregate likes or comments based on the type
  const aggregateData = (posts, key) => {
    return posts.map(group => ({
      name: group.months,
      [key]: group.posts.reduce((acc, post) => acc + post[key], 0)
    }));
  };

  const groupedPosts = groupPostsByRelativeTime(posts);

  // Aggregate impressions, likes, and comments separately
  const impressionData = aggregateData(groupedPosts, 'numImpressions');
  const likesData = aggregateData(groupedPosts, 'numLikes');
  const commentsData = aggregateData(groupedPosts, 'numComments');

  return (
    <div>
      <h2 className="text-center text-lg font-bold my-4">Post Statistics</h2>

      <div className="chart-container ">
        <h3 className="text-md font-semibold">Impressions</h3>
        <BarChart width={600} height={300} data={impressionData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="numImpressions" fill="#36A2EB" />
        </BarChart>


        <h3 className="text-md font-semibold mt-8">Likes</h3>
        <BarChart width={600} height={300} data={likesData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="numLikes" fill="#FF6384" />
        </BarChart>


        <h3 className="text-md font-semibold mt-8">Comments</h3>
        <BarChart width={600} height={300} data={commentsData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="numComments" fill="#4BC0C0" />
        </BarChart>
      </div>
    </div>
  );
};

export default ChartComponent;
