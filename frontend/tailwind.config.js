/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // App Core Colors (From Screenshots)
        'ide-bg': '#0d1117',       // Main dark background
        'ide-panel': '#161b22',    // Slightly lighter dark for cards/sidebars
        'ide-border': '#30363d',   // Border colors
        
        // Brand Accent
        'brand-green': '#00a65a',
        'brand-hover': '#008f4d',
      },
      fontFamily: {
        // 'Inter' ya koi bhi standard sans font general text ke liye
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Code editor panels ke liye monospace font
        mono: ['"Fira Code"', 'Consolas', 'Monaco', 'monospace'],
      }
    },
  },
  plugins: [],
}

