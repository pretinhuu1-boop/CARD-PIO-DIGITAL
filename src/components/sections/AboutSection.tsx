'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { about } from '@/lib/data';
import { store } from '@/lib/config';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

export function AboutSection() {
  return (
    <section id="sobre" className="bg-surface-2 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="mb-14 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
          >
            {about.title}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 font-display text-4xl text-ink sm:text-5xl"
          >
            {about.subtitle}
          </motion.h2>
        </motion.div>

        {/* Só aparece quando a loja tem foto própria do espaço. Em negócio
            cujo acervo É o argumento (ateliê, salão), o texto sozinho vende
            menos que uma imagem do lugar. */}
        {store.aboutImage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="relative mb-12 aspect-[4/3] w-full overflow-hidden rounded-card sm:aspect-[16/9]"
          >
            <Image
              src={store.aboutImage}
              alt={`Espaço da ${store.name}`}
              fill
              sizes="(min-width: 1024px) 72rem, 100vw"
              className="object-cover"
            />
          </motion.div>
        )}

        <div className="mb-16 space-y-5">
          {about.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="mx-auto max-w-2xl text-center text-base leading-relaxed text-ink-2 md:text-lg"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {about.values.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {about.values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="rounded-card border border-line bg-surface p-6"
              >
                {value.icon && (
                  <span className="mb-3 block text-3xl" aria-hidden="true">
                    {value.icon}
                  </span>
                )}
                <h3 className="mb-2 font-medium text-ink">{value.title}</h3>
                <p className="text-sm text-ink-2">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
