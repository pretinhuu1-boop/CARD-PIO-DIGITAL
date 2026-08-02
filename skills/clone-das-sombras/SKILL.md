---
name: clone-das-sombras
description: Transforma o link de uma loja real em site publicado — coleta identidade visual, catálogo e provas sociais das fontes públicas e preenche um template Next.js. Use quando o usuário mandar um link de loja (Google Maps, iFood, Instagram, site) e pedir cardápio digital, catálogo, vitrine, expositor, landing de loja, "clonar essa loja", "fazer o site dessa loja" ou "monta um cardápio disso". Também use ao coletar identidade visual de uma marca a partir de site ou de fotografias. Aciona em: cardápio digital, cardapio, vitrine, expositor, clonar loja, site da loja, scraping de loja, identidade visual da marca, paleta da marca, pedido por WhatsApp.
---

# Clone das Sombras

Pega o rastro público que uma loja deixa — ficha, fotos, cardápio, avaliações — e devolve um site que se parece com ela e não mente sobre ela.

O nome é o contrato: **a sombra tem a forma do corpo, mas não inventa membro que o corpo não tem.** Dado que não existe na fonte não aparece na página.

Este documento é operacional. Cada regra aqui custou um erro real em execução, não é hipótese.

---

## 0. A decisão que vem antes de tudo: qual página esta loja comporta

**Não pergunte que página o usuário quer. Descubra que página a fonte sustenta.**

| Sinal | Formato |
|---|---|
| Preço público e nome de produto em alguma fonte | **Cardápio** com carrinho e pedido |
| Fotos da loja, mas sem preço nem nome de produto | **Expositor**: foto é o produto, cada peça abre conversa |
| Nem foto própria nem catálogo | Só ficha + contato. Diga isso ao usuário antes de construir |

**Regra dura: sem preço público, não existe checkout.** Forçar cardápio numa loja sem preço obriga a inventar número — o pior resultado possível, porque sai publicado em nome do lojista.

Duas lojas na mesma rua deram formatos opostos. É normal.

---

## 1. Resolver o link e fixar a âncora de identidade

Encurtador só revela destino ao ser seguido:

```bash
curl -sSL -o /dev/null -w '%{url_effective}\n' --max-time 25 "<link>"
```

Do resultado extraia **nome + endereço + telefone**. Nome sozinho não serve: nome de loja se repete entre bairros. Toda fonte seguinte precisa bater com o endereço ou o telefone antes de ser tratada como a mesma loja.

Google Maps por `place_id` entrega ficha completa (categoria, nota, avaliações, telefone, site, modalidades). Use o browser — a página é dinâmica.

---

## 2. Classificar o ramo ANTES de escolher onde procurar

Errar isso queima rodadas.

| Ramo | Onde tem catálogo |
|---|---|
| Comida, bebida, mercado | plataforma **do próprio restaurante** primeiro (`*.pedido.app.br`, Goomer, Anota Aí), depois iFood/99Food/Keeta/Rappi |
| Artesanato, decoração, plantas | Instagram, Elo7, Shopee, Mercado Livre, site próprio |
| Serviço (salão, clínica, estúdio) | Fresha, Booksy, Trinks — **confira se a página é reivindicada** |

Perguntar "está no iFood?" para uma floricultura é rodada perdida: essas plataformas são de comida.

**O cardápio próprio do lojista vence o marketplace.** Um restaurante testado tinha catálogo completo em `restauranteistambulhalal-tatuape.pedido.app.br` — nome, preço, descrição e foto — enquanto o iFood só tinha outra unidade da rede. Procure o subdomínio da loja antes de ir ao agregador. E confirme a **unidade**: o subdomínio costuma trazê-la no nome.

### Três coisas que parecem fonte oficial e não são

