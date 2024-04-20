import './App.css';
import Header from './components/Hero/Navbar';
import HeroSection from './components/Hero/Hero';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import Testimonials from './components/Testimonials/Testimonials';
import FAQ from './components/FAQs/Faqs';
import Footer from './components/Footer/Footer';
import FooterCTA from './components/FooterCta/FooterCta';

const faqs = [
  {
    question: 'What is EngageGPT Extension?',
    answer:
      'EngageGPT Extension is a browser extension that enhances your LinkedIn experience by providing AI-powered tools for generating comments, posts, message replies, and more.',
  },
  {
    question: 'How does the EngageGPT Extension work?',
    answer:
      'The EngageGPT Extension utilizes advanced natural language processing (NLP) algorithms to analyze LinkedIn content and generate personalized responses, comments, and posts.',
  },
  {
    question: 'Is the EngageGPT Extension free to use?',
    answer:
      'Yes, the basic features of the EngageGPT Extension are available for free. However, there may be premium features or subscriptions available for additional functionalities.',
  },
  {
    question:
      'Can I customize the responses generated?',
    answer:
      'Yes, the EngageGPT Extension allows users to customize and fine-tune the generated responses according to their preferences and style.',
  },
  {
    question: 'Is the EngageGPT Extension safe to use?',
    answer: `The EngageGPT Extension prioritizes user privacy and security. All data processing is performed locally on the user's device, and no personal information is stored or shared.`,
  },
];

function App() {
  return (
    <div className='flex flex-col justify-center self-center gap-6'>
      <div className='flex-col justify-between gap-10 items-center flex bg-blue-50'>
        <header className='min-h-fit h-full rounded-es-xl'>
          <Header />
        </header>
        <HeroSection />
      </div>
      <Features />
      <Pricing />
      <Testimonials />
      <FooterCTA />
      <FAQ faqs={faqs} />
      <Footer />
    </div>
  );
}

export default App;
