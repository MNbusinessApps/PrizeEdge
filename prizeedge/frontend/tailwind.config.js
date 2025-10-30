/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'prizeedge': {
          'black': '#0a0a0a',
          'charcoal': '#1a1a1a',
          'dark-gray': '#2d2d2d',
          'gray': '#3a3a3a',
          'gold': '#d4af37',
          'blue': '#00ccff',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'prizeedge-gradient': 'linear-gradient(135deg, #d4af37 0%, #ffed4e 100%)',
      }
    },
  },
  plugins: [],
}