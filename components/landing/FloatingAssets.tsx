"use client";

import Image from "next/image";

const hearts = [
  { top: "4%",  left: "3%",  size: 100, rotate: -15, opacity: 0.20 },
  { top: "6%",  left: "80%", size: 80,  rotate: 12,  opacity: 0.16 },
  { top: "40%", left: "1%",  size: 90,  rotate: -8,  opacity: 0.18 },
  { top: "44%", left: "84%", size: 110, rotate: 18,  opacity: 0.20 },
  { top: "76%", left: "4%",  size: 85,  rotate: 10,  opacity: 0.16 },
  { top: "80%", left: "82%", size: 95,  rotate: -12, opacity: 0.18 },
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
    </div>
  );
}
