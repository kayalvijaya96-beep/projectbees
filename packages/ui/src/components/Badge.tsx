import React from 'react';
import { cn } from '../utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'board' | 'class' | 'success' | 'warning' | 'danger' | 'outline' | 'yellow' | 'navy';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-[#F5F8FC] text-[#263447] border border-[#E2E8F0]',
    board: 'bg-[#FEF9C3] text-[#854D0E] font-semibold border border-[#FDE047]',
    class: 'bg-[#EFF6FF] text-[#1E40AF] font-medium border border-[#BFDBFE]',
    yellow: 'bg-[#FEF08A]/60 text-[#713F12] font-semibold border border-[#FACC15]',
    navy: 'bg-[#173B67] text-white font-medium',
    success: 'bg-[#ECFDF5] text-[#065F46] font-medium border border-[#A7F3D0]',
    warning: 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]',
    danger: 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]',
    outline: 'border border-[#CBD5E1] text-[#263447]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
