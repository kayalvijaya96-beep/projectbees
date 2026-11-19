import React from 'react';
import { cn } from '../utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'yellow' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C94B] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer';

    const variants = {
      primary: 'bg-[#F6C94B] text-[#173B67] hover:bg-[#E5B734] font-semibold shadow-sm hover:shadow',
      yellow: 'bg-[#F6C94B] text-[#173B67] hover:bg-[#E5B734] font-semibold shadow-sm hover:shadow',
      navy: 'bg-[#173B67] text-white hover:bg-[#285A91] shadow-sm hover:shadow',
      secondary: 'bg-[#173B67] text-white hover:bg-[#285A91] shadow-sm',
      outline: 'border border-[#CBD5E1] bg-white text-[#263447] hover:bg-[#F5F8FC] hover:border-[#173B67]/30',
      ghost: 'text-[#263447] hover:bg-[#F5F8FC] hover:text-[#173B67]',
      danger: 'bg-red-600 text-white hover:bg-red-500 shadow-sm',
    };

    const sizes = {
      sm: 'h-9 px-3.5 text-sm min-h-[36px]',
      md: 'h-11 px-5 text-sm sm:text-base min-h-[44px]', // Mobile-first 44px tap target
      lg: 'h-13 px-7 text-base sm:text-lg min-h-[50px]',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
