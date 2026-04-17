export function FaviconMark({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 80) / 56}
      viewBox="0 0 56 80"
      fill="none"
      aria-hidden="true"
    >
      {/* Heart — deep mint */}
      <path
        d="M28 20 C28 14 22 10 18 10 C13 10 10 13 10 17 C10 24 28 36 28 36 C28 36 46 24 46 17 C46 13 43 10 38 10 C34 10 28 14 28 20 Z"
        fill="rgb(var(--primary))"
      />
      {/* Flask body — white (visible on dark bg) */}
      <path
        d="M20 40 L36 40 L36 48 L43 62 Q45 72 35 72 L21 72 Q11 72 13 62 L20 48 Z"
        fill="#FFFFFF"
      />
      {/* Tick marks — dark cutouts */}
      <rect x="32" y="56" width="10" height="3.5" rx="1.2" fill="#0A0A0A" />
      <rect x="34" y="62.5" width="8" height="3.5" rx="1.2" fill="#0A0A0A" />
    </svg>
  );
}