1. **Listagem não reivindicada.** Fresha, Booksy e similares publicam páginas montadas com dado público. Procure a frase: *"not currently affiliated with or partnered with"*. Os "serviços" ali são categoria da plataforma, não do lojista. Uma página assim listava "Eyebrow Threading" como o único serviço de um hair studio.
2. **Domínio ativo ≠ site publicado.** DNS resolvendo e MX funcionando só provam que o e-mail existe. Um salão tinha `alooks.com.br` com e-mail real na bio e HTTP **403 numa página de hospedagem parqueada**. Teste o HTTP, não só o DNS.
3. **Ficha do Maps não reivindicada tem dado sujo.** Um restaurante registrava CEP `15390-000` (interior) num endereço do Tatuapé (03xxx), e a aba "Cardápio" era um placeholder vazio. Se aparece "Reivindicar esta empresa", desconfie de cada campo.

Registre **toda** fonte consultada com status `found` / `not_found` / `blocked` / `no_products`. Ausência silenciosa impede o próximo agente de distinguir "não existe" de "não procurei".

---

## 3. Identidade visual — dois métodos, escolhidos pela fonte

> **Antes de medir, pergunte de quem é o CSS.** Cardápio white-label
> (`*.pedido.app.br`, Goomer, Anota Aí) é **ótima fonte de catálogo e péssima
> fonte de identidade**: quase tudo que você mede é tema da plataforma. Num
> caso real a medição devolveu `rgba(0,0,0,.87)`, `#EEEEEE`, azul Material
> `#448AFF` e fonte Lato — nada da marca. O `og:image` que parecia logo era
> banner genérico ("Peça online! É rápido, é prático").
>
> Mas **um token costuma destoar**: o que o lojista configurou. Ali era
> `#A40000`, e as fotos do salão confirmaram — letreiro vermelho, mascote de
> fez turco. Valor declarado pelo lojista vence amostragem de foto ruim.

> **Fotos do Maps têm viés de quem sobe.** Num hair studio, 9 das 13 fotos
> eram close-up de unha, porque cliente fotografa o que fotografa bem. O
> serviço principal quase não aparecia. Cheque se o acervo representa o
> negócio antes de construir a página em cima dele.

### 3a. Com site oficial: medir o CSS

Nunca leia a cor "de olho". Rode no browser:

```js
() => {
  const count = {};
  const bump = (c, w) => { if (!c || /rgba?\(0, 0, 0, 0\)|transparent/.test(c)) return; count[c] = (count[c]||0) + w; };
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    bump(s.backgroundColor, Math.max(1, Math.round(r.width * r.height / 1000)));
    if (/BUTTON|A/.test(el.tagName)) { bump(s.backgroundColor, 500); bump(s.color, 200); }
  });
  return Object.entries(count).sort((a,b)=>b[1]-a[1]).slice(0,12);
}
```

**Depois meça os CTAs separadamente.** A cor de maior área costuma ser a *superfície* da marca, não a cor de *ação*. Numa chocolateria a superfície era chocolate e o botão real era dourado — e dourado com texto branco dá **1,58:1**, reprova. Sem medir o botão, a cor de ação sai errada.

### 3b. Sem site: amostrar as fotografias

Baixe as fotos do proprietário no Maps (`gps-cs-s`, aceita `=w1200-h1600-k-no`) e/ou do Instagram. **Olhe as imagens** — monte folha de contato com PIL e leia com a ferramenta de imagem. Você precisa ver a fachada, o interior, o logo e as peças.

```python
def dominant(path, box=None, k=6, minsat=40):
    from PIL import Image; from collections import Counter
    im = Image.open(path).convert('RGB')
    if box: im = im.crop([int(v*s) for v,s in zip(box,(im.width,im.height,im.width,im.height))])
    im.thumbnail((160,160)); c = Counter()
    for r,g,b in im.getdata():
        if max(r,g,b)-min(r,g,b) < minsat: continue   # descarta neutro
        c[(r//16*16, g//16*16, b//16*16)] += 1
    return [('#%02X%02X%02X' % rgb, n) for rgb,n in c.most_common(k)]
```

**A luz é ruído.** A mesma parede sai `#205020` na sombra e `#509060` no sol. Não escolha por gosto: pegue o meio e **decida pelo contraste**, que é o único critério que não depende de iluminação.

