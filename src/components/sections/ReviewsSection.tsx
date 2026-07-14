'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews } from '@/lib/data';
import { cn } from '@/lib/utils';

export function ReviewsSection() {
  return (
    <section id="avaliacoes" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm tracking-[0.2em] uppercase text-caramel-600 font-medium">
            Avaliações
          </span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-chocolate-800 dark:text-cream-100">
            O que dizem nossos clientes
          </h2>
          <p className="mt-4 text-cream-700 dark:text-cream-500 max-w-md mx-auto">
            Mais de 2.000 clientes satisfeitos no Tatuapé e região
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={cn(
                'relative p-6 rounded-2xl',
                'bg-cream-50 dark:bg-chocolate-800/40',
                'border border-cream-200 dark:border-chocolate-700',
                'transition-colors duration-200',
                'hover:border-caramel-300 dark:hover:border-caramel-700',
              )}
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-cream-200 dark:text-chocolate-700" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-caramel-100 dark:bg-caramel-900/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-caramel-700 dark:text-caramel-400">
                    {review.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm text-chocolate-800 dark:text-cream-200">
                    {review.name}
                  </p>
                  <p className="text-xs text-cream-600 dark:text-cream-500">
                    {review.date}
                  </p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-3.5 h-3.5',
                      i < review.rating
                        ? 'text-caramel-500 fill-caramel-500'
                        : 'text-cream-300 dark:text-chocolate-600',
                    )}
                  />
                ))}
              </div>

              <p className="text-sm text-cream-700 dark:text-cream-400 leading-relaxed">
                {review.text}
              </p>

              {review.product && (
                <p className="mt-3 text-xs text-caramel-600 dark:text-caramel-500 font-medium">
                  {review.product}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
