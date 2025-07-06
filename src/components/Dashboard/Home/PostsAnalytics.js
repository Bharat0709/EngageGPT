import React, { useState, useEffect } from 'react';
import { getMemberPosts } from '@services/Posts';
import PostDrawer from './PostsDrawer';
import PostFilters from './PostsFilter';
import PostsDiv from './PostsDiv';
import NoPostsFound from '@assets/images/PostNotFound.png';
import { message } from 'antd';

const PostDetails = ({ setStats, memberId }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [sortBy, setSortBy] = useState('Date Posted');
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await getMemberPosts(memberId);
        setPosts(sortPosts(fetchedPosts.posts));
        setTopPosts(fetchedPosts.topPosts);
        setStats(fetchedPosts.stats);
        setIsLoading(false);
      } catch (error) {
        message.error('Something went wrong! Reload and try again');
      }
    };
    fetchPosts();
  }, [memberId, setStats]);

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };

  const handleDrawerClose = () => {
    setSelectedPostId(null);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  function sortPosts(posts) {
    const convertToMinutes = (time) => {
      // eslint-disable-next-line no-unused-vars
      const [_, amount, unit] = time.match(/(\d+)\s*(\w+)\s*ago/);
      switch (unit) {
        case 'mins':
          return parseInt(amount);
        case 'hour':
        case 'hours':
          return parseInt(amount) * 60;
        case 'day':
        case 'days':
          return parseInt(amount) * 1440;
        case 'week':
        case 'weeks':
          return parseInt(amount) * 10080;
        case 'month':
        case 'months':
          return parseInt(amount) * 43200;
        default:
          return 0;
      }
    };

    return posts.sort((a, b) => {
      const timeA = convertToMinutes(a.postedAround);
      const timeB = convertToMinutes(b.postedAround);
      return timeA !== timeB
        ? timeA - timeB
        : b.numImpressions - a.numImpressions;
    });
  }

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'Date Posted':
        return posts;
      case 'Likes':
        return b.numLikes - a.numLikes;
      case 'Shares':
        return b.numShares - a.numShares;
      case 'Views':
        return b.numViews - a.numViews;
      case 'Impressions':
        return b.numImpressions - a.numImpressions;
      case 'Comments':
        return b.numComments - a.numComments;
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col lg:p-0 p-0">
      {posts.length > 0 ? (
        <div>
          <p className="p-2 w-full border rounded-xl bg-gray-50 text-sm">
            {' '}
            Top Posts{' '}
          </p>
          <PostsDiv
            handlePostClick={handlePostClick}
            posts={topPosts}
            isLoading={isLoading}
          />
          <PostFilters posts={posts} handleSortChange={handleSortChange} />
          <PostsDiv
            handlePostClick={handlePostClick}
            posts={sortedPosts}
            isLoading={isLoading}
          />
          <PostDrawer
            post={posts.find((post) => post._id === selectedPostId)}
            handleDrawerClose={handleDrawerClose}
            isOpen={selectedPostId !== null}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 mt-10 items-center justify-center text-center">
          <p> No Posts Found</p>
          <img className="h-50 w-60" src={NoPostsFound} alt="NoData" />{' '}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
