'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { store, contactMessage } from '@/lib/config';
import { hasCatalog, storeFormat, navSections } from '@/lib/format';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
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

  /*
    O destino do CTA é DERIVADO da navegação, não escrito à mão. A versão
    anterior tinha `getElementById('cardapio')` fixo; ao renomear a seção para
    `catalogo`, o botão principal da página passou a rolar para lugar nenhum —
    sem erro de console, sem falha de build, sem teste vermelho.
  */
  const anchorId = navSections[0]?.id ?? '';

  const scrollToAnchor = () => {
    document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const ctaLabel =
    storeFormat === 'expositor' ? 'Ver as peças' : 'Ver o cardápio';

  return (
    <section
      className={cn(
        'relative flex w-full items-center justify-center overflow-hidden px-6',
        /*
          Altura menor no celular. A 86svh o hero consumia a tela inteira e o
          primeiro produto ficava fora da primeira rolagem — num site cuja
          razão de existir é o catálogo, isso é a dobra gasta com capa.
        */
        'min-h-[400px] py-16 sm:min-h-[520px] md:h-[80svh] md:py-0',
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
            'mb-4 text-xs font-medium uppercase tracking-[0.24em] sm:mb-6 sm:text-sm sm:tracking-[0.28em]',
            hasImage ? 'text-on-overlay/80' : 'text-accent',
          )}
        >
          {store.tagline}
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {store.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className={cn(
            'mt-4 max-w-md text-base leading-relaxed sm:mt-6 sm:text-lg',
            hasImage ? 'text-on-overlay/90' : 'text-ink-2',
          )}
        >
          {store.description}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row"
        >
          {/* Sem catálogo não há para onde rolar: a landing leva ao contato,
              que é a única ação real que a página oferece. */}
          {hasCatalog ? (
            <button
              type="button"
              onClick={scrollToAnchor}
              className={cn(
                'focus-ring min-h-[52px] rounded-full px-8 text-[15px] font-medium',
                'transition-colors duration-200',
                // `bg-on-overlay text-ink` é par instável: on-overlay é branco
                // fixo e ink inverte no modo escuro — dava 1,05:1, invisível.
                'bg-brand text-on-brand hover:bg-brand-hover',
              )}
            >
              {ctaLabel}
            </button>
          ) : (
            (store.whatsapp || store.bookingUrl) && (
              <a
                href={store.whatsapp ? buildWhatsAppUrl(contactMessage) : store.bookingUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'focus-ring flex min-h-[52px] items-center rounded-full px-8 text-[15px] font-medium',
                  'bg-brand text-on-brand transition-colors duration-200 hover:bg-brand-hover',
                )}
              >
                {store.whatsapp ? 'Falar no WhatsApp' : 'Agendar horário'}
              </a>
            )
          )}
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

      {/* Some junto com a âncora: seta que rola para nada é controle morto. */}
      {hasCatalog && (
        <motion.button
          type="button"
          onClick={scrollToAnchor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className={cn(
            'focus-ring absolute bottom-4 left-1/2 z-10 hidden h-11 w-11 -translate-x-1/2',
            'items-center justify-center rounded-full transition-opacity hover:opacity-100 sm:flex',
            hasImage ? 'text-on-overlay/60' : 'text-ink-3',
          )}
          aria-label={`Rolar para ${ctaLabel.toLowerCase()}`}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.button>
      )}
    </section>
  );
}
