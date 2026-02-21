import { MailIcon, GlobeIcon } from '@heroicons/react/outline';

export const footerSections = [
  {
    title: 'Contact Us',
    links: [
      {
        icon: MailIcon,
        label: 'info@engagegpt.in',
        href: 'mailto:info@engagegpt.in',
      },
    ],
  },
  {
    title: 'Important Links',
    links: [
      { label: 'About Us', section: 'home' },
      { label: 'Features', section: 'features' },
      { label: 'Pricing', section: 'pricing' },
      { label: 'FAQs', section: 'faqs' },
      { label: 'Privacy Policy', section: 'privacy-policy' },
      { label: 'Terms of Service', section: 'terms-of-service' },
    ],
  },
];
