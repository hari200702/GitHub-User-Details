/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        github: {
          dark: '#0d1117',
          gray: '#21262d',
          border: '#30363d',
          text: '#f0f6fc',
          muted: '#8b949e',
          accent: '#1f6feb',
          success: '#238636',
          danger: '#f85149',
        }
      }
    },
  },
  plugins: [],
}