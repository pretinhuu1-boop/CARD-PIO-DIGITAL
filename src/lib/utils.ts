import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function calculateDiscount(
  originalPrice: number,
  currentPrice: number,
): number {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Minúsculas sem acento, para busca.
 * Sem isso "cafe" não encontra "Café" — e é assim que a maioria digita.
 */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}
