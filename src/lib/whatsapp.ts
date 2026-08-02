import { store } from '@/lib/config';
import type { CartItem, CustomerData } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

/**
 * Monta a mensagem de WhatsApp do pedido.
 *
 * Mantém o layout original do template: cabeçalho com o nome da loja, uma
 * linha com marcador por item e o bloco de valores prefixado por emoji. É o
 * formato que melhor se lê no app — o WhatsApp não renderiza tabela, e texto
 * em colunas quebra na tela do celular.
 *
 * Os blocos de observação e de dados do cliente só aparecem quando há
 * conteúdo, então um pedido simples continua tão curto quanto antes.
 */

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  /** `null` = não informado pela loja. Ver `StoreConfig.shippingFee`. */
  shipping: number | null;
  total: number;
  customer: CustomerData;
}

export function buildOrderMessage(order: OrderSummary): string {
  const { items, subtotal, shipping, total, customer } = order;
  const isPickup = customer.fulfillment === 'retirada';

  const lines: string[] = [];

  lines.push(`🛒 *Pedido — ${store.name}*`);
  lines.push('');

  for (const item of items) {
    const lineTotal = item.product.price * item.quantity;
    lines.push(
      `• ${item.quantity}x ${item.product.name} — ${formatCurrency(lineTotal)}`,
    );
    if (item.notes) lines.push(`  _obs: ${item.notes}_`);
  }

  lines.push('');
  lines.push(`📦 Subtotal: ${formatCurrency(subtotal)}`);
  lines.push(
    // `null` é "não informado" e `0` é gratuidade de fato — a distinção agora
    // está no tipo. Antes os dois casos moravam no mesmo `0`, e a página
    // prometia frete grátis que o lojista nunca declarou.
    `🚚 Entrega: ${
      isPickup
        ? 'Retirada no local'
        : shipping === null
          ? 'a combinar'
          : shipping === 0
            ? 'Grátis'
            : formatCurrency(shipping)
    }`,
  );
  lines.push(`💰 *Total: ${formatCurrency(total)}*`);

  const hasCustomerData =
    customer.name || customer.phone || customer.address || customer.payment;

  if (hasCustomerData) {
    lines.push('');
    if (customer.name) lines.push(`👤 ${customer.name}`);
    if (customer.phone) lines.push(`📱 ${customer.phone}`);
    if (!isPickup && customer.address) lines.push(`📍 ${customer.address}`);
    if (customer.payment) {
      lines.push(
        `💳 ${customer.payment}${
          customer.changeFor ? ` (troco para ${customer.changeFor})` : ''
        }`,
      );
    }
  }

  lines.push('');
  lines.push('Obrigado!');

  return lines.join('\n');
}

/**
 * Mensagem de interesse numa peça, para o formato expositor.
 *
 * O expositor não tem carrinho — a peça é única e o preço é orçado. O que a
 * página entrega é uma conversa que JÁ DIZ de qual peça se trata, para o
 * lojista não precisar perguntar "qual delas?" a cada contato.
 */
export function buildItemEnquiryMessage(productName: string): string {
  return `Olá! Vi *${productName}* no site e queria saber mais — preço, disponibilidade e prazo.`;
}

/** Monta a URL wa.me com a mensagem já codificada. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Para onde vai o botão de contato de um item.
 *
 * WhatsApp quando existe (leva a mensagem dizendo QUAL item); senão o canal
 * de agendamento; senão `null`, e o botão não é renderizado.
 */
export function itemContactHref(productName: string): string | null {
  if (store.whatsapp) {
    return buildWhatsAppUrl(buildItemEnquiryMessage(productName));
  }
  return store.bookingUrl;
}

/** Rótulo coerente com o destino: conversa não é a mesma coisa que agenda. */
export function itemContactLabel(): string {
  return store.whatsapp ? 'Perguntar' : 'Agendar';
}
