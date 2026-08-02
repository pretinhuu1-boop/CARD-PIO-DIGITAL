import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/*
  Gerador do HTML autossuficiente.

  Env:
    SNAPSHOT_OUT     nome do arquivo de saída
    SNAPSHOT_THEME   'light' | 'dark' | 'auto'  (padrão: auto)
    SNAPSHOT_ORDER   'items' | 'customer'       (padrão: items)
                     'customer' inclui nome/telefone/entrega no pedido,
                     espelhando o app que ainda tem essa etapa.
    SNAPSHOT_IMG_DIR pasta com um espelho reduzido das imagens de public/,
                     usada só aqui. Base64 infla o binário em ~37%, então um
                     catálogo grande em resolução de tela cheia produz arquivo
                     de vários MB. O site servido continua com o original —
                     o next/image escolhe o tamanho pelo srcset e não passa
                     por aqui. Sem a variável, embute public/ direto.
    SNAPSHOT_NOINDEX '1' insere <meta robots="noindex, nofollow">. Use sempre
                     que o arquivo for hospedado: demonstração não disputa
                     busca com a loja real.
*/
const ORIGIN = process.argv[2] ?? 'http://localhost:3100';
const REPO = new URL('..', import.meta.url).pathname;
const OUT = join(REPO, process.env.SNAPSHOT_OUT ?? 'cardapio.html');
const THEME = process.env.SNAPSHOT_THEME ?? 'auto';
const ORDER = process.env.SNAPSHOT_ORDER ?? 'items';
const IMG_DIR = process.env.SNAPSHOT_IMG_DIR ?? null;
const NOINDEX = process.env.SNAPSHOT_NOINDEX === '1';

const mime = (f) =>
  f.endsWith('.webp') ? 'image/webp'
  : f.endsWith('.woff2') ? 'font/woff2'
  : f.endsWith('.png') ? 'image/png'
  : f.endsWith('.jpg') || f.endsWith('.jpeg') ? 'image/jpeg'
  : 'application/octet-stream';

const get = async (path) => {
  const r = await fetch(ORIGIN + path);
  if (!r.ok) throw new Error(`${path} -> ${r.status}`);
  return r;
};

let html = await (await get('/')).text();

