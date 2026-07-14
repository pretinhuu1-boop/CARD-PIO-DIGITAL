'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Perguntas Frequentes', href: '#faq' },
];

const hours = [
  { day: 'Seg a Sex', time: '8h – 20h' },
  { day: 'Sábado', time: '9h – 18h' },
  { day: 'Domingo', time: '9h – 14h' },
];

export function Footer() {
  return (
    <footer id="contato" className="bg-chocolate-900 text-cream-300">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-caramel-600/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-cream-100">Doces Dondoca</h2>
            <p className="text-sm text-cream-500 leading-relaxed">
              Confeitaria artesanal no coração do Tatuapé. Doces, salgados e cafés feitos com carinho.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-cream-200 text-sm tracking-[0.1em] uppercase">Navegação</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream-500 hover:text-caramel-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-cream-200 text-sm tracking-[0.1em] uppercase">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-cream-500">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-caramel-500" />
                <span>(11) 98399-0000</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream-500">
                <Camera className="w-4 h-4 mt-0.5 shrink-0 text-caramel-500" />
                <span>@docesdondocaoficial</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream-500">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-caramel-500" />
                <span>Rua Otelo Rizzo, 13 — Vila Gomes Cardim, SP</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-cream-200 text-sm tracking-[0.1em] uppercase">Horário</h3>
            <ul className="space-y-3">
              {hours.map((item) => (
                <li
                  key={item.day}
                  className="flex items-start gap-3 text-sm text-cream-500"
                >
                  <Clock className="w-4 h-4 mt-0.5 shrink-0 text-caramel-500" />
                  <span>
                    <strong className="text-cream-300">{item.day}:</strong> {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-chocolate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cream-600">
            &copy; 2024 Doces Dondoca. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/docesdondocaoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-chocolate-700/50 hover:bg-caramel-600 text-cream-400 hover:text-white transition-colors duration-200 p-2"
              aria-label="Instagram"
            >
              <Camera className="w-4 h-4" />
            </a>
            <a
              href="tel:+5511983990000"
              className="rounded-full bg-chocolate-700/50 hover:bg-caramel-600 text-cream-400 hover:text-white transition-colors duration-200 p-2"
              aria-label="Telefone"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
