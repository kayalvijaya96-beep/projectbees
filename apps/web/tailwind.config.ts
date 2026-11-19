import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pb: {
          primary: '#173B67',    // Primary Navy Blue
          secondary: '#285A91',  // Secondary Blue
          yellow: '#F6C94B',     // Bee Yellow
          yellowDark: '#E5B734',
          bg: '#F5F8FC',         // Soft Background
          white: '#FFFFFF',
          text: '#263447',       // Main Text
          muted: '#68778A',      // Secondary Text
          border: '#E2E8F0',
          borderLight: '#EDF2F7',
          card: '#FFFFFF',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#F6C94B', // Aligned with Bee Yellow
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        brand: {
          navy: '#173B67',
          blue: '#285A91',
          honey: '#F6C94B',
          yellow: '#F6C94B',
          slate: '#F5F8FC',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(23, 59, 103, 0.06), 0 1px 4px -1px rgba(23, 59, 103, 0.04)',
        'card': '0 4px 20px -4px rgba(23, 59, 103, 0.08), 0 2px 6px -2px rgba(23, 59, 103, 0.04)',
        'card-hover': '0 12px 32px -6px rgba(23, 59, 103, 0.12), 0 4px 12px -2px rgba(23, 59, 103, 0.06)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;

