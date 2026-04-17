"use client";

import { useEffect, useRef, useCallback } from "react";
import { createNoise2D } from "simplex-noise";

// ─── Color palette ────────────────────────────────────────────────────────────
// Primary mint:  #78C8A0  rgb(120 200 160)
// Light wisp:    #B6E9CC  rgb(182 233 204)
// Dense core:    #4FA77A  rgb(79  167 122)

const MINT_CORE = [79, 167, 122] as const;
const MINT_MID = [120, 200, 160] as const;
const MINT_WISP = [182, 233, 204] as const;

// Pick a color band based on a 0..1 value
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

function pickColor(density: number): [number, number, number] {
  // density 0 = wisp, 1 = core
  if (density < 0.5) return lerpColor(MINT_WISP, MINT_MID, density * 2);
  return lerpColor(MINT_MID, MINT_CORE, (density - 0.5) * 2);
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

const PARTICLE_COUNT = 90;

function createParticle(W: number, H: number, spawnAtBottom = false): Particle {
  const density = Math.random();
  const maxAge = 6 + Math.random() * 8; // seconds
  const radius = 60 + density * 120 + Math.random() * 80;
  return {
    x: Math.random() * W,
    y: spawnAtBottom
      ? H * 0.4 + Math.random() * H * 0.6
      : H * (0.3 + Math.random() * 0.7),
    vx: (Math.random() - 0.5) * 0.4,
    vy: -(0.1 + Math.random() * 0.4), // gentle upward drift by default
    age: spawnAtBottom ? 0 : Math.random() * maxAge,
    maxAge,
    radius,
    baseOpacity: 0.04 + density * 0.08, // 0.04–0.12
    density,
  };
}

// ─── Smoothstep helper ────────────────────────────────────────────────────────
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
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
    impulseT: -999, // seconds since impulse was last triggered
    impulseActive: false,
    prevScrollProgress: 0,
    noise2D: createNoise2D(),
    animFrame: 0,
    lastTime: 0,
  });

  const init = useCallback((W: number, H: number) => {
    const s = stateRef.current;
    s.particles = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(W, H, true)
    );
  }, []);

  useEffect(() => {
    // ── Reduced-motion fallback: don't animate ─────────────────────────────
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

      // velocity in px/s
      const dt = Math.max(0.001, now - s.lastScrollTime);
      s.scrollVelocity = (scrollY - s.lastScrollY) / dt;
      s.lastScrollY = scrollY;
      s.lastScrollTime = now;

      // Detect bottom-slam: crossing 0.85 threshold going downward
      if (
        s.prevScrollProgress < 0.85 &&
        s.scrollProgress >= 0.85 &&
        !s.impulseActive
      ) {
        s.impulseT = now;
        s.impulseActive = true;
      }
      if (s.scrollProgress < 0.8) {
        s.impulseActive = false;
      }
      s.prevScrollProgress = s.scrollProgress;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Gravity function ───────────────────────────────────────────────────
    //  g(p, t) = 0.02 + k_down*p  -  k_up * smoothstep(0.85,1.0,p) * pulse
    //  For per-particle vy: positive g = downward, negative = upward.
    //  We SUBTRACT g from vy each frame scaled by dt so smoke moves up
    //  normally (vy is already negative = upward).
    //  The impulse is applied as a direct vy kick, not via the formula.

    const K_DOWN = 0.08;

    const gravityBase = (p: number): number => {
      // g(p) = 0.02 + k_down*p — smoothstep gates the bottom-slam region
      // At rest: ~0.02, at 85% scroll: ~0.088, blended smoothly past bottom
      return 0.02 + K_DOWN * p * (1 - smoothstep(0.85, 1.0, p) * 0.6);
    };

    // ── Draw one particle ──────────────────────────────────────────────────
    const drawParticle = (p: Particle) => {
      const lifeRatio = p.age / p.maxAge;
      // Fade in fast, fade out slowly
      const alphaFactor =
        lifeRatio < 0.15
          ? lifeRatio / 0.15
          : lifeRatio > 0.75
          ? 1 - (lifeRatio - 0.75) / 0.25
          : 1;

      const alpha = p.baseOpacity * alphaFactor;
      if (alpha < 0.005) return;

      const [r, g, b] = pickColor(p.density);

      const grad = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.radius
      );
      grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(0.35, `rgba(${r},${g},${b},${alpha * 0.55})`);
      grad.addColorStop(0.7, `rgba(${r},${g},${b},${alpha * 0.18})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // ── Animation loop ─────────────────────────────────────────────────────
    const tick = (timestamp: number) => {
      const s = stateRef.current;
      if (document.hidden) {
        s.animFrame = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(
        0.05,
        s.lastTime === 0 ? 0.016 : (timestamp - s.lastTime) / 1000
      );
      s.lastTime = timestamp;
      const t = timestamp / 1000;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Blend mode: screen simulates light-through-vapor
      ctx.globalCompositeOperation = "screen";

      const p = s.scrollProgress;
      const gBase = gravityBase(p);

      // Impulse pulse: decaying oscillation after slam trigger
      let impulse = 0;
      if (s.impulseActive && s.impulseT > 0) {
        const dt_imp = t - s.impulseT;
        if (dt_imp < 1.2) {
          // Decaying upward kick
          impulse =
            -12 *
            Math.exp(-4.5 * dt_imp) *
            Math.pow(1 - dt_imp / 1.2, 2);
        }
      }

      // Scroll-velocity wind: horizontal turbulence when scrolling fast
      const windX = Math.sign(s.scrollVelocity) *
        Math.min(Math.abs(s.scrollVelocity) * 0.0003, 0.6);

      for (const particle of s.particles) {
        particle.age += dt;

        // Respawn aged-out or escaped particles
        if (
          particle.age > particle.maxAge ||
          particle.y < -particle.radius * 2 ||
          particle.x < -particle.radius * 2 ||
          particle.x > W + particle.radius * 2
        ) {
          const fresh = createParticle(W, H, true);
          Object.assign(particle, fresh);
          continue;
        }

        // Noise-driven curl velocity
        const nx = s.noise2D(
          particle.x * 0.0025,
          particle.y * 0.0025 + t * 0.08
        );
        const ny = s.noise2D(
          particle.x * 0.0025 + 100,
          particle.y * 0.0025 + t * 0.08 + 50
        );

        particle.vx += Math.sin(nx * Math.PI) * 0.28 * dt;
        particle.vy += Math.cos(ny * Math.PI) * 0.18 * dt;

        // Horizontal wind from scroll
        particle.vx += windX * dt * 15;

        // Gravity: pushes vy positive (down), but natural drift is upward
        // Net: gravity term fights natural upward vy
        particle.vy += gBase * dt * 20;

        // Impulse kick (applied once per frame, already decaying)
        if (impulse !== 0) {
          particle.vy += impulse * dt * 18;
        }

        // Damping to prevent runaway
        particle.vx *= 0.985;
        particle.vy *= 0.988;

        // Clamp velocity
        particle.vx = Math.max(-1.5, Math.min(1.5, particle.vx));
        particle.vy = Math.max(-3.5, Math.min(2.0, particle.vy));

        particle.x += particle.vx;
        particle.y += particle.vy;

        drawParticle(particle);
      }

      s.animFrame = requestAnimationFrame(tick);
    };

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
      {/* Reduced-motion fallback: single static gradient */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[-1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(120,200,160,0.07) 0%, transparent 70%)",
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[-1]"
        style={{
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
