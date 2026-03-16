"use client";

import { useEffect, useRef } from "react";

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
}

export default function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number = 0;
    let rotation = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random(),
      y: Math.random(),
      opacity: Math.random() * 0.7 + 0.1,
      size: Math.random() * 1.0 + 0.2,
    }));

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 100 + 80,
      speed: Math.random() * 0.004 + 0.002,
      size: Math.random() * 1.0 + 0.3,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      const TILT = 0.18;
      const diskAngleBase = 0.05;

      // 1. BACKGROUND
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.8);
      bgGrad.addColorStop(0, "#06060f");
      bgGrad.addColorStop(0.5, "#030308");
      bgGrad.addColorStop(1, "#000000");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. STARS
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // 3. OUTER GLOW
      const outerGlow = ctx.createRadialGradient(cx, cy, 80, cx, cy, 380);
      outerGlow.addColorStop(0, "rgba(255, 140, 30, 0.0)");
      outerGlow.addColorStop(0.35, "rgba(255, 100, 15, 0.08)");
      outerGlow.addColorStop(0.65, "rgba(180, 60, 0, 0.04)");
      outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 380, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // 4. BACK DISK
      for (let i = 55; i >= 0; i--) {
        const t = i / 55;
        const xr = 90 + t * 190;
        const yr = (16 + t * 48) * TILT + 8;

        let r: number, g: number, b: number, a: number;
        if (t > 0.65) {
          r = 160; g = 80; b = 20; a = t * 0.07;
        } else if (t > 0.3) {
          r = 255; g = 130; b = 25; a = 0.10 + (0.65 - t) * 0.22;
        } else {
          r = 255; g = 195; b = 100; a = 0.15 + (0.3 - t) * 0.35;
        }

        ctx.beginPath();
        ctx.ellipse(cx, cy, xr, yr, diskAngleBase, Math.PI, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
        ctx.lineWidth = t > 0.4 ? 1.2 : 2.5;
        ctx.stroke();
      }

      // 5. LENSING HUMP
      for (let i = 0; i < 14; i++) {
        const t = i / 14;
        const a = (1 - t) * 0.22;
        ctx.beginPath();
        ctx.ellipse(cx, cy - 58 - t * 10, 52 + t * 30, 12 + t * 8, 0, Math.PI * 1.08, Math.PI * 1.92);
        ctx.strokeStyle = `rgba(255, 180, 70, ${a})`;
        ctx.lineWidth = 2.5 - t * 1.5;
        ctx.stroke();
      }

      // Bright lensing highlight
      ctx.beginPath();
      ctx.ellipse(cx, cy - 62, 40, 7, 0, Math.PI * 1.15, Math.PI * 1.85);
      ctx.strokeStyle = "rgba(255, 230, 150, 0.65)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // 6. SINGULARITY SHADOW
      const shadowGrad = ctx.createRadialGradient(cx, cy, 48, cx, cy, 115);
      shadowGrad.addColorStop(0, "rgba(0,0,0,1)");
      shadowGrad.addColorStop(0.55, "rgba(0,0,0,1)");
      shadowGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 115, 0, Math.PI * 2);
      ctx.fillStyle = shadowGrad;
      ctx.fill();

      // 7. PHOTON RING
      const photonGrad = ctx.createRadialGradient(cx, cy, 60, cx, cy, 78);
      photonGrad.addColorStop(0, "rgba(0,0,0,0)");
      photonGrad.addColorStop(0.5, "rgba(255, 200, 80, 0.3)");
      photonGrad.addColorStop(0.8, "rgba(255, 240, 170, 0.75)");
      photonGrad.addColorStop(1, "rgba(255, 255, 220, 0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 78, 0, Math.PI * 2);
      ctx.fillStyle = photonGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 68, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 235, 150, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 8. PARTICLES — clipped to disk band
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, 290, 80, diskAngleBase, 0, Math.PI * 2);
      ctx.clip();

      particles.forEach((p) => {
        p.angle += p.speed * (1 + (180 - p.radius) / 180);
        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * (p.radius * 0.22);
        if (Math.sin(p.angle) > -0.2) {
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 120, ${p.opacity})`;
          ctx.fill();
        }
      });

      ctx.restore();

      // 9. FRONT DISK — drawn after shadow + photon ring
      for (let i = 55; i >= 0; i--) {
        const t = i / 55;
        const xr = 90 + t * 190;
        const yr = (16 + t * 48) * TILT + 8;

        let r: number, g: number, b: number, a: number;
        if (t > 0.65) {
          r = 160; g = 80; b = 20; a = t * 0.09;
        } else if (t > 0.3) {
          r = 255; g = 130; b = 25; a = 0.15 + (0.65 - t) * 0.28;
        } else {
          r = 255; g = 195; b = 100; a = 0.22 + (0.3 - t) * 0.45;
        }

        ctx.beginPath();
        ctx.ellipse(cx, cy, xr, yr, diskAngleBase, 0, Math.PI);
        ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
        ctx.lineWidth = t > 0.4 ? 1.2 : 3;
        ctx.stroke();
      }

      // 10. HARD BLACK CORE — top half only, so front disk shows through bottom
      ctx.beginPath();
      ctx.arc(cx, cy, 60, Math.PI, Math.PI * 2); // top semicircle only
      ctx.fillStyle = "#000000";
      ctx.fill();
      rotation += 0.0007;
      animationId = requestAnimationFrame(draw);

    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}