'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  /** Caminho em /public (ex.: '/produtos/item.webp') ou `null`. */
  src: string | null;
  alt: string;
  className?: string;
  /** Tamanho do ícone do placeholder. */
  iconClassName?: string;
  /** Dica de largura para o `srcset`. Ajuste se o contêiner mudar. */
  sizes?: string;
}

/**
 * Imagem de produto com placeholder neutro.
 *
 * O template em branco não tem imagens: `src` nulo renderiza um xadrez
 * discreto preservando a proporção do contêiner. Isso também cobre o caso de
 * uma imagem real falhar em produção — o layout nunca colapsa.
 *
 * Usa `next/image` com `fill`, então o contêiner precisa ter dimensão própria
 * (é o caso de todos os usos: grade, bottom sheet e carrinho).
 */
function ProductImage({
  src,
  alt,
  className,
  iconClassName,
  sizes = '(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 288px',
}: ProductImageProps) {
  if (!src) {
    return (
      <div
        className={cn(
          'image-placeholder flex h-full w-full items-center justify-center',
          className,
        )}
        role="img"
        aria-label={`${alt} (sem imagem)`}
      >
        <ImageIcon
          className={cn('text-ink-3 opacity-40', iconClassName ?? 'h-8 w-8')}
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div className={cn('relative h-full w-full', className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export { ProductImage, type ProductImageProps };
