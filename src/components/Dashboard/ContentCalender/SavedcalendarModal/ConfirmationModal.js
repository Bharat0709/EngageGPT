const ConfirmationModal = ({ show, title, message, onCancel, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden  bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity z-50">
      <div className="bg-white w-96 p-6 rounded-2xl shadow-lg">
        {title && (
          <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
            {title}
          </h2>
        )}
        {message && <p className="text-gray-700 mb-6 text-center">{message}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-full text-white bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
