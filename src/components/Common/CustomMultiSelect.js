import { Icons } from '@utils/constantData/icons';
import { useEffect, useRef, useState } from 'react';


const CustomMultiSelect = ({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options...',
  className = '',
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
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
    onChange(newSelectedValues);
  };

  const removeItem = (value) => {
    const newSelectedValues = selectedValues.filter((item) => item !== value);
    onChange(newSelectedValues);
  };

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
          className="w-full px-4 py-2  h-10 overflow-y-auto scrollbar-hide text-sm border border-gray-300 rounded-full focus:outline-none bg-white/70 backdrop-blur-sm hover:bg-white flex items-center justify-between min-h-[40px]"
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {selectedValues.length === 0 ? (
              <span className="text-gray-500">{placeholder}</span>
            ) : (
              selectedValues.map((value) => (
                <span
                  key={value}
                  className="flex items-center gap-1 bg-gray-100 text-black px-2 py-1 rounded-full text-xs"
                >
                  {options.find((opt) => opt.value === value)?.label || value}
                  <Icons.Cross
                    className="w-3 h-3 cursor-pointer hover:text-gray-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(value);
                    }}
                  />
                </span>
              ))
            )}
          </div>
          <Icons.Down
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg  max-h-80 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-sm">{option.label}</span>
                {selectedValues.includes(option.value) && (
                  <Icons.Check className="w-4 h-4 text-black" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomMultiSelect;
