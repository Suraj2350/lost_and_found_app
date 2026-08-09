import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#EDE6D6',
        ink: '#232620',
        teal: '#2F6F62',
        brick: '#C1443C',
        brass: '#B8A369',
        cream: '#F7F3E8',
      },
      fontFamily: {
        display: ['var(--font-slab)', 'serif'],
        body: ['var(--font-sans)', 'sans-serif'],
        tag: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        kraft: "radial-gradient(circle at 1px 1px, rgba(35,38,32,0.06) 1px, transparent 0)",
      },
      backgroundSize: {
        kraft: '18px 18px',
      },
    },
  },
  plugins: [],
};

export default config;