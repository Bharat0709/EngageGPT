import { Link } from 'react-router-dom';
import React from 'react';
const SidebarLink = ({
  to,
  icon,
  label,
  isActive,
  onClick,
  isOpen,
  activeClass,
  hoverClass,
  tag,
}) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex pl-3 pr-3 items-center bg-gray-50 max-h-[38px] gap-3 rounded-md transition-all duration-500 ease-in-out relative
    ${isOpen ? 'py-2' : 'py-2'} 
    ${isActive ? activeClass : hoverClass}
  `}
  >
    <div className="flex items-center gap-2 w-full">
      <span className="flex-shrink-0 text-black ">{icon}</span>
      <span
        className={`text-black text-sm transition-all duration-300 ease-in-out overflow-hidden
    ${isOpen ? 'opacity-100 max-w-[250px] delay-500' : 'opacity-0 max-w-0'}
  `}
      >
        {label}
      </span>
    </div>
    {/* Tag element - only shows when sidebar is open */}
    {tag && isOpen && (
      <span
        className={`absolute right-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white ${tag.color}`}
      >
        {tag.text}
      </span>
    )}

    {/* Small dot indicator when sidebar is closed and item has a tag */}
    {tag && !isOpen && (
      <span
        className={`absolute top-0 right-0 w-2 h-2 rounded-full ${tag.color}`}
      ></span>
    )}
  </Link>
);

export default SidebarLink;
