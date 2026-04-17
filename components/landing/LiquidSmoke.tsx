"use client";

import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Spec §A: activeCount(p) = floor(lerp(10, 180, smoothstep(0.0, 0.95, p)))
function activeCount(scrollProgress: number, scale: number): number {
  return Math.floor(lerp(10, 180, smoothstep(0.0, 0.95, scrollProgress)) * scale);
}

// Spec §B: S-curve X position
// x(normY, t) = W * (0.5 + 0.36 * sin(normY * 5.5 + t * 0.12))
function sCurveX(normY: number, W: number, t: number): number {
  return W * (0.5 + 0.36 * Math.sin(normY * 5.5 + t * 0.12));
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
  baseAlpha: number;
  buoyancy: number; // 0..1 random at spawn
  alive: boolean;
}

function spawnParticle(
  W: number,
  H: number,
  scrollProgress: number,
  t: number,
  noise2D: (x: number, y: number) => number,
  aged?: boolean
): Particle {
  const buoyancy = Math.random();

  // Spec §F: radius = 80 + buoyancy*140 + random*60
  const radius = 80 + buoyancy * 140 + Math.random() * 60;

  // Spec §E: maxAge 20–35s
  const maxAge = 20 + Math.random() * 15;

  // Spec §F: alpha 0.12–0.25
  // Smoke-light particles get higher alpha; ash-heavy slightly lower
  const baseAlpha = buoyancy > 0.65
    ? 0.16 + Math.random() * 0.09   // smoke: 0.16–0.25
    : 0.12 + Math.random() * 0.07;  // ash:   0.12–0.19

  // Spec §C: spawn near the active scroll head [0.45*H, 0.9*H] in viewport coords
  const spawnViewportY = H * (0.45 + Math.random() * 0.45);

  // Derive page-normalised Y for S-curve
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - H);
  const scrollY = scrollProgress * maxScroll;
  const pageY = scrollY + spawnViewportY;
  const normY = pageY / document.documentElement.scrollHeight;

  // Spec §C: spawn X = sCurveX(currentNormY) ± 60px noise drift
  const curveX = sCurveX(normY, W, t);
  const jitter = (Math.random() - 0.5) * 120; // ±60px

  // Spec §C: initial velocity — ash-like falling start
  const vy = 0.3 + Math.random() * 0.5;
  const vx = 0;

  return {
    x: curveX + jitter,
    y: spawnViewportY,
    vx,
    vy,
    age: aged ? Math.random() * maxAge * 0.5 : 0,
    maxAge,
    radius,
    baseAlpha,
    buoyancy,
    alive: true,
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
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Spec §G: mobile scale
    const isMobile = window.innerWidth < 768;
    const mobileScale = isMobile ? 0.6 : 1.0;

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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Scroll tracking ──────────────────────────────────────────────────────
    const onScroll = () => {
      const s = stateRef.current;
      const now = performance.now() / 1000;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollY = window.scrollY;

      s.scrollProgress = scrollY / maxScroll;

      const dt = Math.max(0.001, now - s.lastScrollTime);
      s.scrollVelocity = (scrollY - s.lastScrollY) / dt;
      s.lastScrollY = scrollY;
      s.lastScrollTime = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Draw one particle ────────────────────────────────────────────────────
    const drawParticle = (p: Particle) => {
      // Life fade: fade in over first 5% of life, hold, fade out over last 15%
      const lifeRatio = p.age / p.maxAge;
      const alphaFade =
        lifeRatio < 0.05
          ? lifeRatio / 0.05
          : lifeRatio > 0.85
          ? 1 - (lifeRatio - 0.85) / 0.15
          : 1;

      const alpha = p.baseAlpha * alphaFade;

      // Spec §G: skip below threshold
      if (alpha < 0.006) return;

      // Spec §G: skip if outside viewport bounds
      if (
        p.x < -100 || p.x > W + 100 ||
        p.y < -100 || p.y > H + 100
      ) return;

      // Spec §F: rgba(166, 216, 180, alpha) — brighter mint #A6D8B4
      const r = 166, g = 216, b = 180;

      // Spec §H: NO blend mode — source-over only, set once in loop
      // Spec §F: outer radial gradient
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(0.35, `rgba(${r},${g},${b},${alpha * 0.55})`);
      grad.addColorStop(0.7,  `rgba(${r},${g},${b},${alpha * 0.18})`);
      grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Spec §F: inner bright core for buoyant (smoke-light) particles
      if (p.buoyancy > 0.65) {
        const coreR = p.radius * 0.3;
        const coreAlpha = Math.min(1, alpha * 1.4);
        const coreGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, coreR);
        coreGrad.addColorStop(0, `rgba(${r},${g},${b},${coreAlpha})`);
        coreGrad.addColorStop(0.6, `rgba(${r},${g},${b},${coreAlpha * 0.4})`);
        coreGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, coreR, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // ── Animation loop ───────────────────────────────────────────────────────
    const tick = (timestamp: number) => {
      const s = stateRef.current;
      s.animFrame = requestAnimationFrame(tick);

      // Spec §G: pause when hidden
      if (document.hidden) return;

      const dt = Math.min(0.05, s.lastTime === 0 ? 0.016 : (timestamp - s.lastTime) / 1000);
      s.lastTime = timestamp;
      const t = timestamp / 1000;

      const sp = s.scrollProgress;

      // Spec §A: how many particles should be alive right now
      const budget = Math.floor(activeCount(sp, mobileScale));

      // Spec §D: scroll-end lift
      const nearEnd = smoothstep(0.90, 0.99, sp);

      const vel = s.scrollVelocity;

      // ── Update existing particles ──────────────────────────────────────────
      let aliveCount = 0;

      for (let i = 0; i < s.particles.length; i++) {
        const p = s.particles[i];
        if (!p.alive) continue;

        p.age += dt;

        // Death conditions
        const escaped =
          p.x < -(p.radius + 200) || p.x > W + p.radius + 200 ||
          p.y < -(p.radius + 200) || p.y > H + p.radius + 200;

        // Spec §E: near end, don't kill by maxAge — let them float up
        const ageKill = nearEnd > 0.5 ? false : p.age > p.maxAge;

        if (ageKill || escaped) {
          p.alive = false;
          continue;
        }

        // Spec §A: cull particles over budget (don't update or draw)
        aliveCount++;
        if (aliveCount > budget) {
          // Over budget — mark oldest ones dead (simple: just stop drawing)
          // We'll skip physics for particles beyond budget index
          continue;
        }

        // ── Physics ──────────────────────────────────────────────────────────

        // Spec §D: noise curl (small amplitude 0.1)
        const noiseScale = 0.0018;
        const nx = s.noise2D(p.x * noiseScale, p.y * noiseScale + t * 0.05);
        const ny = s.noise2D(p.x * noiseScale + 47.3, p.y * noiseScale + t * 0.05 + 31.7);

        p.vx += Math.sin(nx * Math.PI * 2) * 0.1 * dt * 60;
        p.vy += Math.cos(ny * Math.PI * 2) * 0.1 * dt * 60;

        // Spec §D: two-component buoyancy
        if (p.buoyancy < 0.35) {
          // Ash-heavy: positive gravity (falls)
          p.vy += 0.06 * dt * 60;
          p.vx *= Math.pow(0.985, dt * 60);
          p.vy *= Math.pow(0.985, dt * 60);
        } else if (p.buoyancy > 0.65) {
          // Smoke-light: negative buoyancy (rises)
          p.vy -= 0.04 * dt * 60;
          p.vx *= Math.pow(0.988, dt * 60);
          p.vy *= Math.pow(0.988, dt * 60);
        } else {
          // Neutral float — gentle noise-driven drift only
          p.vx *= Math.pow(0.990, dt * 60);
          p.vy *= Math.pow(0.990, dt * 60);
        }

        // Spec §D: scroll wind
        if (vel > 20) {
          // Scrolling down — smoke falls behind user
          p.vy += 0.04 * dt * 60;
        } else if (vel < -20) {
          // Scrolling up
          p.vy -= 0.02 * dt * 60;
        }

        // Spec §D: near-end sustained gentle lift
        if (nearEnd > 0) {
          p.vy -= 0.18 * nearEnd * dt * 60;
        }

        // Velocity clamp
        p.vx = Math.max(-2.5, Math.min(2.5, p.vx));
        p.vy = Math.max(-5.0, Math.min(3.0, p.vy));

        p.x += p.vx;
        p.y += p.vy;
      }

      // ── Spawn new particles up to budget ────────────────────────────────────
      const currentAlive = s.particles.filter(p => p.alive).length;
      const toSpawn = Math.min(4, Math.max(0, budget - currentAlive));

      for (let i = 0; i < toSpawn; i++) {
        // Find a dead slot to reuse, or push new
        const deadIdx = s.particles.findIndex(p => !p.alive);
        const fresh = spawnParticle(W, H, sp, t, s.noise2D, false);
        if (deadIdx >= 0) {
          s.particles[deadIdx] = fresh;
        } else {
          s.particles.push(fresh);
        }
      }

      // ── Render ───────────────────────────────────────────────────────────────
      // Spec §F: clear each frame, no trail
      ctx.clearRect(0, 0, W, H);

      // Spec §H: no blend mode
      ctx.globalCompositeOperation = "source-over";

      // Draw alive particles within budget
      let drawn = 0;
      for (const p of s.particles) {
        if (!p.alive) continue;
        drawn++;
        if (drawn > budget) break;
        drawParticle(p);
      }
    };

    const state = stateRef.current;
    state.animFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.animFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Reduced-motion fallback: barely-visible static mint glow at bottom */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 50% 30% at 50% 100%, rgba(166,216,180,0.06) 0%, transparent 70%)",
        }}
      />
      {/* Spec §F: canvas z-index 0 — <main> at z-10 sits above, cards occlude smoke naturally */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 0 }}
      />
    </>
  );
}
