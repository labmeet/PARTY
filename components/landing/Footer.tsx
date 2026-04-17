'use client';

import { useEffect, useRef } from 'react';

export function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
  }, []);

  return (
    <footer className="container-page pt-12 pb-0 text-center">
      <div className="divider-fade mb-10" aria-hidden="true" />
      <p className="font-display text-sm tracking-[0.4em] text-fg-muted/80">
        LAB · MEET
      </p>
      <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-fg-muted">
        LabMeet는 KAIST 구성원이 직접 만들었습니다.
        <br />
        만든 사람도 아직 싱글입니다.
      </p>
      <p className="mt-6 text-[11px] text-fg-subtle/70">
        © {new Date().getFullYear()} LabMeet. All rights reserved.
      </p>

      <div className="mt-8 w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full object-cover"
          style={{ mixBlendMode: 'screen', display: 'block' }}
        >
          <source src="/smoke600x.webm" type="video/webm" />
        </video>
      </div>
    </footer>
  );
}
