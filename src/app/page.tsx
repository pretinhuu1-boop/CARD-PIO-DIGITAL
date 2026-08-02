import { Header } from '@/components/layout/Header';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { Showcase } from '@/components/sections/Showcase';
import { Voices } from '@/components/sections/Voices';
import { AboutSection } from '@/components/sections/AboutSection';
import { Footer } from '@/components/sections/Footer';

/**
 * Composição do expositor.
 *
 * Sem carrinho, sem drawer e sem barra de pedido: esta loja não tem preço
 * publicado nem checkout. Toda ação — peça, cabeçalho, rodapé, botão
 * flutuante — vai para a mesma conversa de WhatsApp.
 */
export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1 pt-16">
        <HeroBanner />
        <Showcase />
        <Voices />
        <AboutSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
