"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollSmoke() {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [0, 0.35, 0.95, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.85, 1.08]);
  const blurAmount = useTransform(scrollYProgress, [0, 1], [6, 2]);
  const filter = useTransform(blurAmount, (v) => `blur(${v}px)`);

  return (
    <motion.div
      aria-hidden
      style={{ opacity, y: translateY, scaleX, filter }}
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-[1] h-[52vh] origin-bottom"
    >
      {/* Outer wide wash */}
      <svg
        className="absolute inset-x-0 bottom-0 h-full w-full"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="smokeWarp" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.028"
              numOctaves="2"
              seed="11"
            />
            <feDisplacementMap in="SourceGraphic" scale="14" />
          </filter>
          <radialGradient id="smokeGrad" cx="50%" cy="100%" r="80%">
            <stop offset="0%" stopColor="rgb(10, 139, 79)" stopOpacity="0.75" />
            <stop offset="45%" stopColor="rgb(20, 210, 120)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="rgb(20, 210, 120)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="smokeGradDeep" cx="50%" cy="100%" r="65%">
            <stop offset="0%" stopColor="rgb(8, 110, 62)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="rgb(10, 139, 79)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(10, 139, 79)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base wash — wide, soft, warped */}
        <g filter="url(#smokeWarp)">
          <ellipse cx="22" cy="60" rx="52" ry="26" fill="url(#smokeGrad)" />
          <ellipse cx="78" cy="58" rx="48" ry="22" fill="url(#smokeGrad)" />
          <ellipse cx="50" cy="62" rx="70" ry="28" fill="url(#smokeGradDeep)" />
        </g>
      </svg>

      {/* Curly tendrils — thin wispy paths */}
      <svg
        className="absolute inset-x-0 bottom-0 h-full w-full"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="tendrilWarp" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.025 0.045"
              numOctaves="3"
              seed="4"
            />
            <feDisplacementMap in="SourceGraphic" scale="7" />
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>
        <g
          filter="url(#tendrilWarp)"
          stroke="rgb(8, 110, 62)"
          fill="none"
          strokeLinecap="round"
          strokeOpacity="0.55"
        >
          <path d="M10 58 C 18 48 14 40 22 34 S 30 22 40 26" strokeWidth="1.8" />
          <path d="M32 60 C 38 50 34 42 44 38 S 52 28 60 34" strokeWidth="1.4" />
          <path d="M58 60 C 64 52 60 44 68 38 S 78 28 84 32" strokeWidth="1.6" />
          <path d="M80 60 C 86 52 82 44 88 40 S 96 32 98 36" strokeWidth="1.2" />
          <path d="M4 60 C 8 54 6 48 12 44 S 18 38 24 40" strokeWidth="1.2" />
        </g>
      </svg>
    </motion.div>
  );
}
