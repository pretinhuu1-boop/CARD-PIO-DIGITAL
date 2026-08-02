# Processo — do link da loja ao cardápio publicado

Registro do fluxo de trabalho usado para transformar um link de loja em um
cardápio digital funcionando sobre o template padrão. Escrito para virar base
de uma skill: cada etapa tem entrada, saída, critério de pronto e as armadilhas
já encontradas na prática.

Template de referência: [`ESPECIFICACAO-TEMPLATE.md`](ESPECIFICACAO-TEMPLATE.md).

---

## Visão geral

```
ETAPA 0  Verificar acesso à rede           → lista de fontes alcançáveis
ETAPA 1  Coletar identidade visual          → cor, fonte, CTA, imagens de loja
ETAPA 2  Coletar produtos                   → 5+ itens com nome, desc., preço, imagem
ETAPA 3  Catalogar imagens                  → arquivos em /public + planilha de origem
ETAPA 4  Preencher o template               → 3 arquivos
ETAPA 5  Testar                             → suíte de verificação em navegador
ETAPA 6  Publicar                           → commit, push, PR
```

Cada etapa só começa quando a anterior tem saída aceita. A ordem importa:
preencher antes de coletar produz placeholder disfarçado de dado real.

---

## ETAPA 0 — Verificar acesso à rede

**Faça isto primeiro, sempre.** O ambiente de execução tem política de rede
própria e pode bloquear justamente as fontes que a tarefa exige. Descobrir isso
no meio da coleta desperdiça a etapa inteira.

```bash
curl -sS "$HTTPS_PROXY/__agentproxy/status" | head -40
for h in <hosts das fontes>; do
  echo "$h -> $(curl -s -o /dev/null -w '%{http_code}' --max-time 12 "https://$h")"
done
```

`000` ou `403` no CONNECT = host bloqueado pela política do ambiente.

Ferramentas e o que cada uma alcança:

| Ferramenta | Alcança |
|---|---|
| `WebSearch` | Índice de busca. Funciona mesmo com HTTP direto bloqueado |
| `WebFetch` / `curl` / Playwright | Só hosts liberados pela política do ambiente |

**Nunca contorne o bloqueio** desabilitando verificação TLS ou tirando o
`HTTPS_PROXY`. Se as fontes estiverem bloqueadas, o caminho é: pedir liberação
do domínio ao dono do ambiente, ou receber os dados por outro meio (colados na
conversa, arquivo, captura de tela).

**Saída:** lista do que é alcançável e do que não é, comunicada antes de
prometer a coleta.

### Armadilha conhecida

Encurtadores (`maps.app.goo.gl`, `bit.ly`) só revelam o destino ao serem
seguidos. Se o encurtador está bloqueado, **não há como descobrir a loja** — nem
por dedução. Peça o link direto (site oficial, iFood, Instagram) ou o nome.

---

## ETAPA 1 — Coletar identidade visual

**Entrada:** link do site oficial, iFood, 99Food, Instagram ou Google Maps.

**Ordem de prioridade das fontes:**

1. **Site oficial** — a fonte real da identidade. CSS tem as cores exatas
2. **Instagram** — perfil e destaques revelam paleta e tom
3. **iFood / 99Food** — bons para produto e preço, ruins para identidade
   (a página usa a identidade da plataforma, não da loja)
4. **Google Maps** — fotos do salão, categoria, endereço, horário, telefone

**Extrair:**

| Item | Como capturar | Onde vai |
|---|---|---|
| Cor principal | CSS do site (`background`, botões) ou amostra da logo | `--brand` em `globals.css` |
| Cor de hover | Variação ~15% mais escura/clara da principal | `--brand-hover` |
| Cor de destaque | Segunda cor da marca, para selos e ênfases | `--accent` |
| Fonte de título | `font-family` do site, ou identificar pela logo | `--font-app-display` |
| Fonte de texto | `font-family` do corpo | `--font-app-sans` |
| Texto dos CTAs | Copiar literalmente ("Peça já", "Fazer pedido") | Componentes |
| Foto de fachada/salão | Melhor resolução disponível | `store.heroImage` |
| Nome, telefone, endereço, horário | Maps ou rodapé do site | `config.ts` |

**Critério de pronto:** contraste conferido. `on-brand` sobre `brand` ≥ 4.5:1.
Se a cor da marca for clara, `--on-brand` vira escuro, não branco.

**Saída:** bloco de valores pronto para colar em `globals.css` + campos de
`config.ts` preenchidos.

---

## ETAPA 2 — Coletar produtos

**Meta mínima:** 5 produtos com nome, descrição, valor e imagem.

