export const mapFormDataToMemberSchema = (formData, memberId) => {
  const mappedData = {
    // Step 1: Lead Saving Settings -> postSavingPreferences
    postSavingPreferences: {
      enabled: formData.leadSavingSettings.enabled,
      enableCustomKeywords: formData.leadSavingSettings.enableCustomKeywords,
      keywords: formData.leadSavingSettings.keywords || [],
      excludeKeywords: formData.leadSavingSettings.excludeKeywords || [],
      saveAllPosts: formData.leadSavingSettings.saveAllPosts,
      maxPostsPerDay: Math.min(
        Math.max(formData.leadSavingSettings.maxPostsPerDay, 1),
        1000,
      ), // Enforce schema limits
      minCharCount: formData.leadSavingSettings.minCharCount,
      postTypes: formData.leadSavingSettings.postTypes || ['all'],
      autoDetectEmailAddresses:
        formData.leadSavingSettings.autoDetectEmailAddresses,
      autoDetectFormLinks: formData.leadSavingSettings.autoDetectFormLinks,
      saveFrequency: formData.leadSavingSettings.saveFrequency,
      // Default values for fields not in form but required by schema
      autoTagPosts: false,
      customCategories: [],
    },

    // Step 2: Professional Profile -> summary.professionalProfile
    'summary.professionalProfile': {
      currentRole:
        formData.professionalProfile.currentRole?.substring(0, 100) || '', // Enforce maxlength
      profileDescription:
        formData.professionalProfile.profileDescription?.substring(0, 500) ||
        '', // Enforce maxlength
      experienceLevel: formData.professionalProfile.experienceLevel || 'entry',
      industry: formData.professionalProfile.industry?.substring(0, 100) || '', // Enforce maxlength
      functionalArea: (formData.professionalProfile.functionalArea || []).slice(
        0,
        10,
      ), // Enforce max 10 items
      companySize: formData.professionalProfile.companySize || 'small',
      location: {
        city:
          formData.professionalProfile.location?.city?.substring(0, 100) || '', // Enforce maxlength
        country:
          formData.professionalProfile.location?.country?.substring(0, 100) ||
          'India', // Enforce maxlength
        workMode: formData.professionalProfile.location?.workMode || 'hybrid',
      },
    },

    // Step 3: Lead Generation Goals -> leadGenerationGoals
    leadGenerationGoals: {
      primaryObjective:
        formData.leadGenerationGoals.primaryObjective || 'networking',
      targetAudience: {
        roles: (formData.leadGenerationGoals.targetAudience?.roles || []).slice(
          0,
          20,
        ), // Enforce max 20 items
        industries: (
          formData.leadGenerationGoals.targetAudience?.industries || []
        ).slice(0, 20), // Enforce max 20 items
        companySizes:
          formData.leadGenerationGoals.targetAudience?.companySizes || [],
        seniority: formData.leadGenerationGoals.targetAudience?.seniority || [],
      },
      serviceOfferings: (
        formData.leadGenerationGoals.serviceOfferings || []
      ).slice(0, 15), // Enforce max 15 items
      businessType: formData.leadGenerationGoals.businessType || 'b2b',

      // Step 5: Automation Settings -> leadGenerationGoals.automation
      automation: {
        isEnabled: formData.automationSettings.isEnabled || false,
        automationType: formData.automationSettings.automationType || 'none',
        executionMode: formData.automationSettings.executionMode || 'manual',
        schedule: {
          frequency: formData.automationSettings.frequency || 'weekly',
          timeOfDay: formData.automationSettings.timeOfDay || '09:00',
          daysOfWeek: formData.automationSettings.daysOfWeek || [
            'monday',
            'wednesday',
            'friday',
          ],
          timezone: formData.automationSettings.timezone || 'UTC',
          customCronExpression: null, // Not provided in form
        },
      },
    },

    // Step 4: Custom Requirements (Note: This doesn't map to existing schema)
    // You might need to add this field to your schema or handle it separately
    customRequirements: formData.customRequirements || {},

    // Update timestamps
    lastActive: new Date(),
  };

  return mappedData;
};
