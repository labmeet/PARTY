"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function FloatingAssets() {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0.2, 0.55, 1], [0, 0.6, 1]);
  const heartY = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const heartRotate = useTransform(scrollYProgress, [0, 1], [-6, -14]);
  const beakerY = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const beakerRotate = useTransform(scrollYProgress, [0, 1], [8, 22]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[55vh] overflow-visible"
    >
      {/* Heart — left */}
      <motion.div
        style={{
          opacity,
          y: heartY,
          rotate: heartRotate,
          mixBlendMode: "screen",
        }}
        className="absolute bottom-[-40px] left-[-30px] sm:bottom-[-60px] sm:left-[-10px]"
      >
        <Image
          src="/heart.png"
          alt=""
          width={320}
          height={320}
          priority={false}
          className="h-[180px] w-auto drop-shadow-[0_30px_40px_rgba(15,175,100,0.25)] sm:h-[280px]"
        />
      </motion.div>

      {/* Beaker — right */}
      <motion.div
        style={{
          opacity,
          y: beakerY,
          rotate: beakerRotate,
          mixBlendMode: "screen",
        }}
        className="absolute bottom-[-50px] right-[-40px] sm:bottom-[-70px] sm:right-[-20px]"
      >
        <Image
          src="/bicker.png"
          alt=""
          width={360}
          height={480}
          priority={false}
          className="h-[220px] w-auto drop-shadow-[0_30px_40px_rgba(15,175,100,0.22)] sm:h-[340px]"
        />
      </motion.div>
    </div>
  );
}