**Fonte preferida:** plataforma de venda (iFood/99Food) — é onde nome, descrição
e preço aparecem estruturados e atualizados. O site oficial costuma ter preço
desatualizado.

**Para cada produto, registrar:**

```
nome          exatamente como está na fonte, sem reescrever
descrição     a da fonte; se não houver, escrever uma de até 2 linhas
preço         valor de venda atual
preço "de"    só se houver desconto real anunciado
imagem        URL de origem (para baixar na Etapa 3)
categoria     agrupar em 4 a 6 categorias
porção        se a fonte informar ("12 unidades", "serve 2")
selo          "Mais vendido" / "Novidade" só se a fonte marcar
```

**Regras:**

- **Nunca invente preço.** Se não achou, deixe o produto de fora e diga.
- **Não traduza nem "melhore" o nome do produto.** O cliente busca pelo nome que
  conhece.
- **Registre a data da coleta.** Preço tem validade.
- Selo de "mais vendido" só se a plataforma marcar. Inventar isso é propaganda
  falsa em nome do lojista.

**Saída:** tabela com os 5+ produtos, pronta para virar `products[]`.

---

## ETAPA 3 — Catalogar imagens

Todas as imagens de produto ficam **locais**, em `public/produtos/`. Nunca
referencie a URL de origem: um CDN de terceiro fora do ar derruba o cardápio
inteiro — foi exatamente o que aconteceu na versão anterior deste projeto, onde
35 imagens dependiam de um CloudFront externo.

**Nomeação:** slug do nome do produto.

```
public/produtos/brigadeiro-gourmet-cx-12un.webp
public/produtos/torta-de-limao.webp
public/loja/fachada.webp
```

**Formato:** `.webp`, lado maior ~1200px. Recorte 4:5 para a grade e 16:10 para
o detalhe — o template usa essas proporções.

**Catálogo de origem** — grave junto, em `public/produtos/CATALOGO.md`:

| Arquivo | Produto | Preço | Fonte | Coletado em |
|---|---|---|---|---|
| `brigadeiro-gourmet-cx-12un.webp` | Brigadeiro Gourmet (cx 12un) | R$ 54,90 | iFood | 2026-08-02 |

Isso é o que permite reauditar preço e conferir de onde veio cada imagem seis
meses depois.

**Se não houver imagem:** deixe `image: null`. O template renderiza placeholder
neutro e o layout não colapsa. É melhor do que imagem genérica de banco.

---

## ETAPA 4 — Preencher o template

Três arquivos, nesta ordem. Detalhe de cada campo em
[`ESPECIFICACAO-TEMPLATE.md`](ESPECIFICACAO-TEMPLATE.md).

1. **`src/app/globals.css`** — bloco IDENTIDADE VISUAL: `--brand`,
   `--brand-hover`, `--brand-soft`, `--accent`, `--accent-soft`, `--on-brand`
2. **`src/app/layout.tsx`** — fontes, se houver fonte de marca (`next/font`)
3. **`src/lib/config.ts`** — loja inteira. `whatsapp` é o campo crítico
4. **`src/lib/data.ts`** — categorias, produtos, combos, avaliações, FAQ, sobre

**Verificação de vazamento:** nenhum «PREENCHER» pode sobrar.

```bash
grep -rn "PREENCHER\|Nome da Loja\|Produto 0\|Categoria [1-9]" src/
```

---

## ETAPA 5 — Testar

Não confie em leitura de código nem em build limpo. **Exercite no navegador.**
Build passa com a identidade visual inteira faltando — foi o que aconteceu aqui.

Suíte mínima, com Playwright (Chromium em `/opt/pw-browsers/chromium`):

```
□ Tokens aplicam cor real (nada com backgroundColor rgba(0,0,0,0))
□ Hero legível — medir a cor computada, com e sem foto
□ Filtro de categoria funciona com MOUSE (não só toque e teclado)
□ Filtro volta para "Todos"
□ Busca sem acento e sem caixa
□ Card de produto alcançável por Tab
□ Botão "Adicionar" com opacidade 1 no viewport mobile
□ Combo adiciona ao pedido
□ Carrinho sobrevive ao reload
□ Checkout barra envio com campos vazios
□ Observação do produto chega na mensagem
□ Mensagem do WhatsApp com o formato correto (capturar o window.open real)
□ Carrinho limpa após enviar
□ Todos os links de navegação rolam
□ FAQ abre com aria-expanded
□ Rodapé com âncoras e ano correto
□ Sem overflow horizontal em 390px
□ Todo alvo de toque ≥ 44×44px
□ Zero erros de console
```

### Espere a hidratação antes de clicar