> **Pista não testada.** Se a marca tem um elemento sabidamente circular (logo em
> círculo, placa redonda), ele funciona como referência para estimar a distorção
> de perspectiva da foto e corrigi-la antes de amostrar. Ideia levantada num
> passe de análise que foi interrompido antes de provar nada — pode reduzir a
> divergência entre fotos da mesma parede. **Só vale a pena se a diferença mudar
> a decisão de cor**; o desempate por contraste já resolve a maioria dos casos, e
> corrigir perspectiva é trabalho pesado para escolher a cor de um botão.

### 3c. Contraste é portão, não enfeite

Calcule WCAG de verdade e valide antes de escrever no CSS:

```python
def lum(h):
    h=h.lstrip('#'); r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    f=lambda c: c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
def cr(a,b):
    l=sorted([lum(a),lum(b)],reverse=True); return (l[0]+0.05)/(l[1]+0.05)
```

Pares obrigatórios ≥ 4.5:1 — `ink`/`surface`, `ink-2`/`surface`, `on-brand`/`brand`, `on-overlay`/`overlay`. **Se a cor da marca for clara, `on-brand` é escuro.** Não branco por hábito.

---

## 4. Catálogo — o extrator marca, o curador decide

### Restrições de plataforma já medidas

- **iFood bloqueia `curl`** (PerimeterX, 403 + `px-captcha`). O catálogo só sai de sessão de browser real. Endpoint: `GET https://www.ifood.com.br/site-api/v1/merchants/restaurant/{uuid}/catalog`
- **Chave estável do iFood é `externalCode`, não o `uuid`** — o mesmo item tem uuid diferente em cada categoria em que aparece
- **Instagram sem login** não entrega legenda nem preço; os `alt` são descrições geradas pela Meta
- **Google Maps concatena a resposta da loja no texto da avaliação** — separe antes de publicar, ou você atribui ao cliente a fala da dona

### Procure o dado estruturado no atributo antes de raspar texto

Antes de partir o HTML em pedaços, procure o JSON que a plataforma já deixou
pronto. No Expresso Delivery (`*.pedido.app.br`) cada card carrega
`data-dadositem='{"coditem":"316","nomeitem":"ALHO","precoitem":"2.00",…}'`,
além de marcação schema.org. As páginas de categoria são renderizadas no
servidor — nem browser é preciso.

A diferença não é de conforto: o preço lido do atributo é o número do
cadastro, e o preço lido de tela é o número **formatado**, com "à partir de",
símbolo e vírgula grudados. Um parser por texto voltou 0 item nessa mesma
página antes de eu olhar os atributos.

```bash
curl -s "<url-da-categoria>" | grep -o "data-dadositem='[^']*'" | head -3
```

### Acompanhamento cadastrado por seção vira produto repetido

Restaurante costuma cadastrar o mesmo adicional em cada seção onde ele é
oferecido, cada ocorrência com id próprio. Num caso medido, "ALHO" aparecia em
cinco categorias e "molho de pimenta" em três: **152 registros para 146
produtos reais**. Por categoria isso está certo; numa página única com filtro
"Todos", vira repetição visível.

Unifique por **nome + preço** — não por id — e guarde as outras categorias
como anotação em vez de jogar fora:

```python
vistos = {}
for p in registros:
    k = (p['nomeitem'].strip().lower(), p['precoitem'])
    if k in vistos: vistos[k]['tambem'].append(p['categoria'])
    else: vistos[k] = {**p, 'catPrincipal': p['categoria'], 'tambem': []}
```

Se o preço divergir entre duplicatas, **não unifique** — são produtos
diferentes com nome igual, e a diferença é informação.

### Regras de plausibilidade (marcar, não descartar em silêncio)

- `original_price` igual em >50% dos itens → **valor-lixo de cadastro**
- `original_price` < `price` → incoerente
- desconto > 60% → confirmar
- preço vindo de **busca genérica do ramo** → descartar sempre; é preço de concorrente
- **"a partir de" é piso, não preço** → ver abaixo
- **duas unidades da mesma marca** → confirme telefone E endereço antes de usar qualquer número

### "A partir de" muda o significado do número

