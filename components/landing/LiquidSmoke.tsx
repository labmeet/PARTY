"use client";

import { useEffect, useRef, useCallback } from "react";
import { createNoise2D } from "simplex-noise";

// ─── Color palette ────────────────────────────────────────────────────────────
// Dense core:    #4FA77A  rgb(79  167 122)
// Primary mint:  #78C8A0  rgb(120 200 160)
// Light wisp:    #B6E9CC  rgb(182 233 204)

const MINT_CORE = [79, 167, 122] as const;
const MINT_MID = [120, 200, 160] as const;
const MINT_WISP = [182, 233, 204] as const;

function lerpColor(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

// Spec §4: density > 0.35 → CORE, else MID. Remove most WISP.
function pickColor(density: number): [number, number, number] {
  if (density > 0.35) {
    return lerpColor(MINT_MID, MINT_CORE, (density - 0.35) / 0.65);
  }
  // Small wisp band only at very low density
  return lerpColor(MINT_WISP, MINT_MID, density / 0.35);
}

// ─── Smoothstep helper ────────────────────────────────────────────────────────
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// ─── Particle ─────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  radius: number;
  baseOpacity: number;
  density: number; // 0 wisp .. 1 core
}

// Spec §2: 220–280 particles, tune for perf.
// Mobile branch drops to 140 for performance.
function getParticleCount(): number {
  if (typeof window === "undefined") return 240;
  return window.innerWidth < 768 ? 140 : 240;
}

// Spec §1 + §2: spawn at the S-curve position for a given normalized y [0..1].
// totalPageH is document.documentElement.scrollHeight.
function sCurveX(normY: number, W: number, t: number): number {
  // x(y) = W * (0.5 + 0.32 * sin(y * PI * 2.2 + t * 0.15))
  return W * (0.5 + 0.32 * Math.sin(normY * Math.PI * 2.2 + t * 0.15));
}

function createParticle(
  W: number,
  H: number,
  scrollProgress: number,
  totalPageH: number,
  t: number,
  aged?: boolean
): Particle {
  const density = 0.2 + Math.random() * 0.8; // bias away from pure wisp

  // Spec §2: longer lives — 15–30s
  const maxAge = 15 + Math.random() * 15;

  const radius = 70 + density * 130 + Math.random() * 90;

  // Spawn near the active scroll head with some spread
  const spawnProgress = Math.max(
    0,
    Math.min(1, scrollProgress + (Math.random() - 0.5) * 0.25)
  );

  const spawnY = spawnProgress * totalPageH;
  // Map to viewport coordinates: spawnY - scrollY
  const scrollY = scrollProgress * Math.max(0, totalPageH - H);
  const viewportY = spawnY - scrollY;

  // Clamp inside or near viewport
  const clampedViewportY = Math.max(-radius, Math.min(H + radius, viewportY));

  const normY = spawnY / totalPageH;
  const curveX = sCurveX(normY, W, t);
  // Jitter ±15% of viewport width so wisps spread into gutters
  const jitterX = (Math.random() - 0.5) * W * 0.3;

  return {
    x: curveX + jitterX,
    y: clampedViewportY,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.3, // no initial direction bias
    age: aged ? Math.random() * maxAge * 0.6 : 0,
    maxAge,
    radius,
    // Spec §4: base opacity 0.07–0.18
    baseOpacity: 0.07 + density * 0.11,
    density,
  };
}

