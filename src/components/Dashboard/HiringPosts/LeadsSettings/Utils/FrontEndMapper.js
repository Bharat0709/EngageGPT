const mapExistingMemberDataToForm = (memberData) => {
  const mappedFormData = {
    // Step 1: Lead Saving Settings
    leadSavingSettings: {
      enabled: memberData.postSavingPreferences?.enabled ?? true,
      enableCustomKeywords:
        memberData.postSavingPreferences?.enableCustomKeywords ?? true,
      keywords: memberData.postSavingPreferences?.keywords || [],
      excludeKeywords: memberData.postSavingPreferences?.excludeKeywords || [],
      saveAllPosts: memberData.postSavingPreferences?.saveAllPosts ?? false,
      maxPostsPerDay: memberData.postSavingPreferences?.maxPostsPerDay || 100,
      minCharCount: memberData.postSavingPreferences?.minCharCount || 50,
      postTypes: memberData.postSavingPreferences?.postTypes || ['all'],
      autoDetectEmailAddresses:
        memberData.postSavingPreferences?.autoDetectEmailAddresses ?? true,
      autoDetectFormLinks:
        memberData.postSavingPreferences?.autoDetectFormLinks ?? true,
      saveFrequency:
        memberData.postSavingPreferences?.saveFrequency || 'realtime',
    },

    // Step 2: Professional Profile
    professionalProfile: {
      currentRole: memberData.summary?.professionalProfile?.currentRole || '',
      profileDescription:
        memberData.summary?.professionalProfile?.profileDescription || '',
      experienceLevel:
        memberData.summary?.professionalProfile?.experienceLevel || 'mid',
      industry: memberData.summary?.professionalProfile?.industry || '',
      functionalArea:
        memberData.summary?.professionalProfile?.functionalArea || [],
      companySize:
        memberData.summary?.professionalProfile?.companySize || 'medium',
      location: {
        city: memberData.summary?.professionalProfile?.location?.city || '',
        country:
          memberData.summary?.professionalProfile?.location?.country || 'India',
        workMode:
          memberData.summary?.professionalProfile?.location?.workMode ||
          'hybrid',
      },
    },

    // Step 3: Lead Generation Goals
    leadGenerationGoals: {
      primaryObjective: memberData.leadGenerationGoals?.primaryObjective || '',
      businessType: memberData.leadGenerationGoals?.businessType || '',
      targetAudience: {
        roles: memberData.leadGenerationGoals?.targetAudience?.roles || [],
        industries:
          memberData.leadGenerationGoals?.targetAudience?.industries || [],
        companySizes:
          memberData.leadGenerationGoals?.targetAudience?.companySizes || [],
        seniority:
          memberData.leadGenerationGoals?.targetAudience?.seniority || [],
      },
      serviceOfferings: memberData.leadGenerationGoals?.serviceOfferings || [],
    },

    // Step 4: Custom Requirements
    customRequirements: memberData.customRequirements || '',

    // Step 5: Automation Settings
    automationSettings: {
      isEnabled: memberData.leadGenerationGoals?.automation?.isEnabled ?? false,
      automationType:
        memberData.leadGenerationGoals?.automation?.automationType || 'none',
      executionMode:
        memberData.leadGenerationGoals?.automation?.executionMode || 'manual',
      frequency:
        memberData.leadGenerationGoals?.automation?.schedule?.frequency ||
        'weekly',
      timeOfDay:
        memberData.leadGenerationGoals?.automation?.schedule?.timeOfDay ||
        '09:00',
      daysOfWeek: memberData.leadGenerationGoals?.automation?.schedule
        ?.daysOfWeek || ['monday', 'wednesday', 'friday'],
      timezone:
        memberData.leadGenerationGoals?.automation?.schedule?.timezone || 'UTC',
      maxOutreachPerDay:
        memberData.leadGenerationGoals?.automation?.maxOutreachPerDay || 10,
    },
  };
  return mappedFormData;
};

