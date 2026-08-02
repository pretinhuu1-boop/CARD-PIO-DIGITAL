'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { Catalog } from '@/components/sections/Catalog';
import { ComboSection } from '@/components/sections/ComboSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { Footer } from '@/components/sections/Footer';
import { hasCatalog, hasCheckout } from '@/lib/format';

/**
 * O corpo da página sai do FORMATO, e o formato sai do dado — ver
 * `src/lib/format.ts`. Não há chave para ligar carrinho numa loja sem preço:
 * um cardápio ali obrigaria a inventar número, e o número inventado sairia
 * publicado em nome do lojista.
 *
 *   cardapio   catálogo + carrinho + combos
 *   expositor  catálogo, contato peça a peça, sem carrinho
 *   landing    apresentação e contato, sem catálogo
 */
export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header onOpenCart={() => setCartOpen(true)} />

      <main className="flex-1 pt-16">
        <HeroBanner />
        {hasCatalog && <Catalog />}
        {hasCheckout && <ComboSection />}
        <ReviewsSection />
        <AboutSection />
        <FAQSection />
      </main>

      <Footer />

      {/* Sem checkout não existe carrinho: ícone e gaveta sairiam do ar junto,
          porque controle que não leva a lugar nenhum é pior que a ausência. */}
      {hasCheckout && (
        <>
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
          <FloatingCTA onOpenCart={() => setCartOpen(true)} />
        </>
      )}

      <FloatingWhatsApp />
    </>
  );
}