Uma mesma fonte pode misturar as duas formas. Num restaurante testado, os
Lanches vinham como *"à partir de R$ 25,00"* (variações de tamanho) e as
Esfihas com preço fechado. Publicar o piso como preço final **subestima a
conta do cliente**. Rotule só o que a fonte rotula, item a item.

No catálogo completo desse mesmo restaurante a proporção ficou em **98 de 152
(64%)**. Não é exceção de uma seção — é a forma dominante da casa. Amostrar
duas categorias e concluir "quase tudo tem preço fechado" teria errado feio.

E o inverso da regra do valor-lixo também vale: ali o preço mais repetido era
R$ 25, em **13%** dos itens. Bem longe dos >50% que denunciam cadastro
preguiçoso, e bem longe do iFood onde `78.90` cobria 26 de 30 produtos.
Meça a repetição antes de suspeitar — e antes de confiar.

### Preço de concorrente entra pela busca, não pela fonte

Uma busca por "`<loja>` `<bairro>` cardápio preços" devolveu uma tabela
detalhada e plausível — de **outro restaurante**, a três ruas dali. O buscador
mistura. Preço só vale se veio de uma página que você abriu e confirmou ser
da loja pela âncora (endereço ou telefone).

### A API pode ignorar o filtro que você mandou

O caso mais perigoso já encontrado, porque **nada no retorno denuncia**. Num
lounge, `products.json?main_category_id=<id>` devolvia os **mesmos 100 itens**
para qualquer id. As oito chamadas somaram 800 registros que, deduplicados por
`id`, eram 100. Confiar no parâmetro publicaria cada item repetido oito vezes.

**Sempre dedupe por `id` e confira se o filtro foi respeitado:**

```python
ids = {cat: {p['id'] for p in bloco['productos']} for cat, bloco in resposta.items()}
assert len(set().union(*ids.values())) > max(len(v) for v in ids.values()) * 1.2, \
    "o endpoint parece ignorar o filtro de categoria"
```

A categoria verdadeira costuma estar num campo do próprio produto
(`category_label`), não no parâmetro que você mandou.

**Cheque também o teto de página.** Ali a API devolvia exatamente 100 e
ignorava `page`, `offset`, `limit` e `per_page`. Se todas as categorias
devolvem o mesmo número redondo, é teto — declare que o catálogo pode ser
maior em vez de afirmar que aquilo é tudo.

### A plataforma reaproveita foto entre produtos

Três shawarmas de frango dividiam a mesma imagem; dois falafels também. Ao
escolher os itens a publicar, use **foto distinta** como critério, senão a
grade parece quebrada.

**Mas o critério inverte quando o catálogo é completo.** Publicando as onze
seções do mesmo restaurante, 146 produtos dividiam 103 fotos — os cinco
tamanhos de "misto assado" compartilham uma. Aí recortar por foto única
esconderia produto que existe, e esconder é pior que repetir. Foto distinta é
critério de **seleção**; quando não há seleção, deixa de valer. Diga na
procedência quantas fotos distintas há.

Caso real: iFood devolveu `originalPrice: 78.90` em 26 de 30 produtos, inclusive água mineral de R$ 12,90. JSON válido, tipo certo, build limpo. Renderizado como desconto, vira propaganda falsa.

**Flag de severidade alta bloqueia a geração.** O gerador se recusa a rodar.

### Vitrine curada do lojista vale mais que heurística sua

Se a plataforma tem seção tipo "Os Queridinhos" / "Mais pedidos", é o próprio lojista dizendo qual é o carro-chefe. Use isso em vez de inventar critério de seleção.

---

## 5. Artefato revisável entre coleta e código

Grave `scraped-stores/<slug>/<slug>.md` com front-matter (loja, fontes com status, produtos) **antes** de tocar em código. É o ponto de aprovação humana e o que impede erro de coleta de só aparecer no site publicado.

Feche sempre com **"Notas de coleta"**: o que não foi achado, onde procurou, o que ficou incerto, e todo limite declarado (ex.: "os títulos descrevem a fotografia, não são a nomenclatura da loja").

---

## 6. Preencher — só os arquivos parametrizáveis

No template deste projeto: `src/app/globals.css` (tokens), `src/lib/config.ts` (loja), `src/lib/data.ts` (conteúdo), `src/app/layout.tsx` (fonte).

