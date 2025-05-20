import {
  FaComments,
  FaBullhorn,
  FaChartBar,
  FaCheckCircle,
  FaLayerGroup,
  FaBookmark,
  FaEyeSlash,
  FaCalendarPlus,
} from 'react-icons/fa';

export const features = [
  {
    icon: <FaBullhorn className="w-6 h-6 text-blue-500" />,
    gradient: 'bg-gradient-to-r from-blue-200 to-cyan-200',
    title: 'Automated Posting',
    description:
      'Schedule and automate your LinkedIn posts for maximum visibility and consistency.',
    learnMoreText: 'Watch Video',
    link: 'https://www.youtube.com/watch?v=jpj5SYu28b0',
    tag: 'New',
    tagColor: 'bg-gradient-to-r from-blue-300 to-cyan-500',
  },
  {
    icon: <FaChartBar className="w-6 h-6 text-green-500" />,
    gradient: 'bg-gradient-to-r from-yellow-200 to-green-200',
    title: 'Analytics Dashboard',
    description:
      'Analyze the performance of your LinkedIn posts with our analytics dashboard.',
    learnMoreText: 'Watch Video',
    link: 'https://www.youtube.com/watch?v=jpj5SYu28b0',
    tag: 'New',
    tagColor: 'bg-gradient-to-r from-yellow-300 to-green-300',
  },
  {
    icon: <FaComments className="w-6 h-6 text-blue-500" />,
    gradient: 'bg-gradient-to-r from-blue-200 to-cyan-200',
    title: 'AI-Powered Comments',
    description:
      'Generate personalized, engaging comments for LinkedIn posts instantly using AI.',
    learnMoreText: 'Watch Video',
    link: 'https://www.youtube.com/watch?v=8K7xou2gUk4',
    tag: 'Most Used',
    tagColor: 'bg-gradient-to-r from-blue-300 to-cyan-400',
  },
  {
    icon: <FaCheckCircle className="w-6 h-6 text-green-500" />,
    gradient: 'bg-gradient-to-r from-yellow-200 to-green-200',
    title: 'Viral Post Generator',
    description:
      'Create AI-powered viral posts to increase your LinkedIn reach and engagement.',
    learnMoreText: 'Watch Video',
    link: 'https://www.youtube.com/watch?v=rw-QI7jKVh0',
    tag: 'Hot',
    tagColor: 'bg-gradient-to-r from-yellow-300 to-green-300',
  },
  {
    icon: <FaCheckCircle className="w-6 h-6 text-blue-500" />,
    gradient: 'bg-gradient-to-r from-blue-200 to-cyan-300',
    title: 'Track Days Active',
    description:
      'Track your active days on LinkedIn and optimize your engagement strategy.',
    learnMoreText: 'Watch Video',
    link: 'https://www.youtube.com/watch?v=Vja1vuFa1U4',
    tag: 'Most Used',
    tagColor: 'bg-gradient-to-r from-blue-400 to-cyan-400',
  },
  {
    icon: <FaLayerGroup className="w-6 h-6 text-green-500" />,
    gradient: 'bg-gradient-to-r from-yellow-200 to-green-200',
    title: 'Carousel Generator',
    description:
      'Easily create engaging LinkedIn carousels with AI-driven content suggestions.',
    learnMoreText: 'Coming Soon',
    link: 'https://www.youtube.com/playlist?list=PLYHoCaYE8EoD6YBlcDrPoHSYTIvAjW3vI',
    tag: 'Coming Soon',
    tagColor: 'bg-gradient-to-r from-yellow-300 to-green-300',
  },
  {
    icon: <FaBookmark className="w-6 h-6 text-blue-500" />,
    gradient: 'bg-gradient-to-r from-blue-200 to-cyan-200',
    title: 'Post Saving',
    description:
      'Save posts automatically based on custom keywords for easy reference and inspiration.',
    learnMoreText: 'Learn More',
    link: '/dashboard/saved-posts',
    tag: 'New',
    tagColor: 'bg-gradient-to-r from-blue-300 to-cyan-400',
  },
  {
    icon: <FaEyeSlash className="w-6 h-6 text-green-500" />,
    gradient: 'bg-gradient-to-r from-yellow-200 to-green-200',
    title: 'Hide Post',
    description:
      'Filter your feed by hiding posts containing specific keywords you want to avoid.',
    learnMoreText: 'Learn More',
    link: '/dashboard/saved-posts',
    tag: 'Popular',
    tagColor: 'bg-gradient-to-r from-yellow-300 to-green-300',
  },
  {
    icon: <FaCalendarPlus className="w-6 h-6 text-blue-500" />,
    gradient: 'bg-gradient-to-r from-blue-200 to-cyan-300',
    title: 'Content Calendar',
    description:
      'Manage your posts efficiently with an intuitive content calendar',
    learnMoreText: 'Learn More',
    link: '/dashboard/content-calendar',
    tag: 'Hot',
    tagColor: 'bg-gradient-to-r from-blue-400 to-cyan-400',
  },
];
