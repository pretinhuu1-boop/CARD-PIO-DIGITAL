'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { useCart, type CartItem } from '@/lib/store';
import { products, freeShippingThreshold, freeGiftThreshold } from '@/lib/data';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: '100%',
    transition: { type: 'spring' as const, stiffness: 400, damping: 40 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30, height: 0 },
  visible: {
    opacity: 1,
    x: 0,
    height: 'auto' as const,
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
  },
  exit: {
    opacity: 0,
    x: -30,
    height: 0,
    transition: { duration: 0.25 },
  },
};

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        'flex gap-3 p-3 rounded-2xl',
        'bg-white/60 dark:bg-white/5',
        'border border-[#8B1A4A]/5 dark:border-white/5',
      )}
    >
      {/* Product image placeholder */}
      <div
        className={cn(
          'w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center',
          'bg-gradient-to-br from-[#8B1A4A]/10 to-[#D4A853]/10',
          'dark:from-[#8B1A4A]/20 dark:to-[#D4A853]/20',
          'text-2xl',
        )}
      >
        🧁
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
          {product.name}
        </h4>
        <p className="text-sm font-bold text-[#8B1A4A] dark:text-[#D4A853] mt-0.5">
          {formatCurrency(product.price)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-1.5 mt-2">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className={cn(
              'flex items-center justify-center w-7 h-7 rounded-lg',
              'bg-[#8B1A4A]/10 hover:bg-[#8B1A4A]/20',
              'dark:bg-[#E8A0B8]/10 dark:hover:bg-[#E8A0B8]/20',
              'text-[#8B1A4A] dark:text-[#E8A0B8]',
              'transition-colors duration-150',
            )}
            aria-label="Diminuir quantidade"
          >
            <Minus className="w-3.5 h-3.5" />
          </motion.button>

          <motion.span
            key={quantity}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className="w-8 text-center text-sm font-bold text-gray-900 dark:text-gray-100 tabular-nums"
          >
            {quantity}
          </motion.span>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className={cn(
              'flex items-center justify-center w-7 h-7 rounded-lg',
              'bg-[#8B1A4A]/10 hover:bg-[#8B1A4A]/20',
              'dark:bg-[#E8A0B8]/10 dark:hover:bg-[#E8A0B8]/20',
              'text-[#8B1A4A] dark:text-[#E8A0B8]',
              'transition-colors duration-150',
            )}
            aria-label="Aumentar quantidade"
          >
            <Plus className="w-3.5 h-3.5" />
          </motion.button>

          {/* Remove */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => removeItem(product.id)}
            className={cn(
              'ml-auto flex items-center justify-center w-7 h-7 rounded-lg',
              'hover:bg-red-50 dark:hover:bg-red-900/20',
              'text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400',
              'transition-colors duration-150',
            )}
            aria-label={`Remover ${product.name}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      {/* Line total */}
      <div className="flex-shrink-0 self-start">
        <span className="text-sm font-bold text-gray-700 dark:text-gray-300 tabular-nums">
          {formatCurrency(product.price * quantity)}
        </span>
      </div>
    </motion.div>
  );
}

function SuggestionCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  const { addItem } = useCart();

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => addItem(product)}
      className={cn(
        'flex items-center gap-2.5 p-2.5 rounded-xl w-full text-left',
        'bg-white/60 dark:bg-white/5',
        'border border-[#D4A853]/20 dark:border-[#D4A853]/10',
        'hover:border-[#D4A853]/40 dark:hover:border-[#D4A853]/30',
        'transition-colors duration-200',
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center',
          'bg-gradient-to-br from-[#D4A853]/20 to-[#8B1A4A]/10',
          'text-lg',
        )}
      >
        🍰
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
          {product.name}
        </p>
        <p className="text-xs font-bold text-[#8B1A4A] dark:text-[#D4A853]">
          {formatCurrency(product.price)}
        </p>
      </div>
      <Plus className="w-4 h-4 text-[#8B1A4A] dark:text-[#D4A853] flex-shrink-0" />
    </motion.button>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center"
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="text-6xl mb-6"
      >
        🧁
      </motion.div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
        Seu carrinho esta vazio
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-[220px]">
        Explore nosso cardapio e adicione deliciosas opcoes ao seu pedido
      </p>
      <Button variant="primary" onClick={onClose}>
        Ver Cardapio
        <ChevronRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}

function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, count, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const shipping = total >= freeShippingThreshold ? 0 : 9.90;
  const orderTotal = total + shipping;

  // Suggestions: products not already in cart
  const cartProductIds = new Set(items.map((i) => i.product.id));
  const suggestions = products
    .filter((p) => !cartProductIds.has(p.id) && p.available)
    .slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed top-0 right-0 bottom-0 z-[70]',
              'w-full max-w-md',
              'bg-[#FFF8F0]/95 dark:bg-[#1A0A10]/95',
              'backdrop-blur-xl',
              'shadow-2xl shadow-black/20',
              'flex flex-col',
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de compras"
          >
            {/* Header */}
            <div
              className={cn(
                'flex items-center justify-between px-5 py-4',
                'border-b border-[#8B1A4A]/10 dark:border-white/5',
              )}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#8B1A4A] dark:text-[#E8A0B8]" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Seu Pedido
                </h2>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      'flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full',
                      'bg-[#8B1A4A]/10 dark:bg-[#E8A0B8]/10',
                      'text-xs font-bold text-[#8B1A4A] dark:text-[#E8A0B8]',
                      'tabular-nums',
                    )}
                  >
                    {count}
                  </motion.span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-full',
                  'bg-gray-100 hover:bg-gray-200',
                  'dark:bg-white/5 dark:hover:bg-white/10',
                  'text-gray-500 dark:text-gray-400',
                  'transition-colors duration-150',
                )}
                aria-label="Fechar carrinho"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {items.length === 0 ? (
              <EmptyState onClose={onClose} />
            ) : (
              <>
                {/* Progress bars */}
                <div className="px-5 py-4 space-y-3 border-b border-[#8B1A4A]/5 dark:border-white/5">
                  <ProgressBar
                    current={total}
                    target={freeShippingThreshold}
                    label="Frete Gratis"
                    icon="🚚"
                    completedText="Frete gratis desbloqueado!"
                  />
                  <ProgressBar
                    current={total}
                    target={freeGiftThreshold}
                    label="Brinde Especial"
                    icon="🎁"
                    completedText="Brinde garantido!"
                  />
                </div>

                {/* Scrollable items */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-3 space-y-2.5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItemRow key={item.product.id} item={item} />
                    ))}
                  </AnimatePresence>

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-[#8B1A4A]/5 dark:border-white/5">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Que tal adicionar?
                      </p>
                      <div className="space-y-2">
                        {suggestions.map((product) => (
                          <SuggestionCard
                            key={product.id}
                            product={product}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Order summary + CTA */}
                <div
                  className={cn(
                    'px-5 py-4 space-y-3',
                    'border-t border-[#8B1A4A]/10 dark:border-white/5',
                    'bg-white/40 dark:bg-black/20',
                  )}
                >
                  {/* Summary lines */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Subtotal
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 tabular-nums">
                        {formatCurrency(total)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Entrega
                      </span>
                      <span
                        className={cn(
                          'font-semibold tabular-nums',
                          shipping === 0
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-gray-800 dark:text-gray-200',
                        )}
                      >
                        {shipping === 0 ? 'Gratis' : formatCurrency(shipping)}
                      </span>
                    </div>
                    <div className="h-px bg-[#8B1A4A]/10 dark:bg-white/5" />
                    <div className="flex justify-between">
                      <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                        Total
                      </span>
                      <span className="text-base font-bold text-[#8B1A4A] dark:text-[#D4A853] tabular-nums">
                        {formatCurrency(orderTotal)}
                      </span>
                    </div>
                  </div>

                  <Button variant="primary" fullWidth size="lg">
                    Finalizar Pedido
                    <ChevronRight className="w-5 h-5" />
                  </Button>

                  <Button variant="ghost" fullWidth size="sm" onClick={onClose}>
                    Continuar Comprando
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { CartDrawer };
