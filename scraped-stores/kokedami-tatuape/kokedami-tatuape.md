---
schema_version: 1
scraped_at: "2026-08-02T11:55:00Z"
store:
  name: "Kokedami - Arte com Plantas"
  category: "floricultura / ateliê de kokedama"
  phone: "(11) 97530-7287"
  whatsapp: "5511975307287"
  address: "R. Itapeti, 622 - Tatuapé"
  city: "São Paulo"
  state: "SP"
  hours: "abre às 14h (grade completa não publicada)"
  rating: 5.0
  reviews_count: 77
sources:
  - type: google_maps
    url: "https://maps.app.goo.gl/sUuRAUUimNT6w9hJ6"
    status: found
  - type: instagram
    url: "https://www.instagram.com/koke.da.mi/"
    status: found          # perfil existe, mas sem preço e sem loja
  - type: site
    url: ""
    status: not_found      # Maps não lista website
  - type: ifood
    url: ""
    status: not_found      # busca por "kokedami" retorna só sugestões sem relação
  - type: keeta
    url: ""
    status: not_found      # plataforma de comida
  - type: outro
    url: ""
    status: not_found      # 99Food, Rappi: plataformas de comida
products_count: 0
---

# Kokedami — Arte com Plantas

> Fonte primária: `google_maps` — ficha, 12 fotos do proprietário e avaliações
> Fonte secundária: Instagram @koke.da.mi (bio, WhatsApp)

## Resumo da loja

Ateliê de kokedama no Tatuapé, na mesma rua da Caracol Chocolates (622 contra
601). Atendido pela Michele. Nota **5,0 com 77 avaliações** no Google. Vende na
loja, com retirada e entrega expressa combinadas por WhatsApp. Também dá
oficinas — várias avaliações são de clientes que voltaram para aprender.

## Identidade visual

Não há site, logo não há CSS para medir. As cores foram **amostradas das
fotografias da própria loja** (dominante por área, ignorando pixels neutros).

| Item | Valor | Origem |
|---|---|---|
| Verde da marca | `#2E6B3B` | fachada. Duas fotos divergem por luz (`#205020` na sombra, `#509060` no sol); adotado o meio, validado por contraste |
| Terracota | `#B04A1E` | parede interna onde fica o logo |
| Tinta | `#1C2A1E` | verde-quase-preto, para o texto não brigar com as fotos |
| Papel | `#FDFCFA` / `#F5F2EC` | branco quente |
| Fonte de título | Jost | geométrica de caixa alta larga, como o letreiro da fachada |
| Fonte de corpo | Inter | neutra, para a foto carregar a estética |

Contraste: `on-brand`/`brand` 6,40:1 · `accent`/`surface` 5,46:1 · `ink`/`surface` 15,01:1.

## Produtos

**Nenhum produto com nome ou preço de fonte.** Esta seção fica vazia de
propósito.

O que existe são 12 fotografias publicadas pela própria loja no Google Maps.
Seis viraram peças do expositor, com **título descritivo do que aparece na
foto** — orquídea, aglaonema, singônio, podocarpo, antúrio. Esses títulos
**não são a nomenclatura comercial da loja**; a loja não publica nomenclatura.

## Notas de coleta

- **Preço: inexistente em qualquer fonte pública.** Sem site, sem e-commerce,
  sem linktree de loja. iFood/99Food/Keeta/Rappi são plataformas de comida e
  não têm a loja. O Instagram não expõe legenda de post sem login, e as
  descrições `alt` são geradas pela Meta, não escritas pela loja.
- **Não usar a faixa de mercado.** A busca devolve R$ 43–90 de outras
  kokedamarias (Xique Xique, Meu Kokedama, Orquidário Ibáñez). Publicar isso
  seria preço de concorrente em nome desta loja — pior que o valor-lixo de
  R$ 78,90 do iFood encontrado na Caracol, porque lá o número ao menos vinha
  do cadastro da própria loja.
- **Kokedama é peça única.** Planta, porte e suporte mudam o valor. "Sob
  consulta" não é lacuna nesse negócio: é como ele funciona.
- **Avaliações vinham com a resposta da loja colada.** O Google Maps concatena
  a réplica do estabelecimento no mesmo bloco de texto da avaliação. Duas das
  seis publicadas traziam a fala da dona no fim; foram separadas antes de
  publicar. Sem isso, a página atribuiria ao cliente algo que ele não escreveu.
- **Nomes reduzidos a primeiro nome + inicial.** A avaliação é pública, mas
  republicar nome completo de cliente em página comercial é outra coisa.
- **Horário incompleto.** Maps mostra apenas "Abre às 14:00" e não expõe a
  grade sem interação; o Instagram não informa. Confirmar com a loja.
- **A bio do Instagram tem o WhatsApp com um ponto digitado por engano**
  (`551197530.7287`). O número correto foi confirmado contra o telefone do
  Maps: `5511975307287`.
