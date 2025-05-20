import { FiEdit, FiTrash2, FiCheck } from 'react-icons/fi';
const CalendarItem = ({ data, onSelect, onEdit, onDelete, isSelected }) => {
  // Custom status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Posted':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: // Planned
        return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  return (
    <div
      onClick={() => onSelect(data)}
      className={`bg-white rounded-xl p-4 cursor-pointer  transition-all duration-200 
        ${isSelected ? 'border-2 border-blue-800' : 'border border-gray-200'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-semibold text-gray-800 ">{data.topic}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-lg ${getStatusStyle(
            data.status,
          )}`}
        >
          {data.status}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <span>{data.date}</span>
        <span>•</span>
        <span>{data.time}</span>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div>
          {isSelected && (
            <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              <FiCheck size={12} />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {data.status !== 'Posted' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(data);
              }}
              className="text-gray-500 hover:text-blue-600 transition-colors p-1"
            >
              <FiEdit size={16} />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(data);
            }}
            className="text-gray-500 hover:text-red-600 transition-colors p-1"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarItem;
