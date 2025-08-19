/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      animation: {
        "spin-slow": "spin 30s linear infinite", // 20s per rotation
      },
    },
  },
  plugins: [],
};
