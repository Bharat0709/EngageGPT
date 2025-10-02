import React, { useState, useMemo } from 'react';
import { Icons } from '@utils/constantData/icons';
import { FiEdit, FiTrash, FiEye, FiCalendar } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { Avatar, Tag, Tooltip } from 'antd';
import CustomCheckbox from './CustomCheckbox ';
import FloatingNavigationPosts from './FloatingNavigation';
import BulkActionModalPosts from './BulkActionModalPosts';
import NotFound from '@assets/images/PostNotFound.png';

// Sort icon component
const SortIcon = ({ sortDirection, sortField, field }) => {
  if (sortField !== field) {
    return <Icons.Down className="w-3 h-3 text-gray-400" />;
  }
  return sortDirection === 'asc' ? (
    <Icons.Up className="w-3 h-3 text-blue-600" />
  ) : (
    <Icons.Down className="w-3 h-3 text-blue-600" />
  );
};

const PostHistoryTable = ({
  posts = [],
  selectedProfile,
  onEdit,
  onDelete,
  onOpenDrawer,
  formatDateTime,
  getStatusColor,
  getStatusIcon,
  activeTab,
  onBulkDelete,
}) => {
  const [sortField, setSortField] = useState('postDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosts, setSelectedPosts] = useState(new Set());
  const [bulkModal, setBulkModal] = useState({
    isOpen: false,
    type: null,
  });

  // Column configuration
  const columns = [
    {
      key: 'content',
      label: 'Content',
      sortable: true,
      sortField: 'content',
      minWidth: '300px',
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      sortField: 'status',
      minWidth: '120px',
    },
    {
      key: 'media',
      label: 'Media',
      sortable: false,
      minWidth: '100px',
    },
    {
      key: 'scheduledDate',
      label: 'Scheduled Date',
      sortable: true,
      sortField: 'postDate',
      minWidth: '180px',
    },
  ];

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter((post) => {
      const matchesSearch = post.content
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    return filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'postDate') {
        aValue = new Date(a.postDate + ' ' + (a.postTime || '00:00'));
        bValue = new Date(b.postDate + ' ' + (b.postTime || '00:00'));
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [posts, sortField, sortDirection, searchTerm]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = new Set(filteredAndSortedPosts.map((post) => post._id));
      setSelectedPosts(allIds);
    } else {
      setSelectedPosts(new Set());
    }
  };

  const handleSelectPost = (postId, checked) => {
    const newSelected = new Set(selectedPosts);
    if (checked) {
      newSelected.add(postId);
    } else {
      newSelected.delete(postId);
    }
    setSelectedPosts(newSelected);
  };

  const handleDeselectPosts = () => {
    setSelectedPosts(new Set());
    setBulkModal({ isOpen: false, type: null });
  };

  const bulkActions = [
    {
      key: 'delete',
      label: 'Delete',
      icon: <FiTrash className="w-4 h-4" />,
      handler: () => setBulkModal({ isOpen: true, type: 'delete' }),
    },
  ];

  const handleBulkAction = (actionData) => {
    const postIds = Array.from(selectedPosts);

    switch (bulkModal.type) {
      case 'delete':
        onBulkDelete?.(postIds);
        break;
    }

    setBulkModal({ isOpen: false, type: null });
    setSelectedPosts(new Set());
  };

  const isAllSelected =
    filteredAndSortedPosts.length > 0 &&
    filteredAndSortedPosts.every((post) => selectedPosts.has(post._id));
  const isIndeterminate = selectedPosts.size > 0 && !isAllSelected;

  const renderCellContent = (post, column) => {
    switch (column.key) {
      case 'content':
        return (
          <div className="flex items-center gap-3">
            <Avatar
              src={selectedProfile?.profilePicture}
              size={40}
              className="ring-2 ring-gray-100"
            >
              {selectedProfile?.name?.charAt(0)}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 line-clamp-2">
                {post.content?.split(' ').slice(0, 20).join(' ')}
                {post.content?.split(' ').length > 20 && '...'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {selectedProfile?.name}
              </p>
            </div>
          </div>
        );

      case 'status':
        return (
          <Tag
            color={getStatusColor(post.status)}
            className="text-xs border-0 flex items-center gap-2 rounded-full px-3 py-1 w-fit"
            icon={getStatusIcon(post.status)}
          >
            {post.status}
          </Tag>
        );

      case 'media':
        return post.media && post.media.length > 0 ? (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <FiEye className="w-4 h-4" />
            <span>
              {post.media.length} file{post.media.length > 1 ? 's' : ''}
            </span>
          </div>
        ) : (
          <span className="text-xs text-gray-400">No media</span>
        );

      case 'scheduledDate':
        return (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <FiCalendar className="w-4 h-4" />
            <span>
              {formatDateTime(post.postDate, post.postTime, post.timeZone)}
            </span>
          </div>
        );

      default:
        return post[column.key];
    }
  };

  if (filteredAndSortedPosts.length === 0 && posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl m-2">
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-4">
            <p className="m-0 text-gray-400 italic text-md">0 Posts</p>
            <div className="relative">
              <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full border-gray-400 text-xs w-64 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center">
            <img
              src={NotFound}
              alt="No posts found"
              className="mx-auto mb-4 w-56 h-48"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No posts in {activeTab}
            </h3>
            <p className="text-gray-500 mb-4">
              Posts will appear here once you schedule them
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl m-2">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-4">
          <div className="flex lg:flex-row flex-col items-center gap-3">
            <p className="m-0 text-gray-400 italic text-md">
              {filteredAndSortedPosts.length} Post
              {filteredAndSortedPosts.length !== 1 ? 's' : ''}
            </p>
            <div className="relative">
              <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full border-gray-400 text-xs w-64 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      {selectedPosts.size > 0 && (
        <>
          <BulkActionModalPosts
            bulkModal={bulkModal}
            selectedPosts={selectedPosts}
            handleBulkAction={handleBulkAction}
            closeBulkModal={() => setBulkModal({ isOpen: false, type: null })}
          />
          <FloatingNavigationPosts
            selectedPosts={selectedPosts}
            handleDeselectPosts={handleDeselectPosts}
            bulkActions={bulkActions}
          />
        </>
      )}

      {/* Table */}
      <div className="overflow-x-auto max-h-[75dvh] overflow-y-scroll scrollbar-hide">
        <table className="w-full table-auto border-separate border-spacing-0">
          <thead className="bg-cyan-50 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 w-12">
                <CustomCheckbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={() => handleSelectAll(!isAllSelected)}
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left py-3 px-4 font-medium text-gray-700 text-xs"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.sortField)}
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      {column.label}
                      <SortIcon
                        sortDirection={sortDirection}
                        sortField={sortField}
                        field={column.sortField}
                      />
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
              <th className="py-3 px-4 text-center font-medium text-gray-700 text-xs">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y overflow-x-scroll scrollbar-hide divide-gray-100">
            {filteredAndSortedPosts.map((post, index) => (
              <tr
                key={post._id}
                className="group hover:bg-gray-50 transition-all cursor-pointer"
                onClick={() => onOpenDrawer(post)}
              >
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <CustomCheckbox
                    checked={selectedPosts.has(post._id)}
                    onChange={() =>
                      handleSelectPost(post._id, !selectedPosts.has(post._id))
                    }
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="py-3 px-4">
                    {renderCellContent(post, column)}
                  </td>
                ))}
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-center gap-1">
                    <Tooltip title="View Details">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDrawer(post);
                        }}
                        className="p-1.5 text-gray-700 rounded hover:bg-blue-50 hover:text-blue-600 transition-all"
                      >
                        <FiEye className="w-3.5 h-3.5" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Edit Post">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(post);
                        }}
                        disabled={post.status === 'Posted'}
                        className="p-1.5 text-gray-700 rounded hover:bg-yellow-50 hover:text-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiEdit className="w-3.5 h-3.5" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Delete Post">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(post);
                        }}
                        className="p-1.5 text-gray-700 rounded hover:bg-red-50 hover:text-red-600 transition-all"
                      >
                        <FiTrash className="w-3.5 h-3.5" />
                      </button>
                    </Tooltip>
                    {post.postId && (
                      <Tooltip title="View on LinkedIn">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `https://www.linkedin.com/feed/update/${post.postId}`,
                              '_blank',
                            );
                          }}
                          className="p-1.5 text-gray-700 rounded hover:bg-blue-50 hover:text-blue-600 transition-all"
                        >
                          <FaLinkedin className="w-3.5 h-3.5" />
                        </button>
                      </Tooltip>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Showing {filteredAndSortedPosts.length} of {posts.length} posts
        </p>
      </div>
    </div>
  );
};

export default PostHistoryTable;
