export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B6E9CC" />
          <stop offset="1" stopColor="#7FD4A4" />
        </linearGradient>
      </defs>
      {/* Erlenmeyer flask silhouette */}
      <path
        d="M14 6h12v2h-1.4v7.2l6.8 14.1c1.4 2.9-0.7 6.3-3.9 6.3H12.5c-3.2 0-5.3-3.4-3.9-6.3l6.8-14.1V8H14V6z"
        stroke="url(#lm-grad)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M13 25.5h14"
        stroke="url(#lm-grad)"
        strokeWidth="1.2"
        opacity="0.5"
      />
      <circle cx="17" cy="29" r="1" fill="#B6E9CC" />
      <circle cx="22" cy="31" r="0.8" fill="#B6E9CC" opacity="0.7" />
      <circle cx="20" cy="27" r="0.6" fill="#B6E9CC" opacity="0.5" />
    </svg>
  );
}
