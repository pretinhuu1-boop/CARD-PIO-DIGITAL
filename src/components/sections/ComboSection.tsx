'use client';

import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { combos, products, comboAsProduct } from '@/lib/data';
import { useCart } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

/**
 * Combos compráveis: o botão adiciona todos os itens do combo ao pedido.
 * Antes esta seção exibia preço e economia sem nenhum handler — quatro cards
 * de vitrine que não vendiam nada.
 */
export function ComboSection() {
  const { addItem } = useCart();

  if (combos.length === 0) return null;

  return (
    <section id="combos" className="bg-surface-2 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Combos
          </span>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Combinações com desconto
          </h2>
        </div>

        <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {combos.map((combo, index) => {
            const comboProducts = combo.productIds
              .map((id) => products.find((p) => p.id === id))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));

            const originalPrice = comboProducts.reduce((sum, p) => sum + p.price, 0);
            const savings = originalPrice - combo.comboPrice;
            const unavailable = comboProducts.some((p) => !p.available);

            const handleAdd = () => addItem(comboAsProduct(combo), 1);

            return (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="w-[320px] min-w-[300px] shrink-0 snap-center"
              >
                <div className="flex h-full flex-col rounded-card border border-line bg-surface p-6">
                  <h3 className="font-display text-lg text-ink">{combo.name}</h3>
                  <p className="mt-1 text-sm text-ink-2">{combo.description}</p>

                  <ul className="mb-6 mt-4 flex-1 space-y-2">
                    {comboProducts.map((product) => (
                      <li key={product.id} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-ink-2">{product.name}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-4">
                    {savings > 0 && (
                      <span className="text-sm text-ink-3 line-through tabular-nums">
                        {formatCurrency(originalPrice)}
                      </span>
                    )}
                    <div className="text-2xl font-semibold text-ink tabular-nums">
                      {formatCurrency(combo.comboPrice)}
                    </div>
                    {savings > 0 && (
                      <span className="mt-1 inline-block rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-medium text-success">
                        Economize {formatCurrency(savings)}
                      </span>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={handleAdd}
                    disabled={unavailable}
                    ariaLabel={`Adicionar ${combo.name} ao pedido`}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    {unavailable ? 'Indisponível' : 'Adicionar combo'}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs text-ink-3">
          O combo entra no pedido como um item único, pelo preço promocional.
        </p>
      </div>
    </section>
  );
}
