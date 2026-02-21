import React, { useState } from 'react';
import { Icons } from '@utils/constantData/icons';
import { CustomSingleSelect } from '@components/Common/CustomSelect';
import CustomMultiSelect from '@components/Common/CustomMultiSelect';
import Goals from '@assets/images/goals.gif';
import Button from '@components/Common/Button';
import StepHeader from './FormHeader';

const LeadGenerationGoalsStep = ({
  onNext,
  onBack,
  initialData = {},
  currentStep = 3,
}) => {
  const [formData, setFormData] = useState({
    primaryObjective: initialData.primaryObjective || '',
    businessType: initialData.businessType || '',
    targetAudience: {
      roles: initialData.targetAudience?.roles || [],
      industries: initialData.targetAudience?.industries || [],
      companySizes: initialData.targetAudience?.companySizes || [],
      seniority: initialData.targetAudience?.seniority || [],
    },
    serviceOfferings: initialData.serviceOfferings || [],
  });

  const [inputs, setInputs] = useState({
    newRole: '',
    newIndustry: '',
    newService: '',
  });

  const [errors, setErrors] = useState({});

  const addItem = (field, inputField, maxLength, errorMessage) => {
    const value = inputs[inputField].trim();
    if (!value) {
      setErrors({ ...errors, [field]: `Please enter a ${field.slice(0, -1)}` });
      return;
    }

    const currentArray =
      field === 'serviceOfferings'
        ? formData[field]
        : formData.targetAudience[field];

    if (currentArray.includes(value)) {
      setErrors({ ...errors, [field]: `${field.slice(0, -1)} already exists` });
      return;
    }

    if (currentArray.length >= maxLength) {
      setErrors({ ...errors, [field]: errorMessage });
      return;
    }

    if (field === 'serviceOfferings') {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        targetAudience: {
          ...prev.targetAudience,
          [field]: [...prev.targetAudience[field], value],
        },
      }));
    }

    setInputs((prev) => ({ ...prev, [inputField]: '' }));
    setErrors({ ...errors, [field]: '' });
  };

  const removeItem = (field, value) => {
    if (field === 'serviceOfferings') {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        targetAudience: {
          ...prev.targetAudience,
          [field]: prev.targetAudience[field].filter((item) => item !== value),
        },
      }));
    }
  };

  const handleMultiSelect = (field, values) => {
    setFormData((prev) => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        [field]: values,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.primaryObjective) {
      newErrors.primaryObjective = 'Primary objective is required';
    }

    if (!formData.businessType) {
      newErrors.businessType = 'Business type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(formData);
    }
  };

  const handleBack = () => {
    onBack(formData);
  };

  const MultiSelectCheckbox = ({ label, field, options, selectedValues }) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={(e) => {
                const newValues = e.target.checked
                  ? [...selectedValues, option.value]
                  : selectedValues.filter((v) => v !== option.value);
                handleMultiSelect(field, newValues);
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 mx-2 px-2">
      <div className="mx-auto">
        <div className="bg-white rounded-2xl overflow-y-auto">
          {/* Header */}
          <StepHeader
            title="Lead Generation Goals"
            description="   Clear goals and target audience definition enable our AI
                      to focus on the most relevant leads and craft messaging
                      that aligns with your objectives."
            imageSrc={Goals}
            imageAlt="goals-animation"
          />

          {/* Form Content */}
          <div className="px-8 pb-8 space-y-8">
            {/* Primary Settings */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Icons.Flag className="h-5 w-5 text-gray-600" />
                Primary Objectives
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <CustomSingleSelect
                    label="Primary Objective *"
                    options={[
                      { value: 'job_search', label: 'Job Search' },
                      {
                        value: 'client_acquisition',
                        label: 'Client Acquisition',
                      },
                      {
                        value: 'partnership_building',
                        label: 'Partnership Building',
                      },
                      { value: 'networking', label: 'Networking' },
                      { value: 'brand_building', label: 'Brand Building' },
                      {
                        value: 'knowledge_sharing',
                        label: 'Knowledge Sharing',
                      },
                      { value: 'recruitment', label: 'Recruitment' },
                      {
                        value: 'sales_prospecting',
                        label: 'Sales Prospecting',
                      },
                      {
                        value: 'investment_seeking',
                        label: 'Investment Seeking',
                      },
                      { value: 'mentorship', label: 'Mentorship' },
                    ]}
                    selectedValue={formData.primaryObjective}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        primaryObjective: value,
                      }))
                    }
                    placeholder="Select your main objective..."
                  />
                  {errors.primaryObjective && (
                    <p className="text-red-500 text-xs">
                      {errors.primaryObjective}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <CustomSingleSelect
                    label="Business Type *"
                    options={[
                      { value: 'b2b', label: 'B2B (Business to Business)' },
                      { value: 'b2c', label: 'B2C (Business to Consumer)' },
                      {
                        value: 'b2b2c',
                        label: 'B2B2C (Business to Business to Consumer)',
                      },
                      { value: 'freelancer', label: 'Freelancer' },
                      { value: 'job_seeker', label: 'Job Seeker' },
                      { value: 'entrepreneur', label: 'Entrepreneur' },
                    ]}
                    selectedValue={formData.businessType}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, businessType: value }))
                    }
                    placeholder="Select business type..."
                  />
                  {errors.businessType && (
                    <p className="text-red-500 text-xs">
                      {errors.businessType}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Icons.Users className="h-5 w-5 text-gray-600" />
                Target Audience
              </h3>

              {/* Target Roles */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Target Roles (up to 20)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputs.newRole}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        newRole: e.target.value,
                      }))
                    }
                    onKeyPress={(e) =>
                      e.key === 'Enter' &&
                      addItem(
                        'roles',
                        'newRole',
                        20,
                        'Cannot have more than 20 target roles',
                      )
                    }
                    placeholder="e.g., Software Engineer, Marketing Manager"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={() =>
                      addItem(
                        'roles',
                        'newRole',
                        20,
                        'Cannot have more than 20 target roles',
                      )
                    }
                    className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <Icons.Plus className="w-5 h-5" />
                  </button>
                </div>
                {errors.roles && (
                  <p className="text-red-500 text-xs">{errors.roles}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {formData.targetAudience.roles.map((role, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      {role}
                      <button
                        onClick={() => removeItem('roles', role)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <Icons.Cross className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {formData.targetAudience.roles.length}/20 roles
                </p>
              </div>

              {/* Target Industries */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Target Industries (up to 20)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputs.newIndustry}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        newIndustry: e.target.value,
                      }))
                    }
                    onKeyPress={(e) =>
                      e.key === 'Enter' &&
                      addItem(
                        'industries',
                        'newIndustry',
                        20,
                        'Cannot have more than 20 target industries',
                      )
                    }
                    placeholder="e.g., Technology, Healthcare, Finance"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={() =>
                      addItem(
                        'industries',
                        'newIndustry',
                        20,
                        'Cannot have more than 20 target industries',
                      )
                    }
                    className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <Icons.Plus className="w-5 h-5" />
                  </button>
                </div>
                {errors.industries && (
                  <p className="text-red-500 text-xs">{errors.industries}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {formData.targetAudience.industries.map((industry, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {industry}
                      <button
                        onClick={() => removeItem('industries', industry)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Icons.Cross className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {formData.targetAudience.industries.length}/20 industries
                </p>
              </div>

              {/* Company Sizes & Seniority */}
              <div className="flex items-center justify-between  w-full">
                <div className="w-full items-center justify-between flex gap-4  ">
                  <div className="w-1/2">
                    <CustomMultiSelect
                      label="Company Sizes"
                      options={[
                        { value: 'startup', label: 'Startup' },
                        { value: 'small', label: 'Small' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'large', label: 'Large' },
                        { value: 'enterprise', label: 'Enterprise' },
                      ]}
                      selectedValues={formData.targetAudience.companySizes}
                      onChange={(values) =>
                        handleMultiSelect('companySizes', values)
                      }
                      placeholder="Select company sizes..."
                    />
                  </div>
                  <div className="w-1/2">
                    <CustomMultiSelect
                      label="Seniority Levels"
                      options={[
                        { value: 'entry', label: 'Entry Level' },
                        { value: 'junior', label: 'Junior' },
                        { value: 'mid', label: 'Mid Level' },
                        { value: 'senior', label: 'Senior' },
                        { value: 'executive', label: 'Executive' },
                        { value: 'founder', label: 'Founder' },
                      ]}
                      selectedValues={formData.targetAudience.seniority}
                      onChange={(values) =>
                        handleMultiSelect('seniority', values)
                      }
                      placeholder="Select seniority levels..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Service Offerings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Icons.Building className="h-5 w-5 text-gray-600" />
                Service Offerings
              </h3>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  What services do you offer? (up to 15)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputs.newService}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        newService: e.target.value,
                      }))
                    }
                    onKeyPress={(e) =>
                      e.key === 'Enter' &&
                      addItem(
                        'serviceOfferings',
                        'newService',
                        15,
                        'Cannot have more than 15 service offerings',
                      )
                    }
                    placeholder="e.g., Web Development, Digital Marketing, Consulting"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={() =>
                      addItem(
                        'serviceOfferings',
                        'newService',
                        15,
                        'Cannot have more than 15 service offerings',
                      )
                    }
                    className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <Icons.Plus className="w-5 h-5" />
                  </button>
                </div>
                {errors.serviceOfferings && (
                  <p className="text-red-500 text-xs">
                    {errors.serviceOfferings}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {formData.serviceOfferings.map((service, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                      <button
                        onClick={() => removeItem('serviceOfferings', service)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Icons.Cross className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {formData.serviceOfferings.length}/15 service offerings
                </p>
              </div>
            </div>

            {/* AI Strategy Info */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Icons.Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">
                    AI-Powered Lead Targeting
                  </h4>
                  <div className="text-sm text-green-800 space-y-2">
                    <p className="m-0 p-0">
                      • <strong>Smart Filtering:</strong> AI uses your
                      objectives to prioritize the most relevant leads
                    </p>
                    <p>
                      • <strong>Audience Matching:</strong> Target roles and
                      industries help identify decision-makers in your niche
                    </p>
                    <p>
                      • <strong>Message Personalization:</strong> Service
                      offerings enable AI to craft value-driven outreach
                      messages
                    </p>
                    <p>
                      • <strong>Opportunity Recognition:</strong> AI learns your
                      ideal customer profile for better lead scoring
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 rounded-b-3xl">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium flex items-center gap-2"
              >
                <Icons.ChevronLeft className="w-4 h-4" />
                Back to Summary
              </button>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Step 3 of 5 - Lead Generation Goals
                </div>
                <Button
                  theme="dark"
                  icon={<Icons.ChevronRight className="w-4 h-4" />}
                  buttonText={'Continue to Requirements'}
                  onClick={handleNext}
                  className="disabled:bg-gray-300 !rounded-full disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadGenerationGoalsStep;
