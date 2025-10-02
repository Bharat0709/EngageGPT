import React, { useState } from 'react';
import { Icons } from '@utils/constantData/icons';
import Button from '@components/Common/Button';

const TemplateTableHeader = ({
  filteredTemplates,
  searchTerm,
  setSearchTerm,
  onCreateTemplate,
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories', icon: '📂' },
    { value: 'outreach', label: 'Outreach', icon: '📧' },
    { value: 'follow_up', label: 'Follow Up', icon: '🔄' },
    { value: 'introduction', label: 'Introduction', icon: '👋' },
    { value: 'networking', label: 'Networking', icon: '🤝' },
    { value: 'cold_email', label: 'Cold Email', icon: '❄️' },
    { value: 'meeting_request', label: 'Meeting Request', icon: '📅' },
    { value: 'thank_you', label: 'Thank You', icon: '💝' },
    { value: 'proposal', label: 'Proposal', icon: '📋' },
    { value: 'custom', label: 'Custom', icon: '⚙️' },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types', icon: '📋' },
    { value: 'html', label: 'HTML', icon: '🌐' },
    { value: 'text', label: 'Text', icon: '📄' },
  ];

  const selectedCategory = categories.find(
    (cat) => cat.value === categoryFilter,
  );
  const selectedType = typeOptions.find((type) => type.value === typeFilter);

  return (
    <div className="px-4 py-4 bg-white rounded-t-2xl">
      <div className="flex flex-col rounded-2xl lg:flex-row items-center lg:justify-between gap-4">
        <div className="flex lg:flex-row flex-col items-center  gap-3">
          <p className="m-0 text-gray-400 italic text-md">
            {filteredTemplates.length} Templates{' '}
          </p>
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full border-gray-400 text-xs w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          {/* Filter Section */}
          <div className="flex items-center gap-2">
            {/* Custom Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowTypeDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-xs bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
              >
                <span>{selectedCategory?.label}</span>
                <Icons.Down
                  className={`w-3 h-3 transition-transform ${
                    showCategoryDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg z-50 max-h-60 overflow-y-scroll scrollbar-hide">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => {
                        setCategoryFilter(category.value);
                        setShowCategoryDropdown(false);
                      }}
                      className={`w-full scrollbar-hide text-left px-4 py-2 text-xs hover:bg-gray-50 flex items-center gap-2 ${
                        categoryFilter === category.value
                          ? 'bg-gray-50 text-gray-600'
                          : 'text-gray-700'
                      }`}
                    >
                      <span>{category.label}</span>
                      {categoryFilter === category.value && (
                        <Icons.Check className="w-3 h-3 ml-auto text-gray-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Type Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowTypeDropdown(!showTypeDropdown);
                  setShowCategoryDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-xs bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
              >
                <span>{selectedType?.label}</span>
                <Icons.Down
                  className={`w-3 h-3 transition-transform ${
                    showTypeDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showTypeDropdown && (
                <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg z-50">
                  {typeOptions.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => {
                        setTypeFilter(type.value);
                        setShowTypeDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 flex items-center gap-2 ${
                        typeFilter === type.value
                          ? 'bg-gray-50 text-gray-600'
                          : 'text-gray-700'
                      }`}
                    >
                      <span>{type.label}</span>
                      {typeFilter === type.value && (
                        <Icons.Check className="w-3 h-3 ml-auto text-gray-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Create Template Button */}
        <div className="flex items-center gap-2">
          <Button
            theme="dark"
            className="text-xs !rounded-full"
            buttonText="Create Template"
            onClick={onCreateTemplate}
            icon={<Icons.Plus />}
          />
        </div>
      </div>

      {/* Click outside handler */}
      {(showCategoryDropdown || showTypeDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowCategoryDropdown(false);
            setShowTypeDropdown(false);
          }}
        />
      )}
    </div>
  );
};

export default TemplateTableHeader;
