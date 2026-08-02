import type { Metadata, Viewport } from 'next';
import { Nunito_Sans, Playfair_Display } from 'next/font/google';
import { store } from '@/lib/config';
import './globals.css';

/**
 * TIPOGRAFIA — Caracol Chocolates.
 *
 * Playfair Display é a fonte de título do site oficial (medida no CSS de
 * caracolchocolates.com.br). O corpo usa Brandon Grotesque/Avenir, que não
 * estão no Google Fonts — Nunito Sans é o substituto mais próximo em
 * largura e altura de x.
 */
const sans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-app-sans',
  display: 'swap',
});

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-app-display',
  display: 'swap',
});

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
