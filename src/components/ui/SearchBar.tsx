'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Rótulo do campo para leitor de tela. */
  label?: string;
  /**
   * Foca ao montar. Usado quando o campo aparece por ação do visitante — no
   * celular a busca nasce como ícone e só vira campo ao ser tocada; sem foco
   * automático o teclado não abre e o toque parece não ter feito nada.
   */
  autoFocus?: boolean;
  debounceMs?: number;
  className?: string;
}

function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar no catálogo...',
  label = 'Buscar no catálogo',
  autoFocus = false,
  debounceMs = 250,
  className,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sincroniza com o valor externo durante a renderização, não num efeito:
  // um efeito aqui dispararia uma renderização em cascata a cada tecla.
  const [syncedValue, setSyncedValue] = useState(value);
  if (value !== syncedValue) {
    setSyncedValue(value);
    setLocalValue(value);
  }

  const debouncedOnChange = useCallback(
    (val: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => onChange(val), debounceMs);
    },
    [onChange, debounceMs],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  /*
    Foco explícito em vez do atributo `autoFocus`.

    Medido: ao abrir a busca do celular, o campo montava sem foco e o teclado
    não subia — o visitante tocava na lupa e nada parecia acontecer. O atributo
    é uma dica que o navegador pode ignorar (e ignora, quando o elemento monta
    dentro de uma troca de estado do React); chamar `focus()` no efeito não é.
  */
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    debouncedOnChange(val);
  };

  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setLocalValue('');
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'relative flex items-center rounded-control border bg-surface-2',
        'transition-colors duration-200',
        isFocused ? 'border-brand' : 'border-line',
        className,
      )}
    >
      <Search
        className="pointer-events-none absolute left-4 h-4 w-4 text-ink-3"
        aria-hidden="true"
      />

      <input
        ref={inputRef}
        type="search"
        value={localValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        aria-label={label}
        autoFocus={autoFocus}
        className={cn(
          'w-full bg-transparent py-3.5 pl-11 pr-11 text-sm',
          'text-ink placeholder:text-ink-3',
          'outline-none [&::-webkit-search-cancel-button]:hidden',
        )}
      />

      <AnimatePresence>
        {localValue.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            onClick={handleClear}
            type="button"
            aria-label="Limpar busca"
            /* 44px no toque: 36 reprovava o mínimo de alvo em celular. */
            className="focus-ring absolute right-1.5 flex h-11 w-11 items-center justify-center rounded-full text-ink-3 transition-colors hover:bg-surface-3 hover:text-ink sm:right-2 sm:h-9 sm:w-9"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export { SearchBar, type SearchBarProps };
