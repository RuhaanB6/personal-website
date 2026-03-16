"use client";

import { useEffect, useRef } from "react";

interface Particle {
  radius: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
}

export default function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotationAngle = 0;

    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Layer 1: Static Stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    // Layer 5: Orbiting Particles
    const particles: Particle[] = Array.from({ length: 60 }, () => {
      const radius = Math.random() * 200 + 100;
      return {
        radius,
        angle: Math.random() * Math.PI * 2,
        speed: (0.001 + Math.random() * 0.003) * (200 / radius), // Faster if closer
        size: Math.random() * 1.5 + 0.5,
        color: `rgba(255, 255, ${Math.floor(Math.random() * 155 + 100)}, ${Math.random() * 0.5 + 0.3})`,
      };
    });

    const draw = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Layer 1: Stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Layer 2: Gravitational Lensing (Concentric Ellipses)
      ctx.strokeStyle = "rgba(0, 255, 136, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY,
          150 + i * 40,
          100 + i * 20,
          (i * Math.PI) / 6,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      // Layer 3: Accretion Disk (40 rotating ellipses)
      rotationAngle += 0.001;
      for (let i = 0; i < 40; i++) {
        const ratio = i / 40;
        let color;
        if (ratio < 0.3) {
          color = `rgba(255, 140, 0, ${0.6 - ratio})`;
        } else if (ratio < 0.7) {
          color = `rgba(255, 200, 100, ${0.4})`;
        } else {
          color = `rgba(180, 220, 255, ${0.15})`;
        }

        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY,
          80 + i * 5,
          30 + i * 1.2,
          rotationAngle + (i * Math.PI) / 80,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      // Layer 5: Orbiting Particles
      particles.forEach((p) => {
        p.angle += p.speed;
        const x = centerX + Math.cos(p.angle) * p.radius * 1.5; // Slight perspective
        const y = centerY + Math.sin(p.angle) * p.radius * 0.5;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Layer 4: Singularity
      // Halo
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        120
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.9)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ background: "black" }}
    />
  );
}