- **Tailwind v4 ignora `tailwind.config.ts` em silêncio.** Toda cor entra no CSS. Cor declarada em JS não gera classe nenhuma e o site fica sem identidade com build limpo.
- **Toda imagem local**, convertida para `.webp`. Nunca referencie CDN de terceiro: um CDN fora do ar derruba a página inteira. Descubra o tamanho válido do CDN antes de baixar em lote — o Expresso Delivery serve `/180/`, `/600/` e `/800/` e devolve 404 em `/300/`, `/400/`, `/500/` e `/original/`.
- **`shippingFee: 0` significa "não informado" tantas vezes quanto "grátis".** Renderizar como "Grátis" cria uma política de entrega que o lojista nunca declarou. Sem fonte, escreva **"a combinar"**.
- **Seção sem dado some, e o link dela também.** Derive a navegação do conteúdo. Link de menu apontando para âncora inexistente é defeito.
- **Controle que não leva a lugar nenhum é pior que a ausência dele.** Loja sem checkout não ganha ícone de carrinho.

---

## 7. Verificação no navegador — o que build, lint e tipo não pegam

Nenhum dos defeitos abaixo é erro de sintaxe. Todos passaram por `tsc`, `eslint` e `build`.

```
□ Tokens aplicam cor real (nada com backgroundColor rgba(0,0,0,0))
□ Contraste medido no elemento renderizado, não no arquivo
□ Hero legível COM a foto carregada, nos DOIS temas
□ Filtro de categoria testado com MICRO-ARRASTO, não com clique perfeito
□ Busca com filtro ativo: o estado vazio explica e oferece saída
□ CTA visível por padrão no viewport mobile (não só no hover)
□ Toda imagem carrega
□ Mensagem do WhatsApp capturada interceptando window.open
□ Carrinho limpo após envio; item removido do catálogo some sem quebrar
□ Zero overflow horizontal em 390px
□ Todo alvo de toque ≥ 44×44px
□ Zero erro de console
```

**O micro-arrasto é o caso mais importante.** Automação de clique tem deslocamento zero; mão humana move 4–8px entre apertar e soltar. Um limiar de arrasto de 4px descartava **todo** clique de mouse — e os testes automatizados passavam, porque eram limpos demais. Reproduza injetando o tremor:

```js
computer({ action: 'left_click_drag', start_coordinate: [x, y], coordinate: [x+6, y] })
```

Faixa que cabe inteira na tela não tem o que arrastar: só suprima clique se `scrollWidth > clientWidth`.

### O teste também erra — e erra parecendo bug do produto

Dois falsos alarmes numa sessão, os dois convincentes:

**React ignora `new Event('input')` cru.** Setar `input.value` direto não
dispara o handler do React: o valor volta atrás no próximo render e a busca
parece não filtrar nada. Uma busca por "baklava" devolveu os 146 produtos e
por um momento pareceu busca quebrada. Use o setter nativo:

```js
const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
set.call(input, 'baklava');
input.dispatchEvent(new Event('input', { bubbles: true }));
```

**Seletor global pega o controle do item errado.** Procurar o botão por texto
entre *todos* os visíveis (`find(b => /adicionar/i.test(b.textContent))`) acha
o primeiro card da página, não o do produto aberto. Abri "Esfiha Carne" e o
carrinho recebeu "ALHO" — parecia bug grave de vinculação. Ancore no elemento:
`card.querySelector('[aria-label^="Adicionar"]')`, ou no id do painel
(`#sh-add`).

Antes de reportar defeito de interação, **releia o próprio seletor**. E
confirme o alvo: se a sheet abriu com o produto certo (`#sh-img`.alt), o
problema está no clique de confirmação, não na abertura.

**Nem todo `<img>` sem `src` é imagem quebrada.** O `<img>` do painel de
detalhe nasce vazio e só é preenchido ao abrir um produto. Filtre por
`naturalWidth === 0 && getAttribute('src')` antes de contar quebradas.

---

## 8. Snapshot HTML autocontido

