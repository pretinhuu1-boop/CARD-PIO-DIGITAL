'use client'

import { motion } from 'framer-motion'
import { MapPin, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { cn } from '@/lib/utils'

const floatingShapes = [
  { size: 16, x: '10%', y: '20%', duration: 18, delay: 0, opacity: 0.15 },
  { size: 10, x: '80%', y: '15%', duration: 22, delay: 2, opacity: 0.12 },
  { size: 20, x: '70%', y: '60%', duration: 20, delay: 1, opacity: 0.1 },
  { size: 8, x: '25%', y: '75%', duration: 16, delay: 3, opacity: 0.18 },
  { size: 14, x: '55%', y: '35%', duration: 25, delay: 0.5, opacity: 0.12 },
  { size: 12, x: '90%', y: '80%', duration: 19, delay: 1.5, opacity: 0.14 },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const slideUpVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

export function HeroBanner() {
  const handleScrollToCardapio = () => {
    const element = document.getElementById('cardapio')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        'h-[60vh] md:h-[80vh]',
      )}
      style={{
        background: 'linear-gradient(135deg, #8B1A4A 0%, #a8325e 30%, #d4a085 70%, #FFF8F0 100%)',
      }}
    >
      {/* Floating decorative elements */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            backgroundColor: index % 2 === 0 ? '#D4A853' : '#FFF8F0',
            opacity: shape.opacity,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 20, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}

      {/* Decorative SVG blobs */}
      <motion.svg
        className="absolute"
        style={{ left: '40%', top: '10%', opacity: 0.08 }}
        width="60"
        height="60"
        viewBox="0 0 60 60"
        animate={{
          y: [0, -20, 15, -10, 0],
          rotate: [0, 45, -20, 30, 0],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        <circle cx="30" cy="30" r="28" fill="#D4A853" />
      </motion.svg>

      <motion.svg
        className="absolute"
        style={{ left: '15%', top: '50%', opacity: 0.06 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        animate={{
          y: [0, 20, -15, 10, 0],
          x: [0, -10, 15, -5, 0],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        <circle cx="20" cy="20" r="18" fill="#FFF8F0" />
      </motion.svg>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex max-w-3xl flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Location pill */}
          <motion.div
            variants={slideUpVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm backdrop-blur-sm md:mb-8 md:text-base"
            style={{
              backgroundColor: 'rgba(255, 248, 240, 0.15)',
              color: '#FFF8F0',
              border: '1px solid rgba(255, 248, 240, 0.2)',
            }}
          >
            <MapPin className="h-4 w-4" />
            <span>Vila Gomes Cardim, Sao Paulo</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={slideUpVariants}
            className="font-serif text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ color: '#FFF8F0' }}
          >
            Doces Dondoca
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={slideUpVariants}
            className="mt-4 max-w-xl text-lg leading-relaxed sm:text-xl md:mt-6 md:text-2xl"
            style={{ color: 'rgba(255, 248, 240, 0.9)' }}
          >
            A combinacao perfeita entre doces, salgados e bons cafes
          </motion.p>

          {/* Subtitle */}
          <motion.p
            variants={slideUpVariants}
            className="mt-3 max-w-md text-sm leading-relaxed sm:text-base md:mt-4"
            style={{ color: 'rgba(255, 248, 240, 0.7)' }}
          >
            Feito com ingredientes selecionados e o carinho artesanal que so a Dondoca tem
          </motion.p>

          {/* Rating badge */}
          <motion.div
            variants={slideUpVariants}
            className="mt-6 inline-flex items-center gap-3 rounded-full px-4 py-2 backdrop-blur-sm md:mt-8"
            style={{
              backgroundColor: 'rgba(255, 248, 240, 0.12)',
              border: '1px solid rgba(212, 168, 83, 0.3)',
            }}
          >
            <StarRating rating={4.9} count={5} size="sm" />
            <span
              className="text-sm font-medium"
              style={{ color: '#D4A853' }}
            >
              4.9
            </span>
            <span
              className="text-xs sm:text-sm"
              style={{ color: 'rgba(255, 248, 240, 0.7)' }}
            >
              2000+ avaliacoes
            </span>
          </motion.div>

          {/* CTA button */}
          <motion.div variants={slideUpVariants} className="mt-8 md:mt-10">
            <Button
              variant="primary"
              size="lg"
              onClick={handleScrollToCardapio}
            >
              Explorar Cardapio
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          background: 'linear-gradient(to top, #FFF8F0, transparent)',
        }}
      />
    </section>
  )
}
