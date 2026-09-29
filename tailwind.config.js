/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          bg: '#F4F6F4',
          card: '#FFFFFF',
          dark: '#0B2519',
          panel: '#103021',
          border: '#D8E2DC',
          borderDark: '#1E3A2B',
          text: '#1E292B',
          textMuted: '#64748B',
          emerald: '#10B981',
          forest: '#123826',
          gold: '#D99B26',
          goldDark: '#B87E1D',
          lightBg: '#F8FAF8',
        },
        cyber: {
          dark: '#0B2519',
          panel: '#103021',
          border: '#1E3A2B',
          green: '#123826',
          greenDeep: '#071810',
          greenLight: '#1B5238',
          accentGreen: '#10B981',
          cyan: '#0D9488',
          cyanGlow: '#0D948822',
          gold: '#D99B26',
          goldDark: '#B87E1D',
          paper: '#F4F1EA',
          paperMuted: '#84A98C',
          textMuted: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        serif: ['Inter', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow-cyan': '0 4px 16px rgba(13, 148, 136, 0.15)',
        'glow-gold': '0 4px 16px rgba(217, 155, 38, 0.18)',
        'glow-green': '0 4px 16px rgba(16, 185, 129, 0.18)',
        'agri': '0 4px 20px -2px rgba(11, 37, 25, 0.08)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #0B2519 0%, #103021 50%, #071810 100%)',
        'paper-texture': 'radial-gradient(circle at 50% 50%, #F8FAF8 0%, #F4F6F4 100%)',
      }
    },
  },
  plugins: [],
}