Arquivo único que abre por duplo clique, sem servidor e sem rede: CSS, fontes e imagens em base64.

- **Gere a partir do build de produção**, não do dev server. O dev server não emite `@font-face`, e a fonte da marca não vai junto.
- **Use substituição por FUNÇÃO** ao injetar: `html.replace('</body>', () => script + '</body>')`. Com texto, `$$` vira `$` literal e corrompe o código injetado — já produziu um arquivo natimorto sem nenhum erro no console.
- **Neutralize as animações**: framer-motion serializa `opacity:0` no HTML e a transição nunca dispara sem React. Sem override, a página inteira nasce invisível.
- **Inline também os caminhos diretos** (`/produtos/…` no `background-image`), não só as URLs do otimizador de imagem.
- Remova `loading="lazy"`: sem o observer, imagem abaixo da dobra nunca carrega.
- **Injete os dados, não deduza do DOM.** O script derivava o nome da loja de
  `document.title.split('|')[0]`; bastou o título passar a usar travessão para
  o cabeçalho do pedido virar "Loja — tagline". Leia do config e injete como
  constante.
- **O snapshot depende de `data-*` nos cards.** Se o script injetado não achar
  `article[data-product-id]`, ele sai em silêncio e o arquivo nasce estático,
  sem erro nenhum. Confira a contagem desses atributos no arquivo gerado.
- **Regere a partir de um servidor de produção reiniciado.** `npm run build`
  não reinicia o `next start` que já está de pé — você gera o snapshot do
  build anterior e não percebe.

**Valide executando, não contando.** Extraia o `<script>` e rode `node --check`; sirva o arquivo e renderize. Grep dizendo "1 script, 0 referências externas" já acompanhou arquivo quebrado.

### Catálogo grande: separe a resolução do arquivo da resolução do site

Base64 infla todo binário em **~37%** (3 bytes viram 4 chars). Num catálogo de
146 produtos, as fotos a 700px somavam 6,8 MB no disco e produziriam **~9 MB**
dentro do HTML.

A saída não é comprimir mais — é lembrar que são dois consumidores diferentes.
O site servido usa `next/image`, que escolhe o tamanho pelo `srcset` e **nunca
passa pelo gerador**. Só o arquivo solto embute. Então gere um espelho menor
usado apenas no snapshot, e não toque em `public/`:

```
public/produtos/*.webp        700px  — o site, qualidade cheia
.snapshot-img/produtos/*.webp 520px  — só o arquivo único
```

520px cobriu com folga: o card mede 347px no desktop e 171px no celular (3x).
Resultado 5,4 MB em vez de 9 MB, sem perda visível e sem rebaixar o site.
O resolvedor cai no original quando a foto não está no espelho, para foto nova
não sumir em silêncio.

**Meça antes de escolher a resolução** — a curva não é linear:

| largura | disco | HTML final |
|--:|--:|--:|
| 440px q80 | 2,8 MB | 3,8 MB |
| 520px q82 | 3,7 MB | 5,0 MB |
| 700px q86 | 6,5 MB | 8,9 MB |

### Retoque manual de publicação vira flag do gerador

O `<meta robots="noindex, nofollow">` era aplicado à mão depois de publicar.
Ao regerar o snapshot, o arquivo nasceu sem ele e foi pro ar competindo em
busca com a loja real — porque **etapa manual não tem como falhar em voz
alta**. Virou `SNAPSHOT_NOINDEX=1`.

Vale como regra: se você editou o artefato depois de gerá-lo, ou aquilo entra
no gerador, ou a próxima regeração desfaz. Teste que entrou comparando o
arquivo gerado com o publicado byte a byte.

---

## 9. Dado de pessoa

- Nome de cliente entra como **primeiro nome + inicial**
- Avaliação nota 5 **sem texto** não vira depoimento
- Separe a **resposta da loja** do texto do cliente
- Nada atrás de login

---

## Armadilhas medidas — confira todas antes de entregar

