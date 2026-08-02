# Do link à página publicada — aprendizados para virar skill

Registro do que foi descoberto **executando** o pipeline em duas lojas reais,
não planejando-o. Cada item aqui custou uma rodada de erro ou uma verificação
que quase não foi feita.

Lojas: **Caracol Chocolates Tatuapé** (cafeteria, cardápio com pedido) e
**Kokedami** (ateliê de kokedama, expositor sem preço). Mesma rua, no Tatuapé.
Resultados opostos — e é a diferença entre elas que define o formato da skill.

---

## 1. A decisão que vem antes de todas: qual página esta loja comporta

O erro de partida foi supor que toda loja vira cardápio. Não vira.

| | Caracol | Kokedami |
|---|---|---|
| Preço público | iFood, 30 produtos | **nenhum, em nenhuma fonte** |
| Nome de produto | iFood | **nenhum** |
| Fonte de identidade visual | site oficial (CSS medível) | **só fotografias** |
| Formato certo | cardápio + carrinho + pedido | **expositor + conversa** |

**Regra:** a skill decide o formato pela fonte disponível, não pelo pedido.
Loja sem preço não recebe carrinho — recebe expositor. Forçar cardápio numa
loja sem preço obriga a inventar número, que é o pior resultado possível.

O sinal é simples: **se não existe preço público, não existe checkout.**

---

## 2. Etapa 0 não é acesso à rede — é existência da fonte

O `PROCESSO-CLONAGEM-LOJA.md` mandava testar acesso à rede primeiro. A rede
estava liberada nas duas lojas. O que faltou foi outra coisa:

- Caracol: cardápio oficial da unidade é um link **quebrado** (publicação
  Adobe InDesign retornando "Document Not Found")
- Kokedami: **não há fonte de preço nenhuma**

Marketplace de comida não serve loja que não é comida. iFood, 99Food, Keeta e
Rappi não têm floricultura. Perguntar "está no iFood?" para um ateliê de
plantas é gastar rodada.

**Regra:** classificar o ramo antes de escolher onde procurar. Comida →
plataformas de delivery. Artesanato/decoração → Instagram, Elo7, Shopee,
site próprio. Serviço → agenda, não catálogo.

---

## 3. Dado plausível é mais perigoso que dado ausente

O achado mais importante das duas lojas.

**Caracol:** o iFood devolve `unitOriginalPrice: 78.90` em **26 dos 30
produtos** — inclusive em água mineral de R$ 12,90 e coxinha de R$ 17,90.
É valor-lixo do cadastro, não preço "de". JSON válido, tipo correto, build
limpo. Renderizado como desconto, viraria propaganda falsa em nome do lojista.

**Kokedami:** a busca por preço devolve R$ 43–90 — de **outras**
kokedamarias. Pior que o caso anterior: lá o lixo ao menos vinha do cadastro
da própria loja.

**Regra:** o extrator marca, não decide. Regras de plausibilidade que já se
provaram:

- `original_price` idêntico em mais de 50% dos itens → valor-lixo
- `original_price` menor que `price` → incoerente
- desconto acima de 60% → confirmar
- preço vindo de busca genérica do ramo → **descartar sempre**

E a regra dura: **flag de severidade alta bloqueia a geração.** O gerador se
recusa a rodar. É o que impede o pipeline de publicar lixo com cara de dado.

---

## 4. Identidade visual: medir, nunca estimar — e o método muda com a fonte

**Com site (Caracol):** `getComputedStyle` na página real. O resultado
contrariou a intuição — o chocolate é a *superfície*, mas os botões
("COMPRAR AGORA") são **dourados com texto escuro**. Dourado com texto branco
dá **1,58:1** e reprova WCAG. Sem medir, a cor de ação estaria errada e o
contraste também.

**Sem site (Kokedami):** amostragem de cor dominante por área nas fotografias
da loja, ignorando pixels neutros. A fachada aparece como `#205020` na sombra
e `#509060` no sol — a foto não dá um valor único.

**Regra:** quando a fonte é fotográfica, a luz é ruído. Adotar o meio e
**decidir pelo contraste**, que é o único critério que não depende de
iluminação. Todo par de token vai para a planilha de contraste antes de entrar
no CSS.

---

## 5. A verificação que pega o que build, lint e tipo não pegam

Nenhum dos defeitos abaixo é erro de sintaxe ou de tipo. Todos passaram por
`tsc`, `eslint` e `next build`. Todos foram achados **exercitando a interface**.

| Defeito | Sintoma | Como só aparece |
|---|---|---|
| CTA do hero invisível | `bg-on-overlay text-ink` = 1,05:1 | foto no hero **+** modo escuro |
| Filtro de categoria morto | limiar de arrasto de 4px | clique de **mouse real**, com tremor de mão |
| Link de navegação morto | "Combos" no menu com a seção oculta | olhar o menu no desktop |
| Script do snapshot natimorto | `$$` virou `$` | extrair o JS e rodar `node --check` |
| Fonte ausente no snapshot | dev server não emite `@font-face` | comparar dev com build de produção |

