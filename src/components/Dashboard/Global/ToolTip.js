import React from 'react';

const Tooltip = ({ text, position = 'right', children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div
        className={`absolute whitespace-nowrap bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ${
          position === 'right'
            ? 'left-full ml-2'
            : position === 'left'
            ? 'right-full mr-2'
            : position === 'top'
            ? 'bottom-full mb-2'
            : 'top-full mt-2'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
