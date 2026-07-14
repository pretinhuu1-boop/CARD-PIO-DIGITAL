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

const WHATSAPP_NUMBER = '5511983990000';

function generateWhatsAppMessage(items: CartItem[], total: number, shipping: number) {
  let msg = '🧁 *Pedido Doces Dondoca*\n\n';
  items.forEach((item) => {
    msg += `• ${item.quantity}x ${item.product.name} — ${formatCurrency(item.product.price * item.quantity)}\n`;
  });
  msg += `\n📦 Subtotal: ${formatCurrency(total)}`;
  msg += `\n🚚 Entrega: ${shipping === 0 ? 'Grátis' : formatCurrency(shipping)}`;
  msg += `\n💰 *Total: ${formatCurrency(total + shipping)}*`;
  msg += '\n\nObrigado!';
  return msg;
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
        'bg-cream-100/60 dark:bg-chocolate-800/40',
        'border border-cream-300/50 dark:border-chocolate-600/50',
      )}
    >
      <div
        className={cn(
          'w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden',
          !product.image && 'bg-cream-200 flex items-center justify-center',
        )}
      >
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
        ) : (
          <span className="text-2xl">🍰</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-chocolate-800 dark:text-cream-200 truncate">
          {product.name}
        </h4>
        <p className="text-sm font-semibold text-chocolate-700 dark:text-caramel-400 mt-0.5">
          {formatCurrency(product.price)}
        </p>

        <div className="flex items-center gap-1.5 mt-2">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-cream-200 hover:bg-cream-300 dark:bg-chocolate-700 dark:hover:bg-chocolate-600 text-chocolate-700 dark:text-cream-300 transition-colors"
            aria-label="Diminuir quantidade"
          >
            <Minus className="w-3.5 h-3.5" />
          </motion.button>

          <motion.span
            key={quantity}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className="w-8 text-center text-sm font-semibold text-chocolate-800 dark:text-cream-200 tabular-nums"
          >
            {quantity}
          </motion.span>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-cream-200 hover:bg-cream-300 dark:bg-chocolate-700 dark:hover:bg-chocolate-600 text-chocolate-700 dark:text-cream-300 transition-colors"
            aria-label="Aumentar quantidade"
          >
            <Plus className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => removeItem(product.id)}
            className="ml-auto flex items-center justify-center w-7 h-7 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-cream-500 hover:text-red-500 dark:text-cream-600 dark:hover:text-red-400 transition-colors"
            aria-label={`Remover ${product.name}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      <div className="flex-shrink-0 self-start">
        <span className="text-sm font-semibold text-chocolate-700 dark:text-cream-300 tabular-nums">
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => addItem(product)}
      className={cn(
        'flex items-center gap-2.5 p-2.5 rounded-xl w-full text-left',
        'bg-cream-100/60 dark:bg-chocolate-800/40',
        'border border-cream-300/50 dark:border-chocolate-600/50',
        'hover:border-caramel-400/40 dark:hover:border-caramel-500/30',
        'transition-colors duration-200',
      )}
    >
      <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden bg-cream-200">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-lg">🍰</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-chocolate-800 dark:text-cream-200 truncate">
          {product.name}
        </p>
        <p className="text-xs font-semibold text-chocolate-700 dark:text-caramel-400">
          {formatCurrency(product.price)}
        </p>
      </div>
      <Plus className="w-4 h-4 text-caramel-500 flex-shrink-0" />
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
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="text-5xl mb-6 opacity-40"
      >
        🧁
      </motion.div>
      <h3 className="text-lg font-display text-chocolate-800 dark:text-cream-200 mb-2">
        Seu carrinho está vazio
      </h3>
      <p className="text-sm text-cream-600 dark:text-cream-500 mb-8 max-w-[220px]">
        Explore nosso cardápio e adicione delícias ao seu pedido
      </p>
      <Button variant="primary" onClick={onClose}>
        Ver Cardápio
        <ChevronRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}

function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, count } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const shipping = total >= freeShippingThreshold ? 0 : 9.90;
  const orderTotal = total + shipping;

  const cartProductIds = new Set(items.map((i) => i.product.id));
  const suggestions = products
    .filter((p) => !cartProductIds.has(p.id) && p.available)
    .slice(0, 3);

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage(items, total, shipping);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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

          <motion.div
            ref={drawerRef}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed top-0 right-0 bottom-0 z-[70]',
              'w-full max-w-md',
              'bg-[var(--background)]/95 dark:bg-chocolate-900/95',
              'backdrop-blur-xl',
              'shadow-2xl shadow-black/15',
              'flex flex-col',
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de compras"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream-300/50 dark:border-chocolate-700">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-chocolate-700 dark:text-cream-300" />
                <h2 className="text-lg font-display text-chocolate-800 dark:text-cream-100">
                  Seu Pedido
                </h2>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-caramel-100 dark:bg-caramel-800/30 text-xs font-semibold text-caramel-700 dark:text-caramel-400 tabular-nums"
                  >
                    {count}
                  </motion.span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-cream-200 hover:bg-cream-300 dark:bg-chocolate-700 dark:hover:bg-chocolate-600 text-cream-600 dark:text-cream-400 transition-colors"
                aria-label="Fechar carrinho"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {items.length === 0 ? (
              <EmptyState onClose={onClose} />
            ) : (
              <>
                <div className="px-5 py-4 space-y-3 border-b border-cream-300/30 dark:border-chocolate-700/50">
                  <ProgressBar
                    current={total}
                    target={freeShippingThreshold}
                    label="Frete Grátis"
                    icon="🚚"
                    completedText="Frete grátis desbloqueado!"
                  />
                  <ProgressBar
                    current={total}
                    target={freeGiftThreshold}
                    label="Brinde Especial"
                    icon="🎁"
                    completedText="Brinde garantido!"
                  />
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-3 space-y-2.5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItemRow key={item.product.id} item={item} />
                    ))}
                  </AnimatePresence>

                  {suggestions.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-cream-300/30 dark:border-chocolate-700/50">
                      <p className="text-xs font-medium text-cream-600 dark:text-cream-500 uppercase tracking-wider mb-3">
                        Que tal adicionar?
                      </p>
                      <div className="space-y-2">
                        {suggestions.map((product) => (
                          <SuggestionCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-5 py-4 space-y-3 border-t border-cream-300/50 dark:border-chocolate-700 bg-cream-50/50 dark:bg-chocolate-900/50">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-cream-600 dark:text-cream-500">Subtotal</span>
                      <span className="font-medium text-chocolate-800 dark:text-cream-200 tabular-nums">
                        {formatCurrency(total)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cream-600 dark:text-cream-500">Entrega</span>
                      <span className={cn(
                        'font-medium tabular-nums',
                        shipping === 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-chocolate-800 dark:text-cream-200',
                      )}>
                        {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
                      </span>
                    </div>
                    <div className="h-px bg-cream-300/50 dark:bg-chocolate-700" />
                    <div className="flex justify-between">
                      <span className="text-base font-semibold text-chocolate-800 dark:text-cream-100">
                        Total
                      </span>
                      <span className="text-base font-bold text-chocolate-800 dark:text-cream-100 tabular-nums">
                        {formatCurrency(orderTotal)}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleWhatsAppOrder}
                    className="w-full py-4 rounded-xl font-medium text-[15px] bg-[#25D366] text-white hover:bg-[#20BD5A] shadow-md shadow-[#25D366]/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Finalizar Pedido via WhatsApp
                  </motion.button>

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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export { CartDrawer };
