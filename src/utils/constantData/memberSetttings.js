export const featureInfo = {
  postsaving: {
    title: 'Post Saving Settings',
    content: (
      <div>
        <p className="mb-3">
          Configure how and when posts are automatically saved to your content
          library. This feature helps you:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Set up automatic saving rules based on keywords</li>
          <li>
            Choose which types of posts to save (text, images, videos,
            documents)
          </li>
          <li>Organize saved content</li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          This helps you build a comprehensive content library without manual
          effort.
        </p>
      </div>
    ),
  },
  feedfilters: {
    title: 'Feed Filters',
    content: (
      <div>
        <p className="mb-3">
          Customize your LinkedIn feed to show only the most relevant content.
          Feed filters allow you to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Block content with specific keywords or from certain sources</li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          Focus on content that matters most to your professional goals.
        </p>
      </div>
    ),
  },
  summary: {
    title: 'Professional Summary',
    content: (
      <div>
        <p className="mb-3">Professional summary this feature helps you:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Generate compelling LinkedIn summaries based on your experience
          </li>
          <li>
            Optimize existing summaries for better visibility and engagement
          </li>
          <li>A/B test different summary versions to see what works best</li>
          <li>Get suggestions for industry-specific keywords and phrases</li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          Make a stronger first impression with a professionally crafted
          summary.
        </p>
      </div>
    ),
  },
  leadgeneration: {
    title: 'Lead Generation Goals',
    content: (
      <div>
        <p className="mb-3">
          Set up automated lead generation campaigns and track your progress.
          This feature enables you to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Define target customer profiles and ideal client characteristics
          </li>
          <li>
            Set up automated outreach sequences and follow-up messages (Coming
            Soon)
          </li>
          <li>Track conversion rates and campaign performance (Coming Soon)</li>
          <li>
            Integrate with CRM systems for seamless lead management (Coming
            Soon)
          </li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          Turn your LinkedIn presence into a powerful lead generation machine.
        </p>
      </div>
    ),
  },
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${day}${getOrdinal(day)} ${month}, ${year}`;
};

export const tabs = [
  { id: 'postsaving', label: 'Post Saving Settings' },
  { id: 'feedfilters', label: 'Feed Filters' },
  { id: 'summary', label: 'Professional Summary' },
  { id: 'leadgeneration', label: 'Lead Generation Goals' },
];
