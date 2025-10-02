const CustomToggle = ({
  label = '',
  enabled,
  onChange,
  leftLabel,
  rightLabel,
}) => (
  <div className="flex items-center justify-between">
    {label && (
      <label className="text-sm mr-4 font-bold text-gray-700">{label}</label>
    )}

    <div className="flex items-center gap-2">
      {leftLabel && (
        <span
          className={`text-xs ${
            !enabled ? 'text-gray-900 font-medium' : 'text-gray-500'
          }`}
        >
          {leftLabel}
        </span>
      )}
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled ? 'bg-black' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      {rightLabel && (
        <span
          className={`text-xs ${
            enabled ? 'text-gray-900 font-medium' : 'text-gray-500'
          }`}
        >
          {rightLabel}
        </span>
      )}
    </div>
  </div>
);

export default CustomToggle;
