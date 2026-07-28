/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED', // Violet-600
          hover: '#6D28D9',
          light: '#DDD6FE',
        },
        secondary: {
          DEFAULT: '#A855F7', // Purple-500
          hover: '#9333EA',
        },
        accent: {
          DEFAULT: '#C084FC', // Light purple glow
        },
        darkBg: '#0F172A', // Slate-900
        darkCard: 'rgba(30, 41, 59, 0.7)',
        lightCard: 'rgba(255, 255, 255, 0.8)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #C084FC 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(124, 58, 237, 0.15)',
        'premium': '0 20px 40px -15px rgba(124, 58, 237, 0.25)',
      },
    },
  },
  plugins: [],
};
