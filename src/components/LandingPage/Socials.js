import React from 'react';
import { SiLinkedin, SiYoutube, SiGooglechrome } from 'react-icons/si';
import { useAnimate } from 'framer-motion';

export const Socials = () => {
  return (
    <div>
      <div className="mx-auto max-w-2xl">
        <SocialLinks />
      </div>
    </div>
  );
};

const SocialLinks = () => {
  return (
    <div className="divide-y ">
      <div className="grid rounded-lg w-fit gap-3 grid-cols-4">
        <LinkBox
          Icon={SiLinkedin}
          href="https://www.linkedin.com/company/engagegpt"
        />
        <LinkBox Icon={SiYoutube} href="https://www.youtube.com/@EngageGPT" />
        <LinkBox
          Icon={SiGooglechrome}
          href="https://chromewebstore.google.com/detail/engagegpt-ai-for-linkedin/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1"
        />
      </div>
    </div>
  );
};

const NO_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';
const BOTTOM_RIGHT_CLIP = 'polygon(0 0, 100% 0, 0 0, 0% 100%)';
const TOP_RIGHT_CLIP = 'polygon(0 0, 0 100%, 100% 100%, 0% 100%)';
const BOTTOM_LEFT_CLIP = 'polygon(100% 100%, 100% 0, 100% 100%, 0 100%)';
const TOP_LEFT_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 100% 0)';

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.target.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: 'left',
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: 'right',
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: 'top',
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: 'bottom',
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={(e) => {
        handleMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave(e);
      }}
      className="relative grid h-10 p-2 gap-3 bg-white text-sky-950 rounded-lg sm:h-10 md:h-10"
    >
      <Icon className="text-xl sm:text-2xl lg:text-2xl" />

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 rounded-lg grid place-content-center bg-sky-950 text-white"
      >
        <Icon className="text-xl sm:text-2xl md:text-2xl" />
      </div>
    </a>
  );
};
