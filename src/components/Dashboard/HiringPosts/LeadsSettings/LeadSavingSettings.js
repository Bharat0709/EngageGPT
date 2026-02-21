import React, { useState } from 'react';
import { Icons } from '@utils/constantData/icons';
import Rocket from '@assets/images/rocket.gif';
import Button from '@components/Common/Button';
import StepHeader from './FormHeader';

const LeadSavingSettings = ({ onNext, initialData = {} }) => {
  const [formData, setFormData] = useState({
    enabled: initialData.enabled || true,
    enableCustomKeywords: initialData.enableCustomKeywords || false,
    keywords: initialData.keywords || ['hiring', 'apply now', 'job opening'],
    excludeKeywords: initialData.excludeKeywords || [],
    saveAllPosts: initialData.saveAllPosts || false,
    minCharCount: initialData.minCharCount || 50,
  });

  const [inputs, setInputs] = useState({
    newKeyword: '',
    newExcludeKeyword: '',
  });

  const [errors, setErrors] = useState({});

  const addKeyword = () => {
    const keyword = inputs.newKeyword.trim();
    if (!keyword) {
      setErrors({ ...errors, keyword: 'Please enter a keyword' });
      return;
    }
    if (formData.keywords.includes(keyword)) {
      setErrors({ ...errors, keyword: 'Keyword already exists' });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      keywords: [...prev.keywords, keyword],
    }));
    setInputs((prev) => ({ ...prev, newKeyword: '' }));
    setErrors({ ...errors, keyword: '' });
  };

  const removeKeyword = (keyword) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }));
  };

  const addExcludeKeyword = () => {
    const keyword = inputs.newExcludeKeyword.trim();
    if (!keyword) {
      setErrors({ ...errors, excludeKeyword: 'Please enter a keyword' });
      return;
    }
    if (formData.excludeKeywords.includes(keyword)) {
      setErrors({ ...errors, excludeKeyword: 'Keyword already exists' });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      excludeKeywords: [...prev.excludeKeywords, keyword],
    }));
    setInputs((prev) => ({ ...prev, newExcludeKeyword: '' }));
    setErrors({ ...errors, excludeKeyword: '' });
  };

  const removeExcludeKeyword = (keyword) => {
    setFormData((prev) => ({
      ...prev,
      excludeKeywords: prev.excludeKeywords.filter((k) => k !== keyword),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.enableCustomKeywords && formData.keywords.length === 0) {
      newErrors.keywords = 'Please add at least one keyword for filtering';
    }

    if (formData.minCharCount < 0 || formData.minCharCount > 1000) {
      newErrors.minCharCount = 'Character count must be between 0 and 1000';
    }

    if (formData.maxPostsPerDay < 1 || formData.maxPostsPerDay > 1000) {
      newErrors.maxPostsPerDay = 'Posts per day must be between 1 and 1000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <div className="bg-gray-50 mx-2 px-2">
      <div className="mx-auto">
        <div className="bg-white rounded-3xl overflow-y-auto">
          <StepHeader
            title="Leads Saving Settings"
            description=" These settings help our AI identify the right leads from
                    LinkedIn posts. The more specific your keywords, the better
                    we can match relevant opportunities to your business goals."
            imageSrc={Rocket}
            imageAlt="rocket-animation"
          />

          {/* Form Content */}
          <div className="px-8 pb-8 rounded-b-3xl space-y-8">
            {/* Master Toggle */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Enable Lead Saving
                  </h3>
                  <p className="text-sm text-gray-600">
                    Master switch for automatic lead detection and saving
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        enabled: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            </div>

            {formData.enabled && (
              <>
                {/* Basic Settings */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Icons.Settings className="h-5 w-5 text-gray-600" />
                    Basic Filtering
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Minimum Character Count
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="1000"
                        value={formData.minCharCount}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            minCharCount: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter minimum characters"
                      />
                      {errors.minCharCount && (
                        <p className="text-red-500 text-xs">
                          {errors.minCharCount}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Only save posts with at least this many characters
                      </p>
                    </div>
                  </div>
                </div>

                {/* Keyword Filtering */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Icons.Search className="h-5 w-5 text-gray-600" />
                        Keyword Filtering
                      </h3>
                      <p className="text-sm text-gray-600">
                        Save posts containing specific keywords
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.enableCustomKeywords}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            enableCustomKeywords: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>

                  {formData.enableCustomKeywords && (
                    <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                      {/* Include Keywords */}
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Include Posts with These Keywords
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={inputs.newKeyword}
                            onChange={(e) =>
                              setInputs((prev) => ({
                                ...prev,
                                newKeyword: e.target.value,
                              }))
                            }
                            onKeyPress={(e) =>
                              e.key === 'Enter' && addKeyword()
                            }
                            placeholder="e.g., hiring, job opening, apply now"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                          <button
                            onClick={addKeyword}
                            className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                          >
                            <Icons.Plus className="w-5 h-5" />
                          </button>
                        </div>
                        {errors.keyword && (
                          <p className="text-red-500 text-xs">
                            {errors.keyword}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {formData.keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 bg-green-200 border-[0.5px] border-green-500 text-green-800 px-3 py-1 rounded-full text-sm"
                            >
                              {keyword}
                              <button
                                onClick={() => removeKeyword(keyword)}
                                className="text-green-600 hover:text-green-800"
                              >
                                <Icons.Cross className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                        {errors.keywords && (
                          <p className="text-red-500 text-xs">
                            {errors.keywords}
                          </p>
                        )}
                      </div>

                      {/* Exclude Keywords */}
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Exclude Posts with These Keywords
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={inputs.newExcludeKeyword}
                            onChange={(e) =>
                              setInputs((prev) => ({
                                ...prev,
                                newExcludeKeyword: e.target.value,
                              }))
                            }
                            onKeyPress={(e) =>
                              e.key === 'Enter' && addExcludeKeyword()
                            }
                            placeholder="e.g., spam, irrelevant terms"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                          <button
                            onClick={addExcludeKeyword}
                            className="px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                          >
                            <Icons.Plus className="w-5 h-5" />
                          </button>
                        </div>
                        {errors.excludeKeyword && (
                          <p className="text-red-500 text-xs">
                            {errors.excludeKeyword}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {formData.excludeKeywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 bg-red-100 border-[0.5px] border-red-600 text-red-800 px-3 py-1 rounded-full text-sm"
                            >
                              {keyword}
                              <button
                                onClick={() => removeExcludeKeyword(keyword)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Icons.Cross className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 rounded-b-3xl">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Step 1 of 5 - Lead Saving Settings
              </div>
              <Button
                theme="dark"
                icon={<Icons.ChevronRight className="w-4 h-4" />}
                buttonText={'Continue to Profile Summary'}
                onClick={handleNext}
                disabled={!formData.enabled}
                className="disabled:bg-gray-300 !rounded-full disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadSavingSettings;
