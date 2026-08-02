'use client';

import { MapPin, Clock, Phone } from 'lucide-react';
import { store } from '@/lib/config';
import { navSections } from '@/lib/data';

/** Mesma fonte do header. */
const navLinks = navSections.map((s) => ({
  label: s.footerLabel ?? s.label,
  href: `#${s.id}`,
}));

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="border-t border-line bg-surface-2">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h2 className="font-display text-xl text-ink">{store.name}</h2>
            <p className="text-sm leading-relaxed text-ink-2">{store.description}</p>
          </div>

          <nav className="space-y-3" aria-label="Rodapé">
            <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-ink-3">
              Navegação
            </h3>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="focus-ring inline-flex min-h-[44px] min-w-[44px] items-center rounded-sm text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-ink-3">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-ink-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ink-3" aria-hidden="true" />
                <span>{store.phoneDisplay}</span>
              </li>
              {store.address && (
                <li className="flex items-start gap-3 text-sm text-ink-2">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-3"
                    aria-hidden="true"
                  />
                  <span>{store.address}</span>
                </li>
              )}
              {store.social.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex min-h-[44px] min-w-[44px] items-center rounded-sm text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-ink-3">
              Horário
            </h3>
            <ul className="space-y-3">
              {store.hours.map((item) => (
                <li
                  key={item.day}
                  className="flex items-start gap-3 text-sm text-ink-2"
                >
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-3"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-medium text-ink">{item.day}:</strong>{' '}
                    {item.time ?? 'Fechado'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <p className="text-sm text-ink-3">
            &copy; {year} {store.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
