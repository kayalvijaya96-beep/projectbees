'use client';

import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#0A0F1D]">
      {/* Dynamic Deep Ambient Light Orbs */}
      <div
        className="absolute -top-[15%] left-[10%] w-[550px] h-[550px] rounded-full bg-[#173B67]/45 blur-[120px] animate-pulse-glow"
        style={{ animationDuration: '14s' }}
      />
      <div
        className="absolute top-[35%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#285A91]/35 blur-[140px] animate-pulse-glow"
        style={{ animationDuration: '18s', animationDelay: '2s' }}
      />
      <div
        className="absolute top-[70%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#F6C94B]/10 blur-[130px] animate-pulse-glow"
        style={{ animationDuration: '16s', animationDelay: '4s' }}
      />

      {/* Cybernetic Honeycomb Tech Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #F6C94B 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating Honeycomb Hexagonal Particles */}
      <svg
        className="absolute top-[18%] left-[8%] w-24 h-24 text-[#F6C94B]/20 animate-float-slow"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>

      <svg
        className="absolute top-[65%] right-[12%] w-32 h-32 text-[#285A91]/30 animate-float-reverse"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <svg
        className="absolute top-[85%] left-[45%] w-16 h-16 text-[#F6C94B]/15 animate-float-slow"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
