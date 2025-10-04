import Button from '@components/Common/Button';

const PostConfirmationModal = ({
  isVisible,
  title,
  description,
  confirmButtonText,
  isProcessing,
  isProcessingText,
  onConfirm,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white lg:w-1/3 w-11/12 flex flex-col p-4 rounded-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl mt-2 text-center mb-4">{title}</h2>
        <p className="text-center text-base text-gray-600">{description}</p>
        <div className="flex justify-end gap-4 mt-6">
          <Button
            onClick={onClose}
            theme="light"
            buttonText="Cancel"
            className="border-none hover:bg-gray-50 rounded-full"
          />
          <Button
            isLoading={isProcessing}
            disabled={isProcessing}
            loadingText={isProcessingText}
            onClick={onConfirm}
            theme="dark"
            buttonText={confirmButtonText}
            className="px-6 !rounded-full bg-blue-900 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default PostConfirmationModal;
