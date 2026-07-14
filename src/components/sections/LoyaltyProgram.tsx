'use client';

import { motion } from 'framer-motion';
import { Gift, Check } from 'lucide-react';
import { loyaltyTiers } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export function LoyaltyProgram() {
  return (
    <section id="fidelidade" className="py-20 md:py-28 bg-cream-50 dark:bg-chocolate-800/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm tracking-[0.2em] uppercase text-caramel-600 font-medium">
            Fidelidade
          </span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-chocolate-800 dark:text-cream-100">
            Programa Fidelidade
          </h2>
          <p className="mt-4 text-cream-700 dark:text-cream-500 max-w-2xl mx-auto">
            Acumule pontos a cada compra e desbloqueie benefícios exclusivos
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
        >
          {loyaltyTiers.map((tier) => {
            const isDiamante = tier.name === 'Diamante';

            return (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                className={cn(
                  'min-w-[280px] snap-center lg:min-w-0',
                  isDiamante && 'rounded-2xl bg-gradient-to-br from-caramel-400 to-chocolate-700 p-[1.5px]',
                )}
              >
                <div
                  className={cn(
                    'rounded-2xl p-6 bg-[var(--background)] dark:bg-chocolate-800/50 flex flex-col h-full',
                    !isDiamante && 'border border-cream-300 dark:border-chocolate-600',
                  )}
                >
                  <div className="text-5xl mb-4">{tier.icon}</div>
                  <h3 className="font-display text-xl text-chocolate-800 dark:text-cream-100 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-cream-600 dark:text-cream-500 mb-4">
                    {tier.minPoints === 0
                      ? 'Comece aqui'
                      : `A partir de ${tier.minPoints.toLocaleString('pt-BR')} pontos`}
                  </p>
                  <ul className="space-y-2 mt-auto">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-chocolate-700 dark:text-cream-400">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-caramel-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button variant="primary" size="lg">
            Participar do Programa
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
