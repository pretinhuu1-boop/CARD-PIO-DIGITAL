import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { store } from '@/lib/config';
import './globals.css';

/**
 * TIPOGRAFIA — Alooks Hair Studio.
 *
 * O letreiro da fachada usa uma geométrica de caixa baixa, com terminações
 * retas e "o" quase circular. Poppins é a mais próxima disponível no Google
 * Fonts; Inter fica no corpo, para o texto não competir com a marca.
 */
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-app-sans',
  display: 'swap',
});

const display = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-app-display',
  display: 'swap',
});

export const metadata: Metadata = {
  // Salão não tem cardápio: o título diz o que a página é.
  title: `${store.name} | ${store.tagline}`,
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
    { media: '(prefers-color-scheme: dark)', color: '#14161a' },
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
