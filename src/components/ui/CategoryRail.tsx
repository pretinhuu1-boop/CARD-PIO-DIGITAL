'use client';

import type { Category } from '@/lib/data';
import { cn } from '@/lib/utils';

interface CategoryRailProps {
  categories: Category[];
  /** Slug da seção visível agora. Vem do scroll-spy, não de um filtro. */
  active: string;
  onNavigate: (slug: string) => void;
}

/**
 * Índice vertical de categorias, fixo na lateral no desktop.
 *
 * Substitui a faixa rolável horizontal, que tinha dois problemas medidos:
 * era onde morava o bug de arrasto (clique de mouse lido como arrasto), e
 * escondia categoria fora da tela — num catálogo de onze seções, metade do
 * cardápio ficava invisível até alguém descobrir que a faixa rolava.
 *
 * Aqui NÃO existe "Todos": o rail navega por âncora, e a página já mostra o
 * catálogo inteiro. `aria-current` marca a seção visível; não é um filtro
 * pressionado, e um `aria-pressed` diria a coisa errada ao leitor de tela.
 */
export function CategoryRail({ categories, active, onNavigate }: CategoryRailProps) {
  return (
    <nav aria-label="Seções do catálogo" className="sticky top-24">
      <ul className="space-y-0.5 border-l border-line">
        {categories.map((category) => {
          const isActive = active === category.slug;

          return (
            <li key={category.slug}>
              <button
                type="button"
                onClick={() => onNavigate(category.slug)}
                aria-current={isActive ? 'true' : undefined}
                data-category-slug={category.slug}
                className={cn(
                  'focus-ring relative -ml-px flex w-full items-center gap-2',
                  'min-h-[44px] border-l-2 py-2 pl-4 pr-2 text-left text-sm',
                  'transition-colors duration-200',
                  isActive
                    ? 'border-brand font-semibold text-ink'
                    : 'border-transparent text-ink-2 hover:border-line-strong hover:text-ink',
                )}
              >
                {category.emoji && (
                  <span className="text-base" aria-hidden="true">
                    {category.emoji}
                  </span>
                )}
                <span className="flex-1">{category.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
