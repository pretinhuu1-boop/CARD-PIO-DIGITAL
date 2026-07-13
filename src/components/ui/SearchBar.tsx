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
      animate={{ scale: isFocused ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'relative flex items-center rounded-2xl transition-all duration-300',
        'bg-white/70 backdrop-blur-xl border border-white/40',
        'shadow-lg shadow-black/5',
        'dark:bg-white/10 dark:border-white/15 dark:shadow-black/20',
        isFocused && 'border-[#8B1A4A]/30 shadow-[#8B1A4A]/10 dark:border-[#A0284C]/40',
        className,
      )}
    >
      <Search
        className={cn(
          'absolute left-4 h-5 w-5 transition-colors duration-200 pointer-events-none',
          isFocused
            ? 'text-[#8B1A4A] dark:text-[#E8A0B8]'
            : 'text-gray-400 dark:text-gray-500',
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
          'w-full bg-transparent py-3.5 pl-12 pr-10 text-sm font-medium',
          'text-gray-800 placeholder:text-gray-400',
          'dark:text-gray-100 dark:placeholder:text-gray-500',
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
              'absolute right-3 p-1 rounded-full',
              'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
              'dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-white/10',
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
