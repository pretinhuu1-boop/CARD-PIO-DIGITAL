---
schema_version: 1
scraped_at: "2026-08-02T13:40:00Z"
store:
  name: "TBT LOUNGE TATUAPÉ"
  category: "bar e lounge / casa noturna"
  phone: "(11) 95124-0157"
  whatsapp: "5511951240157"
  address: "R. Itapura, 1267 - Vila Gomes Cardim"
  city: "São Paulo"
  state: "SP"
  hours: null            # nenhuma fonte publica a grade completa
  rating: 4.0
  reviews_count: 141
  ticket: "+R$ 200 por pessoa (informado por 30 pessoas no Google)"
sources:
  - type: google_maps
    url: "https://www.google.com/maps/place/TBT+LOUNGE+TATUAPÉ"
    status: found          # ficha NÃO reivindicada, sem telefone cadastrado
  - type: site
    url: "https://tbt-lounge.cluvi.com.br/tbt-lounge/menu-digital"
    status: found          # cardápio digital próprio, plataforma Cluvi
  - type: outro
    url: "https://linktr.ee/tbtloungetatuape"
    status: found
  - type: instagram
    url: "https://www.instagram.com/tbtloungetatuape"
    status: found
  - type: ifood
    url: ""
    status: not_found
products_count: 10
---

# TBT Lounge Tatuapé

> Fonte primária dos produtos: cardápio digital próprio (Cluvi, `supplier_id` 3344)
> Fontes secundárias: Google Maps (ficha, fotos), Linktree, Instagram

## Resumo da loja

Bar e lounge no Tatuapé, na mesma rua do Restaurante Istambul. A casa se
apresenta como **"famoso baile do TBT"** — é casa noturna, não restaurante.
Nota **4,0 com 141 avaliações**, ticket acima de **R$ 200 por pessoa**.
Camarotes, narguilé, garrafas com combo de energético, e uma seção de comida
japonesa.

## Identidade visual

O logo da casa é **monocromático** (preto sobre transparente: "TATUAPÉ / TBT★ /
#BAR E LOUNGE"), então a cor da marca não vem dele — vem da iluminação do
lugar, amostrada das fotos do ambiente.

| Item | Valor | Origem |
|---|---|---|
| Verde neon | `#00C080` | iluminação do camarote |
| Âmbar | `#D9A05B` | garrafas retroiluminadas do bar |
| Fundo | `#0A0C0A` | medido: os pixels mais escuros das fotos dão `#030303`–`#050705` |
| Tinta | `#F2F4F1` | |
| Fonte de título | Anton | lettering condensado e pesado, como o logo |
| Fonte de corpo | Inter | |

**O site é escuro nos dois esquemas de cor, de propósito.** Uma versão clara
não seria acessibilidade: descreveria outro lugar.

Contraste: `on-brand`/`brand` 8,04:1 · `accent`/`surface` 8,53:1 ·
`ink`/`surface` 17,75:1. Verde neon com texto **branco** dá 2,37:1 e reprova —
`on-brand` é escuro.

## Produtos

10 itens de 7 categorias, escolhidos por terem preço e **foto distinta**.
Nome, descrição e preço são transcrição literal, inclusive a grafia em caixa
alta que a casa usa em parte do cadastro.

Faixa do catálogo: R$ 10 a R$ 3.500, mediana R$ 75 — coerente com o ticket
declarado.

## Notas de coleta

- **A API ignora o filtro de categoria.** `products.json?main_category_id=<id>`
  devolve os **mesmos 100 itens** para qualquer id. As oito chamadas somaram
  800 registros que, deduplicados por `id`, são **100**. Confiar no parâmetro
  produziria um cardápio com cada item repetido oito vezes, e nada no retorno
  denuncia isso. A categoria verdadeira está em `category_label`, dentro de
  cada produto.
- **Limite rígido de 100 itens.** A API ignora `page`, `offset`, `limit` e
  `per_page` — todas devolvem os mesmos 100. O cardápio da casa pode ser maior;
  esta coleta não consegue provar que não é.
- **O WhatsApp do Linktree está sem o código do país.** A casa publica
  `wa.me/11951240157`, que o WhatsApp interpreta como número dos EUA. O
  correto, a partir do telefone `(11) 95124-0157`, é `5511951240157`.
- **`price_full` NÃO é valor-lixo aqui.** Presente em 100/100 itens, o valor
  mais repetido aparece em apenas 9% — contra 87% no caso do iFood. Zero
  incoerências, zero promoções ativas. Ainda assim não foi publicado como
  preço "de", por não haver desconto anunciado.
- **20 dos 100 itens não têm imagem.** Os 10 publicados são de quem tem.
- **Só 1 item na categoria "Narguiles"**, apesar de narguilé ser o assunto mais
  citado nas avaliações. O cadastro não reflete o que a casa é conhecida por
  vender.
- **Ficha do Maps não reivindicada e sem telefone.** O número veio do Linktree
  e da busca, não da ficha.
- **Avaliações não publicadas.** Nota **4,0 é mista**: os trechos que o Google
  destaca incluem *"o ambiente e funcionários são péssimo"* e *"bebidas
  extremamente caras"*. Publicar só as positivas seria escolher a dedo o que
  favorece. `reviews: []`.
- **Horário não publicado** em nenhuma fonte. O campo mostra "consulte no
  WhatsApp" em vez de inventar grade.
- **Frete, pedido mínimo e formas de pagamento** não verificados.
