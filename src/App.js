import './App.css';
import Header from './components/Hero/Navbar';
import HeroSection from './components/Hero/Hero';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import Testimonials from './components/Testimonials/Testimonials';
import FAQ from './components/FAQs/Faqs';
import Footer from './components/Footer/Footer';

const faqs = [
  {
    question: 'What is Lorem Ipsum?',
    answer:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    question: 'Why do we use it?',
    answer:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    question: 'Where does it come from?',
    answer:
      'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
  {
    question: 'Where can I get some?',
    answer: 'There are many variations of passages of Lorem Ipsum available.',
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
      <FAQ faqs={faqs} />
      <Footer/>
    </div>
  );
}

export default App;
