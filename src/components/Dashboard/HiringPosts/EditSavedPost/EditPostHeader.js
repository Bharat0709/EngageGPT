import { Icons } from '@utils/constantData/icons';

const EditPostHeader = ({ onClose }) => {
  return (
    <div className="flex flex-row-reverse px-6 py-4 justify-between items-center pr-8 p-2 text-black bg-white border-b border-gray-200">
      <button
        onClick={onClose}
        className="p-2 hover:bg-white/60 rounded-full transition-all duration-200"
      >
        <Icons.Cross size={20} />
      </button>

      <div className="flex items-center  gap-3">
        <div className="p-3 bg-white rounded-xl shadow-sm">
          <Icons.Edit3 className="text-blue-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl m-0 font-bold text-gray-800">Edit Lead</h2>
          <p className="text-gray-600 mb-0 mt-1">
            Comprehensive post management and lead tracking
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditPostHeader;
