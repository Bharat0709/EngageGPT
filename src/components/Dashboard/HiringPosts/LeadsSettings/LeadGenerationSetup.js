import React, { useState, useEffect } from 'react';
import { useNotifications } from '@components/Common/Notification';
import LeadGenerationHeader from './LeadGenerationFormHeader';
import LeadSavingSettings from './LeadSavingSettings';
import MemberSummaryStep from './LeadsProfileSummary';
import LeadGenerationGoalsStep from './LeadGenerationGoals';
import CustomRequirementsStep from './LeadsCustomRequirements';
import AutomationSettingsStep from './LeadAutomationSettings';
import { mapFormDataToMemberSchema } from './Utils/BackendMapper';
import {
  mapExistingMemberDataToForm,
  calculateStepCompletion,
  hasExistingSetup,
} from './Utils/FrontEndMapper';
import { getMemberDetails, updateMemberSummary } from '@services/Members';

const LeadGenerationSetup = ({ memberId, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(true);
  const message = useNotifications();

  // Combined form data for all steps
  const [formData, setFormData] = useState({
    // Step 1: Lead Saving Settings
    leadSavingSettings: {
      enabled: true,
      enableCustomKeywords: true,
      keywords: [],
      excludeKeywords: [],
      minCharCount: 50,
    },

    // Step 2: Member Summary
    professionalProfile: {
      currentRole: '',
      profileDescription: '',
      experienceLevel: 'mid',
      industry: '',
      functionalArea: [],
      companySize: 'medium',
      location: {
        city: '',
        country: 'India',
        workMode: 'hybrid',
      },
    },

    // Step 3: Lead Generation Goals
    leadGenerationGoals: {
      primaryObjective: '',
      businessType: '',
      targetAudience: {
        roles: [],
        industries: [],
        companySizes: [],
        seniority: [],
      },
      serviceOfferings: [],
    },

    // Step 4: Custom Requirements
    customRequirements: '',

    // Step 5: Automation Settings
    automationSettings: {
      isEnabled: false,
      automationType: 'none',
      executionMode: 'manual',
      frequency: 'weekly',
      timeOfDay: '09:00',
      daysOfWeek: ['monday', 'wednesday', 'friday'],
      timezone: 'UTC',
      maxOutreachPerDay: 10,
    },
  });

  // Track completion status of each step
  const [stepCompletion, setStepCompletion] = useState({
    1: false, // Lead Saving Settings
    2: false, // Member Summary
    3: false, // Lead Generation Goals
    4: false, // Custom Requirements
    5: false, // Automation Settings
  });

  // Load existing data on component mount
  useEffect(() => {
    loadExistingData();
  }, [memberId]);

  // Auto-save data periodically
  useEffect(() => {
    if (hasUnsavedChanges) {
      const saveTimer = setTimeout(() => {
        autoSaveData();
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(saveTimer);
    }
  }, [formData, hasUnsavedChanges]);

  // Track changes to form data
  useEffect(() => {
    if (!isLoading) {
      setHasUnsavedChanges(true);
    }
  }, [formData]);

  const loadExistingData = async () => {
    try {
      setIsLoading(true);

      // First, check localStorage for saved data
      const savedData = localStorage.getItem(`leadGeneration_${memberId}`);
      if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Handle both old and new localStorage structures
        const savedFormData = parsedData.formData || parsedData;
        const savedStepCompletion = parsedData.stepCompletion;
        const savedCurrentStep = parsedData.currentStep;

        setFormData((prev) => ({ ...prev, ...savedFormData }));

        if (savedStepCompletion) {
          setStepCompletion(savedStepCompletion);
        } else {
          // Calculate step completion if not saved
          const completion = calculateStepCompletion(savedFormData);
          setStepCompletion(completion);
        }

        if (savedCurrentStep) {
          setCurrentStep(savedCurrentStep);
        }

        setIsFirstTimeSetup(false);
      } else {
        // Load existing member data from API
        const existingMemberData = await getMemberDetails(memberId);

        if (existingMemberData && hasExistingSetup(existingMemberData)) {
          // Map API data to form structure
          const mappedData = mapExistingMemberDataToForm(existingMemberData);

          // Update form data
          setFormData((prev) => ({
            ...prev,
            ...mappedData,
          }));

          // Calculate and update step completion
          const completion = calculateStepCompletion(mappedData);
          setStepCompletion(completion);

          // Save mapped data to localStorage for future use
          const dataToSave = {
            formData: mappedData,
            stepCompletion: completion,
            currentStep: 1,
            lastLoaded: new Date().toISOString(),
            source: 'api',
          };

          localStorage.setItem(
            `leadGeneration_${memberId}`,
            JSON.stringify(dataToSave),
          );

          setIsFirstTimeSetup(false);
          message.info(
            'Existing setup data loaded. You can edit and update your preferences.',
          );
        } else {
          setIsFirstTimeSetup(true);
        }
      }
    } catch (error) {
      message.error('Failed to load existing data');
    } finally {
      setIsLoading(false);
    }
  };

  const autoSaveData = () => {
    try {
      const dataToSave = {
        formData,
        stepCompletion,
        currentStep,
        lastSaved: new Date().toISOString(),
        source: 'auto-save',
      };

      localStorage.setItem(
        `leadGeneration_${memberId}`,
        JSON.stringify(dataToSave),
      );
      setHasUnsavedChanges(false);
    } catch (error) {
      message.error(error.message);
    }
  };

  // Validation functions for each step (keeping your original logic)
  const validateStep1 = (data) => {
    if (!data.enabled) return true;
    if (data.enableCustomKeywords && data.keywords.length === 0) return false;
    return data.minCharCount >= 0;
  };

  const validateStep2 = (data) => {
    return (
      data.currentRole.trim() !== '' &&
      data.industry.trim() !== '' &&
      data.profileDescription.trim() !== ''
    );
  };

  const validateStep3 = (data) => {
    return data.primaryObjective !== '' && data.businessType !== '';
  };

  const validateStep4 = (data) => {
    return data.customRequirements.trim() !== '';
  };

  const validateStep5 = (data) => {
    if (!data.isEnabled) return true;
    return data.automationType !== 'none' && data.executionMode !== '';
  };

  // Update form data for specific step
  const updateStepData = (stepNumber, stepData) => {
    const stepKeys = {
      1: 'leadSavingSettings',
      2: 'professionalProfile',
      3: 'leadGenerationGoals',
      4: 'customRequirements',
      5: 'automationSettings',
    };

    const updatedFormData = {
      ...formData,
      [stepKeys[stepNumber]]: stepData,
    };

    setFormData(updatedFormData);
    setHasUnsavedChanges(true);

    // Update step completion
    const isComplete = {
      1: validateStep1,
      2: validateStep2,
      3: validateStep3,
      4: validateStep4,
      5: validateStep5,
    }[stepNumber](stepData);

    setStepCompletion((prev) => ({
      ...prev,
      [stepNumber]: isComplete,
    }));

    // Auto-save after updating with delay
    setTimeout(() => {
      const dataToSave = {
        formData: updatedFormData,
        stepCompletion: {
          ...stepCompletion,
          [stepNumber]: isComplete,
        },
        currentStep,
        lastSaved: new Date().toISOString(),
        source: 'step-update',
      };

      localStorage.setItem(
        `leadGeneration_${memberId}`,
        JSON.stringify(dataToSave),
      );
      setHasUnsavedChanges(false);
    }, 1000);
  };

  const goToNextStep = () => {
    if (currentStep < 5) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);

      // Update localStorage with new current step
      const currentData = JSON.parse(
        localStorage.getItem(`leadGeneration_${memberId}`) || '{}',
      );
      localStorage.setItem(
        `leadGeneration_${memberId}`,
        JSON.stringify({
          ...currentData,
          currentStep: newStep,
        }),
      );
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);

      // Update localStorage with new current step
      const currentData = JSON.parse(
        localStorage.getItem(`leadGeneration_${memberId}`) || '{}',
      );
      localStorage.setItem(
        `leadGeneration_${memberId}`,
        JSON.stringify({
          ...currentData,
          currentStep: newStep,
        }),
      );
    }
  };

  // Handle step-specific navigation with data
  const handleStepNext = (stepData) => {
    updateStepData(currentStep, stepData);
    goToNextStep();
  };

  const handleStepBack = (stepData = null) => {
    if (stepData) {
      updateStepData(currentStep, stepData);
    }
    goToPreviousStep();
  };

  // Function to reset form to API data (discard local changes)
  const resetToApiData = async () => {
    try {
      setIsLoading(true);

      // Clear localStorage
      localStorage.removeItem(`leadGeneration_${memberId}`);

      // Reload from API
      const existingMemberData = await getMemberDetails(memberId);

      if (existingMemberData && hasExistingSetup(existingMemberData)) {
        const mappedData = mapExistingMemberDataToForm(existingMemberData);
        setFormData(mappedData);

        const completion = calculateStepCompletion(mappedData);
        setStepCompletion(completion);

        setCurrentStep(1);
        setHasUnsavedChanges(false);
        message.success('Form reset to saved data');
      }
    } catch (error) {
      message.error('Failed to reset form data');
    } finally {
      setIsLoading(false);
    }
  };

  // Final submission
  const handleComplete = async () => {
    try {
      setIsLoading(true);

      // Validate all steps are complete
      const allStepsComplete = Object.values(stepCompletion).every(
        (complete) => complete,
      );
      if (!allStepsComplete) {
        message.error('Please complete all steps before finalizing');
        return;
      }

      // Save all data to backend using the mapping function
      const memberData = mapFormDataToMemberSchema(formData, memberId);

      await updateMemberSummary(memberId, memberData);

      // Clear localStorage
      localStorage.removeItem(`leadGeneration_${memberId}`);

      message.success('Lead generation setup completed successfully!');

      if (onComplete) {
        onComplete({
          formData,
          memberData,
          memberId,
          isFirstTimeSetup,
        });
      }
    } catch (error) {
      message.error('Failed to save setup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate completion percentage for header
  const completionPercentage = Math.round(
    (Object.values(stepCompletion).filter(Boolean).length / 5) * 100,
  );

  // Render current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <LeadSavingSettings
            initialData={formData.leadSavingSettings}
            onNext={handleStepNext}
          />
        );
      case 2:
        return (
          <MemberSummaryStep
            initialData={formData.professionalProfile}
            onNext={handleStepNext}
            onBack={handleStepBack}
          />
        );
      case 3:
        return (
          <LeadGenerationGoalsStep
            initialData={formData.leadGenerationGoals}
            onNext={handleStepNext}
            onBack={handleStepBack}
          />
        );
      case 4:
        return (
          <CustomRequirementsStep
            initialData={formData.customRequirements}
            onNext={handleStepNext}
            onBack={handleStepBack}
          />
        );
      case 5:
        return (
          <AutomationSettingsStep
            initialData={formData.automationSettings}
            onComplete={handleComplete}
            onBack={handleStepBack}
            isLoading={isLoading}
          />
        );
      default:
        return <div>Step not implemented yet</div>;
    }
  };

  if (isLoading && currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your setup...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50  mx-2 p-2">
        <LeadGenerationHeader
          currentStep={currentStep}
          totalSteps={5}
          completionPercentage={completionPercentage}
          stepCompletion={stepCompletion}
          isFirstTimeSetup={isFirstTimeSetup}
          hasUnsavedChanges={hasUnsavedChanges}
          onResetData={resetToApiData}
          onSaveProgress={autoSaveData}
        />
      </div>
      <div className="py-1">{renderCurrentStep()}</div>
    </>
  );
};

export default LeadGenerationSetup;
