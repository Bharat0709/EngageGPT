import { Icons } from '@utils/constantData/icons';

const Button = ({
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
      className={`flex items-center text-sm justify-between gap-2 px-4 py-2 rounded-xl ${className} transition-all
        ${
          theme === 'dark'
            ? 'bg-black text-white hover:scale-105'
            : 'bg-white border border-gray-500  text-black hover:bg-gray-100 hover:scale-105'
        }
        ${isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'}
      `}
    >
      {isLoading ? (
        <span className="animate-spin mr-2">
          <Icons.Loader className="w-4 h-4" />
        </span>
      ) : (
        icon && <span>{icon}</span>
      )}

      <span>{isLoading ? loadingText : buttonText}</span>
    </button>
  );
};

export default Button;
