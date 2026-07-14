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
  placeholder = 'Buscar doces, bolos, cafés...',
  debounceMs = 300,
  className,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debouncedOnChange = useCallback(
    (val: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange(val);
      }, debounceMs);
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
    setLocalValue('');
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <motion.div
      animate={{ scale: isFocused ? 1.01 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'relative flex items-center rounded-2xl transition-all duration-300',
        'bg-cream-100 border border-cream-300',
        'dark:bg-chocolate-800/50 dark:border-chocolate-600',
        isFocused && 'border-caramel-400 ring-2 ring-caramel-400/10 dark:border-caramel-500',
        className,
      )}
    >
      <Search
        className={cn(
          'absolute left-4 h-4.5 w-4.5 transition-colors duration-200 pointer-events-none',
          isFocused
            ? 'text-caramel-600 dark:text-caramel-400'
            : 'text-cream-600 dark:text-cream-600',
        )}
      />

      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          'w-full bg-transparent py-3.5 pl-12 pr-10 text-sm',
          'text-chocolate-800 placeholder:text-cream-600',
          'dark:text-cream-200 dark:placeholder:text-cream-600',
          'outline-none',
        )}
      />

      <AnimatePresence>
        {localValue.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            onClick={handleClear}
            className={cn(
              'absolute right-3 p-1.5 rounded-full',
              'text-cream-600 hover:text-chocolate-700 hover:bg-cream-200',
              'dark:text-cream-500 dark:hover:text-cream-200 dark:hover:bg-chocolate-700',
              'transition-colors duration-150',
            )}
            type="button"
            aria-label="Limpar busca"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export { SearchBar, type SearchBarProps };
