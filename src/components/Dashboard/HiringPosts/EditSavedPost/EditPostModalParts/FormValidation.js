// Form validation utility
export const validateEditPostForm = (postData) => {
  const errors = {};

  // Basic Information Validation
  if (!postData.title?.trim()) {
    errors.title = 'Post title is required';
  } else if (postData.title.trim().length < 5) {
    errors.title = 'Post title must be at least 5 characters long';
  } else if (postData.title.trim().length > 200) {
    errors.title = 'Post title cannot exceed 200 characters';
  }

  if (!postData.author?.trim()) {
    errors.author = 'Author name is required';
  } else if (postData.author.trim().length < 2) {
    errors.author = 'Author name must be at least 2 characters long';
  }

  if (!postData.content?.trim()) {
    errors.content = 'Post content is required';
  } else if (postData.content.trim().length < 10) {
    errors.content = 'Post content must be at least 10 characters long';
  } else if (postData.content.trim().length > 5000) {
    errors.content = 'Post content cannot exceed 5000 characters';
  }

  // Author URL validation (if provided)
  if (postData.authorUrl?.trim()) {
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(postData.authorUrl.trim())) {
      errors.authorUrl = 'Please enter a valid URL';
    }
  }

  // Contact Information Validation
  if (!postData.emailAddresses || postData.emailAddresses.length === 0) {
    errors.emailAddresses =
      'At least one email address is required for outreach';
  } else {
    // Validate each email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = postData.emailAddresses.filter(
      (email) => !emailPattern.test(email),
    );
    if (invalidEmails.length > 0) {
      errors.emailAddresses = `Invalid email format: ${invalidEmails.join(
        ', ',
      )}`;
    }
  }

  // Validate form links (if provided)
  if (postData.formLinks && postData.formLinks.length > 0) {
    const urlPattern = /^https?:\/\/.+/;
    const invalidLinks = postData.formLinks.filter(
      (link) => !urlPattern.test(link),
    );
    if (invalidLinks.length > 0) {
      errors.formLinks =
        'All form links must be valid URLs starting with http:// or https://';
    }
  }

  // Status & Priority Validation
  const validStatuses = [
    'new',
    'contacted',
    'responded',
    'qualified',
    'converted',
    'closed',
    'rejected',
  ];
  if (!postData.leadStatus || !validStatuses.includes(postData.leadStatus)) {
    errors.leadStatus = 'Please select a valid lead status';
  }

  const validPriorities = ['low', 'medium', 'high', 'urgent'];
  if (
    !postData.leadPriority ||
    !validPriorities.includes(postData.leadPriority)
  ) {
    errors.leadPriority = 'Please select a valid priority level';
  }

  // Date Validation
  if (postData.lastContactedAt) {
    const lastContactDate = new Date(postData.lastContactedAt);
    const now = new Date();
    if (lastContactDate > now) {
      errors.lastContactedAt = 'Last contact date cannot be in the future';
    }
  }

  if (postData.followUpDate) {
    const followUpDate = new Date(postData.followUpDate);
    const now = new Date();
    if (followUpDate < now && !postData.lastContactedAt) {
      errors.followUpDate =
        'Follow-up date should be in the future or after last contact date';
    }
  }

  // Cross-field validations
  if (postData.lastContactedAt && postData.followUpDate) {
    const lastContact = new Date(postData.lastContactedAt);
    const followUp = new Date(postData.followUpDate);
    if (followUp <= lastContact) {
      errors.followUpDate = 'Follow-up date should be after last contact date';
    }
  }

  // Automation Validation
  if (
    postData.automationEnabled === 'full' ||
    postData.automationEnabled === 'semi'
  ) {
    if (!postData.emailTemplate?.trim() && postData.generateEmail) {
      errors.emailTemplate =
        'Email template is required when email generation is enabled';
    }

    if (
      !postData.linkedInTemplate?.trim() &&
      postData.generateLinkedInMessage
    ) {
      errors.linkedInTemplate =
        'LinkedIn template is required when LinkedIn message generation is enabled';
    }
  }

  // Numeric validations
  if (postData.followUpInterval !== undefined) {
    if (postData.followUpInterval < 1 || postData.followUpInterval > 365) {
      errors.followUpInterval =
        'Follow-up interval must be between 1 and 365 days';
    }
  }

  if (postData.maxFollowUps !== undefined) {
    if (postData.maxFollowUps < 0 || postData.maxFollowUps > 20) {
      errors.maxFollowUps = 'Maximum follow-ups must be between 0 and 20';
    }
  }

  if (postData.followUpCount !== undefined) {
    if (postData.followUpCount < 0) {
      errors.followUpCount = 'Follow-up count cannot be negative';
    }
    if (
      postData.maxFollowUps &&
      postData.followUpCount > postData.maxFollowUps
    ) {
      errors.followUpCount = 'Follow-up count cannot exceed maximum follow-ups';
    }
  }

  // Engagement metrics validation
  if (postData.likes !== undefined && postData.likes < 0) {
    errors.likes = 'Likes count cannot be negative';
  }

  if (postData.comments !== undefined && postData.comments < 0) {
    errors.comments = 'Comments count cannot be negative';
  }

  // Category validation
  const validCategories = [
    'general',
    'hiring',
    'project',
    'business',
    'partnership',
    'services',
  ];
  if (postData.category && !validCategories.includes(postData.category)) {
    errors.category = 'Please select a valid category';
  }

  // Tags validation
  if (postData.tags && postData.tags.length > 10) {
    errors.tags = 'Maximum 10 tags are allowed';
  }

  // Company size validation
  const validCompanySizes = [
    'startup',
    'small',
    'medium',
    'large',
    'enterprise',
  ];
  if (
    postData.companySize &&
    !validCompanySizes.includes(postData.companySize)
  ) {
    errors.companySize = 'Please select a valid company size';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Helper functions for real-time validation
export const validateField = (fieldName, value, postData = {}) => {
  switch (fieldName) {
    case 'title':
      if (!value?.trim()) return 'Post title is required';
      if (value.trim().length < 5)
        return 'Post title must be at least 5 characters long';
      if (value.trim().length > 200)
        return 'Post title cannot exceed 200 characters';
      return null;

    case 'author':
      if (!value?.trim()) return 'Author name is required';
      if (value.trim().length < 2)
        return 'Author name must be at least 2 characters long';
      return null;

    case 'content':
      if (!value?.trim()) return 'Post content is required';
      if (value.trim().length < 10)
        return 'Post content must be at least 10 characters long';
      if (value.trim().length > 5000)
        return 'Post content cannot exceed 5000 characters';
      return null;

    case 'authorUrl':
      if (value?.trim()) {
        const urlPattern =
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlPattern.test(value.trim())) return 'Please enter a valid URL';
      }
      return null;

    case 'emailAddresses':
      if (!value || value.length === 0)
        return 'At least one email address is required';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const invalidEmails = value.filter((email) => !emailPattern.test(email));
      if (invalidEmails.length > 0)
        return `Invalid email format: ${invalidEmails.join(', ')}`;
      return null;

    case 'leadStatus':
      const validStatuses = [
        'new',
        'contacted',
        'responded',
        'qualified',
        'converted',
        'closed',
        'rejected',
      ];
      if (!value || !validStatuses.includes(value))
        return 'Please select a valid lead status';
      return null;

    case 'leadPriority':
      const validPriorities = ['low', 'medium', 'high', 'urgent'];
      if (!value || !validPriorities.includes(value))
        return 'Please select a valid priority level';
      return null;

    case 'followUpInterval':
      if (value !== undefined && (value < 1 || value > 365)) {
        return 'Follow-up interval must be between 1 and 365 days';
      }
      return null;

    case 'maxFollowUps':
      if (value !== undefined && (value < 0 || value > 20)) {
        return 'Maximum follow-ups must be between 0 and 20';
      }
      return null;

    case 'followUpCount':
      if (value !== undefined && value < 0)
        return 'Follow-up count cannot be negative';
      if (postData.maxFollowUps && value > postData.maxFollowUps) {
        return 'Follow-up count cannot exceed maximum follow-ups';
      }
      return null;

    case 'likes':
      if (value !== undefined && value < 0)
        return 'Likes count cannot be negative';
      return null;

    case 'comments':
      if (value !== undefined && value < 0)
        return 'Comments count cannot be negative';
      return null;

    default:
      return null;
  }
};

