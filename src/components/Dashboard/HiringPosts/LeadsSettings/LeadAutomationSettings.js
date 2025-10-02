import React, { useState } from 'react';
import { Icons } from '@utils/constantData/icons';
import { CustomSingleSelect } from '@components/Common/CustomSelect';
import { FiPause, FiPower } from 'react-icons/fi';
import Automation from '@assets/images/automation.gif';
import Button from '@components/Common/Button';
import StepHeader from './FormHeader';

const AutomationSettingsStep = ({
  onComplete,
  onBack,
  initialData = {},
  isLoading = false,
  currentStep = 5,
}) => {
  const [formData, setFormData] = useState({
    isEnabled:
      initialData.isEnabled !== undefined ? initialData.isEnabled : false,
    automationType: initialData.automationType || 'none',
    executionMode: initialData.executionMode || 'manual',
    schedule: {
      frequency: initialData.schedule?.frequency || 'weekly',
      timeOfDay: initialData.schedule?.timeOfDay || '09:00',
      daysOfWeek: initialData.schedule?.daysOfWeek || [
        'monday',
        'wednesday',
        'friday',
      ],
      timezone: initialData.schedule?.timezone || 'UTC',
      customCronExpression: initialData.schedule?.customCronExpression || null,
    },
    maxOutreachPerDay: initialData.maxOutreachPerDay || 10,
  });

  const [errors, setErrors] = useState({});

  const handleDayCheckbox = (day) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        daysOfWeek: prev.schedule.daysOfWeek.includes(day)
          ? prev.schedule.daysOfWeek.filter((d) => d !== day)
          : [...prev.schedule.daysOfWeek, day],
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.isEnabled) {
      if (formData.automationType === 'none') {
        newErrors.automationType =
          'Please select an automation type when automation is enabled';
      }

      if (
        formData.executionMode === 'scheduled' &&
        formData.schedule.daysOfWeek.length === 0
      ) {
        newErrors.daysOfWeek =
          'Please select at least one day for scheduled execution';
      }

      if (formData.maxOutreachPerDay < 1 || formData.maxOutreachPerDay > 100) {
        newErrors.maxOutreachPerDay =
          'Outreach per day must be between 1 and 100';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleComplete = () => {
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    onBack(formData);
  };

  return (
    <div className="bg-gray-50 px-2">
      <div className="mx-auto">
        <div className="bg-white rounded-2xl overflow-y-auto">
          {/* Header */}
          <StepHeader
            title="  Automation Settings"
            description="   Automation settings control how and when our AI reaches
                      out to leads, ensuring your outreach feels natural and
                      respects professional etiquette."
            imageSrc={Automation}
            imageAlt="automation-animation"
          />

          {/* Form Content */}
          <div className="px-8 pb-8 space-y-8">
            {/* Final Setup Automation */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">
                    Complete AI-Powered Lead Generation Setup
                  </h4>
                  <p className="text-sm text-green-800">
                    Once automation is enabled, our AI will use your
                    professional summary, goals, and requirements to create
                    personalized emails for saved leads. The system will respect
                    your automation preferences and maintain professional
                    outreach standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Master Toggle */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiPower className="h-5 w-5 text-gray-600" />
                Automation Control
              </h3>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Enable AI Automation
                    </h4>
                    <p className="text-sm text-gray-600">
                      Master switch for automated lead outreach
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isEnabled}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isEnabled: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {formData.isEnabled && (
              <>
                {/* Automation Type */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Icons.Zap className="h-5 w-5 text-gray-600" />
                    Automation Configuration
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <CustomSingleSelect
                        label="Automation Type *"
                        options={[
                          {
                            value: 'semi',
                            label: 'Semi-Automated (Review before sending)',
                          },
                          // {
                          //   value: 'full',
                          //   label: 'Full Automation (Send automatically)',
                          // },
                        ]}
                        selectedValue={formData.automationType}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            automationType: value,
                          }))
                        }
                        placeholder="Select automation type..."
                      />
                      {errors.automationType && (
                        <p className="text-red-500 text-xs">
                          {errors.automationType}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <CustomSingleSelect
                        label="Execution Mode"
                        options={[
                          {
                            value: 'realtime',
                            label: 'Real-time (As leads are found)',
                          },
                          {
                            value: 'scheduled',
                            label: 'Scheduled (Specific times)',
                          },
                          { value: 'manual', label: 'Manual (On-demand only)' },
                          { value: 'hybrid', label: 'Hybrid (Mixed approach)' },
                        ]}
                        selectedValue={formData.executionMode}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            executionMode: value,
                          }))
                        }
                        placeholder="Select execution mode..."
                      />
                    </div>
                  </div>
                </div>

                {/* Schedule Settings */}
                {formData.executionMode === 'scheduled' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Icons.Clock className="h-5 w-5 text-gray-600" />
                      Schedule Configuration
                    </h3>

                    <div className="bg-blue-50 rounded-2xl p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <CustomSingleSelect
                          label="Frequency"
                          options={[
                            { value: 'daily', label: 'Daily' },
                            { value: 'weekly', label: 'Weekly' },
                            { value: 'bi-weekly', label: 'Bi-weekly' },
                            { value: 'monthly', label: 'Monthly' },
                            { value: 'custom', label: 'Custom' },
                          ]}
                          selectedValue={formData.schedule.frequency}
                          onChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              schedule: { ...prev.schedule, frequency: value },
                            }))
                          }
                          placeholder="Select frequency..."
                        />

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Time of Day
                          </label>
                          <input
                            type="time"
                            value={formData.schedule.timeOfDay}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                schedule: {
                                  ...prev.schedule,
                                  timeOfDay: e.target.value,
                                },
                              }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <CustomSingleSelect
                          label="Timezone"
                          options={[
                            { value: 'UTC', label: 'UTC' },
                            {
                              value: 'America/New_York',
                              label: 'Eastern Time',
                            },
                            { value: 'America/Chicago', label: 'Central Time' },
                            { value: 'America/Denver', label: 'Mountain Time' },
                            {
                              value: 'America/Los_Angeles',
                              label: 'Pacific Time',
                            },
                            { value: 'Europe/London', label: 'London' },
                            { value: 'Asia/Calcutta', label: 'India' },
                          ]}
                          selectedValue={formData.schedule.timezone}
                          onChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              schedule: { ...prev.schedule, timezone: value },
                            }))
                          }
                          placeholder="Select timezone..."
                        />
                      </div>

                      {/* Days of Week */}
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Days of Week *
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { value: 'monday', label: 'Mon' },
                            { value: 'tuesday', label: 'Tue' },
                            { value: 'wednesday', label: 'Wed' },
                            { value: 'thursday', label: 'Thu' },
                            { value: 'friday', label: 'Fri' },
                            { value: 'saturday', label: 'Sat' },
                            { value: 'sunday', label: 'Sun' },
                          ].map((day) => (
                            <label
                              key={day.value}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={formData.schedule.daysOfWeek.includes(
                                  day.value,
                                )}
                                onChange={() => handleDayCheckbox(day.value)}
                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                {day.label}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.daysOfWeek && (
                          <p className="text-red-500 text-xs">
                            {errors.daysOfWeek}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Outreach Limits */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Icons.Shield className="h-5 w-5 text-gray-600" />
                    Safety & Limits
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Max Outreach Per Day
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={formData.maxOutreachPerDay}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            maxOutreachPerDay: parseInt(e.target.value) || 10,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter daily limit"
                      />
                      {errors.maxOutreachPerDay && (
                        <p className="text-red-500 text-xs">
                          {errors.maxOutreachPerDay}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Recommended: 5-20 per day for better engagement
                      </p>
                    </div>
                  </div>
                </div>

                {/* Automation Preview */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Icons.Eye className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2">
                        Automation Preview
                      </h4>
                      <div className="text-sm text-purple-800 space-y-1">
                        <p className="p-0 m-0">
                          • <strong>Type:</strong>{' '}
                          {formData.automationType === 'semi'
                            ? 'Semi-Automated (Review required)'
                            : formData.automationType === 'full'
                            ? 'Fully Automated'
                            : 'Not configured'}
                        </p>
                        <p>
                          • <strong>Mode:</strong>{' '}
                          {formData.executionMode === 'realtime'
                            ? 'Real-time processing'
                            : formData.executionMode === 'scheduled'
                            ? 'Scheduled execution'
                            : formData.executionMode === 'manual'
                            ? 'Manual only'
                            : 'Hybrid approach'}
                        </p>
                        <p>
                          • <strong>Daily Limit:</strong>{' '}
                          {formData.maxOutreachPerDay} emails per day
                        </p>
                        {formData.executionMode === 'scheduled' && (
                          <p>
                            • <strong>Schedule:</strong>{' '}
                            {formData.schedule.frequency} at{' '}
                            {formData.schedule.timeOfDay} on{' '}
                            {formData.schedule.daysOfWeek.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!formData.isEnabled && (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <FiPause className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-600 mb-2">
                  Automation Disabled
                </h4>
                <p className="text-gray-500">
                  You can complete the setup and enable automation later from
                  your dashboard.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 rounded-b-3xl">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium flex items-center gap-2"
              >
                <Icons.ChevronLeft className="w-4 h-4" />
                Back to Requirements
              </button>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Step 5 of 5 - Automation Settings
                </div>
                <Button
                  theme="dark"
                  icon={<Icons.Check />}
                  buttonText="Complete Setup"
                  loadingText="Completing Setup..."
                  onClick={handleComplete}
                  disabled={isLoading}
                  isLoading={isLoading}
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

export default AutomationSettingsStep;
