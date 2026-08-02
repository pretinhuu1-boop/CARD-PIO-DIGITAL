'use client';

import { motion } from 'framer-motion';
import { quotes } from '@/lib/data';

/**
 * Vozes — as avaliações que não couberam intercaladas no expositor.
 *
 * Texto literal do Google. Nome reduzido a primeiro nome + inicial: a
 * avaliação é pública, mas republicar o nome completo de um cliente numa
 * página comercial é outra coisa.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Voices() {
  // As duas primeiras já aparecem intercaladas entre as peças.
  const restantes = quotes.slice(2);
  if (restantes.length === 0) return null;

  return (
    <section id="vozes" className="border-y border-line bg-surface-2">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28 lg:px-8">
        <div className="mb-14 max-w-xl">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Vozes
          </span>
          <h2 className="mt-4 font-display text-3xl leading-[1.15] text-ink sm:text-4xl">
            5,0 no Google, em 77 avaliações
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2"
        >
          {restantes.map((q) => (
            <motion.figure key={q.id} variants={fadeUp}>
              <blockquote className="text-lg leading-relaxed text-ink">
                “{q.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-ink-3">
                {q.name} · {q.date}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
