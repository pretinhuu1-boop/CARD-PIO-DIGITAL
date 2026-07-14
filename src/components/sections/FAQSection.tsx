'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/lib/data';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50 dark:bg-chocolate-800/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm tracking-[0.2em] uppercase text-caramel-600 font-medium">
            Dúvidas
          </span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-chocolate-800 dark:text-cream-100">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-cream-700 dark:text-cream-500 max-w-md mx-auto">
            Tudo que você precisa saber sobre nossos produtos e entregas
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                'rounded-2xl border transition-colors duration-200',
                openIndex === index
                  ? 'border-caramel-300 dark:border-caramel-700 bg-[var(--background)] dark:bg-chocolate-800/50'
                  : 'border-cream-200 dark:border-chocolate-700 bg-[var(--background)] dark:bg-chocolate-800/30',
              )}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-sm sm:text-base text-chocolate-800 dark:text-cream-200 pr-4">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-cream-500" />
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-sm text-cream-700 dark:text-cream-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
