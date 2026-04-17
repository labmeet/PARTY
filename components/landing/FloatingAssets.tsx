"use client";

import Image from "next/image";

const hearts = [
  { top: "2%",  left: "6%",  size: 140, rotate: -18, opacity: 0.22 },
  { top: "10%", left: "70%", size: 110, rotate: 14,  opacity: 0.18 },
  { top: "25%", left: "85%", size: 130, rotate: -6,  opacity: 0.20 },
  { top: "35%", left: "2%",  size: 120, rotate: 20,  opacity: 0.18 },
  { top: "55%", left: "78%", size: 150, rotate: -14, opacity: 0.22 },
  { top: "62%", left: "8%",  size: 115, rotate: 8,   opacity: 0.18 },
  { top: "80%", left: "60%", size: 130, rotate: -20, opacity: 0.20 },
  { top: "85%", left: "1%",  size: 110, rotate: 16,  opacity: 0.18 },
];

export function FloatingAssets() {
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

      {/* Main beaker — bottom-right, large, tilted */}
      <div
        className="absolute bottom-[-60px] right-[-60px] sm:bottom-[-100px] sm:right-[-100px]"
        style={{ transform: "rotate(20deg)", opacity: 0.92 }}
      >
        <Image
          src="/bicker-transparent.png"
          alt=""
          width={520}
          height={520}
          className="w-[280px] sm:w-[460px] drop-shadow-[0_30px_50px_rgba(182,233,204,0.18)]"
          style={{ height: "auto" }}
        />
      </div>
    </div>
  );
}
