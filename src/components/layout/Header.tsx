'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { store } from '@/lib/config';
import { navSections } from '@/lib/data';
import { cn } from '@/lib/utils';

/** Derivada do conteúdo: seção sem dado não vira link morto. */
const navItems = navSections.map((s) => ({ label: s.label, href: s.id }));

/**
 * O header é sempre translúcido (classe `.glass`), nunca transparente.
 * A versão anterior ficava transparente no topo e pintava o texto de branco
 * via classes que não existiam — o logo sumia contra o hero.
 */
function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const updateActiveSection = useCallback(() => {
    const scrollTop = window.scrollY + 120;
    let current = '';
    for (const item of navItems) {
      const el = document.getElementById(item.href);
      if (el && el.offsetTop <= scrollTop) current = item.href;
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    // A primeira medição espera o layout assentar (o navegador pode restaurar
    // a rolagem sem disparar `scroll`), por isso vai num rAF em vez de rodar
    // de forma síncrona dentro do efeito.
    const frame = requestAnimationFrame(updateActiveSection);
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, [updateActiveSection]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="glass fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="focus-ring flex min-h-[44px] items-center rounded-sm font-display text-xl tracking-tight text-ink"
            >
              {store.name}
            </button>

            <nav className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollTo(item.href)}
                  aria-current={activeSection === item.href ? 'true' : undefined}
                  className={cn(
                    'focus-ring relative rounded-sm py-2 text-sm font-medium transition-colors',
                    activeSection === item.href
                      ? 'text-ink'
                      : 'text-ink-2 hover:text-ink',
                  )}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/*
              Sem ícone de carrinho: esta loja não tem preço nem checkout.
              Botão que não leva a lugar nenhum é pior que a ausência dele —
              mesmo erro do link "Combos" que sobrava no menu.
            */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2 md:hidden"
                aria-label="Menu de navegação"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="glass fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollTo(item.href)}
                  className={cn(
                    'focus-ring min-h-[48px] rounded-control px-4 text-left text-sm font-medium transition-colors',
                    activeSection === item.href
                      ? 'bg-surface-3 text-ink'
                      : 'text-ink-2 hover:bg-surface-2 hover:text-ink',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { Header };
