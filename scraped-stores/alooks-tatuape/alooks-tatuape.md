---
schema_version: 1
scraped_at: "2026-08-02T18:10:00Z"
store:
  name: "Alooks Hair Studio Tatuapé"
  category: "salão de beleza / hair studio"
  phone: "(11) 2892-9005"
  whatsapp: "5511913042702"     # confirmado por UMA fonte só — ver Notas
  address: "R. Itapeti, 518 - Tatuapé"
  city: "São Paulo"
  state: "SP"
  hours: "Ter a Sáb 9h-20h / Dom e Seg fechado"
  rating: 4.9
  reviews_count: 102
sources:
  - type: google_maps
    url: "https://maps.app.goo.gl/EdPQXQRa3zt7Q8so7"
    status: found          # ficha REIVINDICADA (só "Sugerir mudança")
  - type: outro
    url: "https://www.trinks.com/alooks"
    status: found          # página reivindicada; FONTE PRIMÁRIA do catálogo
  - type: instagram
    url: "https://www.instagram.com/alookshairstudio/"
    status: found          # perfil da MARCA (2 unidades), não desta unidade
  - type: outro
    url: "https://www.facebook.com/AlooksHairStudio/"
    status: found          # âncora confirmada por post de 04/09/2021
  - type: site
    url: "http://alooks.com.br"
    status: not_found      # 403 em página parqueada Locaweb
  - type: outro
    url: "https://www.fresha.com/lvp/alooks-hair-studio-tatuape-rua-itapeti-Rv5awA"
    status: no_products    # NÃO reivindicada — ver Notas
  - type: outro
    url: "https://booksy.com.br/pt-br/s/alooks"
    status: not_found      # HTTP 404
  - type: ifood
    url: ""
    status: not_found      # plataforma de comida; ramo errado, nem procurado a fundo
products_count: 378
---

# Alooks Hair Studio Tatuapé

> Fonte primária dos serviços: **Trinks** (`estabelecimentos/128264`), página
> reivindicada pelo lojista, API pública sem autenticação
> Fontes secundárias: Google Maps (ficha, fotos, avaliações), Instagram, Facebook

## Resumo da loja

Salão de beleza na Rua Itapeti, a mesma rua da Caracol Chocolates (518 contra
601) e da Kokedami (622). Nota **4,9 com 102 avaliações**. Atende terça a
sábado, 9h às 20h. Equipe nominada de 10 profissionais. Várias avaliações são
de clientes com 10 a 25 anos de casa.

A ficha do Google é **reivindicada** — o único CTA de edição é "Sugerir
mudança", e existe aba "Do proprietário" com 12 itens, que só se popula quando
um proprietário verificado publica fotos.

## Catálogo

**378 serviços em 7 categorias, todos com preço.** O lojista marcou
`exibePreco: true` em todos — o preço é público por decisão dele.

| Categoria | Serviços | Faixa |
|---|--:|---|
| CABELEIREIRO | 210 | R$ 24 – R$ 1.820 |
| DEPILAÇAO | 49 | R$ 3 – R$ 168 |
| MANICURE | 44 | R$ 4 – R$ 243 |
| SOBRANCELHAS | 32 | R$ 13 – R$ 959 |
| DEPILAÇAO MASCULINA | 29 | R$ 10 – R$ 182 |
| MAQUIAGEM | 8 | R$ 76 – R$ 968 |
| NOIVA | 6 | R$ 73 – R$ 315 |

### Por que esta fonte é confiável

A âncora bate por endereço (`Itapeti, 518, Vila Gomes Cardim, 03324-002`) e,
independentemente disso, por **cruzamento de pessoas**: a escala do Trinks
lista BILLY, RITA e MARIAH, e as avaliações do Google citam nominalmente
*"Mariah deusaaaaaa dos cabelos"* e *"Conheço o Bily e a Rita"*. Duas fontes
que não se referenciam apontando para a mesma equipe.

## Identidade visual

Não há site para medir CSS. O ativo de marca é a **foto #10 do proprietário**:
letreiro diurno com "alooks" em roxo/magenta minúsculo sobre "HAIR STUDIO",
em painel branco com revestimento de pedra e vidro escuro.

⚠️ Cores ainda **não amostradas nem validadas por contraste**. Nada de paleta
foi definido nesta coleta.

## Decisões de montagem (tomadas com o cliente em 2026-08-02)

- **Formato: landing + catálogo de serviços com preço, `orderMode: 'enquiry'`.**
  Hero, sobre, avaliações e CTA de WhatsApp, mais os 378 serviços nas 7
  categorias do próprio lojista, cada um com preço e botão de agendar. **Sem
  carrinho**: corte de cabelo se agenda, não se compra por checkout — preço
  existir não implica carrinho.
