'use client';

export function SmokeVideo() {
  return (
    <div
      className="relative w-full h-[50vh] overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        ref={(el) => { if (el) el.playbackRate = 0.5; }}
        className="absolute bottom-0 left-0 w-full h-full object-cover"
      >
        <source src="/smoke.webm" type="video/webm" />
      </video>
    </div>
  );
}
