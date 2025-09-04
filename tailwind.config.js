/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/theme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/pagination.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}

