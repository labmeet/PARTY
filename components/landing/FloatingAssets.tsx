"use client";

import Image from "next/image";

const hearts = [
  { top: "6%",  left: "2%",  size: 120, rotate: -15, opacity: 0.30 },
  { top: "15%", right: "4%", size: 90,  rotate: 10,  opacity: 0.25 },
  { top: "40%", left: "5%",  size: 140, rotate: -8,  opacity: 0.22 },
  { top: "52%", right: "2%", size: 120, rotate: 18,  opacity: 0.28 },
  { top: "70%", left: "1%",  size: 80,  rotate: -20, opacity: 0.20 },
  { top: "75%", right: "6%", size: 100, rotate: 5,   opacity: 0.25 },
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
            left: "left" in h ? h.left : undefined,
            right: "right" in h ? (h as { right: string }).right : undefined,
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