const calculateStepCompletion = (formData) => {
  const completion = {
    1: false, // Lead Saving Settings
    2: false, // Professional Profile
    3: false, // Lead Generation Goals
    4: false, // Custom Requirements
    5: false, // Automation Settings
  };

  // Step 1: Lead Saving Settings (always complete if enabled is set)
  completion[1] = formData.leadSavingSettings?.enabled !== undefined;

  // Step 2: Professional Profile (require role and experience level)
  completion[2] = !!(
    formData.professionalProfile?.currentRole?.trim() &&
    formData.professionalProfile?.experienceLevel
  );

  // Step 3: Lead Generation Goals (require objective and business type)
  completion[3] = !!(
    formData.leadGenerationGoals?.primaryObjective &&
    formData.leadGenerationGoals?.businessType
  );

  // Step 4: Custom Requirements (optional, always complete)
  completion[4] = true;

  // Step 5: Automation Settings (require automation type)
  completion[5] = !!formData.automationSettings?.automationType;

  return completion;
};

const loadExistingData = async () => {
  try {
    setIsLoading(true);

    // First, check localStorage for saved data
    const savedData = localStorage.getItem(`leadGeneration_${memberId}`);

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      setFormData((prev) => ({
        ...prev,
        ...(parsedData.formData || parsedData),
      }));

      // Update step completion
      const completion = calculateStepCompletion(
        parsedData.formData || parsedData,
      );
      setStepCompletion(completion);
    } else {
      // Load existing member data from API
      const existingMemberData = await getMemberDetails(memberId);
      if (existingMemberData) {
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
      }
    }
  } catch (error) {
    message.error('Failed to load existing data');
  } finally {
    setIsLoading(false);
  }
};

const mergeFormData = (existingData, newData) => {
  return {
    leadSavingSettings: {
      ...existingData.leadSavingSettings,
      ...newData.leadSavingSettings,
    },
    professionalProfile: {
      ...existingData.professionalProfile,
      ...newData.professionalProfile,
      location: {
        ...existingData.professionalProfile?.location,
        ...newData.professionalProfile?.location,
      },
    },
    leadGenerationGoals: {
      ...existingData.leadGenerationGoals,
      ...newData.leadGenerationGoals,
      targetAudience: {
        ...existingData.leadGenerationGoals?.targetAudience,
        ...newData.leadGenerationGoals?.targetAudience,
      },
    },
    customRequirements: {
      ...existingData.customRequirements,
      ...newData.customRequirements,
    },
    automationSettings: {
      ...existingData.automationSettings,
      ...newData.automationSettings,
    },
  };
};

const hasExistingSetup = (memberData) => {
  return !!(
    memberData.postSavingPreferences ||
    memberData.summary?.professionalProfile?.currentRole ||
    memberData.leadGenerationGoals?.primaryObjective ||
    memberData.leadGenerationGoals?.automation?.isEnabled
  );
};

const getSetupCompletionPercentage = (stepCompletion) => {
  const totalSteps = Object.keys(stepCompletion).length;
  const completedSteps = Object.values(stepCompletion).filter(Boolean).length;
  return Math.round((completedSteps / totalSteps) * 100);
};

const autoSaveData = async () => {
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
    message.error('Error auto-saving data:');
  }
};

const resetToApiData = async () => {
  try {
    setIsLoading(true);

    // Clear localStorage
    localStorage.removeItem(`leadGeneration_${memberId}`);

    // Reload from API
    const existingMemberData = await getMemberDetails(memberId);

    if (existingMemberData) {
      const mappedData = mapExistingMemberDataToForm(existingMemberData);
      setFormData(mappedData);

      const completion = calculateStepCompletion(mappedData);
      setStepCompletion(completion);

      setHasUnsavedChanges(false);
      message.success('Form reset to saved data');
    }
  } catch (error) {
    message.error('Failed to reset form data');
  } finally {
    setIsLoading(false);
  }
};

export {
  mapExistingMemberDataToForm,
  calculateStepCompletion,
  loadExistingData,
  mergeFormData,
  hasExistingSetup,
  getSetupCompletionPercentage,
  autoSaveData,
  resetToApiData,
};
