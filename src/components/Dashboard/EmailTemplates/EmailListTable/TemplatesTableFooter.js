import React from 'react';

const TemplateTableFooter = ({ dataToUse }) => {
  const totalTemplates = dataToUse.length;
  const htmlTemplates = dataToUse.filter(
    (t) => t.templateType === 'html',
  ).length;
  const textTemplates = dataToUse.filter(
    (t) => t.templateType === 'text',
  ).length;

  return (
    <div className="px-4 py-3 rounded-b-2xl  bg-white text-xs text-gray-600">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span>Total: {totalTemplates}</span>
          <span>HTML: {htmlTemplates}</span>
          <span>Text: {textTemplates}</span>
        </div>
        <div className="text-gray-500">
          Showing {totalTemplates} template{totalTemplates !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default TemplateTableFooter;
