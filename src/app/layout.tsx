import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { store } from '@/lib/config';
import './globals.css';

/**
 * TIPOGRAFIA — ponto de preenchimento.
 *
 * O template usa a fonte do sistema por padrão (neutro). Para aplicar a fonte
 * da loja, importe de `next/font/google` e injete as variáveis no <html>:
 *
 *   import { Inter, Playfair_Display } from 'next/font/google';
 *
 *   const sans = Inter({ subsets: ['latin'], variable: '--font-app-sans', display: 'swap' });
 *   const display = Playfair_Display({ subsets: ['latin'], variable: '--font-app-display', display: 'swap' });
 *
 * e troque a className do <html> por:
 *   `${sans.variable} ${display.variable} h-full antialiased`
 *
 * As variáveis --font-app-sans / --font-app-display já são consumidas em
 * globals.css; nada mais precisa mudar.
 */

/**
 * TIPOGRAFIA — Istambul.
 *
 * Fraunces tem serifa de contraste alto e um desenho levemente ornamental,
 * que conversa com a estética árabe/turca sem cair em fonte "temática".
 * Inter no corpo para o cardápio ficar legível.
 */
const sans = Inter({ subsets: ['latin'], variable: '--font-app-sans', display: 'swap' });
const display = Fraunces({ subsets: ['latin'], variable: '--font-app-display', display: 'swap' });

export const metadata: Metadata = {
  title: `${store.name} — ${store.tagline}`,
  description: store.description,
  openGraph: {
    title: store.name,
    description: store.description,
    type: 'website',
    locale: 'pt_BR',
    siteName: store.name,
  },
  robots: { index: true, follow: true },
  other: {
    'format-detection': 'telephone=no',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fffcf7' },
    { media: '(prefers-color-scheme: dark)', color: '#16120f' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink">
        {children}
      </body>
    </html>
  );
}
