'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { ComboSection } from '@/components/sections/ComboSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header onOpenCart={() => setCartOpen(true)} />

      <main className="flex-1 pt-16">
        <HeroBanner />
        <ProductGrid />
        <ComboSection />
        <ReviewsSection />
        <AboutSection />
        <FAQSection />
      </main>

      <Footer />

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <FloatingCTA onOpenCart={() => setCartOpen(true)} />
      <FloatingWhatsApp />
    </>
  );
}
