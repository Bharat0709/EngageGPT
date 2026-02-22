import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const Pricing = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <TextParallaxContentExample />
    </>
  );
};

export default Pricing;

export const TextParallaxContentExample = () => {
  return (
    <div
      id="pricing"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='2' height='40' fill='rgba(0,0,0,0.05)'/%3E%3Crect y='0' x='0' width='40' height='2' fill='rgba(0,0,0,0.05)'/%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px',
      }}
      className="bg-white pt-8"
    >
      <div className="text-center mb-16 lg:mx-0 mx-6 ">
        <h2 className="lg:text-3xl geist  lg:mt-1 mt-6 text-xl font-bold text-center mb-8 border-4 border-black shadow-[5px_5px_0px_black] py-2 px-6 max-w-md mx-auto bg-white">
          Pricing
        </h2>
      </div>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Simple & Flexible"
        heading="Pay Only for What You Use"
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Get Started Free"
        heading="200 Credits on Sign Up"
      >
        <FreeCreditsContent />
      </TextParallaxContent>
      {/* <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Transparent"
        heading="Know What You're Paying For"
      >
        <CreditBreakdownContent />
      </TextParallaxContent> */}
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center geist text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl ovo-regular font-bold md:text-7xl">
        {heading}
      </p>
    </motion.div>
  );
};

const ExampleContent = () => (
  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1  ovo-regular text-3xl font-bold md:col-span-4">
      No Monthly Subscriptions
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 geist text-lg text-neutral-600 md:text-xl">
        We believe in transparency and flexibility. There are no monthly plans
        or recurring fees. Simply purchase credits when you need them and use
        them at your own pace.
      </p>
      <p className="mb-8 text-lg geist text-neutral-600 md:text-xl">
        Top up your credits anytime and pay only for what you actually use. It's
        that simple.
      </p>
      <a
        href="/signup"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 text-md geist font-medium bg-white text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] border border-black flex items-center"
      >
        Get Started <FiArrowUpRight className="inline" />
      </a>
    </div>
  </div>
);

const FreeCreditsContent = () => (
  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 ovo-regular text-3xl font-bold md:col-span-4">
      Start Creating Immediately
    </h2>
    <div className="col-span-1 geist md:col-span-8">
      <p className="mb-4 text-lg  geist text-neutral-600 md:text-xl">
        Every new user receives 200 free credits upon sign up. No credit card
        required. Start generating AI comments, viral posts, and automating your
        content right away.
      </p>
      <p className="mb-8 text-lg geist text-neutral-600 md:text-xl">
        When you need more, simply top up your account with additional credits
        that remain valid for 30 days after purchase.
      </p>
      <a
        href="/signup"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 text-md font-medium bg-white text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] border border-black flex items-center"
      >
        Sign Up Free <FiArrowUpRight className="inline" />
      </a>
    </div>
  </div>
);

const CreditBreakdownContent = () => (
  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      How Credits Work
    </h2>
    <div className="col-span-1 geist md:col-span-8">
      <p className="mb-4 text-lg  geist text-neutral-600 md:text-xl">
        Different features consume different amounts of credits. AI Comments
        cost 5 credits, Viral Posts cost 10 credits, and various automations
        have their own credit requirements.
      </p>
      <p className="mb-8 text-lg geist text-neutral-600 md:text-xl">
        All purchased credits expire 30 days after purchase, so you can use them
        worry-free within that timeframe. Need more? Just top up whenever you
        want.
      </p>
      <a
        href="/signup"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 text-sm font-medium bg-white text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] border border-black flex items-center"
      >
        View Full Breakdown <FiArrowUpRight className="inline" />
      </a>
    </div>
  </div>
);
