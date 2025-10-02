import { FiX } from 'react-icons/fi';

const InfoModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="bg-white flex flex-col lg:max-w-lg w-11/12 h-3/4 overflow-y-scroll scrollbar-hide p-0 rounded-3xl shadow-xl transform transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="bg-indigo-50 rounded-t-3xl p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <h2 className="text-lg lg:text-xl mb-0 p-0 font-bold text-indigo-800">
                {title}
              </h2>
            </div>
            <button
              className="text-gray-500 hover:text-gray-800 hover:bg-indigo-100 p-2 rounded-full transition-colors"
              onClick={onClose}
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-gray-700 leading-relaxed">{content}</div>

          {/* Footer Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