`next start` serve HTML pré-renderizado. Clicar antes do React hidratar não
dispara handler nenhum e o teste falha por motivo errado — isso já produziu um
falso negativo aqui. Espere um sinal que só existe no cliente:

```js
await page.waitForLoadState('networkidle');
await page.waitForFunction(() => {
  const el = document.querySelector('a[aria-label="Falar no WhatsApp"]');
  return el && getComputedStyle(el).opacity === '1';
});
```

### Testar o WhatsApp sem enviar nada

Intercepte `window.open` e leia a URL:

```js
const url = await page.evaluate(() => new Promise((resolve) => {
  const orig = window.open;
  window.open = (u) => { window.open = orig; resolve(u); return null; };
  document.querySelector('[data-testid="enviar"]').click();
  setTimeout(() => resolve('NAO ABRIU'), 2000);
}));
console.log(decodeURIComponent(url.split('text=')[1]));
```

### Cuidado ao reiniciar o servidor entre testes

`pkill -f "next start"` pode matar o próprio shell da ferramenta. Suba o
servidor em background pelo mecanismo da ferramenta e use uma porta nova a cada
rodada — servidor antigo preso na porta serve o build anterior e produz
resultado que não corresponde ao código atual. Isso já aconteceu aqui e custou
uma rodada inteira de diagnóstico errado.

---

## ETAPA 6 — Publicar

```bash
npm run lint && npm run build
git add -A && git commit && git push -u origin <branch>
```

Abrir PR em draft. Corpo com: o que mudou, de onde vieram os dados, e o
resultado da suíte de testes.

---

## Checklist de revisão — armadilhas já encontradas

Verificar em todo cardápio antes de entregar. Todas foram defeitos reais neste
projeto, não hipóteses.

| Sintoma | Causa | Como detectar |
|---|---|---|
| Site "minimalista" sem querer | Tailwind v4 ignora `tailwind.config.ts`; classes de cor não geram CSS | `grep -c "<cor>" .next/static/**/*.css` → 0 |
| Texto sumido sobre foto | Overlay de contraste é classe inexistente | Medir cor computada com a foto carregada |
| Filtro morto no desktop | `setPointerCapture` redireciona o `click` | Testar com mouse, não só toque |
| CTA invisível no celular | `opacity-0 group-hover:opacity-100` | Medir opacidade no viewport mobile |
| Campo que não faz nada | Estado declarado e nunca lido | Rastrear a variável até a saída |
| Carrinho zerado | Estado só em memória | Recarregar a página com itens |
| Seção decorativa | Card com preço e nenhum handler | `grep -c onClick` na seção |
| Cupom sem efeito | Copia código sem campo para aplicar | Seguir o cupom até o total |
| Combo que cobra a mais | Itens avulsos somados em vez do preço do combo | Comparar total do carrinho com o card |
| Preço velho no pedido | Carrinho restaurado sem revalidar catálogo | Mudar preço e recarregar |
| Erro que não some | Validação guardada em estado, não derivada | Preencher o campo e olhar a mensagem |

---

## Princípios

1. **Coletar antes de preencher.** Preencher com estimativa produz dado falso
   que parece real.
2. **Não inventar dado de negócio.** Preço, selo de mais vendido, avaliação e
   horário saem da fonte ou ficam de fora. O que falta, se declara.
3. **Nada de dependência externa.** Imagem local, sem CDN de terceiro.
4. **Testar no navegador.** Build limpo não prova nada sobre o que o cliente vê.
5. **Placeholder tem que parecer placeholder.** Se falta o WhatsApp, o botão de
   pedido some e o checkout avisa — o template não finge estar pronto.
6. **Contraste é requisito, não gosto.** ≥ 4.5:1 nos pares de token.
7. **Mobile primeiro de verdade.** Cardápio se consome no celular; hover não
   existe lá.

---

## Notas para virar skill

O que precisa ser parametrizado ao empacotar isto como skill:

- **Entrada:** um ou mais links (site, iFood, 99Food, Instagram, Maps) e,
  opcionalmente, o número de WhatsApp que recebe os pedidos.
- **Etapa 0 é bloqueante** e precisa ser um passo explícito da skill: sem acesso
  às fontes, a skill deve parar e pedir os dados por outro meio, em vez de
  entregar cardápio inventado.
- **Saída da coleta** deve ser um artefato intermediário revisável (tabela de
  produtos + bloco de tokens) antes de qualquer edição de código — é o ponto
  natural de aprovação humana.
- **A suíte da Etapa 5** deve ser um script versionado no repositório, não
  reescrito a cada loja. O que muda entre lojas são só as contagens esperadas.
- **O checklist de armadilhas** é o núcleo de valor: são defeitos que passam por
  build, lint e revisão de código, e só aparecem exercitando a interface.