- **Imagens: genéricas, decorativas, sem pessoas.** Decidido com o cliente
  diante do viés do acervo. Servem como capa de categoria.
  ⚠️ **Não são fotos desta loja nem do trabalho dela** e não podem ser
  apresentadas como tal. Foto de resultado, de cliente ou de "antes e depois"
  está fora, mesmo genérica: o visitante leria como portfólio da casa.
  As fotos de **fachada, letreiro e interior** são da loja e entram como tais.
- **Pendência para o lojista:** fornecer fotos próprias de corte, coloração e
  escova. Enquanto não vierem, o site não mostra o carro-chefe da casa.

## Notas de coleta

- **Não existe site próprio.** `alooks.com.br` resolve DNS e tem MX funcional
  (Locaweb), mas o HTTP devolve **403 numa página parqueada** — e em HTTPS o
  certificado servido é `*.websiteseguro.com`, que nem cobre o domínio. DNS
  vivo prova que o e-mail existe, não que há site. O campo "site" da ficha do
  Maps aponta para o Instagram.
- **A página do Fresha NÃO é reivindicada.** Traz literalmente *"The business
  is not currently affiliated with or partnered with Fresha"*, usa o path
  `/lvp/` (listing venue page, gerada pela plataforma), tem **zero ocorrências
  de `R$`** e lista **"Eyebrow Threading" como serviço único** — para um
  estúdio que na fonte reivindicada tem 378 serviços. Nada dali serve como
  catálogo.
- **Existem DUAS unidades Alooks.** A outra fica na Av. Aricanduva 5555
  (Shopping Aricanduva), com ficha própria no Google (4,2 · 429 avaliações) e
  página Fresha própria. Toda fonte foi aceita só quando bateu `R. Itapeti,
  518` ou `(11) 2892-9005`. As fontes da Aricanduva estão descartadas.
- **O Instagram é da MARCA, não desta unidade.** @alookshairstudio (16 mil
  seguidores) lista Aricanduva **primeiro** na bio, com telefone e WhatsApp
  próprios. A bio está truncada por "... mais" justamente no telefone do
  Tatuapé. Nada tirado do Instagram pode ser atribuído a esta unidade sem
  checagem — e **nenhuma legenda de post foi lida**: o HTML público entrega só
  miniatura, e os dez espelhos testados estão mortos ou devolvem 403.
- **WhatsApp confirmado por UMA fonte só.** `11 91304-2702` aparece
  literalmente na página Trinks desta unidade, mas não foi corroborado por
  segunda fonte. O telefone fixo da ficha é `(11) 2892-9005`, número
  diferente. **Confirmar com a loja antes de publicar** — link de WhatsApp
  errado manda cliente para o número de outra pessoa.
- **O acervo de fotos representa mal o negócio.** São 20 itens (12 do
  proprietário, 8 de cliente). Apenas **2 mostram cabelo — e as duas são
  penteado de noiva**. Não há uma única foto de corte, coloração, escova ou
  barba, contra 210 serviços de CABELEIREIRO no catálogo. As 8 fotos de
  cliente que foi possível ver são todas close-up de unha. Montar a página com
  esse acervo faz um salão de cabelo parecer um estúdio de unhas.
- **Nomes dos serviços vêm em caixa alta e sem acento** (`DEPILAÇAO`,
  `ESMALTAÇAO`, `CILIOS`, `MAOS`). É a grafia do cadastro. Precisa de
  normalização antes de publicar, e a normalização é reescrita — registrar que
  o texto exibido não é transcrição literal.
- **Avaliações limpas.** Das 102, dez são legíveis sem login, todas 5
  estrelas. Foi procurada explicitamente a concatenação de resposta da loja
  (`Resposta do proprietário`): **zero ocorrências**. Tudo que está transcrito
  é fala de cliente. As linhas `Serviços | ...` são metadado estruturado do
  Google, não texto do avaliador, e foram separadas.
- **Preço de concorrente rejeitado.** Uma busca devolveu "corte masculino
  R$ 51" atribuído ao Foursquare. A página está atrás de login e o venue-ID é
  de 2011 — anterior à abertura do Tatuapé (set/2021), logo provavelmente da
  unidade Aricanduva. Descartado.
- **Não coletado:** aba de vídeos do Maps e as 92 avaliações restantes exigem
  login; as URLs das 8 fotos de cliente não saíram (o grid é virtualizado e o
  RPC `listentityphotos` só respondeu à categoria Street View).
