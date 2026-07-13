'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { PromoBanner } from '@/components/sections/PromoBanner';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { ComboSection } from '@/components/sections/ComboSection';
import { BrandStory } from '@/components/sections/BrandStory';
import { LoyaltyProgram } from '@/components/sections/LoyaltyProgram';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header onOpenCart={() => setCartOpen(true)} />

      <main className="flex-1">
        <HeroBanner />
        <PromoBanner />
        <ProductGrid />
        <ComboSection />
        <BrandStory />
        <LoyaltyProgram />
      </main>

      <Footer />

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <FloatingCTA onOpenCart={() => setCartOpen(true)} />
      <FloatingWhatsApp />
    </>
  );
}
