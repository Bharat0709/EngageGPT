import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '@utils/constantData/icons';


const CustomSingleSelect = ({
  label,
  options,
  selectedValue,
  onChange,
  placeholder = 'Select option...',
  className = '',
  dropdownPosition = 'bottom', // 👈 new prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-800">
          {label}
        </label>
      )}

      <div className="relative" ref={dropdownRef}>
        {/* Dropdown Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full 
                     focus:outline-none bg-white/70 backdrop-blur-sm hover:bg-white 
                     flex items-center justify-between transition-colors duration-150"
        >
          <span className={selectedValue ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <Icons.Down
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className={`absolute z-50 w-full bg-white border border-gray-200 rounded-lg 
                       max-h-60 overflow-y-auto transition-all duration-150
                       ${
                         dropdownPosition === 'top'
                           ? 'bottom-full mb-2'
                           : 'mt-2 top-full'
                       }`}
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm transition-colors
                  ${
                    selectedValue === option.value
                      ? 'bg-gray-100 text-[#0c4a6e] font-medium'
                      : 'text-gray-900'
                  }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { CustomSingleSelect };
