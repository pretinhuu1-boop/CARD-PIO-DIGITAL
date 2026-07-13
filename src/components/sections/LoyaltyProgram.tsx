'use client'

import { motion } from 'framer-motion'
import { Gift, Check, Crown, Award } from 'lucide-react'
import { loyaltyTiers } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
}

const milestones = loyaltyTiers.map((tier) => ({
  name: tier.name,
  points: tier.minPoints,
}))

const maxPoints = milestones[milestones.length - 1].points

export function LoyaltyProgram() {
  return (
    <section className="py-16 md:py-24 bg-[#FFF8F0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Gift className="h-8 w-8 text-[#8B1A4A]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#8B1A4A]">
              Programa Fidelidade
            </h2>
          </div>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Acumule pontos a cada compra e desbloqueie beneficios exclusivos.
            Quanto mais voce compra, mais vantagens voce ganha!
          </p>
        </motion.div>

        {/* Tier Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
        >
          {loyaltyTiers.map((tier) => {
            const isDiamante = tier.name === 'Diamante'

            const cardContent = (
              <div
                className={cn(
                  'rounded-2xl p-6 bg-white flex flex-col h-full',
                  !isDiamante && 'border border-gray-200'
                )}
              >
                <div className="text-5xl mb-4">{tier.icon}</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {tier.minPoints === 0
                    ? 'Comece aqui'
                    : `A partir de ${tier.minPoints.toLocaleString('pt-BR')} pontos`}
                </p>
                <ul className="space-y-2 mt-auto">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-green-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )

            return (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                className={cn(
                  'min-w-[280px] snap-center lg:min-w-0',
                  isDiamante &&
                    'rounded-2xl bg-gradient-to-br from-[#D4A853] to-[#8B1A4A] p-[2px]'
                )}
              >
                {isDiamante ? (
                  cardContent
                ) : (
                  <div className="h-full">{cardContent}</div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="relative">
            {/* Bar background */}
            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8B1A4A] to-[#D4A853]"
                style={{ width: '100%' }}
              />
            </div>

            {/* Milestone dots */}
            <div className="relative -mt-[13px]">
              {milestones.map((milestone) => {
                const position =
                  maxPoints === 0
                    ? 0
                    : (milestone.points / maxPoints) * 100

                return (
                  <div
                    key={milestone.name}
                    className="absolute flex flex-col items-center -translate-x-1/2"
                    style={{ left: `${position}%` }}
                  >
                    <div className="h-6 w-6 rounded-full border-[3px] border-white bg-gradient-to-br from-[#8B1A4A] to-[#D4A853] shadow-md" />
                    <span className="mt-2 text-xs font-semibold text-gray-700 whitespace-nowrap">
                      {milestone.name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {milestone.points === 0
                        ? '0 pts'
                        : `${milestone.points.toLocaleString('pt-BR')} pts`}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <Button variant="primary" size="lg">
            Participar do Programa
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
