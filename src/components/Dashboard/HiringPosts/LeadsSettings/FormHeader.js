import React from 'react';

const StepHeader = ({
  title,
  description,
  imageSrc,
  imageAlt = 'step-animation',
}) => {
  return (
    <div className="px-6 pt-4 pb-6">
      <div className="flex justify-start items-center gap-4">
        {imageSrc && (
          <img src={imageSrc} alt={imageAlt} className="h-20 w-30 mr-1" />
        )}
        <div className="text-left">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
          {description && (
            <div className="flex  text-gray-600 items-start text-sm max-w-2xl space-x-2">
              <div>{description}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepHeader;
