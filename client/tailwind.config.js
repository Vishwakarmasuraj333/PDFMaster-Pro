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
          DEFAULT: '#F4C430', // Premium Yellow
          hover: '#E0B228',
          light: '#FEF3C7',
          dark: '#B78A00',
        },
        secondary: {
          DEFAULT: '#1E2022', // Dark Charcoal
          hover: '#121212',
          light: '#2D3136',
        },
        accent: {
          DEFAULT: '#F59E0B', // Warm Amber glow
        },
        brandYellow: '#F4C430',
        darkCharcoal: '#12161A',
        darkBg: '#12161A', // Dark Charcoal
        lightBg: '#F8F9FA', // Very Light Gray
        darkCard: 'rgba(26, 31, 38, 0.85)',
        lightCard: 'rgba(255, 255, 255, 0.9)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #F4C430 0%, #F59E0B 50%, #D97706 100%)',
        'yellow-gradient': 'linear-gradient(135deg, #F4C430 0%, #E5A900 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(244, 196, 48, 0.15)',
        'premium': '0 20px 40px -15px rgba(244, 196, 48, 0.25)',
      },
    },
  },
  plugins: [],
};
