import React from 'react';
import Navbar from '../components/Layout/Navbar';
import HeroSection from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import FAQ from '../components/Faqs';
import Footer from '../components/Footer';
import FooterCTA from '../components/FooterCta';

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
