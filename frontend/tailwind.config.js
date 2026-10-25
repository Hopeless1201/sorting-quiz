/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        wizard: ['"Cinzel Decorative"', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'slide-x': 'slideX 3s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideX: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      dropShadow: {
        glow: '0 0 10px rgba(255,255,255,0.8)',
      },
    },
  },
  plugins: [],
};
