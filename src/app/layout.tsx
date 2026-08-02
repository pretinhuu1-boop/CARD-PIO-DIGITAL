import type { Metadata, Viewport } from 'next';
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

export const metadata: Metadata = {
  title: `${store.name} | Cardápio digital`,
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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface text-ink">
        {children}
      </body>
    </html>
  );
}
