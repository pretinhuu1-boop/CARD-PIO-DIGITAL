import { store } from '@/lib/config';
import type { CartItem, CustomerData } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

/**
 * Monta a mensagem de WhatsApp no formato de nota PDV.
 *
 * O WhatsApp não renderiza tabelas, então as colunas são separadas por barras
 * literais — é o layout que mais se aproxima de uma nota impressa dentro da
 * limitação de formatação do app.
 */

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: CustomerData;
  orderNumber: string;
  /** Data/hora da emissão. Passada de fora para manter esta função pura. */
  issuedAt: Date;
}

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function buildOrderMessage(order: OrderSummary): string {
  const { items, subtotal, shipping, total, customer, orderNumber, issuedAt } = order;

  const lines: string[] = [];

  lines.push('*PEDIDO DE VENDA (NOTA PDV)*');
  lines.push(`${store.name} · Nº ${orderNumber} · ${formatDateTime(issuedAt)}`);
  lines.push('');

  lines.push('*PRODUTO | QTD | VALOR | TOTAL*');
  for (const item of items) {
    const lineTotal = item.product.price * item.quantity;
    lines.push(
      `${item.product.name} | ${item.quantity} | ${formatCurrency(item.product.price)} | ${formatCurrency(lineTotal)}`,
    );
    if (item.notes) lines.push(`_obs: ${item.notes}_`);
  }
  lines.push('');

  lines.push(`Subtotal | ${formatCurrency(subtotal)}`);
  lines.push(
    `Entrega | ${customer.fulfillment === 'retirada' ? 'Retirada no local' : shipping === 0 ? 'Grátis' : formatCurrency(shipping)}`,
  );
  lines.push(`*TOTAL | ${formatCurrency(total)}*`);
  lines.push('');

  lines.push('*DADOS DO CLIENTE*');
  lines.push(`Nome | ${customer.name}`);
  lines.push(`Telefone | ${customer.phone}`);
  lines.push(
    `Modalidade | ${customer.fulfillment === 'retirada' ? 'Retirada no local' : 'Entrega'}`,
  );
  if (customer.fulfillment === 'entrega' && customer.address) {
    lines.push(`Endereço | ${customer.address}`);
  }
  if (customer.payment) {
    lines.push(`Pagamento | ${customer.payment}`);
  }
  if (customer.changeFor) {
    lines.push(`Troco para | ${customer.changeFor}`);
  }

  return lines.join('\n');
}

/** Monta a URL wa.me com a mensagem já codificada. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}
