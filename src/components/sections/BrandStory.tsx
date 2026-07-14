'use client';

import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { brandStory } from '@/lib/data';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function BrandStory() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-cream-50 dark:bg-chocolate-800/30 py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="mb-16 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-sm tracking-[0.2em] uppercase text-caramel-600 font-medium"
          >
            Nossa História
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 font-display text-4xl sm:text-5xl text-chocolate-800 dark:text-cream-100"
          >
            {brandStory.title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg text-caramel-600 dark:text-caramel-400"
          >
            {brandStory.subtitle}
          </motion.p>
        </motion.div>

        <div className="mb-20 space-y-6">
          {brandStory.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: 'easeOut',
                    delay: index * 0.1,
                  },
                },
              }}
              className="mx-auto max-w-2xl text-center text-base leading-relaxed text-cream-700 dark:text-cream-400 md:text-lg"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {brandStory.values.map((value, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="rounded-2xl bg-[var(--background)] dark:bg-chocolate-800/50 p-6 border border-cream-200 dark:border-chocolate-700 transition-all duration-300 hover:border-caramel-300 dark:hover:border-caramel-700"
            >
              <span className="mb-3 block text-4xl">{value.icon}</span>
              <h3 className="mb-2 font-medium text-chocolate-800 dark:text-cream-200">
                {value.title}
              </h3>
              <p className="text-sm text-cream-600 dark:text-cream-500">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center"
        >
          <a
            href="https://instagram.com/docesdondocaoficial"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-8 py-3',
              'bg-chocolate-800 text-cream-50 transition-all duration-200',
              'hover:bg-chocolate-700',
              'dark:bg-cream-200 dark:text-chocolate-900 dark:hover:bg-cream-100',
              'text-sm font-medium',
            )}
          >
            <Camera className="h-4 w-4" />
            Siga @docesdondocaoficial
          </a>
        </motion.div>
      </div>
    </section>
  );
}
