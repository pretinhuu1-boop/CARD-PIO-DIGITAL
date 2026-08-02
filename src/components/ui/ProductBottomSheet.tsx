'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus, MessageCircle } from 'lucide-react';
import { type Product } from '@/lib/data';
import { hasPrice } from '@/lib/format';
import { useCart } from '@/lib/store';
import { store } from '@/lib/config';
import { buildItemEnquiryMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { cn, formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import { ProductImage } from '@/components/ui/ProductImage';

interface ProductBottomSheetProps {
  product: Product;
  onClose: () => void;
}

export function ProductBottomSheet({ product, onClose }: ProductBottomSheetProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const closeRef = useRef<HTMLButtonElement>(null);

  /**
   * Produto com preço resolvido, ou `null` para "sob consulta".
   *
   * Repare que a checagem é `hasPrice`, não `isSellable`: item indisponível
   * MAS com preço continua mostrando valor e o botão desabilitado — quem
   * chegou ali precisa saber quanto custava. Sem preço nenhum é outro caso, e
   * a folha inteira muda de comportamento.
   */
  const sellable = hasPrice(product) ? product : null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  /**
   * Adiciona SOMA ao que já existe no carrinho — antes substituía a
   * quantidade, o que contradizia o rótulo "Adicionar".
   * A observação vai junto: cada texto diferente vira uma linha própria.
   */
  const handleAddToCart = () => {
    addItem(product, quantity, notes);
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/50"
        aria-hidden="true"
      />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed inset-x-0 bottom-0 z-[70] mx-auto max-w-lg',
          'max-h-[92vh] overflow-y-auto overscroll-contain',
          'rounded-t-sheet bg-surface shadow-lg',
        )}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        <div className="sticky top-0 z-10 flex justify-center bg-surface pb-2 pt-3">
          <div className="h-1 w-10 rounded-full bg-line-strong" />
        </div>

        <button
          ref={closeRef}
          onClick={onClose}
          className="focus-ring absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-ink-2 transition-colors hover:bg-surface-3 hover:text-ink"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <ProductImage
            src={product.image}
            alt={product.name}
            iconClassName="h-12 w-12"
          />
          {product.badge && (
            <div className="absolute bottom-4 left-4">
              <Badge badge={product.badge} />
            </div>
          )}
        </div>

        <div className="px-6 pb-8 pt-5">
          <h2 className="font-display text-2xl text-ink">{product.name}</h2>

          <div className="mt-2">
            <Price product={product} size="lg" />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-2">
            {product.description}
          </p>

          {product.servings && (
            <p className="mt-3 text-sm text-ink-3">{product.servings}</p>
          )}

          {/* Observação pertence ao PEDIDO. No expositor não há pedido, então
              pedir "observações" aqui seria campo sem destino. */}
          {sellable && (
            <div className="mt-6 border-t border-line pt-5">
              <label
                htmlFor="product-notes"
                className="text-xs font-medium uppercase tracking-[0.12em] text-ink-3"
              >
                Observações
              </label>
              <textarea
                id="product-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex.: sem cebola, embalar para presente..."
                rows={2}
                maxLength={200}
                className="focus-ring mt-2 w-full resize-none rounded-control border border-line bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-3"
              />
              <p className="mt-1 text-xs text-ink-3">
                A observação é enviada junto no pedido pelo WhatsApp.
              </p>
            </div>
          )}

          {/* Sem preço: a peça é orçada. O botão abre a conversa já dizendo
              qual peça, para o lojista não ter de perguntar "qual delas?". */}
          {!sellable && store.whatsapp && (
            <a
              href={buildWhatsAppUrl(buildItemEnquiryMessage(product.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-control bg-brand px-5 font-medium text-on-brand transition-colors hover:bg-brand-hover"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Perguntar sobre esta peça
            </a>
          )}

          {sellable && (
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-control border border-line bg-surface-2 p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-3 disabled:opacity-40"
                aria-label="Diminuir quantidade"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span
                className="w-8 text-center font-semibold text-ink tabular-nums"
                aria-live="polite"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-3"
                aria-label="Aumentar quantidade"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={!product.available}
              className={cn(
                'focus-ring flex min-h-[52px] flex-1 items-center justify-center gap-2',
                'rounded-control bg-brand px-5 font-medium text-on-brand',
                'transition-colors hover:bg-brand-hover',
                'disabled:cursor-not-allowed disabled:opacity-50',
              )}
            >
              {product.available ? (
                <>
                  <span>Adicionar</span>
                  <span className="opacity-75 tabular-nums">
                    {formatCurrency(sellable.price * quantity)}
                  </span>
                </>
              ) : (
                'Indisponível'
              )}
            </motion.button>
          </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
