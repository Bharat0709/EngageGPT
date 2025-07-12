import { Icons } from '@utils/constantData/icons';

export const MenuButton = ({
  onClick,
  icon,
  text,
  hasArrow = false,
  className = '',
  children,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between w-full py-1 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group ${className}`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm  text-black group-hover:text-black transition-colors">
        {text}
      </span>
    </div>

    {hasArrow && (
      <div className="text-black group-hover:text-gray-400 transition-colors">
        <Icons.ChevronRight size={14} />
      </div>
    )}

    {children}
  </button>
);
