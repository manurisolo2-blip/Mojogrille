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
        cream: '#F6F2E9', // Fondo cálido análogo al #f5e3cd de Crav
        mojoRed: '#E6421E', // Acento saturado análogo al #f91814 de Crav
        charcoal: '#181514', // Tipografía principal profunda
        sand: '#EAE3D2', // Contenedores secundarios y badges
        terracotta: {
          DEFAULT: '#D95327',
          hover: '#B83E16',
          light: '#FBECE7',
        },
        limeGreen: '#4D7C0F',
        goldStar: '#F59E0B',
        borderSubtle: '#EAE5DC',
      },
      fontFamily: {
        display: ['var(--font-dramatic)', 'sans-serif'], // Fuente ultra-condensada o pesada (Druk / Formula)
        sans: ['var(--font-neue)', 'sans-serif'], // Sans-serif geométrica limpia (Neue Montreal / Inter)
        serif: ['var(--font-serif)', 'serif'],
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(28, 25, 23, 0.04)',
        card: '0 4px 20px rgba(28, 25, 23, 0.06)',
        floating: '0 10px 30px rgba(217, 83, 39, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
