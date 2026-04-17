import type { Config } from "tailwindcss";

function rgbVar(name: string) {
  return `rgb(var(--${name}) / <alpha-value>)`;
}

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: rgbVar("bg-base"),
          card: rgbVar("bg-card"),
          elevated: rgbVar("bg-elevated"),
        },
        fg: {
          DEFAULT: rgbVar("text-primary"),
          muted: rgbVar("text-secondary"),
          subtle: rgbVar("text-tertiary"),
        },
        primary: {
          DEFAULT: rgbVar("primary"),
          deep: rgbVar("primary-deep"),
        },
        border: {
          DEFAULT: rgbVar("border"),
          strong: rgbVar("border-strong"),
        },
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "Pretendard", "system-ui", "sans-serif"],
        serif: ["var(--font-noto-serif)", "Noto Serif KR", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 6vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 4.5vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(182, 233, 204, 0.35)",
        "glow-strong": "0 0 60px -10px rgba(182, 233, 204, 0.55)",
        card: "0 1px 0 0 rgba(255, 255, 255, 0.04) inset, 0 20px 40px -20px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "mint-gradient": "linear-gradient(135deg, #B6E9CC 0%, #7FD4A4 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 1s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
