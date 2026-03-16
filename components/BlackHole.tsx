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

    let animationId: number;
    let rotation = 0;

    // Resize canvas to match container
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Stars — generated once
    const stars = Array.from({ length: 250 }, () => ({
      x: Math.random(),
      y: Math.random(),
      opacity: Math.random() * 0.5 + 0.1,
      size: Math.random() * 1.2 + 0.3,
    }));

    // Orbiting particles
    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 200 + 90,
      speed: Math.random() * 0.003 + 0.001,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // Stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // Outer glow / gravitational lensing
      for (let i = 6; i > 0; i--) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, 340 + i * 18, 100 + i * 8, rotation * 0.1, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 136, ${0.015 * i})`;
        ctx.lineWidth = 8;
        ctx.stroke();
      }

      // Accretion disk — outer to inner
      const diskLayers = 55;
      for (let i = diskLayers; i >= 0; i--) {
        const t = i / diskLayers;
        const xRadius = 90 + t * 220;
        const yRadius = 18 + t * 65;
        const angle = rotation + t * 0.4;

        let color: string;
        if (t > 0.7) {
          // Outer — pale blue/white
          const a = ((t - 0.7) / 0.3) * 0.12;
          color = `rgba(180, 220, 255, ${a})`;
        } else if (t > 0.35) {
          // Mid — bright orange/yellow
          const a = 0.25 + (1 - Math.abs(t - 0.5) * 2) * 0.35;
          color = `rgba(255, 180, 60, ${a})`;
        } else {
          // Inner — hot white/orange
          const a = t * 0.7 + 0.15;
          color = `rgba(255, 230, 150, ${a})`;
        }

        ctx.beginPath();
        ctx.ellipse(cx, cy, xRadius, yRadius, angle, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = t > 0.5 ? 1.5 : 2.5;
        ctx.stroke();
      }

      // Orbiting particles
      particles.forEach((p) => {
        p.angle += p.speed * (1 + (300 - p.radius) / 300);
        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * (p.radius * 0.28);
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 180, ${p.opacity})`;
        ctx.fill();
      });

      // Singularity — hard black core
      const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 130);
      coreGradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      coreGradient.addColorStop(0.45, "rgba(0, 0, 0, 1)");
      coreGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 130, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      // Inner glow ring around singularity
      ctx.beginPath();
      ctx.ellipse(cx, cy, 95, 22, rotation, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 160, 40, 0.55)";
      ctx.lineWidth = 3;
      ctx.stroke();

      rotation += 0.001;
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