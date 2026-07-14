import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Doces Dondoca | Confeitaria Artesanal Premium - Tatuapé, São Paulo",
  description:
    "Confeitaria artesanal no Tatuapé. Brigadeiros gourmet, tortas, bolos decorados, brownies, cafés especiais e muito mais. Peça pelo WhatsApp.",
  keywords: [
    "confeitaria artesanal",
    "doces gourmet São Paulo",
    "brigadeiro gourmet",
    "tortas artesanais",
    "bolos decorados",
    "brownies",
    "cafés especiais",
    "Tatuapé",
    "delivery doces SP",
  ],
  openGraph: {
    title: "Doces Dondoca | Confeitaria Artesanal Premium",
    description:
      "Doces artesanais feitos com amor. Brigadeiros gourmet, tortas, bolos e cafés especiais no Tatuapé.",
    type: "website",
    locale: "pt_BR",
    siteName: "Doces Dondoca",
  },
  robots: { index: true, follow: true },
  other: {
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAFAF8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
