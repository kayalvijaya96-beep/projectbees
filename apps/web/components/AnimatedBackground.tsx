'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  sides: number;
  angle: number;
  va: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle colors representing ProjectBee: Honey Gold, Royal Navy, Electric Blue
    const colors = [
      'rgba(246, 201, 75, ', // #F6C94B Bee Yellow
      'rgba(40, 90, 145, ',  // #285A91 Secondary Blue
      'rgba(96, 165, 250, ', // Light Electric Blue
      'rgba(234, 179, 8, ',  // Amber Gold
    ];

    // Generate floating honeycomb hexagons & particles
    const particleCount = Math.min(38, Math.floor((width * height) / 28000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 18 + 8,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        sides: Math.random() > 0.4 ? 6 : 0, // 6 for Hexagons, 0 for glowing circular dust
        angle: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.008,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.35 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    // Function to draw regular polygons (Hexagons)
    const drawPolygon = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      sides: number,
      angle: number
    ) => {
      if (sides === 0) {
        c.beginPath();
        c.arc(x, y, radius * 0.4, 0, Math.PI * 2);
        c.fill();
        return;
      }

      c.beginPath();
      for (let i = 0; i < sides; i++) {
        const a = angle + (i * 2 * Math.PI) / sides;
        const px = x + radius * Math.cos(a);
        const py = y + radius * Math.sin(a);
        if (i === 0) {
          c.moveTo(px, py);
        } else {
          c.lineTo(px, py);
        }
      }
      c.closePath();
      c.stroke();
    };

    let step = 0;

    const render = () => {
      step += 0.01;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw connecting constellation lines between near hexagons
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.15;
            ctx.strokeStyle = `rgba(246, 201, 75, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.va;

        // Screen wrap
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        // Subtle alpha breathing
        const dynamicAlpha = p.alpha + Math.sin(step * p.pulseSpeed * 100) * 0.08;
        const currentAlpha = Math.max(0.08, Math.min(0.5, dynamicAlpha));

        ctx.strokeStyle = `${p.color}${currentAlpha})`;
        ctx.fillStyle = `${p.color}${currentAlpha * 0.4})`;
        ctx.lineWidth = 1.2;

        drawPolygon(ctx, p.x, p.y, p.radius, p.sides, p.angle);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#0A0F1D]">
      {/* Dynamic Deep Ambient Light Orbs with continuous gentle motion */}
      <div
        className="absolute -top-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-[#173B67]/40 blur-[130px] animate-pulse-glow"
        style={{ animationDuration: '12s' }}
      />
      <div
        className="absolute top-[35%] -right-[10%] w-[650px] h-[650px] rounded-full bg-[#285A91]/30 blur-[150px] animate-pulse-glow"
        style={{ animationDuration: '16s', animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-[-10%] left-[25%] w-[550px] h-[550px] rounded-full bg-[#F6C94B]/15 blur-[140px] animate-pulse-glow"
        style={{ animationDuration: '14s', animationDelay: '4s' }}
      />

      {/* Hexagonal Technical Grid Matrix */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #F6C94B 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Dynamic Live Canvas with animated interactive hexagon particles & constellation lines */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
