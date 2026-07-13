import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doces Dondoca | Confeitaria Artesanal Premium",
  description:
    "A combinação perfeita entre doces artesanais, salgados gourmet e cafés especiais. Brigadeiros, tortas, bolos e muito mais em São Paulo.",
  keywords: [
    "doces gourmet",
    "confeitaria artesanal",
    "brigadeiro",
    "tortas",
    "bolos",
    "São Paulo",
    "delivery doces",
  ],
  openGraph: {
    title: "Doces Dondoca | Confeitaria Artesanal Premium",
    description:
      "Doces artesanais feitos com amor. Brigadeiros gourmet, tortas, bolos e cafés especiais.",
    type: "website",
    locale: "pt_BR",
    siteName: "Doces Dondoca",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8B1A4A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FFFAF5] text-[#1A0A10]">
        {children}
      </body>
    </html>
  );
}
