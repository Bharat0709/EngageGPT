import React, { useRef } from 'react';
import { Drawer } from 'antd';
import linkedInIcon from '@assets/images/linkedInIcon.png';
import Tooltip from '../Global/ToolTip';
import { goTo } from '@utils/navigator';
import { Icons } from '@utils/constantData/icons';

const PostDrawer = ({ post, handleDrawerClose, isOpen }) => {
  const drawerRef = useRef(null);
  const handleRewriteWithAI = () => {
    goTo('/dashboard/create-post', {
      state: {
        initialTemplate: post?.textContent,
        description: 'Rewrite the following post',
      },
    });
  };

  return (
    <div className="bg-white rounded-lg flex flex-col gap-2 py-3">
      <Drawer
        placement="right"
        closable={true}
        onClose={handleDrawerClose}
        open={isOpen}
        width={600}
        style={{
          backgroundColor: ' #f3f4f6',
          padding: '0px 12px 12px 12px',
        }}
        ref={drawerRef}
        className="min-w-72 bg-gray-100 scrollbar-hide"
      >
        <div className="p-3 bg-white rounded-xl flex flex-col gap-4">
          <div className="flex lg:flex-row flex-col gap-4 items-center justify-between scrollbar-hide">
            <div className="flex items-center gap-4">
              <img
                className="h-10 w-10 rounded-full"
                src={post?.author.profilePicture}
                alt={post?.author.name}
              />
              <span className="text-gray-700 text-sm">{post?.author.name}</span>
              <span className="text-gray-700 text-sm">
                {post?.postedAround}
              </span>
              <Tooltip text="View Post" position="right">
                <a
                  href={post?.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black flex items-center hover:underline"
                >
                  <img className="h-4 w-4" src={linkedInIcon} alt="LinkedIn" />
                </a>
              </Tooltip>
            </div>
            <button
              onClick={handleRewriteWithAI}
              className="global-button-primary text-xs rounded-lg"
            >
              Rewrite with AI
            </button>
          </div>
          <div className="flex justify-between bg-gray-50 px-3 py-2 rounded-lg text-md items-center text-black">
            {/* Likes */}
            <Tooltip text="Likes" position="bottom">
              <div className="flex bg-gray-50 px-2 items-center">
                <Icons.Heart className="mr-2" />
                <span>
                  {post?.numLikes >= 1000
                    ? `${(post?.numLikes / 1000).toFixed(1)}k`
                    : post?.numLikes}
                </span>
              </div>
            </Tooltip>

            {/* Shares */}
            <Tooltip text="Shares" position="bottom">
              <div className="flex items-center">
                <Icons.Share className="mr-2" />
                <span>
                  {post?.numShares >= 1000
                    ? `${(post?.numShares / 1000).toFixed(1)}k`
                    : post?.numShares}
                </span>
              </div>
            </Tooltip>

            {/* Views */}
            <Tooltip text="Views" position="bottom">
              <div className="flex items-center">
                <Icons.Eye className="mr-2" />
                <span>
                  {post?.numViews >= 1000
                    ? `${(post?.numViews / 1000).toFixed(1)}k`
                    : post?.numViews}
                </span>
              </div>
            </Tooltip>

            {/* Impressions */}
            <Tooltip text="Impressions" position="bottom">
              <div className="flex items-center">
                <Icons.BarChart className="mr-2" />
                <span>
                  {post?.numImpressions >= 1000
                    ? `${(post?.numImpressions / 1000).toFixed(1)}k`
                    : post?.numImpressions}
                </span>
              </div>
            </Tooltip>

            <div className="flex items-center">
              <Icons.AiMessage className="mr-2" />
              <span>
                {post?.numComments >= 1000
                  ? `${(post?.numComments / 1000).toFixed(1)}k`
                  : post?.numComments}
              </span>
            </div>
          </div>

          <h3 className="text-md mb-2 leading-6 text-gray-800 p-2">
            {post?.textContent.split('\n').map((text, index) => (
              <span key={index}>
                {text}
                {index < post?.textContent.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h3>
        </div>
      </Drawer>
    </div>
  );
};

export default PostDrawer;
