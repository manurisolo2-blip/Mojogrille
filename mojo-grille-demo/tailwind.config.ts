import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 3 Key Colors Requested
        'toasted-cream': '#F7EFE2',
        'charred-iron': '#1C1917',
        'mojo-orange': '#EA580C',

        // Canonical Design Tokens
        'cream-bg': '#F7EFE2',
        'brand-fire': '#EA580C',
        'charcoal-ink': '#1C1917',
        'surface-sand': '#ECE4D5',
        'mojo-citrus': '#EAB308',
        'leaf-green': '#15803D',

        // Backward-compatible semantic aliases
        cream: '#F7EFE2',
        mojoRed: '#EA580C',
        charcoal: '#1C1917',
        sand: '#ECE4D5',
        terracotta: {
          DEFAULT: '#EA580C',
          hover: '#C2410C',
          light: '#FDE9E7',
        },
        limeGreen: '#15803D',
        goldStar: '#EAB308',
        borderSubtle: '#ECE4D5',
      },
      fontFamily: {
        display: ['Syne', 'Clash Display', 'var(--font-display)', 'Bebas Neue', 'sans-serif'],
        body: ['General Sans', 'var(--font-body)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        sans: ['General Sans', 'var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        accent: ['var(--font-accent)', 'Instrument Serif', 'Playfair Display', 'serif'],
        serif: ['var(--font-accent)', 'Instrument Serif', 'Playfair Display', 'serif'],
        mono: ['var(--font-mono)', 'Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
