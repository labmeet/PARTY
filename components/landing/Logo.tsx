export function Logo({ size = 56 }: { size?: number }) {
  const width = Math.round((size * 56) / 80);
  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 56 80"
      fill="none"
      aria-hidden="true"
    >
      {/* Heart — mint */}
      <path
        d="M28 20 C28 14 22 10 18 10 C13 10 10 13 10 17 C10 24 28 36 28 36 C28 36 46 24 46 17 C46 13 43 10 38 10 C34 10 28 14 28 20 Z"
        fill="rgb(var(--primary))"
      />
      {/* Flask body — fg */}
      <path
        d="M20 40 L36 40 L36 48 L43 62 Q45 72 35 72 L21 72 Q11 72 13 62 L20 48 Z"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tick marks */}
      <path
        d="M32 58 L41 58 M34 64 L41 64"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
