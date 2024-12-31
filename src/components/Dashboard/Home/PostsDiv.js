import React from 'react';
import { AiOutlineBarChart, AiOutlineArrowRight } from 'react-icons/ai';
import linkedInIcon from '../../../assets/images/linkedInIcon.png';
import { Skeleton, Popover, Button } from 'antd';

const PostsDiv = ({ handlePostClick, posts, isLoading }) => {
  return (
    <div className="rounded-lg flex flex-col gap-2 py-3">
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50  flex justify-between rounded-xl gap-2"
            >
              <div className="flex gap-3 items-center">
                <Skeleton.Avatar active size="large" />
                <Skeleton.Input
                  active
                  size="small"
                  style={{ height: 12, width: 42 }}
                />
                <Skeleton.Input
                  active
                  size="small"
                  style={{ height: 12, width: 320 }}
                />
              </div>
              <div className="flex gap-6 justify-between items-center">
                <Skeleton.Button active size="small" />
                <Skeleton.Button active size="small" />
                <Skeleton.Button active size="small" />
              </div>
            </div>
          ))
        : posts.map((post) => (
            <div
              key={post._id}
              className="p-3 bg-white rounded-xl cursor-pointer hover:border hover:bg-gray-50 transition duration-200 ease-in-out flex flex-col gap-2 space-y-2"
              onClick={() => handlePostClick(post._id)}
            >
              <div className="flex gap-6 lg:flex-row flex-col justify-between lg:items-center">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={post.author.profilePicture}
                      alt={post.author.name}
                    />
                    <span className="text-gray-700 min-w-32 text-sm">
                      {post.postedAround}
                    </span>
                  </div>
                  <a
                    href={post.shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black flex items-center hover:underline"
                  >
                    <img
                      className="h-4 w-4"
                      src={linkedInIcon}
                      alt="LinkedIn"
                    />
                  </a>
                </div>
                <h3 className="text-sm text-gray-600 text-left font-medium">
                  {post.textContent.split(' ').slice(0, 5).join(' ') + '...'}
                </h3>
                <div className="flex gap-6 justify-between items-center text-sm text-black">
                  <div className="flex items-center">
                    <AiOutlineBarChart className="mr-2" />
                    <span>
                      {post.numImpressions >= 1000
                        ? `${(post.numImpressions / 1000).toFixed(1)}k`
                        : post.numImpressions}
                    </span>
                  </div>

                  <Popover
                    placement="right"
                    content={
                      <div className="text-center">
                        <Button
                          type="link"
                          onClick={() => handlePostClick(post._id)}
                        >
                          View Details
                        </Button>
                      </div>
                    }
                    trigger="hover"
                  >
                    <AiOutlineArrowRight className="text-gray-500 hover:text-blue-500 transition duration-200 ease-in-out" />
                  </Popover>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default PostsDiv;
