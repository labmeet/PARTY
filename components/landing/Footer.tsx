import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative min-h-[480px] overflow-hidden sm:min-h-[620px]">
      {/*
       * Z-STACK (bottom → top):
       *   0 — smoke animated webp (mix-blend-mode: screen, erases black bg)
       *   1 — beaker PNG centered, bottom-anchored, partially bleeding out of view
       *   1.5 — readability gradient scrim behind text
       *   2 — text content
       */}

      {/* ── Layer 0: Smoke ── */}
      {/*
       * TODO: for real 0.5× playback, swap <img> for
       * <video src="/smoke.webm" ref={v => { if (v) v.playbackRate = 0.5; }} autoPlay muted loop playsInline />
       * The animated WebP plays at its native fps; CSS cannot slow it down.
       */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/smoke_600x.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-full w-full object-cover object-bottom"
        style={{
          mixBlendMode: "screen",
          opacity: 0.55,
          filter: "blur(0.3px) saturate(1.05)",
        }}
      />

      {/* ── Layer 1: Beaker ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-[1] -translate-x-1/2 translate-y-[40%]"
      >
        <Image
          src="/bicker-transparent.png"
          alt=""
          width={560}
          height={560}
          className="w-[300px] sm:w-[560px]"
          style={{
            filter: "drop-shadow(0 40px 60px rgba(182,233,204,0.18))",
          }}
          aria-hidden
        />
      </div>

      {/* ── Layer 1.5: Readability scrim behind text ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-2/3 bg-gradient-to-b from-transparent via-black/40 to-transparent"
      />

      {/* ── Layer 2: Text content ── */}
      <div className="relative z-[2] flex flex-col items-center pt-16 text-center sm:pt-20">
        <p className="font-display text-sm tracking-[0.4em] text-fg-muted/80">
          LAB · MEET
        </p>
        <p className="mx-auto mt-4 max-w-xs px-4 text-[13px] leading-relaxed text-fg-muted sm:max-w-md sm:text-[14px]">
          LabMeet는 KAIST 구성원이 직접 만들었습니다.
          <br />
          만든 사람도 아직 싱글입니다.
        </p>
        <p className="mt-6 text-[11px] text-fg-subtle/70">
          © {new Date().getFullYear()} LabMeet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
