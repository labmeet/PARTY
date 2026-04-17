"use client";

import { useEffect, useMemo, useState } from "react";
import { Color } from "three";
import { SmokeScene } from "react-smoke";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Thin horizontal mint smoke band anchored to the bottom of the viewport,
 * with wisps rising in an S-curve from left-right turbulence.
 *
 *  • Density kept low so it reads as a pool, not a fog
 *  • Strong X-axis turbulence + steady upward wind = curly ascent
 *  • Vertical bounds tight near floor so particles don't fill the whole page
 *  • Scroll drives overall opacity only (no gravity flip — rise is constant)
 */
export function LiquidSmoke() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const smokeColor = useMemo(() => new Color("#B6E9CC"), []);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.8, 1],
    [0.28, 0.5, 0.78, 0.9]
  );

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 z-0"
    >
      <SmokeScene
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
        scene={{ background: null }}
        camera={{ fov: 60, position: [0, 0, 520], far: 6000 }}
        disableDefaultLights
        smoke={{
          color: smokeColor,
          density: 55,
          opacity: 0.32,
          enableRotation: true,
          rotation: [0, 0, 0.06],
          enableTurbulence: true,
          // Strong X sway → wisps meander sideways as they rise → S-curve ascent
          turbulenceStrength: [0.028, 0.003, 0],
          enableWind: true,
          windDirection: [0, 1, 0],
          windStrength: [0, 0.032, 0],
          maxVelocity: [22, 30, 0],
          velocityResetFactor: 5,
          // Wide horizontal spread, thin vertical band near bottom of scene
          // Scene origin is at center of viewport; Y negative = below center
          minBounds: [-1700, -700, -200],
          maxBounds: [1700, 350, 200],
          size: [3200, 1050, 400],
        }}
      >
        <ambientLight intensity={0.9} color="#EFFBF3" />
        <directionalLight
          intensity={0.5}
          position={[1, 1.2, 1]}
          color="#B6E9CC"
        />
      </SmokeScene>
    </motion.div>
  );
}