// Group errors by form section for better UX
export const groupErrorsBySection = (errors) => {
  const sections = {
    basicInfo: [
      'title',
      'author',
      'content',
      'authorUrl',
      'industry',
      'companySize',
    ],
    contactInfo: ['emailAddresses', 'formLinks'],
    statusPriority: ['leadStatus', 'leadPriority'],
    dateManagement: ['lastContactedAt', 'followUpDate', 'nextAutomationDate'],
    automation: [
      'emailTemplate',
      'linkedInTemplate',
      'followUpInterval',
      'maxFollowUps',
      'followUpCount',
    ],
    organization: ['category', 'tags', 'budget'],
    templates: [
      'generatedSubject',
      'generatedEmailBody',
      'generatedLinkedInMessage',
    ],
  };

  const groupedErrors = {};

  Object.keys(sections).forEach((section) => {
    const sectionErrors = {};
    sections[section].forEach((field) => {
      if (errors[field]) {
        sectionErrors[field] = errors[field];
      }
    });
    if (Object.keys(sectionErrors).length > 0) {
      groupedErrors[section] = sectionErrors;
    }
  });

  return groupedErrors;
};

// Get validation summary for display
export const getValidationSummary = (errors) => {
  const errorCount = Object.keys(errors).length;
  if (errorCount === 0) {
    return { isValid: true, message: 'All fields are valid', type: 'success' };
  }

  return {
    isValid: false,
    message: `${errorCount} field${errorCount > 1 ? 's' : ''} need${
      errorCount === 1 ? 's' : ''
    } attention`,
    type: 'error',
    count: errorCount,
  };
};
