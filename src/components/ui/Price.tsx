import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/lib/data';

/**
 * O preço tem TRÊS casos e cada um significa uma coisa diferente para o
 * cliente. Espalhar `formatCurrency(product.price)` pela árvore fazia os dois
 * casos de exceção sumirem — este componente é o dono único da regra.
 *
 *   price = null        "Sob consulta"     a loja não publica preço
 *   priceFrom = true    "a partir de R$ X" o valor é PISO, não valor final
 *   caso comum          "R$ X"             preço fechado
 *
 * Publicar piso como preço fechado subestima a conta do cliente; publicar
 * "sob consulta" como R$ 0,00 inventa uma promessa. Os dois já aconteceram.
 */
export function Price({
  product,
  size = 'md',
  multiplier = 1,
}: {
  product: Pick<Product, 'price' | 'priceFrom' | 'originalPrice'>;
  size?: 'sm' | 'md' | 'lg';
  /** Quantidade, para o total de uma linha. Só se aplica a preço fechado. */
  multiplier?: number;
}) {
  const valueClass =
    size === 'lg'
      ? 'text-2xl font-bold'
      : size === 'sm'
        ? 'text-sm font-semibold'
        : 'text-base font-bold';

  if (product.price === null) {
    return (
      <span className={`${valueClass} text-ink-2`} data-price-mode="on-request">
        Sob consulta
      </span>
    );
  }

  return (
    <span className="inline-flex items-baseline gap-1.5">
      {product.originalPrice != null && (
        <span className="text-sm text-ink-3 line-through">
          {formatCurrency(product.originalPrice)}
        </span>
      )}
      {product.priceFrom && (
        <span className="text-xs font-medium text-ink-2">a partir de</span>
      )}
      <span
        className={`${valueClass} text-ink`}
        data-price-mode={product.priceFrom ? 'from' : 'fixed'}
      >
        {formatCurrency(product.price * multiplier)}
      </span>
    </span>
  );
}
