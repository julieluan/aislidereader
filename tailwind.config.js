/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ 这一行至关重要，必须完全一致
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}