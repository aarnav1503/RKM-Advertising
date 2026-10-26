/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F8F6F0',
          tint: '#FAF7EE',
          soft: '#EFECE3',
          line: '#DDD6C8',
          'line-light': '#EBE5DA',
          'line-dark': '#342D29',
        },
        ink: {
          DEFAULT: '#221D1A',
          deep: '#171412',
          muted: '#5E554E',
          soft: '#857B74',
        },
        sage: {
          DEFAULT: '#CBD6CA',
          light: '#E7EFE6',
          dark: '#9CB09B',
        },
        brand: {
          DEFAULT: '#D95A2B',
          hover: '#BF471A',
          light: '#FDEEE9',
          amber: '#E8B931',
          gold: '#D4A017',
        },
        highlight: {
          bg: '#FEF3C7',
          border: '#F59E0B',
        }
      },
      fontFamily: {
        serif: ['Gelasio', 'Georgia', 'serif'],
        'news-serif': ['"Playfair Display"', 'Gelasio', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        head: ['Jost', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'press': '0 6px 18px rgba(34, 29, 26, 0.12)',
        'press-hover': '0 12px 28px rgba(34, 29, 26, 0.18)',
        'accent': '0 6px 20px rgba(217, 90, 43, 0.28)',
        'newsprint': '0 10px 40px -10px rgba(40, 35, 31, 0.15)',
      }
    },
  },
  plugins: [],
}