/* 1. CSS + fontes ---------------------------------------------------------- */
const cssHrefs = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((m) => m[1]);
let css = '';
for (const href of cssHrefs) {
  let sheet = await (await get(href)).text();
  const base = new URL(href, ORIGIN);
  const fontUrls = [...new Set([...sheet.matchAll(/url\(([^)"']+?\.woff2)\)/g)].map((m) => m[1]))];
  for (const fu of fontUrls) {
    const buf = Buffer.from(await (await get(new URL(fu, base).pathname)).arrayBuffer());
    sheet = sheet.replaceAll(fu, `data:font/woff2;base64,${buf.toString('base64')}`);
  }
  console.log(`  fontes embutidas: ${fontUrls.length}`);
  css += sheet + '\n';
}

/*
  2. TEMA FIXO.

  O template define o tema claro em `:root` e sobrescreve num
  `@media (prefers-color-scheme: dark)`. Publicado como está, uma loja
  desenhada clara aparece escura para quem usa o aparelho em modo escuro —
  ou seja, a página mostra uma identidade que não é a da loja.

  'light' remove o bloco escuro.
  'dark'  promove o bloco escuro para :root e remove a media query, para a
          loja ficar escura mesmo em aparelho no claro.
*/
function fixarTema(cssText, modo) {
  if (modo === 'auto') return cssText;
  const re = /@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{([\s\S]*?)\}\s*\}/g;
  if (modo === 'light') return cssText.replace(re, '');
  const blocos = [...cssText.matchAll(re)].map((m) => m[1]);
  return cssText.replace(re, '') + `\n:root{${blocos.join('\n')}}\n`;
}
const antes = (css.match(/prefers-color-scheme:\s*dark/g) || []).length;
css = fixarTema(css, THEME);
const depois = (css.match(/prefers-color-scheme:\s*dark/g) || []).length;
console.log(`  tema: ${THEME} (blocos dark: ${antes} -> ${depois})`);

/* 3. Imagens ---------------------------------------------------------------- */
let imgCount = 0;
let imgBytes = 0;
let doEspelho = 0;

// O espelho reduzido tem prioridade, mas só quando o arquivo existe lá: uma
// foto nova que ainda não foi espelhada cai no original em vez de sumir.
const resolver = (publicPath) => {
  if (IMG_DIR) {
    const alt = join(REPO, IMG_DIR, publicPath);
    if (existsSync(alt)) { doEspelho++; return alt; }
  }
  const file = join(REPO, 'public', publicPath);
  return existsSync(file) ? file : null;
};
const asDataUri = (publicPath) => {
  const file = resolver(publicPath);
  if (!file) return null;
  const buf = readFileSync(file);
  imgBytes += buf.length;
  return `data:${mime(file)};base64,${buf.toString('base64')}`;
};

html = html.replace(/(src|srcSet|srcset)="([^"]*\/_next\/image[^"]*)"/g, (full, attr, val) => {
  const m = decodeURIComponent(val).match(/url=(\/[^&\s]+)/);
  if (!m || attr !== 'src') return '';
  const uri = asDataUri(m[1]);
  if (!uri) return '';
  imgCount++;
  return `src="${uri}"`;
});
html = html.replace(/url\((&quot;|"|')?(\/(?:produtos|pecas|loja)\/[^)"'&]+)\1?\)/g, (full, q, p) => {
  const uri = asDataUri(p); if (!uri) return full; imgCount++;
  return `url(${q ?? ''}${uri}${q ?? ''})`;
});
html = html.replace(/src="(\/(?:produtos|pecas|loja)\/[^"]+)"/g, (full, p) => {
  const uri = asDataUri(p); if (!uri) return full; imgCount++;
  return `src="${uri}"`;
});
console.log(
  `  imagens embutidas: ${imgCount} (${(imgBytes / 1e6).toFixed(2)} MB brutos` +
    `${IMG_DIR ? `, ${doEspelho} do espelho ${IMG_DIR}` : ''})`,
);

/*
  A barra do navegador segue <meta name="theme-color" media="...">. Com o tema
  fixado, a meta do esquema oposto deixaria a barra do celular na cor errada —
  página clara com barra escura. Some junto com o CSS.
*/
if (THEME !== 'auto') {
  const oposto = THEME === 'light' ? 'dark' : 'light';
  const re = new RegExp(`<meta[^>]*name="theme-color"[^>]*prefers-color-scheme:\\s*${oposto}[^>]*>`, 'g');
  const n = (html.match(re) || []).length;
  html = html.replace(re, '');
  html = html.replace(/(<meta[^>]*name="theme-color"[^>]*)\s*media="[^"]*"/g, '$1');
  console.log(`  theme-color: removida a meta de esquema ${oposto} (${n})`);
}

html = html.replace(/\sloading="lazy"/g, '').replace(/\sdecoding="async"/g, '');
html = html
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<link[^>]+rel="stylesheet"[^>]*>/g, '')
  .replace(/<link[^>]+rel="preload"[^>]*>/g, '');

const staticOverrides = `
/* --- ajustes do snapshot estático --- */
[style*="opacity"]{opacity:1!important}
[style*="transform"]{transform:none!important}
`;

const cfg = readFileSync(join(REPO, 'src/lib/config.ts'), 'utf8');
const storeName = cfg.match(/name:\s*'([^']+)'/)?.[1] ?? '';
const minimumOrder = Number(cfg.match(/minimumOrder:\s*([\d.]+)/)?.[1] ?? 0);

const banner = `<!--
  ${storeName} — cardápio digital
  Snapshot estático gerado a partir de ${ORIGIN}.

  Arquivo único e autossuficiente: CSS, fontes e imagens em base64.
  Abre com duplo clique — sem servidor, sem build, sem rede.

  Tema fixado em "${THEME}": a loja aparece com a identidade dela
  independentemente da preferência de cor do aparelho.

  Filtro, busca, detalhe do produto (quantidade e observação), carrinho com
  persistência e pedido pelo WhatsApp funcionam — reimplementados em
  JavaScript puro no fim do <body>, lendo o catálogo dos data-attributes.
-->\n`;

html = html.replace('</head>', () => `<style>\n${css}\n${staticOverrides}</style>\n</head>`);

const enhance = `
<script>
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const MIN = ${minimumOrder};
  const PEDE_DADOS = ${ORDER === 'customer'};
  const CHAVE = 'snapshot:cart:' + location.pathname;
  const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  const cards = $$('article[data-product-id]');
  const grid = cards[0] && cards[0].parentElement;
  if (!grid) return;

  const waHref = ($('a[href*="wa.me/"]') || {}).href || '';
  const phone = (waHref.match(/wa\\.me\\/(\\d+)/) || [])[1] || '';
  const storeName = ${JSON.stringify(storeName)};

  const catalogo = {};
  cards.forEach(c => { catalogo[c.dataset.productId] = {
    nome: c.dataset.productName, preco: Number(c.dataset.productPrice),
    img: (c.querySelector('img') || {}).src || '',
    desc: (c.querySelector('h3') ? (c.querySelector('h3').parentElement.innerText || '') : '').trim(),
  }; });

  /* ---------- navegação por âncora + busca ----------

     A página não FILTRA por categoria: mostra o catálogo inteiro em seções
     ancoradas, e o controle de categoria navega. Só a busca reduz o conjunto,
     porque aí reduzir é o pedido explícito de quem digitou.

     Os botões são pegos por 'button[data-category-slug]', NUNCA por
     '[data-category-slug]' solto: as <section> carregam o mesmo atributo, e o
     seletor global pegaria a seção no lugar do chip.
  */
  const navBtns = $$('button[data-category-slug]');
  const secoes = $$('section[data-category-slug]');
  const barraNav = navBtns[0] && navBtns[0].closest('.sticky');
  let termo = '';

  function marcar(slug) {
    navBtns.forEach((b) => {
      const on = b.dataset.categorySlug === slug;
      b.setAttribute('aria-current', on ? 'true' : 'false');
      b.style.cssText = on
        ? 'background:var(--brand);color:var(--on-brand);border-color:transparent'
        : '';
    });
  }

  navBtns.forEach((b) => {
    b.addEventListener('click', () => {
      const alvo = document.getElementById('cat-' + b.dataset.categorySlug);
      if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      marcar(b.dataset.categorySlug);
    });
  });

  /* Scroll-spy: a categoria acompanha a rolagem em vez de comandá-la. */
  if (window.IntersectionObserver && secoes.length) {
    const io = new IntersectionObserver((es) => {
      if (termo) return;
      const v = es.find((e) => e.isIntersecting);
      if (v) marcar(v.target.dataset.categorySlug);
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    secoes.forEach((s) => io.observe(s));
  }

  const ancora = secoes[0] && secoes[0].parentElement;
  const vazio = document.createElement('div');
  vazio.style.cssText = 'padding:5rem 0;text-align:center;display:none';
  vazio.innerHTML =
    '<p style="font-size:1.125rem;color:var(--ink)">Nada encontrado</p>' +
    '<p id="sx-empty-msg" style="margin-top:.5rem;font-size:.875rem;color:var(--ink-2)"></p>' +
    '<button id="sx-clear" style="margin-top:1.5rem;min-height:44px;padding:0 1.5rem;border:0;' +
    'border-radius:9999px;background:var(--brand);color:var(--on-brand);font-size:.875rem;' +
    'font-weight:500;cursor:pointer">Limpar busca e ver tudo</button>';
  if (ancora) ancora.appendChild(vazio);

  function aplicar() {
    let n = 0;
    for (const c of cards) {
      const ok = !termo || norm(c.innerText).includes(termo);
      c.style.display = ok ? '' : 'none';
      if (ok) n++;
    }
    /* Seção sem nenhum card visível some inteira — senão fica um título
       de categoria pairando sobre uma grade vazia. */
    secoes.forEach((s) => {
      const algum = $$('article[data-product-id]', s)
        .some((c) => c.style.display !== 'none');
      s.style.display = algum ? '' : 'none';
    });
    /* Durante a busca a barra de categorias sai: navegar por seção dentro de
       um resultado de busca não quer dizer nada. */
    if (barraNav) barraNav.style.display = termo ? 'none' : '';
    vazio.style.display = n ? 'none' : '';
    if (!n) {
      $('#sx-empty-msg').textContent =
        'A busca cobre nome e descrição de todos os itens do catálogo.';
    }
  }

  /*
     São DOIS campos de busca: o do desktop e o da barra do celular, um oculto
     por CSS conforme a largura. Um '$' simples pegaria sempre o primeiro (o do
     desktop) e, no celular, a busca do arquivo solto ficaria ligada a um campo
     invisível — digitar não faria nada e nada acusaria o erro.
  */
  const buscas = $$('input[type=search]');
  buscas.forEach((b) => {
    b.addEventListener('input', () => {
      termo = norm(b.value.trim());
      buscas.forEach((o) => { if (o !== b) o.value = b.value; });
      aplicar();
    });
  });
  $('#sx-clear').addEventListener('click', () => {
    termo = '';
    buscas.forEach((b) => { b.value = ''; });
    aplicar();
    if (secoes[0]) secoes[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ---------- portão do formato ----------

     Loja sem preço público é EXPOSITOR: cada peça abre conversa no WhatsApp e
     não existe carrinho. Sem este portão, 'Number("")' devolveria 0 e o
     snapshot montaria um pedido cobrando zero por peça artesanal orçada caso
     a caso. Navegação e busca acima já estão ligadas e continuam valendo.
  */
  const temPreco = cards.some((c) => {
    const p = c.dataset.productPrice;
    return p !== '' && p != null && !isNaN(Number(p));
  });
  if (!temPreco) return;

  /* ---------- pedido (linha = produto + observação) ---------- */
  let linhas = [];
  try { linhas = JSON.parse(localStorage.getItem(CHAVE) || '[]')
    .filter(l => catalogo[l.id]); } catch (e) { linhas = []; }
  const salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(linhas)); } catch (e) {} };
  const total = () => linhas.reduce((s, l) => s + catalogo[l.id].preco * l.qtd, 0);
  const conta = () => linhas.reduce((s, l) => s + l.qtd, 0);
  const chave = (id, obs) => id + '::' + (obs || '').trim();

  function adicionar(id, qtd, obs) {
    const k = chave(id, obs);
    const ex = linhas.find(l => chave(l.id, l.obs) === k);
    if (ex) ex.qtd += qtd; else linhas.push({ id, qtd, obs: (obs || '').trim() });
    salvar(); desenhar();
  }
  function mudarQtd(i, d) {
    linhas[i].qtd += d;
    if (linhas[i].qtd <= 0) linhas.splice(i, 1);
    salvar(); desenhar();
  }

  const BTN = 'min-height:52px;border:0;border-radius:9999px;font-size:.9375rem;font-weight:600;cursor:pointer';
  const barra = document.createElement('div');
  barra.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:80;display:none;padding:.75rem 1rem;background:var(--surface);border-top:1px solid var(--line)';
  barra.innerHTML = '<button id="sx-open" style="width:100%;' + BTN + ';background:var(--brand);color:var(--on-brand)"></button>';
  document.body.appendChild(barra);

  const painel = document.createElement('div');
  painel.style.cssText = 'position:fixed;inset:0;z-index:90;display:none;background:rgba(0,0,0,.5)';
  painel.innerHTML =
    '<div role="dialog" aria-modal="true" aria-label="Seu pedido" style="position:absolute;top:0;right:0;bottom:0;width:100%;max-width:28rem;display:flex;flex-direction:column;background:var(--surface)">' +
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid var(--line)">' +
    '<strong style="font-size:1.125rem;color:var(--ink)">Seu pedido</strong>' +
    '<button id="sx-close" aria-label="Fechar" style="min-width:44px;min-height:44px;border:0;background:none;color:var(--ink-2);font-size:1.5rem;cursor:pointer">×</button></div>' +
    '<div id="sx-items" style="flex:1;overflow-y:auto;padding:1rem 1.25rem"></div>' +
    '<div style="padding:1rem 1.25rem;border-top:1px solid var(--line);background:var(--surface-2)">' +
    (PEDE_DADOS ? '<div id="sx-dados" style="display:grid;gap:.6rem;margin-bottom:.9rem">' +
      '<input id="sx-nome" placeholder="Seu nome" style="width:100%;min-height:44px;padding:0 .9rem;border:1px solid var(--line);border-radius:.75rem;background:var(--surface);color:var(--ink)">' +
      '<input id="sx-fone" placeholder="(00) 00000-0000" inputmode="tel" style="width:100%;min-height:44px;padding:0 .9rem;border:1px solid var(--line);border-radius:.75rem;background:var(--surface);color:var(--ink)">' +
      '</div>' : '') +
    '<div style="display:flex;justify-content:space-between;font-weight:700;color:var(--ink)"><span>Total</span><span id="sx-total"></span></div>' +
    '<p id="sx-min" style="margin-top:.75rem;padding:.5rem .75rem;border-radius:.75rem;background:var(--warning-soft);color:var(--warning);font-size:.75rem;display:none"></p>' +
    '<button id="sx-send" style="margin-top:.75rem;width:100%;' + BTN + ';background:var(--whatsapp);color:var(--on-whatsapp)">Enviar pedido pelo WhatsApp</button>' +
    '<p style="margin-top:.75rem;text-align:center;font-size:.75rem;color:var(--ink-3)">Entrega, retirada e pagamento são combinados na conversa.</p>' +
    '</div></div>';
  document.body.appendChild(painel);

  /* ---------- detalhe do produto: quantidade + observação ---------- */
  const sheet = document.createElement('div');
  sheet.style.cssText = 'position:fixed;inset:0;z-index:95;display:none;background:rgba(0,0,0,.55)';
  sheet.innerHTML =
    '<div role="dialog" aria-modal="true" aria-label="Detalhe do produto" style="position:absolute;left:0;right:0;bottom:0;max-height:92vh;overflow-y:auto;border-radius:1.5rem 1.5rem 0 0;background:var(--surface)">' +
    '<div style="display:flex;justify-content:flex-end;padding:.75rem 1rem 0">' +
    '<button id="sh-close" aria-label="Fechar" style="min-width:44px;min-height:44px;border:0;background:none;color:var(--ink-2);font-size:1.5rem;cursor:pointer">×</button></div>' +
    '<div style="padding:0 1.25rem 1.5rem">' +
    '<img id="sh-img" alt="" style="width:100%;max-height:38vh;object-fit:cover;border-radius:1rem;background:var(--surface-2)">' +
    '<h3 id="sh-nome" style="margin:1rem 0 .35rem;font-size:1.25rem;color:var(--ink)"></h3>' +
    '<p id="sh-preco" style="margin:0;font-weight:700;color:var(--ink)"></p>' +
    '<label for="sh-obs" style="display:block;margin:1.1rem 0 .4rem;font-size:.8rem;color:var(--ink-2)">Observação (opcional)</label>' +
    '<textarea id="sh-obs" rows="2" placeholder="Ex.: sem cebola" style="width:100%;padding:.7rem .9rem;border:1px solid var(--line);border-radius:.75rem;background:var(--surface-2);color:var(--ink);resize:none"></textarea>' +
    '<div style="display:flex;align-items:center;gap:1rem;margin-top:1.1rem">' +
    '<button id="sh-menos" aria-label="Diminuir" style="width:44px;height:44px;border:1px solid var(--line);border-radius:.75rem;background:var(--surface-2);color:var(--ink);font-size:1.1rem;cursor:pointer">−</button>' +
    '<span id="sh-qtd" style="min-width:2rem;text-align:center;font-weight:700;color:var(--ink)">1</span>' +
    '<button id="sh-mais" aria-label="Aumentar" style="width:44px;height:44px;border:1px solid var(--line);border-radius:.75rem;background:var(--surface-2);color:var(--ink);font-size:1.1rem;cursor:pointer">+</button>' +
    '<button id="sh-add" style="flex:1;' + BTN + ';background:var(--brand);color:var(--on-brand)">Adicionar</button>' +
    '</div></div></div>';
  document.body.appendChild(sheet);

  let shId = null, shQtd = 1;
  function abrirSheet(id) {
    shId = id; shQtd = 1;
    const p = catalogo[id];
    $('#sh-img').src = p.img; $('#sh-img').alt = p.nome;
    $('#sh-nome').textContent = p.nome;
    $('#sh-preco').textContent = brl(p.preco);
    $('#sh-obs').value = ''; $('#sh-qtd').textContent = '1';
    sheet.style.display = ''; document.body.style.overflow = 'hidden';
    $('#sh-close').focus();
  }
  const fecharSheet = () => { sheet.style.display = 'none'; document.body.style.overflow = ''; };
  $('#sh-close').addEventListener('click', fecharSheet);
  sheet.addEventListener('click', (e) => { if (e.target === sheet) fecharSheet(); });
  $('#sh-menos').addEventListener('click', () => { shQtd = Math.max(1, shQtd - 1); $('#sh-qtd').textContent = shQtd; });
  $('#sh-mais').addEventListener('click', () => { shQtd++; $('#sh-qtd').textContent = shQtd; });
  $('#sh-add').addEventListener('click', () => { adicionar(shId, shQtd, $('#sh-obs').value); fecharSheet(); });

  cards.forEach((card) => {
    const id = card.dataset.productId;
    $$('button', card).forEach((b) => {
      const lab = b.getAttribute('aria-label') || '';
      if (/^adicionar/i.test(lab)) b.addEventListener('click', (e) => { e.preventDefault(); adicionar(id, 1, ''); });
      else if (/^ver detalhes/i.test(lab)) b.addEventListener('click', (e) => { e.preventDefault(); abrirSheet(id); });
    });
  });

  function desenhar() {
    const n = conta(), t = total();
    barra.style.display = n ? '' : 'none';
    $('#sx-open').textContent = 'Ver pedido · ' + n + (n === 1 ? ' item · ' : ' itens · ') + brl(t);
    $('#sx-total').textContent = brl(t);
    const abaixo = MIN > 0 && t < MIN;
    const min = $('#sx-min');
    min.style.display = abaixo ? '' : 'none';
    min.textContent = 'Pedido mínimo de ' + brl(MIN) + '. Faltam ' + brl(MIN - t) + '.';
    const send = $('#sx-send');
    send.disabled = abaixo || !phone;
    send.style.opacity = send.disabled ? '.5' : '1';
    send.style.cursor = send.disabled ? 'not-allowed' : 'pointer';
    $('#sx-items').innerHTML = n
      ? linhas.map((l, i) => {
          const p = catalogo[l.id];
          return '<div style="display:flex;align-items:center;gap:.75rem;padding:.75rem;margin-bottom:.625rem;border:1px solid var(--line);border-radius:1rem;background:var(--surface-2)">' +
          (p.img ? '<img src="' + p.img + '" alt="" style="width:52px;height:52px;object-fit:cover;border-radius:.6rem">' : '') +
          '<div style="flex:1;min-width:0"><p style="font-size:.875rem;font-weight:500;color:var(--ink)">' + esc(p.nome) + '</p>' +
          '<p style="font-size:.875rem;color:var(--ink-2)">' + brl(p.preco) + '</p>' +
          (l.obs ? '<p style="margin-top:.2rem;font-size:.75rem;font-style:italic;color:var(--ink-3)">obs: ' + esc(l.obs) + '</p>' : '') +
          '</div>' +
          '<button data-dec="' + i + '" aria-label="Diminuir" style="width:36px;height:36px;border:0;border-radius:.5rem;background:var(--surface);color:var(--ink);cursor:pointer">−</button>' +
          '<span style="min-width:1.5rem;text-align:center;font-weight:600;color:var(--ink)">' + l.qtd + '</span>' +
          '<button data-inc="' + i + '" aria-label="Aumentar" style="width:36px;height:36px;border:0;border-radius:.5rem;background:var(--surface);color:var(--ink);cursor:pointer">+</button>' +
          '<strong style="min-width:5rem;text-align:right;font-size:.875rem;color:var(--ink)">' + brl(p.preco * l.qtd) + '</strong></div>';
        }).join('')
      : '<p style="padding:3rem 0;text-align:center;color:var(--ink-2)">Seu pedido está vazio</p>';
  }

  document.addEventListener('click', (e) => {
    const inc = e.target.closest('[data-inc]'), dec = e.target.closest('[data-dec]');
    if (inc) mudarQtd(Number(inc.dataset.inc), 1);
    if (dec) mudarQtd(Number(dec.dataset.dec), -1);
  });

  const abrir = () => { painel.style.display = ''; document.body.style.overflow = 'hidden'; };
  const fechar = () => { painel.style.display = 'none'; document.body.style.overflow = ''; };
  $('#sx-open').addEventListener('click', abrir);
  $('#sx-close').addEventListener('click', fechar);
  painel.addEventListener('click', (e) => { if (e.target === painel) fechar(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (sheet.style.display !== 'none') fecharSheet(); else fechar();
  });
  const btnHeader = $$('button').find((b) => /abrir pedido/i.test(b.getAttribute('aria-label') || ''));
  if (btnHeader) btnHeader.addEventListener('click', abrir);

  $('#sx-send').addEventListener('click', () => {
    if (!linhas.length || !phone) return;
    const L = ['🛒 *Pedido — ' + storeName + '*', ''];
    for (const l of linhas) {
      const p = catalogo[l.id];
      L.push('• ' + l.qtd + 'x ' + p.nome + ' — ' + brl(p.preco * l.qtd));
      if (l.obs) L.push('  _obs: ' + l.obs + '_');
    }
    L.push('', '💰 *Total: ' + brl(total()) + '*');
    if (PEDE_DADOS) {
      const nome = ($('#sx-nome') || {}).value, fone = ($('#sx-fone') || {}).value;
      if (nome || fone) {
        L.push('');
        if (nome) L.push('👤 ' + nome);
        if (fone) L.push('📱 ' + fone);
      }
    }
    L.push('', 'Obrigado!');
    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(L.join('\\n')), '_blank', 'noopener');
    linhas = []; salvar(); desenhar(); fechar();
  });

  desenhar();
})();
</script>
`;
html = html.replace('</body>', () => enhance + '</body>');
html = banner + html;

/*
  Um snapshot hospedado é demonstração, não é a loja. Sem noindex, ele disputa
  busca com o negócio real em nome de quem não pediu isso.

  Ficava como retoque manual depois de publicar — e todo arquivo regerado
  nascia sem ele, porque etapa manual não tem como falhar em voz alta. Vale
  como flag do gerador, para nascer junto com o arquivo.

  A meta do Next continua "index, follow" mais abaixo. Buscador aplica a
  diretiva mais restritiva quando elas conflitam, então esta ganha.
*/
if (NOINDEX) {
  const i = html.indexOf('<head>');
  if (i < 0) throw new Error('não achei <head> para inserir o noindex');
  html = html.slice(0, i + 6) + '\n<meta name="robots" content="noindex, nofollow">\n' + html.slice(i + 6);
  console.log('  robots: noindex, nofollow');
}

writeFileSync(OUT, html);
console.log(`escrito: ${OUT} (${(html.length / 1024 / 1024).toFixed(2)} MB)`);
