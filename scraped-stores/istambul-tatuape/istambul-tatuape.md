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
products_count: 146       # 152 registros na fonte, unificados por nome + preço
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

**Catálogo completo: as onze seções, 146 produtos.** Nome, descrição e preço
são transcrição literal da fonte — inclusive a grafia da casa ("Sujke",
"bresileiro", "MANUCHE DE QUEIJU"), porque é por ela que o cliente procura.

| Seção | Itens | Seção | Itens |
|---|--:|---|--:|
| Lanches | 29 | Frango Frito | 5 |
| Aperitivos | 22 | Prato Feito na Brasa | 3 |
| Esfihas | 20 | Bebidas | 14 |
| Pide Turco | 12 | Doces e Sobremesas | 8 |
| Burgers | 17 | Churrasco na Brasa | 15 |
| Frango Assado na Brasa | 7 | | |

Faixa de preço R$ 2 a R$ 160, mediana R$ 28.

### Como foi extraído

Cada card do cardápio traz um bloco `data-dadositem` com JSON
(`coditem`, `nomeitem`, `precoitem`) além da marcação schema.org. Os dados vêm
daí, não de raspagem de texto: o preço é o número do cadastro, não um valor
lido de tela. As páginas de categoria são renderizadas no servidor, então não
foi preciso navegador.

## Notas de coleta

- **152 registros viraram 146 produtos.** A casa cadastra acompanhamento
  separadamente em cada seção: "ALHO" aparece em cinco categorias e "molho de
  pimenta" em três, cada ocorrência com `coditem` próprio. Numa página única
  com filtro "Todos" isso vira repetição visível. Unificados por nome + preço,
  mantendo a primeira categoria; as demais ficam anotadas em comentário no
  item. Nenhum preço divergia entre as duplicatas.
- **64% dos preços são piso.** 98 dos 152 registros vêm como *"à partir de"* —
  há variação de tamanho. Só esses itens dizem isso na descrição.
- **O preço não é valor-lixo.** O mais repetido é R$ 25, em 13% dos itens —
  bem abaixo do limiar de suspeita. Comparar com o iFood de outra loja, onde
  `originalPrice: 78.90` cobria 26 de 30 produtos.

- **Duas formas de preço na mesma fonte.** Lanches vêm como *"à partir de
  R$ X"* — o valor é **piso**, há variações de tamanho. Esfihas vêm com preço
  fechado. Publicar piso como preço final subestimaria a conta do cliente;
  os itens de piso dizem isso na descrição, e só eles.
- **Preço de concorrente quase entrou.** Uma busca por "Istambul Tatuapé
  cardápio preços" devolveu uma tabela detalhada (Homus R$ 52, Michuí
  R$ 209,90…) que é do **@zainrestaurante**, na Rua Demétrio Ribeiro. Outro
  restaurante. Descartado.
- **A plataforma reaproveita foto entre produtos.** São 103 fotos distintas
  para 146 produtos: os cinco tamanhos de "misto assado" dividem uma imagem,
  assim como os Shawarmas de frango e os dois Falafels. Mantido como está —
  é o acervo real da casa, e recortar o catálogo para forçar foto única
  esconderia produto que existe. Enquanto só dez itens eram publicados, foto
  distinta era critério de seleção; com o catálogo inteiro, deixa de ser.
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
