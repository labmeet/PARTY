'use client';

export function SmokeVideo() {
  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute bottom-0 left-0 w-full h-full object-cover"
        style={{ mixBlendMode: 'screen' }}
      >
        <source src="/smoke.webm" type="video/webm" />
      </video>
    </div>
  );
}
