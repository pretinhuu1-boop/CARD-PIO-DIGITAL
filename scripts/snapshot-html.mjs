import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ORIGIN = process.argv[2] ?? 'http://localhost:3100';
const REPO = new URL('..', import.meta.url).pathname;
// Nome de saída por env: o mesmo gerador serve qualquer loja.
const OUT = join(REPO, process.env.SNAPSHOT_OUT ?? 'cardapio.html');

const mime = (f) =>
  f.endsWith('.webp') ? 'image/webp'
  : f.endsWith('.woff2') ? 'font/woff2'
  : f.endsWith('.png') ? 'image/png'
  : 'application/octet-stream';

const get = async (path) => {
  const r = await fetch(ORIGIN + path);
  if (!r.ok) throw new Error(`${path} -> ${r.status}`);
  return r;
};

let html = await (await get('/')).text();

/* 1. CSS: baixa cada folha e embute, inlinando as fontes que ela referencia. */
const cssHrefs = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((m) => m[1]);
let css = '';
for (const href of cssHrefs) {
  let sheet = await (await get(href)).text();
  // As urls do @font-face são relativas à própria folha (`../media/x.woff2`),
  // e a folha vive em /_next/static/css/ — daí a resolução contra `href`.
  const base = new URL(href, ORIGIN);
  const fontUrls = [...new Set([...sheet.matchAll(/url\(([^)"']+?\.woff2)\)/g)].map((m) => m[1]))];
  for (const fu of fontUrls) {
    const abs = new URL(fu, base).pathname;
    const buf = Buffer.from(await (await get(abs)).arrayBuffer());
    sheet = sheet.replaceAll(fu, `data:font/woff2;base64,${buf.toString('base64')}`);
  }
  console.log(`  fontes embutidas: ${fontUrls.length}`);
  css += sheet + '\n';
}
console.log(`css: ${cssHrefs.length} folha(s), ${(css.length / 1024).toFixed(0)} KB`);

/* 2. Imagens: troca as URLs do otimizador do Next pelo arquivo local em base64. */
let imgCount = 0;
html = html.replace(/(src|srcSet|srcset)="([^"]*\/_next\/image[^"]*)"/g, (full, attr, val) => {
  const m = decodeURIComponent(val).match(/url=(\/[^&\s]+)/);
  if (!m) return '';
  const file = join(REPO, 'public', m[1]);
  if (!existsSync(file)) return '';
  if (attr === 'src') {
    imgCount++;
    const b64 = readFileSync(file).toString('base64');
    return `src="data:${mime(file)};base64,${b64}"`;
  }
  return ''; // srcset removido: uma única fonte embutida basta
});

/* 3. Qualquer referência direta a um arquivo de /public — inclusive o
      background-image inline do hero, que NÃO passa pelo otimizador do Next e
      por isso escapava do passo anterior. Sem isto o hero fica preto quando o
      arquivo é aberto fora de um servidor que sirva /produtos. */
const asDataUri = (publicPath) => {
  const file = join(REPO, 'public', publicPath);
  if (!existsSync(file)) return null;
  return `data:${mime(file)};base64,${readFileSync(file).toString('base64')}`;
};

html = html.replace(/url\((&quot;|"|')?(\/(?:produtos|pecas|loja)\/[^)"'&]+)\1?\)/g, (full, q, p) => {
  const uri = asDataUri(p);
  if (!uri) return full;
  imgCount++;
  return `url(${q ?? ''}${uri}${q ?? ''})`;
});

html = html.replace(/src="(\/(?:produtos|pecas|loja)\/[^"]+)"/g, (full, p) => {
  const uri = asDataUri(p);
  if (!uri) return full;
  imgCount++;
  return `src="${uri}"`;
});
console.log(`imagens embutidas: ${imgCount}`);

/* 4. Sem o React, `loading="lazy"` nunca dispara o observer que troca a
      imagem — as de baixo da dobra ficariam em branco para sempre. */
html = html.replace(/\sloading="lazy"/g, '').replace(/\sdecoding="async"/g, '');

/* 4. Fora o runtime do React: o snapshot é estático, e scripts apontando para
      /_next/ só produziriam 404 ao abrir o arquivo direto do disco. */
html = html
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<link[^>]+rel="stylesheet"[^>]*>/g, '')
  .replace(/<link[^>]+rel="preload"[^>]*>/g, '');

/* 5. Injeta o CSS e um aviso de proveniência. */
const banner = `<!--
  Caracol Chocolates Tatuapé — cardápio digital
  Snapshot estático gerado em ${new Date().toISOString().slice(0, 10)} a partir de ${ORIGIN}.
  Arquivo único e autossuficiente: CSS, fontes e imagens embutidos em base64.
  Abre com duplo clique — sem servidor, sem build, sem rede.

  Filtro por categoria, busca e pedido pelo WhatsApp funcionam: são
  reimplementados em JavaScript puro no fim do <body>, lendo o catálogo dos
  data-attributes de cada card. Nada do React vem junto.

  Não sobrevivem ao snapshot: detalhe do produto em bottom sheet, observação
  por item e persistência do carrinho entre recarregamentos.

  Fonte da verdade continua sendo o projeto Next. Para regerar:
    npm run build, subir "npm start -- -p 3100", node scripts/snapshot-html.mjs
-->\n`;
/*
   O framer-motion serializa o estado INICIAL da animação no HTML
   (`style="opacity:0;transform:translateY(16px)"`). No app, o React monta e
   dispara a transição para opacity:1. No snapshot não há React — sem esta
   sobrescrita, hero, cards e seções inteiras ficam invisíveis para sempre.
*/
const staticOverrides = `
/* --- ajustes do snapshot estático --- */
[style*="opacity"]{opacity:1!important}
[style*="transform"]{transform:none!important}
`;

/*
   Substituição por FUNÇÃO, não por string: em String.replace, `$$` no texto de
   troca significa um `$` literal, `$&` significa o trecho casado, e assim por
   diante. O CSS e o script injetados contêm `$$` (querySelectorAll) e cifrões
   soltos — com a forma de string eles eram corrompidos silenciosamente, e o
   script quebrava com "Identifier '$' has already been declared".
*/
html = html.replace('</head>', () => `<style>\n${css}\n${staticOverrides}</style>\n</head>`);

/*
   Sem o React o arquivo seria uma foto: chips inertes, busca inerte, nenhum
   pedido. O script abaixo devolve as três coisas em JS puro, lendo o catálogo
   dos data-attributes que ProductGrid já escreve em cada card. O visual não é
   recriado — reaproveita os tokens de cor do próprio tema, então claro e
   escuro continuam funcionando.
*/
const minimumOrder = Number(
  readFileSync(join(REPO, 'src/lib/config.ts'), 'utf8').match(/minimumOrder:\s*([\d.]+)/)?.[1] ?? 0,
);

const enhance = `
<script>
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const MIN = ${minimumOrder};
  const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
  // Nome de produto vem do catálogo, não do visitante — mas um nome com aspas
  // ou < quebraria a marcação montada por innerHTML. Escapar sai de graça.
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  const cards = $$('article[data-product-id]');
  const grid = cards[0] && cards[0].parentElement;
  if (!grid) return;

  const waHref = ($('a[href*="wa.me/"]') || {}).href || '';
  const phone = (waHref.match(/wa\\.me\\/(\\d+)/) || [])[1] || '';
  const storeName = document.title.split('|')[0].trim();

  /* ---------- filtro + busca ---------- */
  let category = 'todos';
  let query = '';

  const empty = document.createElement('div');
  empty.style.cssText = 'padding:6rem 0;text-align:center;display:none';
  empty.innerHTML =
    '<p style="font-size:1.125rem;color:var(--ink)">Nenhum produto encontrado</p>' +
    '<p id="sx-empty-msg" style="margin-top:.5rem;font-size:.875rem;color:var(--ink-2)"></p>' +
    '<button id="sx-clear" style="margin-top:1.5rem;min-height:44px;padding:0 1.5rem;border:0;' +
    'border-radius:9999px;background:var(--brand);color:var(--on-brand);font-size:.875rem;' +
    'font-weight:500;cursor:pointer">Ver o cardápio inteiro</button>';
  grid.parentElement.insertBefore(empty, grid.nextSibling);

  function apply() {
    let shown = 0;
    for (const c of cards) {
      const okCat = category === 'todos' || c.dataset.productCategory === category;
      const okQ = !query || norm(c.innerText).includes(query);
      const vis = okCat && okQ;
      c.style.display = vis ? '' : 'none';
      if (vis) shown++;
    }
    grid.style.display = shown ? '' : 'none';
    empty.style.display = shown ? 'none' : '';
    if (!shown) {
      const chip = $('[data-category-slug="' + category + '"]');
      $('#sx-empty-msg').textContent =
        category !== 'todos' && query
          ? 'Nada com esse termo dentro de "' + (chip ? chip.innerText.trim() : category) + '".'
          : 'Tente outro termo ou escolha outra categoria.';
    }
  }

  $$('[data-category-slug]').forEach((chip) => {
    chip.addEventListener('click', () => {
      category = chip.dataset.categorySlug;
      $$('[data-category-slug]').forEach((c) => {
        const on = c === chip;
        c.setAttribute('aria-pressed', String(on));
        c.style.cssText = on
          ? 'background:var(--brand);color:var(--on-brand);border-color:transparent'
          : '';
      });
      apply();
    });
  });

  const search = $('input[type=search]');
  if (search) {
    search.addEventListener('input', () => { query = norm(search.value.trim()); apply(); });
  }
  $('#sx-clear').addEventListener('click', () => {
    category = 'todos'; query = '';
    if (search) search.value = '';
    const first = $('[data-category-slug="todos"]');
    if (first) first.click();
    apply();
  });

  /* ---------- pedido ---------- */
  const cart = new Map();
  const totalOf = () => [...cart.values()].reduce((s, i) => s + i.price * i.qty, 0);
  const countOf = () => [...cart.values()].reduce((s, i) => s + i.qty, 0);

  const bar = document.createElement('div');
  bar.style.cssText =
    'position:fixed;left:0;right:0;bottom:0;z-index:80;display:none;padding:.75rem 1rem;' +
    'background:var(--surface);border-top:1px solid var(--line)';
  bar.innerHTML =
    '<button id="sx-open" style="width:100%;min-height:52px;border:0;border-radius:9999px;' +
    'background:var(--brand);color:var(--on-brand);font-size:.9375rem;font-weight:600;' +
    'cursor:pointer"></button>';
  document.body.appendChild(bar);

  const panel = document.createElement('div');
  panel.style.cssText =
    'position:fixed;inset:0;z-index:90;display:none;background:rgba(0,0,0,.5)';
  panel.innerHTML =
    '<div role="dialog" aria-modal="true" aria-label="Seu pedido" style="position:absolute;' +
    'top:0;right:0;bottom:0;width:100%;max-width:28rem;display:flex;flex-direction:column;' +
    'background:var(--surface)">' +
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;' +
    'border-bottom:1px solid var(--line)">' +
    '<strong style="font-size:1.125rem;color:var(--ink)">Seu pedido</strong>' +
    '<button id="sx-close" aria-label="Fechar" style="min-width:44px;min-height:44px;border:0;' +
    'background:none;color:var(--ink-2);font-size:1.5rem;cursor:pointer">×</button></div>' +
    '<div id="sx-items" style="flex:1;overflow-y:auto;padding:1rem 1.25rem"></div>' +
    '<div style="padding:1rem 1.25rem;border-top:1px solid var(--line);background:var(--surface-2)">' +
    '<div style="display:flex;justify-content:space-between;font-weight:700;color:var(--ink)">' +
    '<span>Total</span><span id="sx-total"></span></div>' +
    '<p id="sx-min" style="margin-top:.75rem;padding:.5rem .75rem;border-radius:.75rem;' +
    'background:var(--warning-soft);color:var(--warning);font-size:.75rem;display:none"></p>' +
    '<button id="sx-send" style="margin-top:.75rem;width:100%;min-height:52px;border:0;' +
    'border-radius:9999px;background:var(--whatsapp);color:var(--on-whatsapp);font-size:.9375rem;' +
    'font-weight:600;cursor:pointer">Enviar pedido pelo WhatsApp</button>' +
    '<p style="margin-top:.75rem;text-align:center;font-size:.75rem;color:var(--ink-3)">' +
    'Entrega, retirada e pagamento são combinados na conversa.</p></div></div>';
  document.body.appendChild(panel);

  function draw() {
    const n = countOf(), t = totalOf();
    bar.style.display = n ? '' : 'none';
    $('#sx-open').textContent = 'Ver pedido · ' + n + (n === 1 ? ' item · ' : ' itens · ') + brl(t);
    $('#sx-total').textContent = brl(t);
    const below = MIN > 0 && t < MIN;
    const min = $('#sx-min');
    min.style.display = below ? '' : 'none';
    min.textContent = 'Pedido mínimo de ' + brl(MIN) + '. Faltam ' + brl(MIN - t) + '.';
    const send = $('#sx-send');
    send.disabled = below || !phone;
    send.style.opacity = send.disabled ? '.5' : '1';
    send.style.cursor = send.disabled ? 'not-allowed' : 'pointer';

    $('#sx-items').innerHTML = n
      ? [...cart.entries()].map(([id, i]) =>
          '<div style="display:flex;align-items:center;gap:.75rem;padding:.75rem;margin-bottom:.625rem;' +
          'border:1px solid var(--line);border-radius:1rem;background:var(--surface-2)">' +
          '<div style="flex:1;min-width:0"><p style="font-size:.875rem;font-weight:500;color:var(--ink)">' +
          esc(i.name) + '</p><p style="font-size:.875rem;color:var(--ink-2)">' + brl(i.price) + '</p></div>' +
          '<button data-dec="' + esc(id) + '" aria-label="Diminuir" style="width:36px;height:36px;border:0;' +
          'border-radius:.5rem;background:var(--surface);color:var(--ink);cursor:pointer">−</button>' +
          '<span style="min-width:1.5rem;text-align:center;font-weight:600;color:var(--ink)">' + i.qty + '</span>' +
          '<button data-inc="' + esc(id) + '" aria-label="Aumentar" style="width:36px;height:36px;border:0;' +
          'border-radius:.5rem;background:var(--surface);color:var(--ink);cursor:pointer">+</button>' +
          '<strong style="min-width:5rem;text-align:right;font-size:.875rem;color:var(--ink)">' +
          brl(i.price * i.qty) + '</strong></div>')
          .join('')
      : '<p style="padding:3rem 0;text-align:center;color:var(--ink-2)">Seu pedido está vazio</p>';
  }

  function add(card, delta) {
    const id = card.dataset.productId;
    const cur = cart.get(id) || {
      name: card.dataset.productName,
      price: Number(card.dataset.productPrice),
      qty: 0,
    };
    cur.qty += delta;
    if (cur.qty <= 0) cart.delete(id); else cart.set(id, cur);
    draw();
  }

  cards.forEach((card) => {
    $$('button', card)
      .filter((b) => /^adicionar/i.test(b.getAttribute('aria-label') || ''))
      .forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); add(card, 1); }));
  });

  document.addEventListener('click', (e) => {
    const inc = e.target.closest('[data-inc]'), dec = e.target.closest('[data-dec]');
    if (inc) add($('[data-product-id="' + inc.dataset.inc + '"]'), 1);
    if (dec) add($('[data-product-id="' + dec.dataset.dec + '"]'), -1);
  });

  const open = () => { panel.style.display = ''; document.body.style.overflow = 'hidden'; };
  const close = () => { panel.style.display = 'none'; document.body.style.overflow = ''; };
  $('#sx-open').addEventListener('click', open);
  $('#sx-close').addEventListener('click', close);
  panel.addEventListener('click', (e) => { if (e.target === panel) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  const headerCart = $$('button').find((b) => /abrir pedido/i.test(b.getAttribute('aria-label') || ''));
  if (headerCart) headerCart.addEventListener('click', open);

  $('#sx-send').addEventListener('click', () => {
    if (!cart.size || !phone) return;
    const lines = ['🛒 *Pedido — ' + storeName + '*', ''];
    for (const i of cart.values()) lines.push('• ' + i.qty + 'x ' + i.name + ' — ' + brl(i.price * i.qty));
    lines.push('', '💰 *Total: ' + brl(totalOf()) + '*', '', 'Obrigado!');
    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(lines.join('\\n')), '_blank', 'noopener');
    cart.clear(); draw(); close();
  });

  draw();
})();
</script>
`;
html = html.replace('</body>', () => enhance + '</body>');
html = banner + html;

writeFileSync(OUT, html);
console.log(`escrito: ${OUT} (${(html.length / 1024 / 1024).toFixed(2)} MB)`);
