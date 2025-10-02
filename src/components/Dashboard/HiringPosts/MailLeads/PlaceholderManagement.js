import React, { useState, useEffect } from 'react';
import { Icons } from '@utils/constantData/icons';
import Button from '@components/Common/Button';
import { useNotifications } from '@components/Common/Notification';
import InfoModal from '@components/Common/InfoModal';

const PlaceholderDrawer = ({
  isOpen,
  onClose,
  template,
  onGenerateEmail,
  postData,
}) => {
  const [placeholderValues, setPlaceholderValues] = useState({});
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [newPlaceholderKey, setNewPlaceholderKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const message = useNotifications();

  useEffect(() => {
    if (template) {
      // Use only template's predefined placeholders, don't extract from body
      const initialPlaceholders = template.placeholders || [];
      const newPlaceholderValues = {};
      initialPlaceholders.forEach((placeholder) => {
        newPlaceholderValues[placeholder] = '';
      });
      setPlaceholderValues(newPlaceholderValues);
    }
  }, [template]);

  const updatePlaceholderValue = (key, value) => {
    setPlaceholderValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const generateEmail = () => {
    let processedEmail = template.templateBody;

    // Sort placeholders by length (longest first) to handle nested placeholders correctly
    const sortedPlaceholders = Object.entries(placeholderValues).sort(
      ([keyA], [keyB]) => keyB.length - keyA.length,
    );

    sortedPlaceholders.forEach(([key, value]) => {
      // Use split and join instead of regex for exact string matching
      while (processedEmail.includes(key)) {
        processedEmail = processedEmail.split(key).join(value || key);
      }
    });

    setGeneratedEmail(processedEmail);

    // Copy to clipboard
    navigator.clipboard
      .writeText(processedEmail)
      .then(() => {
        message.success('Generated email copied to clipboard!');
      })
      .catch(() => {
        message.error('Failed to copy to clipboard');
      });

    onGenerateEmail(processedEmail);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 3000);
  };

  const addNewPlaceholder = () => {
    if (
      newPlaceholderKey.trim() &&
      !placeholderValues.hasOwnProperty(newPlaceholderKey.trim())
    ) {
      setPlaceholderValues((prev) => ({
        ...prev,
        [newPlaceholderKey.trim()]: '',
      }));
      setNewPlaceholderKey('');
    }
  };

  const removePlaceholder = (key) => {
    setPlaceholderValues((prev) => {
      const newValues = { ...prev };
      delete newValues[key];
      return newValues;
    });
  };

  const detectPlaceholders = () => {
    if (!template.templateBody) {
      message.error('Please enter content to detect placeholders.');
      return;
    }

    const content = template.templateBody;
    const detectedPlaceholders = new Set();

    // Method 1: Double curly braces {{placeholder}}
    const curlyMatches = content.match(/\{\{([^}]+)\}\}/g);
    if (curlyMatches) {
      curlyMatches.forEach((match) => {
        detectedPlaceholders.add(match.trim()); // Keep full {{placeholder}}
      });
    }

    // Method 2: Square brackets [placeholder]
    const bracketMatches = content.match(/\[([^\]]+)\]/g);
    if (bracketMatches) {
      bracketMatches.forEach((match) => {
        const inner = match.replace(/[\[\]]/g, '').trim();
        if (!inner.includes('http') && !inner.includes('mailto')) {
          detectedPlaceholders.add(match.trim()); // Keep full [placeholder]
        }
      });
    }

    // Add detected placeholders to existing ones
    const newPlaceholders = Array.from(detectedPlaceholders);
    const updatedPlaceholders = { ...placeholderValues };

    newPlaceholders.forEach((placeholder) => {
      if (!updatedPlaceholders.hasOwnProperty(placeholder)) {
        updatedPlaceholders[placeholder] = '';
      }
    });

    setPlaceholderValues(updatedPlaceholders);

    // Show notification
    if (newPlaceholders.length > 0) {
      message.success(`${newPlaceholders.length} Placeholder(s) Detected`);
    } else {
      message.info('No placeholders detected in the content.');
    }
  };

  const extractedPlaceholders = Object.keys(placeholderValues);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-black bg-opacity-50 z-[50] transition-opacity duration-300 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-96 bg-white shadow-2xl z-[80] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <Icons.Settings className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg m-0 p-0  text-gray-900">Placeholders</h3>
              <p className="text-xs m-0 p-0 text-gray-500">{template?.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icons.Cross className="h-5 w-5" />
          </button>
        </div>
        {postData && (
          <div className="flex mt-2 items-center px-4 justify-between">
            <p className="m-0 p-0 text-sm">View Lead Content</p>{' '}
            <Button
              buttonText={'View Lead'}
              theme="light"
              className="border-none"
              onClick={() => setInfoModalOpen(true)}
              icon={<Icons.Eye className="h-4 w-4" />}
            />
          </div>
        )}
        <div className="flex-1 overflow-y-auto pb-32">
          {/* Add New Placeholder */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex mb-4 justify-between items-center">
              <h4 className="text-sm m-0 p-0 font-medium text-gray-900">
                Add New Placeholder
              </h4>
              <Button
                buttonText={'Auto Detect'}
                theme="dark"
                icon={<Icons.Search className="h-3 w-3" />}
                onClick={detectPlaceholders}
                className="flex items-center space-x-1 px-3 py-1.5 text-xs !rounded-full transition-colors"
                title="Auto-detect placeholders in content"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPlaceholderKey}
                onChange={(e) => setNewPlaceholderKey(e.target.value)}
                placeholder="Enter placeholder key"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && addNewPlaceholder()}
              />
              <Button
                onClick={addNewPlaceholder}
                theme="dark"
                buttonText="Add"
                icon={<Icons.Plus className="h-3 w-3" />}
                className="text-xs py-2 px-3"
                disabled={
                  !newPlaceholderKey.trim() ||
                  placeholderValues.hasOwnProperty(newPlaceholderKey.trim())
                }
              />
            </div>
          </div>

          {/* Placeholders Form */}
          <div className="p-4 flex-1 h-[70vh] overflow-y-scroll pb-32">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Placeholder Values ({extractedPlaceholders.length})
              </h4>
              <p className="text-xs text-gray-500">
                Modify placeholder key-value pairs
              </p>
            </div>

            <div className="space-y-3">
              {extractedPlaceholders.length === 0 ? (
                <div className="text-center py-4">
                  <Icons.Info className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">No placeholders yet</p>
                  <p className="text-xs text-gray-400">
                    Add one above to get started
                  </p>
                </div>
              ) : (
                extractedPlaceholders.map((placeholder) => (
                  <div key={placeholder} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700">
                        Key:
                      </span>
                      <button
                        onClick={() => removePlaceholder(placeholder)}
                        className="text-red-800 hover:text-red-600"
                      >
                        <Icons.Cross className="h-3 w-3" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={placeholder}
                      disabled
                      className="w-full px-2 py-2 text-xs bg-white border border-gray-500 rounded-full mb-2 font-mono"
                    />
                    <div className="mb-2">
                      <span className="text-xs font-medium text-gray-700">
                        Value:
                      </span>
                    </div>
                    <input
                      type="text"
                      value={placeholderValues[placeholder] || ''}
                      onChange={(e) =>
                        updatePlaceholderValue(placeholder, e.target.value)
                      }
                      placeholder="Enter replacement value"
                      className="w-full px-4 py-2 text-xs border border-gray-500 rounded-full focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>Progress</span>
              <span>
                {
                  Object.values(placeholderValues).filter((v) => v.trim())
                    .length
                }{' '}
                / {extractedPlaceholders.length}
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    extractedPlaceholders.length > 0
                      ? (Object.values(placeholderValues).filter((v) =>
                          v.trim(),
                        ).length /
                          extractedPlaceholders.length) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Generate Button - Always Visible */}
          <div className="mt-4">
            <Button
              onClick={generateEmail}
              theme="dark"
              isLoading={isLoading}
              loadingText="Generating..."
              buttonText="Generate Email"
              icon={<Icons.Refresh className="h-4 w-4" />}
              className="w-full"
              disabled={extractedPlaceholders.length === 0}
            />
          </div>
        </div>

        {isInfoModalOpen && (
          <InfoModal
            isOpen={isInfoModalOpen}
            onClose={() => setInfoModalOpen(false)}
            title={'Lead Post Content'}
            content={postData.content}
          />
        )}
      </div>
    </>
  );
};

export default PlaceholderDrawer;
