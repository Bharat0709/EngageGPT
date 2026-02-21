import React, { useState } from 'react';
import { Icons } from '@utils/constantData/icons';
import Summary from '@assets/images/summary.gif';
import Button from '@components/Common/Button';
import { CustomSingleSelect } from '@components/Common/CustomSelect';
import StepHeader from './FormHeader';

const MemberSummaryStep = ({
  onNext,
  onBack,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    currentRole: initialData.currentRole || '',
    profileDescription: initialData.profileDescription || '',
    experienceLevel: initialData.experienceLevel || 'entry',
    industry: initialData.industry || '',
    functionalArea: initialData.functionalArea || [],
    companySize: initialData.companySize || 'small',
    location: {
      city: initialData.location?.city || '',
      country: initialData.location?.country || 'India',
      workMode: initialData.location?.workMode || 'hybrid',
    },
  });

  const [inputs, setInputs] = useState({
    newFunctionalArea: '',
  });

  const [errors, setErrors] = useState({});

  const addFunctionalArea = () => {
    const area = inputs.newFunctionalArea.trim();
    if (!area) {
      setErrors({
        ...errors,
        functionalArea: 'Please enter a functional area',
      });
      return;
    }
    if (formData.functionalArea.includes(area)) {
      setErrors({
        ...errors,
        functionalArea: 'Functional area already exists',
      });
      return;
    }
    if (formData.functionalArea.length >= 10) {
      setErrors({
        ...errors,
        functionalArea: 'Cannot have more than 10 functional areas',
      });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      functionalArea: [...prev.functionalArea, area],
    }));
    setInputs((prev) => ({ ...prev, newFunctionalArea: '' }));
    setErrors({ ...errors, functionalArea: '' });
  };

  const removeFunctionalArea = (area) => {
    setFormData((prev) => ({
      ...prev,
      functionalArea: prev.functionalArea.filter((item) => item !== area),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentRole.trim()) {
      newErrors.currentRole = 'Current role is required';
    } else if (formData.currentRole.length > 100) {
      newErrors.currentRole = 'Current role cannot exceed 100 characters';
    }

    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required';
    } else if (formData.industry.length > 100) {
      newErrors.industry = 'Industry cannot exceed 100 characters';
    }

    if (!formData.profileDescription.trim()) {
      newErrors.profileDescription = 'Profile description is required';
    } else if (formData.profileDescription.length > 500) {
      newErrors.profileDescription =
        'Profile description cannot exceed 500 characters';
    }

    if (formData.location.city.length > 100) {
      newErrors.city = 'City cannot exceed 100 characters';
    }

    if (formData.location.country.length > 100) {
      newErrors.country = 'Country cannot exceed 100 characters';
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

  return (
    <div className=" bg-gray-50 mx-2 px-2">
      <div className=" mx-auto">
        <div className="bg-white rounded-2xl overflow-y-auto">
          {/* Header */}
          <StepHeader
            title="Professional Summary"
            description="  Our professional background helps our AI create
                      personalized outreach messages that resonate with your
                      target audience and establish credibility."
            imageSrc={Summary}
            imageAlt="summary-animation"
          />

          {/* Form Content */}
          <div className="px-8 pb-8 space-y-8">
            {/* Basic Professional Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Icons.BriefCase className="h-5 w-5 text-gray-600" />
                Professional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Current Role *
                  </label>
                  <input
                    type="text"
                    value={formData.currentRole}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        currentRole: e.target.value,
                      }))
                    }
                    placeholder="e.g., Software Developer, Digital Marketer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    maxLength={100}
                  />
                  {errors.currentRole && (
                    <p className="text-red-500 text-xs">{errors.currentRole}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {formData.currentRole.length}/100 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Industry *
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        industry: e.target.value,
                      }))
                    }
                    placeholder="e.g., Technology, Healthcare, Finance"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    maxLength={100}
                  />
                  {errors.industry && (
                    <p className="text-red-500 text-xs">{errors.industry}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {formData.industry.length}/100 characters
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Description *
                </label>
                <textarea
                  rows={4}
                  value={formData.profileDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      profileDescription: e.target.value,
                    }))
                  }
                  placeholder="Brief description of your professional background, expertise, and what makes you unique in your field..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                  maxLength={500}
                />
                {errors.profileDescription && (
                  <p className="text-red-500 text-xs">
                    {errors.profileDescription}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.profileDescription.length}/500 characters
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomSingleSelect
                  label="Experience Level"
                  options={[
                    { value: 'entry', label: 'Entry Level' },
                    { value: 'junior', label: 'Junior' },
                    { value: 'mid', label: 'Mid Level' },
                    { value: 'senior', label: 'Senior' },
                    { value: 'executive', label: 'Executive' },
                    { value: 'student', label: 'Student' },
                    { value: 'fresher', label: 'Fresher' },
                  ]}
                  selectedValue={formData.experienceLevel}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, experienceLevel: value }))
                  }
                  placeholder="Select experience level..."
                />

                <CustomSingleSelect
                  label="Company Size"
                  options={[
                    { value: 'startup', label: 'Startup' },
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                    { value: 'enterprise', label: 'Enterprise' },
                    { value: 'freelancer', label: 'Freelancer' },
                  ]}
                  selectedValue={formData.companySize}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, companySize: value }))
                  }
                  placeholder="Select company size..."
                />
              </div>
            </div>

            {/* Functional Areas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Icons.Target className="h-5 w-5 text-gray-600" />
                Functional Areas
              </h3>
              <p className="text-sm text-gray-600">
                Add areas of expertise or functional domains you work in (up to
                10 areas)
              </p>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputs.newFunctionalArea}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        newFunctionalArea: e.target.value,
                      }))
                    }
                    onKeyUp={(e) => e.key === 'Enter' && addFunctionalArea()}
                    placeholder="e.g., Marketing, Sales, Development, Analytics"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                  <button
                    onClick={addFunctionalArea}
                    className="px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    <Icons.Plus className="w-5 h-5" />
                  </button>
                </div>
                {errors.functionalArea && (
                  <p className="text-red-500 text-xs">
                    {errors.functionalArea}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {formData.functionalArea.map((area, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {area}
                      <button
                        onClick={() => removeFunctionalArea(area)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <Icons.Cross className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {formData.functionalArea.length}/10 functional areas
                </p>
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Icons.Map className="h-5 w-5 text-gray-600" />
                Location & Work Preferences
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: { ...prev.location, city: e.target.value },
                      }))
                    }
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    maxLength={100}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.location.country}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: { ...prev.location, country: e.target.value },
                      }))
                    }
                    placeholder="Enter your country"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    maxLength={100}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-xs">{errors.country}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <CustomSingleSelect
                    label="Work Mode"
                    options={[
                      { value: 'remote', label: 'Remote' },
                      { value: 'onsite', label: 'Onsite' },
                      { value: 'hybrid', label: 'Hybrid' },
                      { value: 'flexible', label: 'Flexible' },
                    ]}
                    selectedValue={formData.location.workMode}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: { ...prev.location, workMode: value },
                      }))
                    }
                    placeholder="Select work mode..."
                  />
                </div>
              </div>
            </div>

            {/* AI Personalization Info */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icons.Sparkles className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    How We Use This Information
                  </h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p className="m-0 p-0">
                      • <strong>Credibility Building:</strong> Your role and
                      experience level help us craft messages that establish
                      your expertise
                    </p>
                    <p>
                      • <strong>Industry Relevance:</strong> Industry
                      information ensures our outreach mentions relevant trends
                      and challenges
                    </p>
                    <p>
                      • <strong>Personalization:</strong> Your background helps
                      us create authentic, personalized messages rather than
                      generic templates
                    </p>
                    <p>
                      • <strong>Target Matching:</strong> Functional areas help
                      us identify the most relevant leads for your expertise
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
                Back to Lead Settings
              </button>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Step 2 of 5 - Professional Summary
                </div>
                <Button
                  theme="dark"
                  icon={<Icons.ChevronRight className="w-4 h-4" />}
                  buttonText={'Continue to Goals'}
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

export default MemberSummaryStep;
