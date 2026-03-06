/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        surface: {
          0: '#0a0b0f',
          1: '#0f1117',
          2: '#141720',
          3: '#1c2030',
          4: '#242840',
        },
        accent: {
          DEFAULT: '#e8ff47',
          dim: '#c8df30',
          glow: 'rgba(232,255,71,0.15)',
        },
        severe: '#ff3b3b',
        danger: '#ff8c00',
        mild: '#22c55e',
        'very-fine': '#22c55e',
        border: 'rgba(255,255,255,0.07)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(ellipse at center, rgba(232,255,71,0.06) 0%, transparent 65%)',
      },
      backgroundSize: {
        'grid': '32px 32px',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'accent': '0 0 20px rgba(232,255,71,0.2)',
        'card': '0 1px 0 rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.03)',
        'severe': '0 0 12px rgba(255,59,59,0.25)',
        'mild': '0 0 12px rgba(34,197,94,0.2)',
      },
    },
  },
  plugins: [],
}