**O caso do filtro merece destaque.** Automação de clique tem deslocamento
zero; mão humana move de 4 a 8px entre apertar e soltar. Com limiar de 4px,
**todo** clique de mouse virava "arrasto" e era descartado — e meus primeiros
testes automatizados passaram, porque eram limpos demais. Reproduzir exigiu
**injetar o tremor de propósito**.

**Regra:** a suíte precisa de um caso com micro-arrasto. Clique perfeito não
testa interação real.

---

## 6. Contar token não é verificar

O snapshot HTML nasceu quebrado e os greps diziam tudo verde: "1 tag script,
13 data-product-id, 0 referências externas". O script estava lá — e não
executava.

Causa: `String.replace` com **texto** de substituição interpreta `$$` como um
`$` literal. O helper `$$` (querySelectorAll) virou `$`, colidiu com o `$` já
declarado, e o arquivo inteiro morreu no parse. **Sem erro no console.**

**Regra:** artefato gerado se valida executando, não contando ocorrência.
Para HTML: servir e renderizar. Para JS embutido: extrair e `node --check`.
E usar sempre substituição por **função** ao injetar código.

---

## 7. Fronteira entre o que é script e o que é julgamento

Confirmada nas duas lojas:

- **Determinístico** (script, testável com fixture): resolver encurtador,
  bater endpoint, baixar imagem, converter formato, calcular contraste,
  preencher arquivo, rodar suíte.
- **Julgamento** (agente): decidir o formato da página, escolher entre
  fontes divergentes, rejeitar o `78,90`, nomear peça a partir da fotografia,
  separar avaliação de resposta da loja.

Entre as duas metades, **um artefato revisável** (`store.json`). É o ponto de
aprovação humana, e é o que faltava nas tentativas anteriores deste repo —
sem ele, erro de coleta só aparece no site publicado.

---

## 8. Cuidados com dado de pessoa

- O Google Maps **concatena a resposta da loja no mesmo bloco de texto da
  avaliação**. Duas das seis da Kokedami vinham com a fala da dona grudada no
  fim. Publicar assim atribui ao cliente algo que ele não escreveu.
- Nome de cliente entra como **primeiro nome + inicial**. A avaliação é
  pública; republicar nome completo em página comercial é outra coisa.
- Avaliação nota 5 **sem texto** não vira depoimento. Das 5 recentes da
  Caracol, 4 eram assim — só uma tinha conteúdo, e foi a única publicada.

---

## 9. Restrições de plataforma que definem arquitetura

- **iFood bloqueia `curl` com PerimeterX** (403 + `px-captcha`). O catálogo
  só sai de dentro de uma sessão de browser real. Endpoint que funciona:
  `GET /site-api/v1/merchants/restaurant/{uuid}/catalog`.
  Um coletor futuro precisa de browser, não de `fetch`.
- **`externalCode` é a chave estável do iFood**, não o `uuid`: o mesmo produto
  tem uuid diferente em cada categoria em que aparece.
- **Instagram sem login** não entrega legenda nem preço. Os `alt` são
  descrições geradas pela Meta, não texto da loja.
- **Tailwind v4 ignora `tailwind.config.ts` em silêncio.** Toda cor entra em
  `globals.css`.

---

## 10. O que a skill precisa receber e produzir

**Entrada:** um link (Maps, iFood, Instagram, site) e, opcionalmente, o
WhatsApp que recebe os pedidos.

**Saídas, nesta ordem:**

1. `store.json` — o que a loja diz, com `flags[]` de plausibilidade
2. decisão de **formato** (cardápio com pedido | expositor sem preço)
3. `store.curated.json` — o que decidimos publicar, com `decisions[]`
4. os arquivos parametrizáveis preenchidos + imagens locais em `/public`
5. suíte de navegador executada, incluindo o caso de micro-arrasto
6. `scraped-stores/<slug>/` com procedência e **lacunas declaradas**

**Passos bloqueantes:**

- flag alta não resolvida → não gera
- sem preço público → não gera checkout
- imagem só por URL externa → não publica (CDN de terceiro fora do ar derruba
  a página; já aconteceu neste repo com 35 imagens num CloudFront)

---

## 11. Princípios, em uma linha cada

1. O formato da página sai da fonte disponível, não do pedido.
2. Dado ausente se declara; dado plausível se questiona.
3. Preço, selo e avaliação saem da fonte ou ficam de fora.
4. Contraste é critério, não gosto — e é o desempate quando a fonte é foto.
5. Build limpo não prova nada sobre o que o cliente vê.
6. Artefato gerado se valida executando.
7. Controle que não leva a lugar nenhum é pior que a ausência dele.
8. Toda imagem local. Nenhuma dependência de CDN de terceiro.
