'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Camera, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Cardapio', href: '#cardapio' },
  { label: 'Sobre Nos', href: '#sobre' },
  { label: 'Fidelidade', href: '#fidelidade' },
  { label: 'Contato', href: '#contato' },
]

const hours = [
  { day: 'Seg a Sex', time: '8h - 20h' },
  { day: 'Sabado', time: '9h - 18h' },
  { day: 'Domingo', time: '9h - 14h' },
]

export function Footer() {
  return (
    <footer className="bg-[#1A0A10] text-white">
      {/* Gradient divider */}
      <div className="h-1 w-full bg-gradient-to-r from-[#8B1A4A] to-[#D4A853]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-white">Doces Dondoca</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              A combinacao perfeita entre doces, salgados e bons cafes
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Navegacao</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      'text-gray-300 hover:text-[#D4A853] transition-colors duration-300 text-sm'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#D4A853]" />
                <span>(11) 98399-0000</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <Camera className="w-4 h-4 mt-0.5 shrink-0 text-[#D4A853]" />
                <span>@docesdondocaoficial</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#D4A853]" />
                <span>Rua Otelo Rizzo, 13 - Vila Gomes Cardim, SP</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Horario</h3>
            <ul className="space-y-3">
              {hours.map((item) => (
                <li
                  key={item.day}
                  className="flex items-start gap-3 text-sm text-gray-300"
                >
                  <Clock className="w-4 h-4 mt-0.5 shrink-0 text-[#D4A853]" />
                  <span>
                    <strong className="text-gray-200">{item.day}:</strong> {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 flex items-center gap-1">
            &copy; 2024 Doces Dondoca. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/docesdondocaoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 hover:bg-[#8B1A4A] transition-colors duration-300 p-2"
              aria-label="Camera"
            >
              <Camera className="w-4 h-4" />
            </a>
            <a
              href="tel:+5511983990000"
              className="rounded-full bg-white/10 hover:bg-[#8B1A4A] transition-colors duration-300 p-2"
              aria-label="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
