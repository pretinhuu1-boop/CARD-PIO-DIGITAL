'use client'

import { motion } from 'framer-motion'
import { Camera, Heart } from 'lucide-react'
import { brandStory } from '@/lib/data'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const decorativeCircles = [
  { size: 200, top: '5%', left: '-5%', color: '#8B1A4A', opacity: 0.05 },
  { size: 150, top: '30%', right: '-3%', color: '#D4A853', opacity: 0.07 },
  { size: 100, bottom: '15%', left: '10%', color: '#8B1A4A', opacity: 0.04 },
  { size: 120, bottom: '5%', right: '15%', color: '#D4A853', opacity: 0.05 },
]

export function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F0] py-20 md:py-28">
      {/* Decorative background circles */}
      {decorativeCircles.map((circle, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: circle.size,
            height: circle.size,
            top: circle.top,
            left: circle.left,
            right: circle.right,
            bottom: circle.bottom,
            backgroundColor: circle.color,
            opacity: circle.opacity,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-4 font-serif text-3xl font-bold text-[#8B1A4A] md:text-4xl lg:text-5xl"
          >
            {brandStory.title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg italic text-[#D4A853] md:text-xl"
          >
            {brandStory.subtitle}
          </motion.p>
        </motion.div>

        {/* Story paragraphs */}
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
              className="mx-auto max-w-2xl text-center text-base leading-relaxed text-gray-700 md:text-lg"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Values cards */}
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
              className="rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <span className="mb-3 block text-4xl">{value.icon}</span>
              <h3 className="mb-2 font-semibold text-[#8B1A4A]">
                {value.title}
              </h3>
              <p className="text-sm text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Camera CTA */}
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
              'bg-[#8B1A4A] text-white transition-all duration-300',
              'hover:bg-[#6d1439] hover:shadow-lg',
              'text-sm font-medium md:text-base'
            )}
          >
            <Camera className="h-5 w-5" />
            Siga @docesdondocaoficial
            <Heart className="h-4 w-4 fill-current" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
