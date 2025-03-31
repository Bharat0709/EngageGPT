import { FiUsers, FiCopy } from 'react-icons/fi';

export const OnboardingSteps = [
  {
    title: 'Add Profile',
    description:
      'Add Profile to start tracking analytics and scheduling posts.',
    icon: FiUsers,
    action: 'Add Profile',
  },
  {
    title:
      'Install Chrome Extension and Connect your profile using conection token',
    description:
      'Get the most out of EngageGPT by installing our Chrome extension.',
    icon: FiCopy,
    action: 'Install Extension',
    link: 'https://chromewebstore.google.com/detail/engagegpt-ai-for-linkedin/ldhdipkofibjleihomflebfklhadikio',
  },
  {
    title: 'Sync your LinkedIn Profile',
    description:
      'Sync your LinkedIn profile to get personalized recommendations and insights.',
    icon: FiUsers,
    action: 'Sync Profile',
    link: 'https://linkedin.com/feed',
  },
];
