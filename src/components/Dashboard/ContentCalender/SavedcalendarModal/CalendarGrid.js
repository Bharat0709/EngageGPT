import React, { useState, useEffect } from 'react';
import { Calendar } from 'antd';
import dayjs from 'dayjs';
import { FiEdit, FiTrash2, FiClock, FiCalendar } from 'react-icons/fi';

const CalendarGrid = ({
  calendarData,
  selectedContentItem,
  onSelectItem,
  onEditItem,
  onDeleteItem,
}) => {
  const [hoveredDate, setHoveredDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [monthData, setMonthData] = useState([]);

  // Update filtered data when month changes
  useEffect(() => {
    // Group data by date for the current month view
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');

    // Filter data for current month view (plus/minus a week for edge dates)
    const relevantData = calendarData.filter((item) => {
      const itemDate = dayjs(item.date, 'DD-MM-YYYY');
      return (
        itemDate.isAfter(startOfMonth.subtract(1, 'week')) &&
        itemDate.isBefore(endOfMonth.add(1, 'week'))
      );
    });

    setMonthData(relevantData);
  }, [calendarData, currentMonth]);

  // Get content items for a date
  const getItemsForDate = (date) => {
    const dateString = date.format('DD-MM-YYYY');
    return monthData.filter((item) => item.date === dateString);
  };

  // Handle month panel change
  const handlePanelChange = (date) => {
    setCurrentMonth(date);
  };

  

  // Custom cell content with enhanced styling
  const dateCellRender = (value) => {
    const dateItems = getItemsForDate(value);
    const dateString = value.format('DD-MM-YYYY');
    const isHovered = hoveredDate === dateString;
    const isCurrentMonth = value.month() === currentMonth.month();

    if (dateItems.length === 0) return null;

    return (
      <div className={`calendar-items ${isCurrentMonth ? '' : 'opacity-50'}`}>
        <ul className="list-none p-0 m-0 max-h-28 overflow-auto scrollbar-hide space-y-1.5">
          {dateItems.map((item, index) => {
            const isItemSelected =
              selectedContentItem && selectedContentItem._id === item._id;

            // Limit to 3 items unless hovered
            if (!isHovered && index >= 3) return null;

            // Get background and text color based on status
            const getStatusStyle = (status) => {
              switch (status) {
                case 'Posted':
                  return 'bg-green-100 text-green-800 border-green-300';
                case 'Scheduled':
                  return 'bg-yellow-100 text-yellow-800 border-yellow-300';
                default: // Planned
                  return 'bg-blue-100 text-blue-800 border-blue-300';
              }
            };

            return (
              <li
                key={index}
                className={`group relative rounded px-2 py-1 border-l-3 transition-all 
                  ${getStatusStyle(item.status)}
                  ${isItemSelected ? 'ring-2 ring-blue-500 shadow-sm' : ''}
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectItem(item);
                }}
              >
                {/* Content preview */}
                <div>
                  <div
                    className="font-medium text-xs truncate pr-6"
                    title={item.topic}
                  >
                    {item.topic}
                  </div>

                  {/* Time info - only show on hover or selected */}
                  {(isHovered || isItemSelected) && (
                    <div className="text-[10px] flex items-center mt-0.5 opacity-75">
                      <FiClock size={8} className="mr-1" />
                      {item.time}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div
                  className={`absolute top-1 right-1 flex space-x-0.5
                  ${
                    isHovered || isItemSelected
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }
                  transition-opacity duration-150`}
                >
                  {item.status !== 'Posted' && (
                    <button
                      className="text-gray-500 hover:text-blue-600 p-0.5 rounded-sm hover:bg-blue-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditItem(item);
                      }}
                      title="Edit"
                    >
                      <FiEdit size={10} />
                    </button>
                  )}
                  <button
                    className="text-gray-500 hover:text-red-600 p-0.5 rounded-sm hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteItem(item);
                    }}
                    title="Delete"
                  >
                    <FiTrash2 size={10} />
                  </button>
                </div>
              </li>
            );
          })}

          {/* "More" indicator */}
          {dateItems.length > 3 && !isHovered && (
            <li
              className="text-xs text-center py-1 font-medium text-blue-600 bg-blue-50 rounded cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => setHoveredDate(dateString)}
              title="Show all items"
            >
              +{dateItems.length - 3} more
            </li>
          )}
        </ul>
      </div>
    );
  };

  // Enhanced cell renderer with modern styling
  const dateFullCellRender = (value) => {
    const dateItems = getItemsForDate(value);
    const dateString = value.format('DD-MM-YYYY');
    const isToday = value.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
    const isCurrentMonth = value.month() === currentMonth.month();
    const hasSelectedItem =
      selectedContentItem &&
      dateItems.some((item) => item._id === selectedContentItem._id);

    // Determine cell classes based on state
    let cellClasses = `h-full min-h-[100px] border border-gray-100 transition-all
      ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
      ${hasSelectedItem ? 'ring-2 ring-blue-500 z-10 relative' : ''}
      ${dateItems.length > 0 ? 'cursor-pointer hover:shadow-sm' : ''}`;

    return (
      <div
        className={cellClasses}
        onMouseEnter={() => dateItems.length > 0 && setHoveredDate(dateString)}
        onMouseLeave={() => setHoveredDate(null)}
      >
        {/* Date header */}
        <div
          className={`flex justify-between items-center p-1 border-b 
          ${isToday ? 'bg-blue-50' : ''}`}
        >
          <div
            className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold
              ${
                isToday
                  ? 'bg-blue-500 text-white'
                  : isCurrentMonth
                  ? 'text-gray-800'
                  : 'text-gray-400'
              }`}
          >
            {value.date()}
          </div>

          {/* Item count badge - if there are items */}
          {dateItems.length > 0 && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full
              ${
                isCurrentMonth
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {dateItems.length}
            </span>
          )}
        </div>

        {/* Content items */}
        <div className="p-1">{dateCellRender(value)}</div>
      </div>
    );
  };

  // Custom header renderer to show month controls
  const headerRender = ({ value, type, onChange }) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const year = value.year();
    const month = value.month();

    const onYearChange = (yr) => {
      const newDate = value.clone().year(yr);
      onChange(newDate);
      setCurrentMonth(newDate);
    };

    const prevMonth = () => {
      const newDate = value.clone().subtract(1, 'month');
      onChange(newDate);
      setCurrentMonth(newDate);
    };

    const nextMonth = () => {
      const newDate = value.clone().add(1, 'month');
      onChange(newDate);
      setCurrentMonth(newDate);
    };

    return (
      <div className="flex justify-between items-center p-2 mb-4">
        <div className="flex items-center">
          <button
            onClick={prevMonth}
            className="p-1 rounded hover:bg-gray-100 text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex items-center mx-4">
            <span className="font-medium text-gray-800">{months[month]}</span>

            <select
              value={year}
              onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
              className="ml-2 appearance-none bg-transparent text-gray-800 font-medium focus:outline-none"
            >
              {Array.from({ length: 10 }, (_, i) => year - 5 + i).map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={nextMonth}
            className="p-1 rounded hover:bg-gray-100 text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <button
          onClick={() => onChange(dayjs())}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <FiCalendar size={14} />
          Today
        </button>
      </div>
    );
  };

  return (
    <div className="custom-calendar bg-white rounded-lg overflow-hidden">
      <Calendar
        value={currentMonth}
        onPanelChange={handlePanelChange}
        dateFullCellRender={dateFullCellRender}
        headerRender={headerRender}
        className="border-0 shadow-none"
      />

      {/* Legend */}
      <div className="flex items-center justify-end space-x-4 px-4 py-2 text-xs text-gray-600 border-t">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-sm bg-blue-100 border border-blue-300 mr-1"></span>
          <span>Planned</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-sm bg-yellow-100 border border-yellow-300 mr-1"></span>
          <span>Scheduled</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-sm bg-green-100 border border-green-300 mr-1"></span>
          <span>Posted</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
