import React, { useState, useEffect } from 'react';
import { Icons } from '@utils/constantData/icons';

const DateTimeSelector = ({
  value,
  onChange,
  placeholder = 'Select date and time',
  showTime = true,
  disabled = false,
  className = 'w-full',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [activeTab, setActiveTab] = useState('date'); // 'date' or 'time'
  const [manualTimeMode, setManualTimeMode] = useState(false);
  const [timeInputs, setTimeInputs] = useState({
    hours: '',
    minutes: '',
    ampm: 'AM',
  });

  // Parse initial value
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      const formattedDate = `${String(date.getDate()).padStart(
        2,
        '0',
      )}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const formattedTime = `${String(displayHours).padStart(2, '0')}:${String(
        minutes,
      ).padStart(2, '0')} ${ampm}`;

      setSelectedDate(formattedDate);
      setSelectedTime(formattedTime);

      // Update manual time inputs
      setTimeInputs({
        hours: String(displayHours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        ampm: ampm,
      });
    }
  }, [value]);

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

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isPastDate = (day) => {
    const today = new Date();
    const dateToCheck = new Date(currentYear, currentMonth, day);
    today.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  const handleDateSelect = (day) => {
    if (isPastDate(day)) return;

    const formattedDate = `${String(day).padStart(2, '0')}-${String(
      currentMonth + 1,
    ).padStart(2, '0')}-${currentYear}`;
    setSelectedDate(formattedDate);

    if (!showTime) {
      const dateObj = new Date(currentYear, currentMonth, day);
      onChange && onChange(dateObj);
      setIsOpen(false);
    } else {
      setActiveTab('time');
    }
  };

  const handleTimeSelection = (hours, minutes, ampm) => {
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes,
    ).padStart(2, '0')} ${ampm}`;
    setSelectedTime(formattedTime);

    // Update time inputs
    setTimeInputs({
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      ampm: ampm,
    });

    if (selectedDate) {
      const [day, month, year] = selectedDate.split('-');
      let hour24 = parseInt(hours);

      if (ampm === 'PM' && hour24 !== 12) hour24 += 12;
      if (ampm === 'AM' && hour24 === 12) hour24 = 0;

      const dateObj = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        hour24,
        parseInt(minutes),
      );
      onChange && onChange(dateObj);
    }
  };

  const generateHours = () => {
    const hours = [];
    for (let i = 1; i <= 12; i++) {
      hours.push(i);
    }
    return hours;
  };

  const generateMinutes = () => {
    const minutes = [];
    for (let i = 0; i < 60; i += 1) {
      // 5-minute intervals
      minutes.push(i);
    }
    return minutes;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    const today = new Date();
    const isCurrentMonth =
      today.getMonth() === currentMonth && today.getFullYear() === currentYear;

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && today.getDate() === day;
      const isPast = isPastDate(day);
      const isSelected =
        selectedDate ===
        `${String(day).padStart(2, '0')}-${String(currentMonth + 1).padStart(
          2,
          '0',
        )}-${currentYear}`;

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(day)}
          disabled={isPast}
          className={`w-8 h-8 text-sm rounded-md flex items-center justify-center transition-all duration-200 ${
            isPast
              ? 'text-gray-300 cursor-not-allowed'
              : isSelected
              ? 'bg-blue-500 text-white shadow-sm'
              : isToday
              ? 'text-blue-500 font-medium border border-blue-200 bg-blue-50'
              : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'
          }`}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  const displayValue = () => {
    if (selectedDate && selectedTime && showTime) {
      return `${selectedDate} ${selectedTime}`;
    } else if (selectedDate) {
      return selectedDate;
    }
    return placeholder;
  };

  return (
    <div className={`relative ${className}`}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          h-9 px-3 py-2 border rounded-full border-gray-300  bg-white
          flex items-center justify-between cursor-pointer
          transition-all duration-200 text-sm
          ${
            disabled
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
              : isOpen
              ? 'border-blue-500 shadow-sm ring-2 ring-blue-100'
              : 'hover:border-blue-400'
          }
        `}
      >
        <span className={selectedDate ? 'text-gray-900' : 'text-gray-400'}>
          {displayValue()}
        </span>
        <div className="flex items-center space-x-1">
          {showTime && (
            <Icons.OutlinedCloclCircle className="w-3.5 h-3.5 text-gray-400" />
          )}
          <Icons.OutlinedCalendar className="w-3.5 h-3.5 text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full  mt-1 bg-white border border-gray-200 rounded-2xl  z-50 ">
          {/* Tabs for Date/Time (only if showTime is true) */}
          {showTime && (
            <div className="flex border-b rounded-2xl border-gray-100">
              <button
                type="button"
                onClick={() => setActiveTab('date')}
                className={`flex-1 px-4 py-2 rounded-tl-2xl text-sm font-medium transition-colors ${
                  activeTab === 'date'
                    ? 'text-blue-600  border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icons.OutlinedCalendar className="w-4 h-4 inline mr-1" />
                Date
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('time')}
                disabled={!selectedDate}
                className={`flex-1 px-4 py-2 rounded-tr-2xl text-sm font-medium transition-colors ${
                  activeTab === 'time' && selectedDate
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : !selectedDate
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icons.OutlinedCloclCircle className="w-4 h-4 inline mr-1" />
                Time
              </button>
            </div>
          )}

          {(!showTime || activeTab === 'date') && (
            <div className="p-3 max-w-[18rem]">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear(currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                    }
                  }}
                  className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Icons.BackArrow className="w-4 h-4 text-gray-600" />
                </button>

                <div className="text-sm font-medium text-gray-900">
                  {months[currentMonth]} {currentYear}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear(currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                    }
                  }}
                  className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Icons.ForwardArrow className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div
                    key={day}
                    className="w-8 h-6 text-xs font-medium text-gray-500 flex items-center justify-center"
                  >
                    {day}
                  </div>
                ))}
                {renderCalendar()}
              </div>
            </div>
          )}

          {showTime && activeTab === 'time' && (
            <div className="p-3 w-fit">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-medium text-gray-700">
                  Select Time
                </div>
              </div>
              <div className="flex space-x-4">
                {/* Hours Panel */}
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-2 text-center">
                    Hours
                  </div>
                  <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-md">
                    {generateHours().map((hour) => (
                      <button
                        key={hour}
                        type="button"
                        onClick={() =>
                          handleTimeSelection(
                            hour,
                            timeInputs.minutes
                              ? parseInt(timeInputs.minutes)
                              : 0,
                            timeInputs.ampm,
                          )
                        }
                        className={`w-full text-center px-2 py-1 text-sm transition-colors ${
                          parseInt(timeInputs.hours) === hour
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {String(hour).padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Minutes Panel */}
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-2 text-center">
                    Minutes
                  </div>
                  <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-md">
                    {generateMinutes().map((minute) => (
                      <button
                        key={minute}
                        type="button"
                        onClick={() =>
                          handleTimeSelection(
                            timeInputs.hours ? parseInt(timeInputs.hours) : 12,
                            minute,
                            timeInputs.ampm,
                          )
                        }
                        className={`w-full text-center px-2 py-1 text-sm transition-colors ${
                          parseInt(timeInputs.minutes) === minute
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {String(minute).padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AM/PM Panel */}
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-2 text-center">
                    Period
                  </div>
                  <div className="border border-gray-200 rounded-md">
                    {['AM', 'PM'].map((period) => (
                      <button
                        key={period}
                        type="button"
                        onClick={() =>
                          handleTimeSelection(
                            timeInputs.hours ? parseInt(timeInputs.hours) : 12,
                            timeInputs.minutes
                              ? parseInt(timeInputs.minutes)
                              : 0,
                            period,
                          )
                        }
                        className={`w-full text-center px-2 py-2 text-sm transition-colors ${
                          timeInputs.ampm === period
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        } ${
                          period === 'AM'
                            ? 'rounded-t-md border-b border-gray-200'
                            : 'rounded-b-md'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected Time Display */}
              {selectedTime && !manualTimeMode && (
                <div className="mt-3 text-center p-2 bg-blue-50 rounded-md">
                  <span className="text-sm text-blue-700 font-medium">
                    Selected: {selectedTime}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-100 rounded-b-2xl px-3 py-2 flex justify-end space-x-2 bg-gray-50">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setActiveTab('date');
                setManualTimeMode(false);
              }}
              className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (selectedDate && (!showTime || selectedTime)) {
                  setIsOpen(false);
                  setActiveTab('date');
                  setManualTimeMode(false);
                }
              }}
              disabled={!selectedDate || (showTime && !selectedTime)}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;
