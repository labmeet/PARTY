export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      {/* 하트 */}
      <path
        d="M40 22c0 0-2.5-4-7-4c-4 0-7 3-7 7c0 8 14 16 14 16s14-8 14-16c0-4-3-7-7-7c-4.5 0-7 4-7 4z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* 플라스크 목 */}
      <rect x="33" y="30" width="14" height="12" rx="1" fill="currentColor" opacity="0.85" />
      {/* 플라스크 몸통 */}
      <path
        d="M28 74h24c3 0 5-3 3.5-5.5L47 42H33L24.5 68.5C23 71 25 74 28 74z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* 플라스크 선 */}
      <line x1="30" y1="62" x2="50" y2="62" stroke="white" strokeWidth="2.5" opacity="0.4" />
      {/* 버블 */}
      <circle cx="36" cy="67" r="2.5" fill="white" opacity="0.35" />
      <circle cx="44" cy="70" r="1.8" fill="white" opacity="0.25" />
    </svg>
  );
}
