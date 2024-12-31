import React, { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const CustomDropdownMenu = ({ options, selected, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selected);

  // Function to handle option selection
  const handleOptionClick = (value) => {
    setIsOpen(false);
    setSelectedValue(value);
    onSelect(value);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.closest('.relative')) return; // Allow clicks inside the dropdown
      setIsOpen(false);
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative w-fit inline-block text-left"
    >
      <button className="flex items-center gap-2 text-xs border bg-white border-gray-400 px-3 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
        {selectedValue
          ? options.find((opt) => opt.value === selectedValue)?.label
          : label}
        <span
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <FiChevronDown />
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 bg-white border border-gray-200 rounded-lg w-48 transform transition-all duration-300 ease-in-out">
          <ul className="py-2">
            {options.map((option, index) => (
              <li
                key={`${option.value}-${index}`}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <button
                  onClick={() => handleOptionClick(option.value)}
                  className="w-full px-4 py-2 text-left text-xs text-black hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdownMenu;
