import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './mojo-grille-demo/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'cream-bg': '#F6F1E8',
        'brand-fire': '#E52516',
        'charcoal-ink': '#141210',
        'surface-sand': '#ECE4D5',
        'mojo-citrus': '#FFA826',
        'leaf-green': '#2F6A4F',
        // Backward-compatible semantic aliases
        cream: '#F6F1E8',
        mojoRed: '#E52516',
        charcoal: '#141210',
        sand: '#ECE4D5',
        terracotta: {
          DEFAULT: '#E52516',
          hover: '#C71F12',
          light: '#FDE9E7',
        },
        limeGreen: '#2F6A4F',
        goldStar: '#FFA826',
        borderSubtle: '#ECE4D5',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bebas Neue', 'sans-serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        accent: ['var(--font-accent)', 'Instrument Serif', 'Playfair Display', 'serif'],
        serif: ['var(--font-accent)', 'Instrument Serif', 'Playfair Display', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(20, 18, 16, 0.04)',
        card: '0 4px 20px rgba(20, 18, 16, 0.06)',
        floating: '0 10px 30px rgba(229, 37, 22, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
