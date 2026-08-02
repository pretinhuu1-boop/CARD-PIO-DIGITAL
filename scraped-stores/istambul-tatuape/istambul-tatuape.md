---
schema_version: 1
scraped_at: "2026-08-02T12:58:00Z"
store:
  name: "Restaurante Istambul Tatuapé"
  category: "restaurante árabe e turco · halal"
  phone: "(11) 95934-3335"
  whatsapp: "5511959343335"
  address: "R. Itapura, 1342 - Vila Gomes Cardim"
  city: "São Paulo"
  state: "SP"
  hours: "Ter a Dom, 11h - 23h"
  rating: 4.8
  reviews_count: 106
  ticket: "R$ 40-60 por pessoa (informado por 64 pessoas no Google)"
sources:
  - type: google_maps
    url: "https://www.google.com/maps/place/Restaurante+Istambul+Tatuap%C3%A9"
    status: found          # ficha não reivindicada; aba "Cardápio" vazia
  - type: site
    url: "https://restauranteistambulhalal-tatuape.pedido.app.br/cardapio/"
    status: found          # cardápio próprio sobre a plataforma Expresso Delivery
  - type: instagram
    url: "https://www.instagram.com/restauranteistambul2/"
    status: found
  - type: ifood
    url: ""
    status: not_found      # o iFood tem a unidade do BRÁS, não esta
  - type: keeta
    url: ""
    status: not_found
products_count: 10
---

# Restaurante Istambul Tatuapé (halal)

> Fonte primária dos produtos: cardápio online do próprio restaurante
> Fontes secundárias: Google Maps (ficha, fotos, ticket), Instagram

## Resumo da loja

Restaurante árabe e turco halal na Rua Itapura, no Tatuapé. Salão amplo para
refeição no local, nota 4,8 com 106 avaliações no Google, ticket médio de
R$ 40 a 60 por pessoa. O cardápio online tem **onze seções**: Lanches,
Aperitivos, Frango Assado na Brasa, Churrasco na Brasa, Prato Feito na Brasa,
Burgers, Frango Frito, Esfihas, Pide Turco, Bebidas e Doces/Sobremesas.

## Identidade visual

| Item | Valor | Origem |
|---|---|---|
| Vermelho da marca | `#A40000` | **cor configurada pelo lojista** no próprio cardápio online |
| Âmbar | `#8A5A12` | iluminação e madeira do salão |
| Creme | `#FFFCF7` / `#F7F1E7` | madeiramento claro do salão |
| Tinta | `#1A1512` | |
| Fonte de título | Fraunces | serifa de contraste alto |
| Fonte de corpo | Inter | |

Contraste: `on-brand`/`brand` 8,14:1 · `accent`/`surface` 5,78:1 · `ink`/`surface` 17,69:1.
Escuro: `on-brand`/`brand` 4,88:1 · `accent`/`surface` 8,28:1.

## Produtos

10 itens publicados, de duas das onze seções (Lanches e Esfihas), escolhidas
por terem preço e **foto distinta**. Nome, descrição e preço são transcrição
literal da fonte — inclusive a grafia da casa ("Sujke"), porque é por ela que
o cliente procura.

**Lanches** (preço é piso): Shawarma de Carne árabe R$ 25 · Shawarma Misto
R$ 25 · Falafel vegetariano R$ 25 · Tawook R$ 27 · Sujke com Pimenta R$ 27 ·
Shawarma de Carne no pão folha R$ 28.

**Esfihas** (preço fechado): Carne, Zatar, Frango e Queijo, R$ 12 cada.

## Notas de coleta

- **Duas formas de preço na mesma fonte.** Lanches vêm como *"à partir de
  R$ X"* — o valor é **piso**, há variações de tamanho. Esfihas vêm com preço
  fechado. Publicar piso como preço final subestimaria a conta do cliente;
  os itens de piso dizem isso na descrição, e só eles.
- **Preço de concorrente quase entrou.** Uma busca por "Istambul Tatuapé
  cardápio preços" devolveu uma tabela detalhada (Homus R$ 52, Michuí
  R$ 209,90…) que é do **@zainrestaurante**, na Rua Demétrio Ribeiro. Outro
  restaurante. Descartado.
- **A plataforma reaproveita foto entre produtos.** Os três Shawarmas de
  frango dividem a mesma imagem; os dois Falafels também. Os 10 itens foram
  escolhidos também por foto distinta.
- **Cardápio white-label não serve para identidade.** Medir o CSS do site
  deles devolveu quase só a plataforma: `rgba(0,0,0,.87)`, `#EEEEEE`, azul
  Material `#448AFF`, fonte Lato. O `og:image` que parecia logo é banner
  genérico do Expresso Delivery ("Peça online! É rápido, é prático"). O único
  token destoante era `#A40000` — e as fotos do salão confirmaram: letreiro
  vermelho, mascote de fez turco, bandeira da Turquia.
- **As fotos da fachada não serviram para amostrar.** Uma foi tirada através
  do para-brisa (reflexo de céu dominou a amostragem) e o mascote está sob luz
  quente (vermelho lê como marrom). Por isso o valor declarado pelo lojista
  prevaleceu sobre a amostragem.
- **CEP inconsistente no Google.** A ficha registra `15390-000`, que é do
  interior de SP e não bate com Tatuapé (03xxx). Omitido de propósito.
- **Combos sem preço.** O cardápio anuncia quatro "COMBO FAMILIAR", nenhum com
  preço na listagem, três marcados "⚠️ Apenas Retirada". `combos: []`.
- **Avaliações não transcritas nesta coleta.** `reviews: []` e a seção fica
  oculta, em vez de exibir depoimento genérico.
- **Frete e formas de pagamento não verificados.** O cardápio online só revela
  frete após escolher endereço. `shippingFee: 0` agora é renderizado como
  **"a combinar"**, não como "Grátis".
