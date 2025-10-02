import React, { useState } from 'react';
import { Icons } from '@utils/constantData/icons';
import Button from '@components/Common/Button';
import { CustomSingleSelect } from '@components/Common/CustomSelect';
import { goTo } from '@utils/navigator';
import NotFound from '@assets/images/PostNotFound.png';

const TemplatesDrawer = ({
  isOpen,
  onClose,
  templates,
  onPreview,
  onUseTemplate,
  isLoading,
}) => {
  const [searchTemplate, setSearchTemplate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templateCategories = [
    { value: 'all', label: 'All Templates' },
    { value: 'outreach', label: 'Outreach' },
    { value: 'follow_up', label: 'Follow Up' },
    { value: 'introduction', label: 'Introduction' },
    { value: 'networking', label: 'Networking' },
    { value: 'cold_email', label: 'Cold Email' },
    { value: 'meeting_request', label: 'Meeting Request' },
    { value: 'thank_you', label: 'Thank You' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'custom', label: 'Custom' },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch =
      searchTemplate.trim() === '' ||
      template.name.toLowerCase().includes(searchTemplate.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchTemplate.toLowerCase()) ||
      template.description
        ?.toLowerCase()
        .includes(searchTemplate.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[50] transition-opacity duration-300 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full lg:w-96 overflow-y-scroll scrollbar-hide bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Icons.Document className="h-4 w-4 text-black" />
            </div>
            <div>
              <h3 className="text-lg m-0 p-0 font-semibold text-gray-900">
                Templates
              </h3>
              <p className="text-xs m-0 p-0 text-gray-500">
                {templates.length} available
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icons.Cross className="h-5 w-5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 space-y-3 border-b border-gray-200">
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTemplate}
              onChange={(e) => setSearchTemplate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <CustomSingleSelect
            selectedValue={selectedCategory}
            onChange={setSelectedCategory}
            options={templateCategories}
            placeholder="Filter by category"
            className="w-full"
          />
          <div className="flex justify-center">
            <Button
              onClick={() => goTo('/dashboard/email-templates')}
              theme="dark"
              icon={<Icons.Plus className="w-4 h-4" />}
              buttonText="Add Template"
              className="px-6 w-full flex mx-auto !text-center items-center !rounded-full py-2"
            />
          </div>
        </div>

        {/* Templates List */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">Loading templates...</p>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-8">
              <img
                src={NotFound}
                alt="notfound"
                className="h-50 w-60 mx-auto"
              />
              <p className="text-lg mt-4 text-gray-500">No templates found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTemplates.map((template) => (
                <div
                  key={template._id}
                  className="bg-white border border-gray-200 rounded-lg p-4  transition-shadow"
                >
                  {/* Template Info */}
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {template.name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                      {template.subject}
                    </p>
                    {template.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {template.description}
                      </p>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="mb-3 flex items-center gap-4">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-medium bg-slate-100 text-black capitalize">
                      {template.category}
                    </span>
                    <span className="flex px-4 py-1 rounded-full items-center font-medium bg-gray-100 text-black gap-2 text-xs ">
                      {' '}
                      <Icons.Tag className="w-3 h-3" />{' '}
                      {template.placeholders.length} Placeholders
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => onPreview(template)}
                      theme="light"
                      buttonText="Preview"
                      icon={<Icons.Eye className="h-3 w-3" />}
                      className="flex w-fit text-xs py-1.5"
                    />
                    <Button
                      onClick={() => onUseTemplate(template)}
                      theme="dark"
                      buttonText="Use"
                      icon={<Icons.Check className="h-3 w-3" />}
                      className="flex wifit text-xs py-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TemplatesDrawer;
