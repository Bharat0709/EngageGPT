import { Icons } from '@utils/constantData/icons';

const FullLengthButton = ({
  theme = 'light',
  icon,
  buttonText,
  onClick,
  className = '',
  disabled = false,
  isLoading = false,
  loadingText = 'Loading...',
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`flex w-full items-center text-md justify-center gap-2 px-4 py-3 mt-3  ${className} transition-all
        ${theme === 'dark' ? 'bg-[#004182] text-white' : 'bg-sky-50 hover:bg-gray-50   text-black'}
        ${isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'}
      `}
    >
      {isLoading ? (
        <span className="animate-spin  self-center mr-2">
          <Icons.Loader className="w-4 h-4" />
        </span>
      ) : (
        icon && <span>{icon}</span>
      )}

      <span className="w-fit text-sm text-center ">
        {isLoading ? loadingText : buttonText}
      </span>
    </button>
  );
};

export default FullLengthButton;
