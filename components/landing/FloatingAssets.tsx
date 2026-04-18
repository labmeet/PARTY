"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const hearts = [
  { top: "25%", left: "92%", size: 130, rotate: -6,  opacity: 0.12 },
  { top: "35%", left: "-2%", size: 120, rotate: 20,  opacity: 0.11 },
  { top: "55%", left: "78%", size: 150, rotate: -14, opacity: 0.22 },
  { top: "62%", left: "8%",  size: 115, rotate: 8,   opacity: 0.18 },
  { top: "80%", left: "60%", size: 130, rotate: -20, opacity: 0.20 },
  { top: "85%", left: "1%",  size: 110, rotate: 16,  opacity: 0.18 },
];

export function FloatingAssets() {
  const { scrollYProgress } = useScroll();
  // Beaker: hidden until ~88% scroll, fully visible at end
  const beakerOpacity = useTransform(scrollYProgress, [0.82, 0.95, 1], [0, 0.85, 1]);
  const beakerY = useTransform(scrollYProgress, [0.82, 1], [80, 0]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: h.top,
            left: h.left,
            opacity: h.opacity,
            transform: `rotate(${h.rotate}deg)`,
          }}
        >
          <Image
            src="/heart-transparent.png"
            alt=""
            width={h.size}
            height={h.size}
            style={{ width: h.size, height: "auto" }}
          />
        </div>
      ))}

      {/* Main beaker — bottom-right, only visible at end of scroll, sharp edges */}
      <motion.div
        className="absolute bottom-[-20px] right-[-20px] sm:bottom-[-40px] sm:right-[-30px]"
        style={{ opacity: beakerOpacity, y: beakerY }}
      >
        <Image
          src="/bicker-transparent.png"
          alt=""
          width={560}
          height={560}
          className="w-[300px] sm:w-[500px]"
          style={{
            height: "auto",
            filter:
              "drop-shadow(0 20px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 18px rgba(182,233,204,0.28)) saturate(1.1) contrast(1.05)",
          }}
        />
      </motion.div>
    </div>
  );
}
