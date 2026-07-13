'use client';

import { motion } from 'framer-motion';
import { Sparkles, Check, ChevronRight } from 'lucide-react';
import { combos } from '@/lib/data';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function ComboSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Sparkles className="w-6 h-6 text-[#D4A853]" />
          <h2 className="text-3xl font-bold text-[#8B1A4A]">Combos Especiais</h2>
          <Sparkles className="w-6 h-6 text-[#D4A853]" />
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide">
          {combos.map((combo, index) => (
            <motion.div
              key={combo.name}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="snap-center flex-shrink-0 w-[340px] min-w-[300px]"
            >
              {/* Gradient Border Wrapper */}
              <div className="bg-gradient-to-br from-[#D4A853] to-[#8B1A4A] p-[2px] rounded-2xl shadow-lg shadow-[#8B1A4A]/10">
                <div className="bg-white rounded-2xl p-6 flex flex-col h-full">
                  {/* Card Header */}
                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-900">{combo.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{combo.description}</p>
                  </div>

                  {/* Included Items */}
                  <ul className="flex-1 space-y-2 mb-6">
                    {combo.products.map((product) => (
                      <li key={product} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{product}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price Section */}
                  <div className="mb-4">
                    <span className="text-sm text-gray-400 line-through">
                      {formatCurrency(combo.originalPrice)}
                    </span>
                    <div className="text-2xl font-bold text-[#8B1A4A]">
                      {formatCurrency(combo.comboPrice)}
                    </div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Economize {formatCurrency(combo.savings)}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Button variant="primary" size="sm" className="w-full">
                    Adicionar Combo
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
