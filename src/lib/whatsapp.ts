import { store } from '@/lib/config';
import type { CartItem } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

/**
 * Monta a mensagem de WhatsApp do pedido.
 *
 * Cabeçalho com o nome da loja, uma linha com marcador por item e o total.
 * É o formato que melhor se lê no app — o WhatsApp não renderiza tabela, e
 * texto em colunas quebra na tela do celular.
 *
 * A mensagem NÃO leva nome, telefone, endereço, forma de pagamento nem troco:
 * o cardápio não coleta esses dados. Entrega e pagamento se acertam na
 * conversa, com quem conhece a política real da loja.
 */

export interface OrderSummary {
  items: CartItem[];
  total: number;
}

export function buildOrderMessage(order: OrderSummary): string {
  const { items, total } = order;
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
  lines.push(`💰 *Total: ${formatCurrency(total)}*`);
  lines.push('');
  lines.push('Obrigado!');

  return lines.join('\n');
}

/** Monta a URL wa.me com a mensagem já codificada. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}
