import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '../components/scroll/SmoothScroll';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['600', '700'],
  display: 'swap',
});

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mojo Grille | Authentic Cuban Kitchen & Bowls in Miami',
  description:
    'Artisanal Cuban bowls, freshly pressed Cubano sandwiches, and party catering in Miami. Marinated 24h in citrus mojo. Fast takeout & delivery al momento.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${sans.variable}`}>
      <body
        className={`${playfair.variable} ${sans.variable} font-sans antialiased bg-[#FAF8F5] text-[#1C1917] min-h-screen`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
