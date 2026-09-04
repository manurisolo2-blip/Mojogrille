import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF8F5',
          dark: '#F0EBE1',
        },
        terracotta: {
          DEFAULT: '#D95327',
          hover: '#B83E16',
          light: '#FBECE7',
        },
        charcoal: {
          DEFAULT: '#1C1917',
          light: '#292524',
        },
        muted: '#78716C',
        limeGreen: '#4D7C0F',
        goldStar: '#F59E0B',
        borderSubtle: '#EAE5DC',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
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
