'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { pieces, quotes, type Piece, type Quote } from '@/lib/data';
import { store, pieceMessage } from '@/lib/config';
import { cn } from '@/lib/utils';

/**
 * Expositor.
 *
 * Não é uma grade de produto: não há preço nem botão de comprar, porque a loja
 * não publica tabela e cada peça é única. A foto carrega a informação e a peça
 * inteira é um link — clicar abre a conversa já dizendo qual peça interessa.
 *
 * As vozes de clientes entram INTERCALADAS entre as imagens, e não numa seção
 * separada no fim. É o que dá o ritmo de exposição: obra, legenda, comentário.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function waLink(title: string) {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(pieceMessage(title))}`;
}

function PieceCard({ piece }: { piece: Piece }) {
  const disabled = store.whatsapp.trim() === '';

  const content = (
    <>
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-card bg-surface-2',
          piece.span === 'tall'
            ? 'aspect-[3/4]'
            : piece.span === 'wide'
              ? 'aspect-[4/3] sm:aspect-[16/10]'
              : 'aspect-square',
        )}
      >
        <Image
          src={piece.image}
          alt={piece.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {!disabled && (
          <span
            className={cn(
              'pointer-events-none absolute bottom-4 left-4 flex items-center gap-2',
              'rounded-full bg-surface/95 px-4 py-2.5 text-xs font-medium text-ink',
              'shadow-md backdrop-blur transition-opacity duration-300',
              // Visível por padrão no toque; no desktop aparece no hover/foco.
              'md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100',
            )}
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            Conversar sobre esta peça
          </span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-display text-lg leading-tight text-ink">
          {piece.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
          {piece.caption}
        </p>
      </div>
    </>
  );

  const classes = cn(
    'group block',
    piece.span === 'wide' && 'sm:col-span-2',
  );

  if (disabled) return <article className={classes}>{content}</article>;

  return (
    <motion.a
      variants={fadeUp}
      href={waLink(piece.title)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(classes, 'focus-ring rounded-card')}
      aria-label={`Conversar no WhatsApp sobre ${piece.title}`}
    >
      {content}
    </motion.a>
  );
}

function PullQuote({ quote }: { quote: Quote }) {
  return (
    <motion.figure
      variants={fadeUp}
      className="flex flex-col justify-center rounded-card bg-surface-2 p-8 sm:col-span-2 sm:p-12"
    >
      <blockquote className="font-display text-xl leading-snug text-ink sm:text-2xl">
        “{quote.text}”
      </blockquote>
      <figcaption className="mt-5 text-sm text-ink-3">
        {quote.name} · {quote.date} · Google
      </figcaption>
    </motion.figure>
  );
}

export function Showcase() {
  /*
    Intercala peça e comentário sem embaralhar: a cada 3 peças entra uma voz.
    Feito por índice, e não por sorteio, para a ordem ser estável entre builds
    e entre o site e o snapshot estático.
  */
  const itens: Array<{ tipo: 'peca'; dado: Piece } | { tipo: 'voz'; dado: Quote }> = [];
  let vozes = 0;
  pieces.forEach((p, i) => {
    itens.push({ tipo: 'peca', dado: p });
    if ((i + 1) % 3 === 0 && vozes < quotes.length) {
      itens.push({ tipo: 'voz', dado: quotes[vozes++] });
    }
  });

  return (
    <section
      id="expositor"
      className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mb-16 max-w-xl">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
          Expositor
        </span>
        <h2 className="mt-4 font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
          Peças em exposição
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ink-2">
          Cada kokedama é montada à mão, então não há duas iguais e não existe
          tabela de preço. Toque em uma peça para conversar sobre ela.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {itens.map((item) =>
          item.tipo === 'peca' ? (
            <PieceCard key={item.dado.id} piece={item.dado} />
          ) : (
            <PullQuote key={item.dado.id} quote={item.dado} />
          ),
        )}
      </motion.div>
    </section>
  );
}