// ─── Main component ───────────────────────────────────────────────────────────
export function LiquidSmoke() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    particles: [] as Particle[],
    scrollProgress: 0,
    scrollVelocity: 0,
    lastScrollY: 0,
    lastScrollTime: 0,
    noise2D: createNoise2D(),
    animFrame: 0,
    lastTime: 0,
    totalPageH: 1,
    PARTICLE_COUNT: 240,
  });

  const init = useCallback((W: number, H: number) => {
    const s = stateRef.current;
    s.PARTICLE_COUNT = getParticleCount();
    s.totalPageH = document.documentElement.scrollHeight;
    // Seed particles distributed across the full page, pre-aged
    s.particles = Array.from({ length: s.PARTICLE_COUNT }, (_, i) => {
      const seedProgress = i / s.PARTICLE_COUNT;
      return createParticle(W, H, seedProgress, s.totalPageH, 0, true);
    });
  }, []);

  useEffect(() => {
    // ── Reduced-motion fallback ────────────────────────────────────────────
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);
      stateRef.current.totalPageH = document.documentElement.scrollHeight;
      if (stateRef.current.particles.length === 0) {
        init(W, H);
      }
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Scroll tracking ────────────────────────────────────────────────────
    const onScroll = () => {
      const s = stateRef.current;
      const now = performance.now() / 1000;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;

      s.scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
      s.totalPageH = document.documentElement.scrollHeight;

      const dt = Math.max(0.001, now - s.lastScrollTime);
      s.scrollVelocity = (scrollY - s.lastScrollY) / dt;
      s.lastScrollY = scrollY;
      s.lastScrollTime = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Draw one particle ──────────────────────────────────────────────────
    const drawParticle = (p: Particle) => {
      const lifeRatio = p.age / p.maxAge;
      // Fade in quickly, hold, then fade out over last 20%
      const alphaFactor =
        lifeRatio < 0.08
          ? lifeRatio / 0.08
          : lifeRatio > 0.8
          ? 1 - (lifeRatio - 0.8) / 0.2
          : 1;

      const alpha = p.baseOpacity * alphaFactor;
      if (alpha < 0.004) return;

      const [r, g, b] = pickColor(p.density);

      // Spec §4: inner hot-core ring for density > 0.7
      if (p.density > 0.7) {
        const innerR = p.radius * 0.35;
        const coreGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, innerR);
        const coreAlpha = Math.min(1, alpha * 1.2);
        coreGrad.addColorStop(0, `rgba(${r},${g},${b},${coreAlpha})`);
        coreGrad.addColorStop(0.5, `rgba(${r},${g},${b},${coreAlpha * 0.6})`);
        coreGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, innerR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Outer soft volume
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(0.3, `rgba(${r},${g},${b},${alpha * 0.65})`);
      grad.addColorStop(0.65, `rgba(${r},${g},${b},${alpha * 0.22})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // ── Animation loop ─────────────────────────────────────────────────────
    const tick = (timestamp: number) => {
      const s = stateRef.current;

      s.animFrame = requestAnimationFrame(tick);

      if (document.hidden) return;

      const dt = Math.min(
        0.05,
        s.lastTime === 0 ? 0.016 : (timestamp - s.lastTime) / 1000
      );
      s.lastTime = timestamp;
      const t = timestamp / 1000;

      // ── Gravity formula (spec §3) ────────────────────────────────────────
      // dirDown  = smoothstep(0, 0.05, scrollVelocity/500)
      // dirRest  = 1 - |scrollVelocity|/800
      // nearEnd  = smoothstep(0.88, 0.98, scrollProgress)
      //
      // g = 0.12 * dirDown + 0.02 * dirRest - 0.35 * nearEnd
      //
      // Positive g = downward (vy += g), negative = upward.

      const vel = s.scrollVelocity;
      const dirDown = smoothstep(0, 0.05, vel / 500);
      const dirRest = Math.max(0, 1 - Math.abs(vel) / 800);
      const nearEnd = smoothstep(0.88, 0.98, s.scrollProgress);

      const gravity = 0.12 * dirDown + 0.02 * dirRest - 0.35 * nearEnd;

      // Spec §7: horizontal wind — reduced coefficient since downward gravity dominates
      const windX =
        Math.sign(vel) * Math.min(Math.abs(vel) * 0.00015, 0.35);

      // Clear canvas
      ctx.clearRect(0, 0, W, H);

      // Spec §5: no blend mode — direct alpha fill over black bg
      ctx.globalCompositeOperation = "source-over";

      for (const particle of s.particles) {
        particle.age += dt;

        // Spec §2: respawn logic — particles live longer. Respawn when aged out
        // or escaped far off-screen. Do NOT respawn at bottom; spawn at current
        // scroll head.
        const escaped =
          particle.y < -particle.radius * 3 ||
          particle.y > H + particle.radius * 3 ||
          particle.x < -particle.radius * 2 ||
          particle.x > W + particle.radius * 2;

        if (particle.age > particle.maxAge || escaped) {
          const fresh = createParticle(
            W,
            H,
            s.scrollProgress,
            s.totalPageH,
            t,
            false
          );
          Object.assign(particle, fresh);
          continue;
        }

        // Noise-driven curl distortion (spec §7: keep simplex curl)
        const nx = s.noise2D(
          particle.x * 0.002,
          particle.y * 0.002 + t * 0.06
        );
        const ny = s.noise2D(
          particle.x * 0.002 + 100,
          particle.y * 0.002 + t * 0.06 + 50
        );

        particle.vx += Math.sin(nx * Math.PI) * 0.22 * dt;
        particle.vy += Math.cos(ny * Math.PI) * 0.14 * dt;

        // Horizontal wind (reduced)
        particle.vx += windX * dt * 10;

        // Spec §3: sustained gravity — positive = down, negative = up
        particle.vy += gravity * dt * 60;

        // Damping
        particle.vx *= 0.988;
        particle.vy *= 0.990;

        // Clamp velocity — allow more upward range when near bottom
        const maxUp = nearEnd > 0.5 ? -4.5 : -2.5;
        particle.vx = Math.max(-1.8, Math.min(1.8, particle.vx));
        particle.vy = Math.max(maxUp, Math.min(2.5, particle.vy));

        particle.x += particle.vx;
        particle.y += particle.vy;

        drawParticle(particle);
      }
    };

    // Initialise before first frame
    init(W, H);

    const state = stateRef.current;
    state.animFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.animFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [init]);

  return (
    <>
      {/* Reduced-motion fallback: static gradient, behind everything */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: -1,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 75%, rgba(79,167,122,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Spec §5: canvas at z-index -1, behind <main> at z-10. No blend mode. */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: -1 }}
      />
    </>
  );
}
