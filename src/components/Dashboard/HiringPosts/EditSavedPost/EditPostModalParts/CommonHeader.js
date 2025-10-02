const { Icons } = require('@utils/constantData/icons');

const CommonHeader = ({
  onClick,
  icon,
  title,
  description,
  errors,
  isCollapsed,
  totalContacts = 0,
}) => {
  return (
    <div
      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-b border-gray-100 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:border-blue-200 transition-colors">
          {icon}
          {/* <Icons.Edit3 className="text-blue-600" size={20} /> */}
        </div>
        <div>
          <h3 className="text-lg font-bold  text-gray-800 mb-1">{title}</h3>
          <p className="text-xs mb-0 text-gray-600">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {Object.keys(errors).length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
            <Icons.Alert className="text-red-500" size={14} />
            <span className="text-xs font-medium text-red-600">
              {Object.keys(errors).length} error
              {Object.keys(errors).length > 1 ? 's' : ''}
            </span>
          </div>
        )}
        {totalContacts > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
            <Icons.Check className="text-green-600" size={14} />
            <span className="text-xs font-medium text-green-700">
              {totalContacts} contact{totalContacts > 1 ? 's' : ''}
            </span>
          </div>
        )}
        <button className="p-2 hover:bg-white/60 rounded-full transition-colors">
          <Icons.Down
            className={`text-gray-500 transition-transform duration-200 ${
              isCollapsed ? 'rotate-180' : ''
            }`}
            size={20}
          />
        </button>
      </div>
    </div>
  );
};

export default CommonHeader;
