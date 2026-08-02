'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar no cardápio...',
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
        aria-label="Buscar no cardápio"
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
            className="focus-ring absolute right-2 flex h-9 w-9 items-center justify-center rounded-full text-ink-3 transition-colors hover:bg-surface-3 hover:text-ink"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export { SearchBar, type SearchBarProps };
