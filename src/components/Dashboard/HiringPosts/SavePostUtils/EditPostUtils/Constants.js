import moment from 'moment';

export const statusOptions = [
  { label: 'New', value: 'new', color: 'bg-blue-500' },
  { label: 'Contacted', value: 'contacted', color: 'bg-yellow-500' },
  { label: 'Responded', value: 'responded', color: 'bg-green-500' },
  { label: 'Qualified', value: 'qualified', color: 'bg-purple-500' },
  { label: 'Converted', value: 'converted', color: 'bg-indigo-500' },
  { label: 'Closed', value: 'closed', color: 'bg-gray-500' },
  { label: 'Rejected', value: 'rejected', color: 'bg-red-500' },
];

export const priorityOptions = [
  { label: 'Low', value: 'low', color: 'bg-green-500' },
  { label: 'Medium', value: 'medium', color: 'bg-yellow-500' },
  { label: 'High', value: 'high', color: 'bg-red-500' },
  { label: 'Urgent', value: 'urgent', color: 'bg-red-700' },
];

export const categoryOptions = [
  { label: 'General', value: 'general' },
  { label: 'Hiring', value: 'hiring' },
  { label: 'Project', value: 'project' },
  { label: 'Business', value: 'business' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Services', value: 'services' },
];

export const companySizeOptions = [
  { label: 'Startup', value: 'startup' },
  { label: 'Small (1-50)', value: 'small' },
  { label: 'Medium (51-200)', value: 'medium' },
  { label: 'Large (201-1000)', value: 'large' },
  { label: 'Enterprise (1000+)', value: 'enterprise' },
];

export const automationOptions = [
  { label: 'None', value: 'none' },
  { label: 'Semi-Automated', value: 'semi' },
  { label: 'Fully Automated', value: 'full' },
];

export const personalizationOptions = [
  { label: 'Basic', value: 'basic' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export const initialtState = {
  // Core content
  title: '',
  content: '',

  // Contact information
  emailAddresses: [],
  formLinks: [],

  // Author information
  author: '',
  authorUrl: '',

  // Engagement metrics
  likes: 0,
  comments: 0,

  // Lead generation specific fields
  leadStatus: 'new',
  leadPriority: 'medium',

  // Generated content for outreach
  generatedEmailBody: '',
  generatedSubject: '',
  generatedLinkedInMessage: '',

  // Automation settings
  automationEnabled: 'none',
  generateEmail: false,
  generateLinkedInMessage: false,
  autoFollowUp: false,
  followUpInterval: 7,
  maxFollowUps: 3,
  followUpCount: 0,

  // Organization fields
  category: 'general',
  tags: [],
  industry: '',
  companySize: '',
  budget: '',
  campaignId: '',

  // Timestamps
  lastContactedAt: null,
  followUpDate: null,
  nextAutomationDate: null,

  // Additional fields
  notes: '',
  isActive: true,

  // Templates
  emailTemplate: '',
  linkedInTemplate: '',
  personalizationLevel: 'medium',
};

export const setInitialPostData = (setPostData, post) => {
  setPostData({
    title: post.title || '',
    content: post.content || '',
    emailAddresses: post.emailAddresses || [],
    formLinks: post.formLinks || [],
    author: post.author || '',
    authorUrl: post.authorUrl || '',
    likes: post.likes || 0,
    comments: post.comments || 0,
    leadStatus: post.leadStatus || 'new',
    leadPriority: post.leadPriority || 'medium',
    generatedEmailBody: post.generatedEmailBody || '',
    generatedSubject: post.generatedSubject || '',
    generatedLinkedInMessage: post.generatedLinkedInMessage || '',
    automationEnabled: post.automationEnabled || 'none',
    generateEmail: post.generateEmail || false,
    generateLinkedInMessage: post.generateLinkedInMessage || false,
    autoFollowUp: post.autoFollowUp || false,
    followUpInterval: post.followUpInterval || 7,
    maxFollowUps: post.maxFollowUps || 3,
    followUpCount: post.followUpCount || 0,
    category: post.category || 'general',
    tags: post.tags || [],
    industry: post.industry || '',
    companySize: post.companySize || '',
    budget: post.budget || '',
    campaignId: post.campaignId || '',
    lastContactedAt: post.lastContactedAt ? moment(post.lastContactedAt) : null,
    followUpDate: post.followUpDate ? moment(post.followUpDate) : null,
    nextAutomationDate: post.nextAutomationDate
      ? moment(post.nextAutomationDate)
      : null,
    notes: post.notes || '',
    isActive: post.isActive !== undefined ? post.isActive : true,
    emailTemplate: post.emailTemplate || '',
    linkedInTemplate: post.linkedInTemplate || '',
    personalizationLevel: post.personalizationLevel || 'medium',
  });
};
