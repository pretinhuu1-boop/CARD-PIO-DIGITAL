# Briefing de pesquisa — coleta de dados da loja

Modelo de prompt para rodar em uma sessão **com acesso à internet**, quando o
ambiente de desenvolvimento não alcança as fontes (ver Etapa 0 de
[`PROCESSO-CLONAGEM-LOJA.md`](PROCESSO-CLONAGEM-LOJA.md)).

A saída é desenhada para colar direto em `config.ts`, `data.ts` e `globals.css`
sem retrabalho. Substitua `{{LINK}}` pelo link recebido e entregue o bloco
inteiro na outra sessão.

---

## Como usar

1. Copie tudo abaixo da linha `--- INÍCIO DO PROMPT ---`
2. Troque `{{LINK}}` pelo link da loja
3. Cole numa sessão com internet
4. Traga a resposta de volta — **e os arquivos de imagem anexados**, porque
   URL de imagem não resolve se o ambiente de build não alcançar o host

---

--- INÍCIO DO PROMPT ---

# Pesquisa de loja para cardápio digital

Preciso de um levantamento completo de uma loja para montar o cardápio digital
dela. Siga as etapas na ordem e entregue **exatamente** no formato de saída
pedido no final.

**Link de entrada:** {{LINK}}

---

## ETAPA A — Identificar a loja

A partir do link, descubra e confirme:

- Nome exato do estabelecimento, como ele mesmo se escreve
- Categoria (confeitaria, hamburgueria, pizzaria, açaí, restaurante...)
- Endereço completo com CEP
- Telefone e, se houver, **WhatsApp** (informe se são o mesmo número)
- Nota e quantidade de avaliações no Google
- Horário de funcionamento por dia da semana
- Faixa de preço indicada pelo Google (`$`, `$$`, `$$$`)

Depois **liste todas as presenças online que encontrar**, com URL:

- Site oficial
- Instagram, Facebook, TikTok
- iFood, 99Food, Rappi, Aiqfome
- Cardápio digital de terceiro (Goomer, Anota Aí, Cardápio Web...)
- Linktree ou similar

Diga qual link **você conseguiu abrir de fato** e qual só apareceu citado.
Essa distinção importa.

---

## ETAPA B — Identidade visual

Ordem de prioridade das fontes: **site oficial > Instagram > cardápio digital
próprio**. Não use iFood nem Rappi para isso — aquelas páginas usam a identidade
da plataforma, não da loja.

Extraia:

| Item | O que preciso |
|---|---|
| Cor principal | Hex exato. Do CSS do site, ou amostrado da logo/fachada |
| Cor secundária | Hex da segunda cor da marca, se houver |
| Cor de fundo | Hex. Loja usa fundo claro ou escuro? |
| Fonte de título | Nome da fonte. Se não der para saber, descreva (serifada elegante, sans geométrica, script manuscrita) e sugira equivalente no Google Fonts |
| Fonte de texto | Idem |
| Tom da marca | Formal, afetivo, divertido, sofisticado? |
| Textos de CTA | Copie **literalmente** os botões usados ("Peça já", "Fazer pedido", "Chame no zap") |
| Slogan / tagline | Literal, se houver |
| Descrição curta | 1-2 linhas, como a própria loja se descreve |

**Se a cor principal for clara**, avise — o texto sobre ela precisa ser escuro,
não branco.

---

## ETAPA C — Produtos

**Mínimo 5, ideal 8 a 12.** Priorize os mais vendidos / em destaque.

Fonte preferida: **plataforma de venda (iFood, 99Food, Rappi)** — é onde nome,
descrição e preço aparecem estruturados e atualizados. Site oficial costuma ter
preço vencido.

Para cada produto:

```
nome              exatamente como está na fonte, sem reescrever nem traduzir
descricao         a da fonte; se não houver, escreva uma de até 2 linhas
preco             valor de venda atual, em número (ex.: 54.90)
preco_original    só se houver desconto REAL anunciado; senão, omita
categoria         agrupe tudo em 4 a 6 categorias
porcao            se a fonte informar ("12 unidades", "serve 2 pessoas")
selo              só se a plataforma marcar: "Mais vendido", "Novidade"
disponivel        true/false
imagem_url        URL direta do arquivo de imagem
fonte             de qual site/plataforma veio ESTE produto
```

