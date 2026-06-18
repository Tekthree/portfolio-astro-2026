/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'ashy': '#070419',
        'bg-blue': '#0c042c',
        'submt': '#420f6d',
        'yellow': '#dbdd3a',
        'plum': '#aa97bb',
        'font-plum': '#a58fb8',
        'midnight': '#09003f',
        'slate': '#6d62b4',
        'font-light': '#c0b3cb',
      },
      fontFamily: {
        mortend: ['Mortend', 'sans-serif'],
        'mortend-outline': ['Mortend Outline', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
