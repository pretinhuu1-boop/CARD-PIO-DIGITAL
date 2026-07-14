'use client';

import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { combos } from '@/lib/data';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function ComboSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm tracking-[0.2em] uppercase text-caramel-600 font-medium">
            Combos
          </span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-chocolate-800 dark:text-cream-100">
            Combos Especiais
          </h2>
          <p className="mt-4 text-cream-700 dark:text-cream-500 max-w-md mx-auto">
            Combinações selecionadas com preços exclusivos
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide">
          {combos.map((combo, index) => (
            <motion.div
              key={combo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="snap-center flex-shrink-0 w-[340px] min-w-[300px]"
            >
              <div className="border border-cream-300 dark:border-chocolate-600 rounded-2xl p-6 flex flex-col h-full bg-[var(--background)] dark:bg-chocolate-800/40 hover:border-caramel-300 dark:hover:border-caramel-700 transition-colors">
                <div className="mb-4">
                  <h3 className="font-display text-lg text-chocolate-800 dark:text-cream-100">
                    {combo.name}
                  </h3>
                  <p className="text-sm text-cream-600 dark:text-cream-500 mt-1">
                    {combo.description}
                  </p>
                </div>

                <ul className="flex-1 space-y-2 mb-6">
                  {combo.products.map((product) => (
                    <li key={product} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-caramel-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-chocolate-700 dark:text-cream-400">
                        {product}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4">
                  <span className="text-sm text-cream-600 line-through">
                    {formatCurrency(combo.originalPrice)}
                  </span>
                  <div className="text-2xl font-semibold text-chocolate-800 dark:text-cream-100">
                    {formatCurrency(combo.comboPrice)}
                  </div>
                  <span className="inline-block mt-1 px-2.5 py-0.5 bg-caramel-100 text-caramel-800 dark:bg-caramel-900/30 dark:text-caramel-400 text-xs font-medium rounded-full">
                    Economize {formatCurrency(combo.savings)}
                  </span>
                </div>

                <Button variant="primary" size="sm" className="w-full">
                  Adicionar Combo
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
