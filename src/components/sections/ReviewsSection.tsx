'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { reviews } from '@/lib/data';
import { cn } from '@/lib/utils';

export function ReviewsSection() {
  if (reviews.length === 0) return null;

  return (
    <section id="avaliacoes" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Avaliações
          </span>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            O que dizem os clientes
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reviews.map((review) => (
            <motion.figure
              key={review.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="rounded-card border border-line bg-surface-2 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-3">
                  <span className="text-sm font-semibold text-ink-2">
                    {review.initials}
                  </span>
                </div>
                <div>
                  <figcaption className="text-sm font-medium text-ink">
                    {review.name}
                  </figcaption>
                  <p className="text-xs text-ink-3">{review.date}</p>
                </div>
              </div>

              <div
                className="mb-3 flex gap-0.5"
                aria-label={`${review.rating} de 5 estrelas`}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-3.5 w-3.5',
                      i < review.rating
                        ? 'fill-accent text-accent'
                        : 'text-line-strong',
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="text-sm leading-relaxed text-ink-2">
                {review.text}
              </blockquote>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
