/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'spendly-gray': '#ebebeb',
        'spendly-yellow': '#fcca3e', 
        'spendly-black': '#000000',
      }
    },
  },
  plugins: [],
}

