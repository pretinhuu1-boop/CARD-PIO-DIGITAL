'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroBanner() {
  const handleScroll = (target: string) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-chocolate-900/80 via-chocolate-900/50 to-chocolate-900/70" />

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183507_6a414511-e5ce-45b1-9087-023f83b05c42_min.webp)',
          filter: 'brightness(0.6) saturate(0.9)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-chocolate-950/60 via-transparent to-chocolate-950/80" />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
        <motion.div
          className="flex max-w-2xl flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={fadeUp}
            className="mb-6 text-sm tracking-[0.3em] uppercase text-cream-300/80 font-medium"
          >
            Confeitaria Artesanal
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream-50 leading-[0.95] tracking-tight"
          >
            Doces
            <br />
            Dondoca
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-6 w-12 h-px bg-caramel-400/60"
          />

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-lg sm:text-xl text-cream-200/90 leading-relaxed font-light"
          >
            A combinação perfeita entre doces artesanais, salgados gourmet e cafés especiais
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleScroll('cardapio')}
              className="px-8 py-4 bg-cream-50 text-chocolate-900 text-[15px] font-medium rounded-full hover:bg-white transition-colors duration-200 shadow-lg shadow-black/10"
            >
              Pedir Agora
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleScroll('cardapio')}
              className="px-8 py-4 text-cream-100/90 text-[15px] font-medium rounded-full border border-cream-200/20 hover:bg-cream-50/10 transition-colors duration-200"
            >
              Explorar Cardápio
            </motion.button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-sm text-cream-300/60"
          >
            Vila Gomes Cardim, Tatuapé — São Paulo
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => handleScroll('cardapio')}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-cream-200/40 hover:text-cream-200/70 transition-colors"
          aria-label="Rolar para o cardápio"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
