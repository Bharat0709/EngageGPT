import React, { useState } from 'react';
import {
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import CalendarItem from './CalendarItem';

const ListView = ({
  calendarData,
  selectedContentItem,
  onSelectItem,
  onEditItem,
  onDeleteItem,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('date-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9; // Number of items per page

  // Filter and sort the calendar data
  const getFilteredData = () => {
    let filtered = [...calendarData];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        item.topic.toLowerCase().includes(term),
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const [sortField, sortDirection] = sortOrder.split('-');

      if (sortField === 'date') {
        // Convert DD-MM-YYYY to YYYY-MM-DD for proper date comparison
        const dateA = a.date.split('-').reverse().join('-');
        const dateB = b.date.split('-').reverse().join('-');

        // Add time to date for more accurate sorting
        const fullDateA = new Date(`${dateA}T${a.time.replace(/\s/g, '')}`);
        const fullDateB = new Date(`${dateB}T${b.time.replace(/\s/g, '')}`);

        return sortDirection === 'asc'
          ? fullDateA - fullDateB
          : fullDateB - fullDateA;
      }

      if (sortField === 'status') {
        const statusOrder = { Planned: 1, Scheduled: 2, Posted: 3 };
        return sortDirection === 'asc'
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status];
      }

      return 0;
    });

    return filtered;
  };

  const filteredData = getFilteredData();

  // Paginate the filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Total pages calculation
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="space-y-4">
      {/* Filters section with custom styling */}
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div className="md:w-1/3 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FiSearch size={16} />
          </div>
          <input
            type="text"
            placeholder="Search by topic"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center">
            <span className="mr-2 text-sm whitespace-nowrap flex items-center">
              <FiFilter size={14} className="mr-1" /> Status:
            </span>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="Planned">Planned</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Posted">Posted</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <FiChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <span className="mr-2 text-sm whitespace-nowrap">Sort by:</span>
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date-asc">Date (Earliest)</option>
                <option value="date-desc">Date (Latest)</option>
                <option value="status-asc">Status (A-Z)</option>
                <option value="status-desc">Status (Z-A)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <FiChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content items grid */}
      {paginatedData.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">No content items found</p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Clear search filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData.map((item) => (
            <CalendarItem
              key={item._id}
              data={item}
              onSelect={onSelectItem}
              onEdit={onEditItem}
              onDelete={onDeleteItem}
              isSelected={
                selectedContentItem && selectedContentItem._id === item._id
              }
            />
          ))}
        </div>
      )}

      {/* Custom pagination */}
      {filteredData.length > pageSize && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-3 py-2 rounded-l-md border ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } text-sm font-medium focus:z-10 focus:outline-none`}
            >
              <FiChevronLeft size={16} />
            </button>

            {/* Page numbers - show up to 5 page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
              let pageNum;

              // Calculate which page numbers to show
              if (totalPages <= 5) {
                pageNum = idx + 1;
              } else {
                if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } text-sm font-medium focus:z-10 focus:outline-none`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-3 py-2 rounded-r-md border ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } text-sm font-medium focus:z-10 focus:outline-none`}
            >
              <FiChevronRight size={16} />
            </button>
          </nav>
        </div>
      )}

      {/* Results summary */}
      {filteredData.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Showing {(currentPage - 1) * pageSize + 1} to{' '}
          {Math.min(currentPage * pageSize, filteredData.length)} of{' '}
          {filteredData.length} results
        </div>
      )}
    </div>
  );
};

export default ListView;
