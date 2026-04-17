"use client";

import Image from "next/image";

const hearts = [
  { top: "3%",  left: "5%",  size: 160, rotate: -15, opacity: 0.28 },
  { top: "8%",  left: "38%", size: 110, rotate: 10,  opacity: 0.18 },
  { top: "5%",  left: "72%", size: 150, rotate: -5,  opacity: 0.25 },
  { top: "18%", left: "18%", size: 180, rotate: 12,  opacity: 0.22 },
  { top: "20%", left: "55%", size: 130, rotate: -18, opacity: 0.20 },
  { top: "15%", left: "85%", size: 110, rotate: 8,   opacity: 0.18 },
  { top: "35%", left: "8%",  size: 140, rotate: -10, opacity: 0.22 },
  { top: "38%", left: "30%", size: 100, rotate: 20,  opacity: 0.15 },
  { top: "33%", left: "62%", size: 160, rotate: -6,  opacity: 0.25 },
  { top: "30%", left: "88%", size: 120, rotate: 14,  opacity: 0.20 },
  { top: "52%", left: "3%",  size: 150, rotate: 18,  opacity: 0.22 },
  { top: "50%", left: "45%", size: 110, rotate: -12, opacity: 0.16 },
  { top: "55%", left: "75%", size: 155, rotate: 8,   opacity: 0.24 },
  { top: "68%", left: "15%", size: 120, rotate: -20, opacity: 0.20 },
  { top: "65%", left: "52%", size: 140, rotate: 15,  opacity: 0.18 },
  { top: "70%", left: "88%", size: 110, rotate: -8,  opacity: 0.20 },
  { top: "82%", left: "5%",  size: 130, rotate: 10,  opacity: 0.22 },
  { top: "85%", left: "35%", size: 160, rotate: -15, opacity: 0.25 },
  { top: "80%", left: "68%", size: 120, rotate: 6,   opacity: 0.18 },
  { top: "88%", left: "90%", size: 150, rotate: -10, opacity: 0.22 },
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
