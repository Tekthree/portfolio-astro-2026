/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0C042C',
        'brand-navy': '#09003F',
        'brand-purple': '#420F6D',
        'brand-mid': '#6D62B4',
        'brand-lavender': '#C0B3CB',
        'brand-accent': '#DBDD3A',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
