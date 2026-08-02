'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { store } from '@/lib/config';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Hero com dois modos, ambos com contraste garantido:
 *
 *  - sem `store.heroImage`  → fundo neutro, texto em `ink` sobre `surface`
 *  - com `store.heroImage`  → foto + véu `--overlay`, texto em `on-overlay`
 *
 * O véu é obrigatório. A versão anterior confiava em classes de gradiente que
 * não geravam CSS nenhum, e o resultado era texto escuro sobre foto escura.
 */
export function HeroBanner() {
  const hasImage = Boolean(store.heroImage);

  const scrollToMenu = () => {
    document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className={cn(
        'relative flex min-h-[560px] w-full items-center justify-center overflow-hidden',
        'h-[86svh] px-6',
        hasImage ? 'text-on-overlay' : 'bg-surface-2 text-ink',
      )}
    >
      {hasImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${store.heroImage})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-overlay" aria-hidden="true" />
        </>
      )}

      <motion.div
        className="relative z-10 flex max-w-2xl flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          variants={fadeUp}
          className={cn(
            'mb-6 text-sm font-medium uppercase tracking-[0.28em]',
            hasImage ? 'text-on-overlay/80' : 'text-accent',
          )}
        >
          {store.tagline}
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {store.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className={cn(
            'mt-6 max-w-md text-lg leading-relaxed',
            hasImage ? 'text-on-overlay/90' : 'text-ink-2',
          )}
        >
          {store.description}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          {/*
            O CTA usa `brand`/`on-brand` com ou sem foto.

            A variante anterior para foto era `bg-on-overlay text-ink`, um par
            instável: `on-overlay` é branco fixo, mas `ink` inverte para claro
            no modo escuro — o botão virava texto quase branco sobre fundo
            branco (1,05:1). `brand`/`on-brand` é o único par com contraste
            garantido nos dois temas, e é a cor de ação da marca de qualquer forma.
          */}
          <button
            type="button"
            onClick={scrollToMenu}
            className={cn(
              'focus-ring min-h-[52px] rounded-full px-8 text-[15px] font-medium',
              'transition-colors duration-200',
              'bg-brand text-on-brand hover:bg-brand-hover',
            )}
          >
            Ver cardápio
          </button>
        </motion.div>

        {store.city && (
          <motion.p
            variants={fadeUp}
            className={cn(
              'mt-8 text-sm',
              hasImage ? 'text-on-overlay/70' : 'text-ink-3',
            )}
          >
            {store.city}
          </motion.p>
        )}
      </motion.div>

      <motion.button
        type="button"
        onClick={scrollToMenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className={cn(
          'focus-ring absolute bottom-6 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2',
          'items-center justify-center rounded-full transition-opacity hover:opacity-100',
          hasImage ? 'text-on-overlay/60' : 'text-ink-3',
        )}
        aria-label="Rolar para o cardápio"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
