import React, { useState } from 'react';
import { Icons } from '@utils/constantData/icons';
import Button from '@components/Common/Button';
import Requirements from '@assets/images/requirements.gif';
import StepHeader from './FormHeader';

const CustomRequirementsStep = ({ onNext, onBack, initialData = {} }) => {
  const [formData, setFormData] = useState({
    customRequirements: initialData.customRequirements || '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customRequirements.trim()) {
      newErrors.customRequirements = 'Detailed requirements are required';
    } else if (formData.customRequirements.length > 2000) {
      newErrors.customRequirements =
        'Requirements cannot exceed 2000 characters';
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
    <div className="bg-gray-50 px-2">
      <div className="mx-auto">
        <div className="bg-white rounded-2xl overflow-y-auto">
          <StepHeader
            title="Detailed User Requirements"
            description="Detailed requirements help our AI understand your unique
                      needs, communication preferences, and industry-specific
                      considerations for maximum effectiveness."
            imageSrc={Requirements}
            imageAlt="list-animation"
          />
          {/* Form Content */}
          <div className="px-8 pb-8 space-y-8">
            {/* Detailed Requirements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Icons.Edit className="h-5 w-5 text-gray-600" />
                Detailed Requirements *
              </h3>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Comprehensive Requirements Description
                </label>
                <textarea
                  rows={6}
                  value={formData.customRequirements}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customRequirements: e.target.value,
                    }))
                  }
                  placeholder="Describe your specific needs, goals, and any unique requirements for your lead generation strategy. Include details about your ideal customer profile, pain points you solve, value propositions, and any specific outcomes you're targeting..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  maxLength={2000}
                />
                {errors.customRequirements && (
                  <p className="text-red-500 text-xs">
                    {errors.customRequirements}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.customRequirements.length}/2000 characters
                </p>
              </div>
            </div>

            {/* AI Enhancement Info */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-orange-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Icons.Sparkles className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-orange-900 mb-2">
                    How AI Uses Your Requirements
                  </h4>
                  <div className="text-sm text-gray-800 space-y-2">
                    <p className="p-0 m-0 ">
                      • <strong>Email Personalization:</strong> AI combines your
                      requirements with lead data to craft unique, relevant
                      messages
                    </p>
                    <p>
                      • <strong>Tone Consistency:</strong> Your style
                      preferences ensure all emails maintain your brand voice
                    </p>
                    <p>
                      • <strong>Value Alignment:</strong> Requirements guide AI
                      to highlight benefits that matter most to each lead
                    </p>
                    <p>
                      • <strong>Conversion Optimization:</strong> Detailed
                      instructions help AI create emails that drive the actions
                      you want
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
                Back to Goals
              </button>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Step 4 of 5 - Custom Requirements
                </div>
                <Button
                  theme="dark"
                  icon={<Icons.ChevronRight className="w-4 h-4" />}
                  buttonText={'Continue to Automation'}
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

export default CustomRequirementsStep;
