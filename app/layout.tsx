import type { Metadata } from 'next';
import { Bebas_Neue, Plus_Jakarta_Sans, Instrument_Serif, Space_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '../components/SmoothScroll';
import { NoiseOverlay } from '../components/NoiseOverlay';

const displayFont = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});

const bodyFont = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
});

const accentFont = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-accent',
});

const monoFont = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Mojo Grille | Authentic Cuban Kitchen & Bowls in Miami',
  description:
    'Artisanal Cuban bowls, freshly pressed Cubano sandwiches, and party catering in Miami. Marinated 24h in citrus mojo. Fast takeout & delivery al momento.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${displayFont.variable} ${bodyFont.variable} ${accentFont.variable} ${monoFont.variable}`}
    >
      <body className="bg-cream-bg text-charcoal-ink font-sans antialiased selection:bg-brand-fire selection:text-cream-bg min-h-screen">
        <NoiseOverlay />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
