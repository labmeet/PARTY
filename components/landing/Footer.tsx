import Link from "next/link";
import { FaviconMark } from "./FaviconMark";

const INSTAGRAM_URL = "https://www.instagram.com/labmeet.love/";
const CONTACT_EMAIL = "labmeetadmin@gmail.com";

export function Footer() {
  return (
    <footer className="relative min-h-[520px] overflow-hidden sm:min-h-[640px]">
      {/* ── Top-edge fade — masks the hard seam where smoke webp meets page bg ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-black via-black/70 to-transparent"
      />

      {/* ── Layer 0: Smoke webp, top-faded via CSS mask to eliminate hard seam ── */}
      {/*
       * TODO: for true 0.5× playback, swap <img> for
       * <video src="/smoke.webm" ref={v => { if (v) v.playbackRate = 0.5; }} autoPlay muted loop playsInline />
       * Animated WebP plays at its native fps; CSS cannot slow it down.
       */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/smoke_600x.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-full w-full object-cover object-bottom"
        style={{
          mixBlendMode: "screen",
          opacity: 0.6,
          filter: "blur(0.3px) saturate(1.05)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 20%, #000 55%, #000 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 20%, #000 55%, #000 100%)",
        }}
      />

      {/* ── Layer 2: Text content centered ── */}
      <div className="relative z-[2] flex flex-col items-center pt-20 text-center sm:pt-24">
        <p className="font-display text-[22px] font-extrabold tracking-[-0.02em] sm:text-[26px]">
          <span className="text-fg">Lab</span>
          <span className="text-primary">Meet</span>
        </p>
        <p className="mx-auto mt-4 max-w-xs px-4 text-[13px] leading-relaxed text-fg-muted sm:max-w-md sm:text-[14px]">
          LabMeet는 KAIST 구성원들이 직접 만든 네트워킹 파티입니다.
          <br />
          바쁜 연구와 반복되는 일상 속에서도, 좋은 사람을 자연스럽게 만날 기회는 필요하다고 믿었습니다.
        </p>

        {/* Links — centered on all widths */}
        <div className="mt-7 flex flex-col items-center gap-1.5 text-[12px] text-fg-muted">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            랩미 인스타그램 ↗
          </a>
          <Link href="/privacy" className="transition-colors hover:text-primary">
            개인정보처리방침
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-colors hover:text-primary"
          >
            Contact · {CONTACT_EMAIL}
          </a>
        </div>

        {/* Centered brand mark below the email */}
        <div className="mt-10 flex justify-center">
          <FaviconMark size={52} />
        </div>

        <p className="mt-6 text-[11px] text-fg-subtle/70">
          © {new Date().getFullYear()} LabMeet. All rights reserved.
        </p>
        <p className="mt-1.5 text-[11px] text-fg">
          Designed with <span className="text-primary">♥</span> by LabMeet Inc. in Daejeon
        </p>
      </div>
    </footer>
  );
}
