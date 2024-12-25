import { MailIcon, GlobeIcon } from '@heroicons/react/outline';

export const footerSections = [
  {
    title: 'Contact Us',
    links: [
      { icon: MailIcon, label: 'engagegpt@gmail.com', href: 'mailto:engagegpt@gmail.com' },
      { icon: GlobeIcon, label: 'Our Website', href: 'https://www.engagegpt.in', target: '_blank', rel: 'noopener noreferrer' },
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
  {
    title: 'Connect with Us',
    links: [
      { label: 'Gmail', href: 'mailto:engagegpt@gmail.com' },
      { label: 'Chrome Web Store', href: 'https://chrome.google.com/webstore/category/extensions?hl=en-US', target: '_blank', rel: 'noopener noreferrer' },
    ],
  },
];