### Regras que não se quebram

- **Nunca invente preço.** Não achou? Deixe o produto de fora e diga que ficou
  de fora, e por quê.
- **Não "melhore" o nome do produto.** O cliente busca pelo nome que conhece.
- **Selo de mais vendido só se a plataforma marcar.** Inventar isso é propaganda
  falsa em nome do lojista.
- **Informe a data da coleta.** Preço tem validade.
- Se o mesmo produto tiver preços diferentes entre plataformas, **reporte os
  dois** e diga qual é o do site oficial.

---

## ETAPA D — Imagens

Para cada produto e para a loja, colete:

- **URL direta do arquivo** (`.jpg`/`.png`/`.webp`), não a URL da página
- Maior resolução disponível
- Se a mesma foto aparecer em várias fontes, prefira a de melhor qualidade

Também colete, se existir:

- **Foto de fachada ou salão** — vira a capa do cardápio
- **Logo** em fundo transparente ou claro

Entregue uma tabela: `arquivo sugerido | produto | url | fonte | resolução`.

Nome de arquivo sugerido = slug do produto:
`brigadeiro-gourmet-cx-12un.webp`, `torta-de-limao.webp`, `loja/fachada.webp`.

**Baixe as imagens e anexe os arquivos**, se a sessão permitir. Só a URL pode
não ser suficiente do outro lado.

---

## ETAPA E — Operação

- Faz entrega? Área de cobertura?
- Valor do frete. Tem frete grátis acima de algum valor?
- Pedido mínimo?
- Formas de pagamento aceitas
- Tem retirada no local?
- Prazo médio de entrega
- Perguntas frequentes que a loja responda publicamente (bio, destaques, FAQ)
- 3 a 5 avaliações reais de clientes: nome, nota, texto, data aproximada

---

## FORMATO DE SAÍDA

Entregue nesta ordem, sem prosa em volta dos blocos de código.

### 1. Ficha da loja

```
Nome:
Categoria:
Endereço:
Telefone:
WhatsApp (só dígitos, com 55 + DDD):
Nota Google:
Site:
Instagram:
iFood:
Outras:
Coletado em:
```

### 2. Identidade visual

```
Cor principal:       #______   (fonte: ____)
Cor principal hover: #______
Cor de destaque:     #______
Fundo:               claro | escuro
Texto sobre a cor principal deve ser:  claro | escuro
Fonte de título:     ______  (Google Fonts equivalente: ______)
Fonte de texto:      ______  (Google Fonts equivalente: ______)
Tom da marca:
CTAs usados:
Tagline:
Descrição curta:
```

### 3. Produtos — tabela

| # | Nome | Descrição | Preço | Preço "de" | Categoria | Porção | Selo | Disponível | Fonte |
|---|------|-----------|-------|-----------|-----------|--------|------|-----------|-------|

### 4. Imagens — tabela

| Arquivo sugerido | Produto | URL direta | Fonte | Resolução |
|---|---|---|---|---|

### 5. Operação

```
Entrega:
Área de cobertura:
Frete:
Frete grátis acima de:
Pedido mínimo:
Pagamentos:
Retirada:
Prazo de entrega:
```

### 6. Avaliações

| Nome | Nota | Texto | Data |
|---|---|---|---|

### 7. FAQ

| Pergunta | Resposta |
|---|---|

### 8. Lacunas

**Seção obrigatória.** Liste tudo que **não** conseguiu achar, e onde procurou.
Não preencha buraco com estimativa — um preço chutado vira preço errado no
cardápio do lojista.

```
Não encontrado:
- ______ (procurei em: ______)
```

---

## Lembretes finais

- Prefira **citar a fonte** de cada dado a entregar um número sem origem
- Se o link de entrada for encurtador e não abrir, **diga isso** em vez de
  deduzir a loja
- Se a loja tiver mais de uma unidade, confirme **qual** unidade o link aponta
- Se algum dado for de 2024 ou anterior, sinalize como possivelmente vencido

--- FIM DO PROMPT ---
