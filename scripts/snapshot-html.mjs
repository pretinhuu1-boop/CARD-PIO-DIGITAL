import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ORIGIN = process.argv[2] ?? 'http://localhost:3100';
const REPO = new URL('..', import.meta.url).pathname;
const OUT = join(REPO, 'caracol_cardapio.html');

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

html = html.replace(/url\((&quot;|"|')?(\/(?:produtos|loja)\/[^)"'&]+)\1?\)/g, (full, q, p) => {
  const uri = asDataUri(p);
  if (!uri) return full;
  imgCount++;
  return `url(${q ?? ''}${uri}${q ?? ''})`;
});

html = html.replace(/src="(\/(?:produtos|loja)\/[^"]+)"/g, (full, p) => {
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
  CSS, fontes e imagens embutidos: abre sem servidor e sem rede.
  Carrinho, filtro e busca dependem do runtime React e NÃO funcionam aqui —
  para a versão interativa, rode \`npm run dev\` no repositório.
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

html = html.replace('</head>', `<style>\n${css}\n${staticOverrides}</style>\n</head>`);
html = banner + html;

writeFileSync(OUT, html);
console.log(`escrito: ${OUT} (${(html.length / 1024 / 1024).toFixed(2)} MB)`);