| Sintoma | Causa | Como detectar |
|---|---|---|
| Site sem identidade | Tailwind v4 ignora config JS | `grep -c "<cor>" .next/static/**/*.css` → 0 |
| Texto some sobre foto | par de token instável entre temas | medir cor computada nos dois temas |
| Filtro morto no mouse | limiar de arrasto pequeno demais | clique com deslocamento de 6px |
| Link de menu morto | nav fixa com seção oculta | olhar o menu depois de esvaziar uma seção |
| Preço "de" falso | valor-lixo repetido no cadastro | contar repetição de `original_price` |
| CTA invisível no celular | `opacity-0 group-hover` | medir opacidade em 390px |
| Página morta no snapshot | `$$` corrompido / animação não disparada | `node --check` no script extraído |
| Carrinho cobra a mais | combo somado item a item | comparar total com o preço do combo |
| Hero sem texto no dev | grafo de módulos velho após deletar/trocar arquivos | reiniciar o dev server e recarregar |
| "Grátis" que ninguém prometeu | `shippingFee: 0` tratado como gratuidade | ler a mensagem gerada, não o config |
| Preço menor que o real | "a partir de" publicado como preço fixo | conferir o rótulo na fonte, item a item |
| Snapshot de MB demais | base64 embutindo a resolução do site | espelho reduzido só para o arquivo solto |
| Demo republicada indexável | `noindex` era retoque manual pós-publicação | diff do gerado contra o publicado |
| Busca "não filtra" no teste | React ignora `new Event('input')` cru | usar o setter nativo de `value` |
| Item errado no carrinho | seletor global pegou o botão do 1º card | ancorar o seletor no card ou no id do painel |
| Produto some do catálogo | dedup por id em vez de nome + preço | contar registros da fonte × itens publicados |

> **A correção de template mora na `main`, não na branch da loja.** Ao rodar a
> terceira loja, o bug do filtro de 4px reapareceu inteiro — a correção vivia
> só na branch da primeira. Ao consertar algo do template, decida na hora se
> aquilo volta para a base; senão a próxima loja herda o defeito.
>
> **E a dívida cresce em silêncio.** Medido depois de quatro lojas, a `main`
> ainda não tinha `data-product-id` no ProductGrid, `data-category-slug` no
> CategoryChip, o "a combinar" do frete, a nav derivada do conteúdo, nem o
> `scripts/`. Portar só o gerador não resolve — sem os `data-*` ele sai em
> silêncio e o arquivo nasce estático. **Portar é tudo ou nada.**
>
> Cuidado ao voltar de uma branch de publicação: `git checkout <branch> -- .`
> apaga as edições não commitadas que você acabou de fazer. Commite a correção
> de template **antes** de trocar de branch para publicar.

---

## Princípios

1. O formato da página sai da fonte disponível, não do pedido.
2. Dado ausente se declara; dado plausível se questiona.
3. Preço, selo e avaliação saem da fonte ou ficam de fora.
4. Contraste é critério, não gosto — e é o desempate quando a fonte é foto.
5. Build limpo não prova nada sobre o que o cliente vê.
6. Artefato gerado se valida executando.
7. Controle que não leva a lugar nenhum é pior que a ausência dele.
8. Toda imagem local.

---

## Referências no repositório

Repositório `CARD-PIO-DIGITAL`. Onde a branch importa, ela está dita — a `main`
ainda não recebeu o port das correções.

- `docs/ESPECIFICACAO-TEMPLATE.md` — contrato de dados do template (`main`)
- `docs/BRIEFING-PESQUISA-LOJA.md` e `docs/PROCESSO-CLONAGEM-LOJA.md` —
  antecessores deste documento. **Superados**: o que valia foi absorvido aqui,
  medido; o que não foi absorvido não sobreviveu ao contato com loja real.
  Leia por curiosidade histórica, não como procedimento.
- `scraped-stores/<slug>/` — procedência por loja, com lacunas declaradas
- `scripts/snapshot-html.mjs` — gerador do arquivo único. **Só nas branches de
  loja**, não na `main`.
- branch `chore/template-padrao` — template em branco já com as correções;
  serve de referência para o port e gera o `template-padrao.html`.

`docs/APRENDIZADOS-PARA-SKILL.md` foi absorvido por este arquivo e removido.
Se um documento citar esse caminho, o documento é que está velho.
