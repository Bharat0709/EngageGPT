import React from 'react';

const CustomCheckbox = ({
  checked,
  indeterminate = false,
  onChange,
  className = '',
}) => (
  <div className={`relative inline-flex items-center ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      ref={(el) => {
        if (el) el.indeterminate = indeterminate;
      }}
      onChange={onChange}
      className="sr-only"
    />
    <div
      className={`w-4 h-4 border-2 rounded transition-all duration-200 cursor-pointer flex items-center justify-center ${
        checked || indeterminate
          ? 'bg-blue-600 border-blue-600'
          : 'border-gray-300 hover:border-blue-400 bg-white'
      }`}
      onClick={onChange}
    >
      {checked && (
        <svg
          className="w-2.5 h-2.5 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {indeterminate && !checked && (
        <svg
          className="w-2.5 h-2.5 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  </div>
);

export default CustomCheckbox;