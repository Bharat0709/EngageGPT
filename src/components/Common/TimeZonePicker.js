import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClockCircle, AiOutlineSearch } from 'react-icons/ai';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import timeZones from 'timezones-list';

const TimezonePicker = ({
  value = 'Asia/Kolkata',
  onChange = () => {},
  placeholder = 'Select timezone',
  disabled = false,
  className = 'w-full',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTimezones, setFilteredTimezones] = useState(timeZones);
  const [selectedTimezone, setSelectedTimezone] = useState(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      const filtered = timeZones.filter(
        (tz) =>
          (tz.label &&
            tz.label.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (tz.name &&
            tz.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (tz.tzCode &&
            tz.tzCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (tz.value &&
            tz.value.toLowerCase().includes(searchTerm.toLowerCase())),
      );
      setFilteredTimezones(filtered);
    } else {
      setFilteredTimezones(timeZones);
    }
  }, [searchTerm]);

  // Update selected timezone when value prop changes
  useEffect(() => {
    setSelectedTimezone(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTimezoneSelect = (timezone) => {
    // Use tzCode as the value since timezones-list uses tzCode instead of value
    const timezoneValue = timezone.tzCode || timezone.value;
    setSelectedTimezone(timezoneValue);
    onChange(timezoneValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const getSelectedTimezoneLabel = () => {
    const selected = timeZones.find(
      (tz) => (tz.tzCode || tz.value) === selectedTimezone,
    );
    return selected ? selected.label || selected.name : selectedTimezone;
  };

  const getCurrentTime = (tzCode) => {
    try {
      const now = new Date();
      return now.toLocaleTimeString('en-US', {
        timeZone: tzCode,
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.warn('Error getting time for timezone:', tzCode, error);
      return '';
    }
  };

  const handleDropdownToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Main Input */}
      <div
        onClick={handleDropdownToggle}
        className={`
          h-9 px-3  border rounded-full border-gray-300  bg-white
          flex items-center justify-between cursor-pointer
          transition-all duration-200 text-sm
          ${
            disabled
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
              : isOpen
              ? ''
              : ''
          }
        `}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <AiOutlineClockCircle className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span
            className={`truncate ${
              selectedTimezone ? 'text-gray-900' : 'text-gray-400'
            }`}
            title={selectedTimezone ? getSelectedTimezoneLabel() : placeholder}
          >
            {selectedTimezone ? getSelectedTimezoneLabel() : placeholder}
          </span>
        </div>
        {!disabled && (
          <>
            {isOpen ? (
              <IoChevronUp className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            ) : (
              <IoChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            )}
          </>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-2xl z-50 max-h-80 flex flex-col">
          {/* Search Input */}
          <div className="p-2 border-b  border-gray-100">
            <div className="relative ">
              <AiOutlineSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search timezone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-2xl focus:border-black focus:ring-1 focus:ring-blue-200 focus:outline-none"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Timezone List */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {filteredTimezones.length > 0 ? (
              filteredTimezones.map((timezone, index) => (
                <button
                  key={`${timezone.tzCode || timezone.value}-${index}`}
                  onClick={() => handleTimezoneSelect(timezone)}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                    selectedTimezone === (timezone.tzCode || timezone.value)
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700'
                  }`}
                  type="button"
                >
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium">
                      {timezone.label || timezone.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {timezone.tzCode || timezone.value}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 ml-2 flex-shrink-0">
                    {getCurrentTime(timezone.tzCode || timezone.value)}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-gray-500 text-center">
                No timezones found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimezonePicker;
