# Scraper de Loja — instruções de pesquisa

Procedimento para coletar dados de uma loja a partir de **um único link** e produzir um arquivo MD estruturado, pronto para outro agente consumir.

**Entrada:** 1 link qualquer (Google Maps, iFood, Keeta, Instagram ou site oficial).
**Saída:** `scraped-stores/<slug-da-loja>/<slug-da-loja>.md` + `scraped-stores/<slug-da-loja>/images/`.
**Formato da saída:** definido em [`TEMPLATE.md`](./TEMPLATE.md). Seguir campo a campo, sem inventar campo novo nem omitir campo existente.

---

## Etapa 1 — Identificar a loja

A partir do link recebido, extrair a **âncora de identidade**:

- Nome comercial exato
- Endereço (rua, número, bairro, cidade, UF)
- Telefone / WhatsApp
- Categoria (pizzaria, hamburgueria, açaí, etc.)

Essa âncora é o que permite achar a mesma loja nas outras redes. Nome sozinho não basta — nomes de loja se repetem muito entre cidades. **Sempre confirmar com endereço ou telefone** antes de tratar um resultado como sendo a mesma loja.

## Etapa 2 — Cross-reference nas demais fontes

Buscar a loja em **todas** as fontes abaixo, não só na do link original:

| Fonte | O que costuma render | Qualidade do catálogo |
|---|---|---|
| **iFood** | cardápio completo: nome, descrição, preço, foto | ⭐ melhor fonte de produto |
| **Keeta** | idem iFood, cobertura menor | ⭐ ótima |
| **Google Maps** | dados cadastrais, fotos, avaliações, horário | boa p/ metadados, fraca p/ produto |
| **Instagram** | fotos reais, posts de produto, link na bio | boa p/ imagem, fraca p/ preço |
| **Site oficial** | cardápio próprio, às vezes PDF | varia muito |

Registrar **cada** fonte em `sources` no front-matter com seu status (`found` / `not_found` / `blocked` / `no_products`). Uma fonte que não foi encontrada precisa aparecer como `not_found` — ausência silenciosa não é aceitável, o agente seguinte não consegue distinguir "não existe" de "não procurei".

## Etapa 3 — Selecionar 5 produtos

Prioridade da fonte dos produtos: **iFood > Keeta > site oficial > Instagram > Google Maps**.

Critérios de seleção, nesta ordem:

1. Produtos com **foto própria da loja** (não foto genérica de banco de imagem)
2. Produtos com **descrição escrita** pela loja
3. **Carro-chefe** / mais pedidos / destaque da seção
4. **Diversidade de categoria** — evitar 5 sabores da mesma pizza; preferir cobrir seções diferentes do cardápio

## Etapa 4 — Baixar as imagens

- Salvar em `images/` com nome `NN-slug-do-produto.jpg` (`01-`, `02-`, … na mesma ordem dos produtos no MD)
- Guardar **também** a URL original no campo `Imagem (URL original)` — se o download falhar depois, a origem não se perde
- Se a fonte **não** tiver foto do produto: escrever `— sem imagem na fonte —`. **Não** substituir por foto de banco de imagem nem por foto de outro produto — o card digital ficaria mentindo sobre o que a loja vende

## Etapa 5 — Escrever o MD

Preencher `TEMPLATE.md`. Dois pontos que não podem ser relaxados:

- **Descrição original** é transcrição literal da fonte. Se não houver, `— sem descrição na fonte —`.
- **Descrição reescrita** pode ser vendedora, mas só pode citar ingrediente/atributo que aparece na fonte. Não inferir "massa artesanal", "ingredientes frescos" ou qualquer coisa que a loja não afirmou.

Preço: registrar como está na fonte, junto com a fonte de onde veio. Preço de iFood costuma ser mais alto que o de balcão — quem for consumir o MD precisa saber de onde o número veio.

## Etapa 6 — Notas de coleta

Fechar o arquivo dizendo o que ficou incerto: fonte não encontrada, produto sem foto, preço divergente entre iFood e site, loja possivelmente fechada. É essa seção que impede o agente seguinte de tratar dado fraco como dado forte.

---

## Regras gerais

- **Nunca inventar produto, preço, foto ou descrição.** Dado ausente é registrado como ausente.
- **Divergência entre fontes** (preço, horário, endereço) → registrar as duas e marcar em "Notas de coleta"; não escolher silenciosamente.
- **Uma loja por pasta**, slug em minúsculas com hífen: `scraped-stores/pizzaria-do-ze/`.
- Coletar apenas informação **pública** do catálogo. Não coletar dados pessoais de clientes, avaliações nominais ou qualquer conteúdo atrás de login.
