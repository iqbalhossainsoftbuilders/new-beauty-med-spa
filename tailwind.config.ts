import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F6F1EA',
        champagne: '#E5D5C3',
        gold: '#B89B79',
        taupe: '#A99482',
        espresso: '#493A32',
        charcoal: '#201C19',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        manrope: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'wide-xl': '0.12em',
        'wide-2xl': '0.18em',
      },
      fontSize: {
        'display': ['clamp(3.5rem, 8vw, 7.5rem)', { lineHeight: '1' }],
        'hero': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.05' }],
        'editorial': ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.1' }],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite 1.5s',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'clip-reveal': 'clipReveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        clipReveal: {
          '0%': { clipPath: 'inset(100% 0 0 0)' },
          '100%': { clipPath: 'inset(0% 0 0 0)' },
        },
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'card': '0 2px 20px rgba(73, 58, 50, 0.08)',
        'card-hover': '0 8px 40px rgba(73, 58, 50, 0.16)',
        'glass': '0 4px 24px rgba(73, 58, 50, 0.1), inset 0 1px 0 rgba(255,255,255,0.4)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}

export default config
