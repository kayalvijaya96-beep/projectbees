import React from 'react';
import { cn } from '../utils';

interface ProjectBeeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const ProjectBeeLogo: React.FC<ProjectBeeLogoProps> = ({
  className,
  size = 'md',
  showTagline = false,
}) => {
  const sizeMap = {
    sm: { icon: 24, text: 'text-lg', tag: 'text-[9px]' },
    md: { icon: 32, text: 'text-xl font-bold', tag: 'text-[11px]' },
    lg: { icon: 44, text: 'text-2xl font-extrabold', tag: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={cn('inline-flex items-center gap-2 select-none', className)}>
      {/* Approved Geometric Bee & Honeycomb Emblem */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105"
        aria-label="ProjectBee Logo Emblem"
      >
        {/* Hexagonal Honeycomb Cell Background */}
        <polygon
          points="24,3 42,13.5 42,34.5 24,45 6,34.5 6,13.5"
          fill="#FFFBEB"
          stroke="#F6C94B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Bee Body: Bee Yellow Oval */}
        <ellipse cx="24" cy="25" rx="10" ry="13" fill="#F6C94B" />
        {/* Academic Bee Stripes: Deep Navy */}
        <path d="M15 22H33" stroke="#173B67" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 27H32" stroke="#173B67" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 32H30" stroke="#173B67" strokeWidth="2" strokeLinecap="round" />
        {/* Stinger */}
        <polygon points="24,39 21.5,35 26.5,35" fill="#173B67" />
        {/* Bee Translucent Wings */}
        <path
          d="M17 19C13 14 11 8 16 7C21 6 22 13 22 17"
          fill="#38BDF8"
          fillOpacity="0.35"
          stroke="#285A91"
          strokeWidth="1.5"
        />
        <path
          d="M31 19C35 14 37 8 32 7C27 6 26 13 26 17"
          fill="#38BDF8"
          fillOpacity="0.35"
          stroke="#285A91"
          strokeWidth="1.5"
        />
        {/* Cheerful Eyes */}
        <circle cx="21" cy="18" r="1.5" fill="#173B67" />
        <circle cx="27" cy="18" r="1.5" fill="#173B67" />
        {/* Educational Antennae with Spark Dots */}
        <path d="M21 14C20 11 18 10 16 11" stroke="#173B67" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="15.5" cy="11.5" r="1.5" fill="#F6C94B" />
        <path d="M27 14C28 11 30 10 32 11" stroke="#173B67" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="32.5" cy="11.5" r="1.5" fill="#F6C94B" />
      </svg>

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <span className={cn('tracking-tight font-heading text-white', currentSize.text)}>
          Project<span className="text-[#F6C94B]">Bee</span>
        </span>
        {showTagline && (
          <span className={cn('font-medium text-[#94A3B8] tracking-wider uppercase', currentSize.tag)}>
            CBSE & ICSE Projects
          </span>
        )}
      </div>
    </div>
  );
};
