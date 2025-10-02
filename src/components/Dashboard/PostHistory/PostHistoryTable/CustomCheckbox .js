import React from 'react';
import { Icons } from '@utils/constantData/icons';

const CustomCheckbox = ({ checked, indeterminate, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
        checked || indeterminate
          ? 'bg-blue-600 border-blue-600'
          : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      {indeterminate ? (
        <div className="w-2 h-0.5 bg-white" />
      ) : checked ? (
        <Icons.Check className="w-3 h-3 text-white" />
      ) : null}
    </button>
  );
};

export default CustomCheckbox;
