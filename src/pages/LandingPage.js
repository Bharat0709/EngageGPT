import React from 'react';
import Navbar from '../components/Layout/Navbar';
import HeroSection from '../components/LandingPage/Hero';
import Features from '../components/LandingPage/Features';
import Pricing from '../components/LandingPage/Pricing';
import FAQ from '../components/LandingPage/Faqs';
import Footer from '../components/LandingPage/Footer';
import FooterCTA from '../components/LandingPage/FooterCta';

function LandingPage() {
  return (
    <div className="flex flex-col justify-center self-center gap-6">
      <div className="flex-col justify-between gap-10 items-center flex bg-white">
        <header className="h-full rounded-es-xl">
          <Navbar />
        </header>
        <HeroSection />
      </div>
      <Features />
      <Pricing />
      <FooterCTA />
      <FAQ />
      <Footer />
    </div>
  );
}

export default LandingPage;
