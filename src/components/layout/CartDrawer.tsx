"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";
import { useCart, type CartItem } from "@/lib/store";
import { store } from "@/lib/config";
import { products } from "@/lib/data";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProductImage } from "@/components/ui/ProductImage";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "cart" | "checkout";

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring" as const, stiffness: 400, damping: 40 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 24, height: 0 },
  visible: {
    opacity: 1,
    x: 0,
    height: "auto" as const,
    transition: { type: "spring" as const, stiffness: 400, damping: 28 },
  },
  exit: { opacity: 0, x: -24, height: 0, transition: { duration: 0.2 } },
};

/* -------------------------------------------------------------------------- */

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity, notes } = item;

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex gap-3 rounded-card border border-line bg-surface-2 p-3"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
        <ProductImage
          src={product.image}
          alt={product.name}
          iconClassName="h-5 w-5"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-medium text-ink">
          {product.name}
        </h4>
        <p className="mt-0.5 text-sm text-ink-2 tabular-nums">
          {formatCurrency(product.price)}
        </p>
        {notes && (
          <p className="mt-1 line-clamp-2 text-xs italic text-ink-3">
            obs: {notes}
          </p>
        )}

        <div className="mt-2 flex items-center gap-1">
          <button
            type="button"
            onClick={() => updateQuantity(item.lineId, quantity - 1)}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-ink transition-colors hover:bg-surface-3"
            aria-label={`Diminuir quantidade de ${product.name}`}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-ink tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(item.lineId, quantity + 1)}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-ink transition-colors hover:bg-surface-3"
            aria-label={`Aumentar quantidade de ${product.name}`}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => removeItem(item.lineId)}
            className="focus-ring ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-ink-3 transition-colors hover:bg-danger-soft hover:text-danger"
            aria-label={`Remover ${product.name} do pedido`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <span className="shrink-0 self-start text-sm font-semibold text-ink tabular-nums">
        {formatCurrency(product.price * quantity)}
      </span>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium text-ink-2">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-danger">
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "focus-ring w-full rounded-control border border-line bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-3";

/* -------------------------------------------------------------------------- */

/**
 * O painel só existe enquanto o carrinho está aberto. Manter a etapa
 * (`step`) aqui dentro faz ela voltar para 'cart' a cada abertura pelo
 * próprio ciclo de vida — sem precisar de um efeito de reset.
 */
function CartPanel({ onClose }: { onClose: () => void }) {
  const { items, total, count, customer, setCustomer, clearCart, addItem } =
    useCart();
  const [step, setStep] = useState<Step>("cart");
  const [submitted, setSubmitted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const isPickup = customer.fulfillment === "retirada";
  const freeByThreshold =
    store.freeShippingThreshold !== null &&
    total >= store.freeShippingThreshold;
  const shipping = isPickup || freeByThreshold ? 0 : store.shippingFee;
  const orderTotal = total + shipping;
  const belowMinimum = store.minimumOrder > 0 && total < store.minimumOrder;

  const cartProductIds = new Set(items.map((i) => i.product.id));
  const suggestions = products
    .filter((p) => !cartProductIds.has(p.id) && p.available)
    .slice(0, 2);

  // Erros derivados do estado atual, não guardados: assim a mensagem some
  // sozinha assim que o cliente corrige o campo, em vez de ficar na tela até
  // a próxima tentativa de envio.
  const validationErrors: Record<string, string> = {};
  if (!customer.name.trim()) validationErrors.name = "Informe seu nome";
  if (!customer.phone.trim())
    validationErrors.phone = "Informe um telefone para contato";
  if (!isPickup && !customer.address.trim())
    validationErrors.address = "Informe o endereço de entrega";

  // Só mostra erro depois da primeira tentativa de envio.
  const errors = submitted ? validationErrors : {};

  const handleSubmit = () => {
    setSubmitted(true);
    if (Object.keys(validationErrors).length > 0) return;

    const message = buildOrderMessage({
      items,
      subtotal: total,
      shipping,
      total: orderTotal,
      customer,
    });

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    clearCart();
    onClose();
  };

  const whatsappMissing = store.whatsapp.trim() === "";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/50"
        aria-hidden="true"
      />

      <motion.div
        variants={drawerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-surface shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-label="Seu pedido"
      >
        {/* Cabeçalho ------------------------------------------------- */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2.5">
            {step === "checkout" ? (
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2"
                aria-label="Voltar para o pedido"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            ) : (
              <ShoppingBag className="h-5 w-5 text-ink" aria-hidden="true" />
            )}
            <h2 className="font-display text-lg text-ink">
              {step === "cart" ? "Seu pedido" : "Seus dados"}
            </h2>
            {step === "cart" && count > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-surface-3 px-1.5 text-xs font-semibold text-ink-2 tabular-nums">
                {count}
              </span>
            )}
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <ShoppingBag
              className="mb-5 h-10 w-10 text-ink-3 opacity-50"
              aria-hidden="true"
            />
            <h3 className="font-display text-lg text-ink">
              Seu pedido está vazio
            </h3>
            <p className="mb-8 mt-2 max-w-[240px] text-sm text-ink-2">
              Escolha os itens no cardápio para montar seu pedido
            </p>
            <Button variant="primary" onClick={onClose}>
              Ver cardápio
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ) : step === "cart" ? (
          <>
            {(store.freeShippingThreshold !== null ||
              store.freeGiftThreshold !== null) && (
              <div className="space-y-3 border-b border-line px-5 py-4">
                {store.freeShippingThreshold !== null && (
                  <ProgressBar
                    current={total}
                    target={store.freeShippingThreshold}
                    label="Frete grátis"
                    completedText="Frete grátis liberado"
                  />
                )}
                {store.freeGiftThreshold !== null && (
                  <ProgressBar
                    current={total}
                    target={store.freeGiftThreshold}
                    label="Brinde"
                    completedText="Brinde garantido"
                  />
                )}
              </div>
            )}

            <div className="flex-1 space-y-2.5 overflow-y-auto overscroll-contain px-5 py-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <CartItemRow key={item.lineId} item={item} />
                ))}
              </AnimatePresence>

              {suggestions.length > 0 && (
                <div className="mt-6 border-t border-line pt-4">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-3">
                    Adicionar também
                  </p>
                  <div className="space-y-2">
                    {suggestions.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => addItem(product, 1)}
                        className="focus-ring flex w-full items-center gap-2.5 rounded-control border border-line bg-surface-2 p-2.5 text-left transition-colors hover:border-line-strong"
                      >
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                          <ProductImage
                            src={product.image}
                            alt={product.name}
                            iconClassName="h-4 w-4"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-ink">
                            {product.name}
                          </p>
                          <p className="text-xs text-ink-2 tabular-nums">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                        <Plus className="h-4 w-4 shrink-0 text-ink-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3 border-t border-line bg-surface-2 px-5 py-4">
              <div className="flex justify-between text-sm">
                <span className="text-ink-2">Subtotal</span>
                <span className="font-medium text-ink tabular-nums">
                  {formatCurrency(total)}
                </span>
              </div>

              {belowMinimum && (
                <p className="flex items-start gap-1.5 rounded-control bg-warning-soft px-3 py-2 text-xs text-warning">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  Pedido mínimo de {formatCurrency(store.minimumOrder)}. Faltam{" "}
                  {formatCurrency(store.minimumOrder - total)}.
                </p>
              )}

              <Button
                variant="primary"
                fullWidth
                disabled={belowMinimum}
                onClick={() => setStep("checkout")}
              >
                Continuar
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-4">
              <Field label="Nome completo" id="c-name" error={errors.name}>
                <input
                  id="c-name"
                  type="text"
                  autoComplete="name"
                  value={customer.name}
                  onChange={(e) => setCustomer({ name: e.target.value })}
                  placeholder="Seu nome"
                  className={inputClass}
                />
              </Field>

              <Field label="Telefone" id="c-phone" error={errors.phone}>
                <input
                  id="c-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                  className={inputClass}
                />
              </Field>

              <fieldset>
                <legend className="text-xs font-medium text-ink-2">
                  Como prefere receber
                </legend>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {(["entrega", "retirada"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCustomer({ fulfillment: option })}
                      aria-pressed={customer.fulfillment === option}
                      className={cn(
                        "focus-ring min-h-[48px] rounded-control border text-sm font-medium capitalize transition-colors",
                        customer.fulfillment === option
                          ? "border-brand bg-brand text-on-brand"
                          : "border-line bg-surface-2 text-ink-2 hover:text-ink",
                      )}
                    >
                      {option === "entrega" ? "Entrega" : "Retirada"}
                    </button>
                  ))}
                </div>
              </fieldset>

              {!isPickup && (
                <Field
                  label="Endereço de entrega"
                  id="c-address"
                  error={errors.address}
                >
                  <textarea
                    id="c-address"
                    rows={2}
                    autoComplete="street-address"
                    value={customer.address}
                    onChange={(e) => setCustomer({ address: e.target.value })}
                    placeholder="Rua, número, complemento, bairro"
                    className={cn(inputClass, "resize-none")}
                  />
                </Field>
              )}

              {store.paymentMethods.length > 0 && (
                <Field label="Forma de pagamento" id="c-payment">
                  <select
                    id="c-payment"
                    value={customer.payment}
                    onChange={(e) => setCustomer({ payment: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Combinar no WhatsApp</option>
                    {store.paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {customer.payment.toLowerCase().includes("dinheiro") && (
                <Field label="Troco para quanto?" id="c-change">
                  <input
                    id="c-change"
                    type="text"
                    inputMode="decimal"
                    value={customer.changeFor}
                    onChange={(e) => setCustomer({ changeFor: e.target.value })}
                    placeholder="Ex.: R$ 100,00 — deixe vazio se não precisa"
                    className={inputClass}
                  />
                </Field>
              )}
            </div>

            <div className="space-y-3 border-t border-line bg-surface-2 px-5 py-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-2">Subtotal</span>
                  <span className="font-medium text-ink tabular-nums">
                    {formatCurrency(total)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-2">Entrega</span>
                  <span
                    className={cn(
                      "font-medium tabular-nums",
                      shipping === 0 ? "text-success" : "text-ink",
                    )}
                  >
                    {isPickup
                      ? "Retirada"
                      : shipping === 0
                        ? "Grátis"
                        : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="h-px bg-line" />
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-ink">
                    Total
                  </span>
                  <span className="text-base font-bold text-ink tabular-nums">
                    {formatCurrency(orderTotal)}
                  </span>
                </div>
              </div>

              {whatsappMissing ? (
                <p className="flex items-start gap-1.5 rounded-control bg-warning-soft px-3 py-2 text-xs text-warning">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  Número de WhatsApp não configurado. Preencha `whatsapp` em
                  src/lib/config.ts.
                </p>
              ) : (
                <Button
                  variant="whatsapp"
                  fullWidth
                  size="lg"
                  onClick={handleSubmit}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Enviar pedido pelo WhatsApp
                </Button>
              )}

              <p className="text-center text-xs text-ink-3">
                O pedido abre no WhatsApp já formatado, pronto para enviar.
              </p>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && <CartPanel onClose={onClose} />}
    </AnimatePresence>
  );
}

export { CartDrawer };
