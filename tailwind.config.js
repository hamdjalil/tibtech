/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./pages/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'deepmind-dark': '#0F1923',
        'deepmind-darker': '#090E14',
        'deepmind-blue': '#1A73E8',
        'deepmind-teal': '#00A3AD',
        'deepmind-purple': '#7B61FF',
        'deepmind-gray': {
          100: '#F8F9FA',
          200: '#E8EAED',
          300: '#DADCE0',
          400: '#BDC1C6',
          500: '#9AA0A6',
          600: '#80868B',
          700: '#5F6368'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        custom: ['Oxanium', 'monospace']
      },
      boxShadow: {
        'card': '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [],
};