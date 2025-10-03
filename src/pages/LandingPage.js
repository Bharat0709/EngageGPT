import React from 'react';
import HeroSection from '@components/LandingPage/Hero';
import Features from '@components/LandingPage/Features';
import Pricing from '@components/LandingPage/Pricing';
import FAQ from '@components/LandingPage/Faqs';
import Footer from '@components/LandingPage/Footer';
import FloatingNav from '@components/Layout/Navbar';
import Testimonials from '@components/LandingPage/Testimonials';
import ContactSupport from '@components/LandingPage/Support';
import FooterCTA from '@components/LandingPage/FooterCta';

function LandingPage() {
  return (
    <>
      <div className="flex flex-col justify-center self-center">
        <HeroSection />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FooterCTA />
        <Footer />
      </div>
      <FloatingNav />
    </>
  );
}

export default LandingPage;
