'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/store';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onOpenCart: () => void;
}

const navItems = [
  { label: 'Cardápio', href: 'cardapio' },
  { label: 'Sobre', href: 'sobre' },
  { label: 'Avaliações', href: 'avaliacoes' },
  { label: 'FAQ', href: 'faq' },
];

function Header({ onOpenCart }: HeaderProps) {
  const { count } = useCart();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevCount, setPrevCount] = useState(count);
  const [bouncing, setBouncing] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80);
  });

  const updateActiveSection = useCallback(() => {
    const sections = navItems.map((item) => ({
      id: item.href,
      el: document.getElementById(item.href),
    }));

    const scrollTop = window.scrollY + 120;
    let current = '';

    for (const section of sections) {
      if (section.el && section.el.offsetTop <= scrollTop) {
        current = section.id;
      }
    }

    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [updateActiveSection]);

  useEffect(() => {
    if (count !== prevCount && count > 0) {
      setBouncing(true);
      const timer = setTimeout(() => setBouncing(false), 500);
      setPrevCount(count);
      return () => clearTimeout(timer);
    }
    setPrevCount(count);
  }, [count, prevCount]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass shadow-sm'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-500',
              scrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20',
            )}
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <h1
                className={cn(
                  'font-display tracking-tight transition-all duration-500',
                  scrolled
                    ? 'text-lg sm:text-xl text-chocolate-800 dark:text-cream-200'
                    : 'text-xl sm:text-2xl text-cream-50',
                )}
              >
                Doces Dondoca
              </h1>
            </motion.div>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={cn(
                    'text-sm font-medium transition-all duration-300 relative',
                    scrolled
                      ? activeSection === item.href
                        ? 'text-chocolate-800 dark:text-cream-100'
                        : 'text-cream-600 hover:text-chocolate-800 dark:text-cream-500 dark:hover:text-cream-200'
                      : activeSection === item.href
                        ? 'text-cream-50'
                        : 'text-cream-200/70 hover:text-cream-50',
                  )}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={cn(
                        'absolute -bottom-1 left-0 right-0 h-0.5 rounded-full',
                        scrolled ? 'bg-caramel-500' : 'bg-cream-50',
                      )}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={onOpenCart}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={cn(
                  'relative flex items-center justify-center rounded-full transition-colors duration-200',
                  'w-10 h-10 sm:w-11 sm:h-11',
                  scrolled
                    ? 'bg-chocolate-800/8 hover:bg-chocolate-800/15 dark:bg-cream-200/10 dark:hover:bg-cream-200/15'
                    : 'bg-cream-50/10 hover:bg-cream-50/20',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel-400/50 focus-visible:ring-offset-2',
                )}
                aria-label={`Carrinho com ${count} ${count === 1 ? 'item' : 'itens'}`}
              >
                <ShoppingBag
                  className={cn(
                    'w-5 h-5',
                    scrolled
                      ? 'text-chocolate-800 dark:text-cream-200'
                      : 'text-cream-50',
                  )}
                />

                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: bouncing ? [1, 1.3, 1] : 1,
                        opacity: 1,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      className={cn(
                        'absolute -top-1 -right-1 flex items-center justify-center',
                        'min-w-[18px] h-[18px] px-1 rounded-full',
                        'bg-caramel-500 text-white',
                        'text-[10px] font-bold',
                        'shadow-sm',
                        'tabular-nums',
                      )}
                    >
                      {count > 99 ? '99+' : count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  'md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors',
                  scrolled
                    ? 'text-chocolate-800 dark:text-cream-200'
                    : 'text-cream-50',
                )}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div
          className={cn(
            'h-px',
            scrolled ? 'bg-border' : 'bg-transparent',
          )}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-40 glass md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={cn(
                    'text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    activeSection === item.href
                      ? 'bg-caramel-100 text-chocolate-800'
                      : 'text-cream-700 hover:bg-cream-200',
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
