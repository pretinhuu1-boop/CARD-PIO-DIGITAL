# Especificação — Template Padrão de Cardápio Digital

Página única de cardápio com o pedido finalizado no WhatsApp. Este documento
descreve o que o template faz, como está organizado e o que precisa ser
preenchido para colocar uma loja no ar.

O template é **neutro**: escala de cinza, tipografia de sistema, produtos de
exemplo sem imagem. Nada de identidade visual de nenhuma marca.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript ·
  Tailwind CSS 4 · framer-motion · lucide-react
- **Renderização:** página estática única (`/`), toda a interatividade no cliente
- **Sem backend:** o pedido sai por link `wa.me`; o carrinho vive no `localStorage`
- **Sem cadastro, sem login, sem cupom, sem programa de pontos**

---

## 1. Estrutura de arquivos

```
src/
├── app/
│   ├── layout.tsx          Metadata/SEO a partir de config.ts; ponto de troca de fonte
│   ├── page.tsx            Composição das seções, na ordem
│   └── globals.css         ◆ IDENTIDADE VISUAL — tokens de cor, fonte, raio, sombra
├── lib/
│   ├── config.ts           ◆ DADOS DA LOJA — nome, WhatsApp, endereço, horários, taxas
│   ├── data.ts             ◆ CATÁLOGO — produtos, categorias, combos, avaliações, FAQ
│   ├── store.ts            Carrinho global (useSyncExternalStore + localStorage)
│   ├── whatsapp.ts         Montagem da mensagem do pedido
│   └── utils.ts            cn, formatCurrency, calculateDiscount, normalize
└── components/
    ├── layout/
    │   ├── Header.tsx            Header fixo translúcido, navegação, badge do carrinho
    │   ├── CartDrawer.tsx        Painel do pedido + etapa de checkout + envio
    │   ├── FloatingCTA.tsx       Barra inferior com total (aparece com itens no carrinho)
    │   └── FloatingWhatsApp.tsx  Contato direto, fora do fluxo de pedido
    ├── sections/
    │   ├── HeroBanner.tsx        Capa
    │   ├── ProductGrid.tsx       Busca + filtro de categoria + grade
    │   ├── ComboSection.tsx      Combos compráveis
    │   ├── ReviewsSection.tsx    Avaliações
    │   ├── AboutSection.tsx      Sobre a loja
    │   ├── FAQSection.tsx        Perguntas frequentes
    │   └── Footer.tsx            Contato, horários, navegação
    └── ui/
        ├── Button.tsx            4 variantes, 3 tamanhos, mínimo 44px de altura
        ├── Badge.tsx             Selo genérico dirigido por dados
        ├── CategoryChip.tsx      Faixa de categorias arrastável
        ├── SearchBar.tsx         Busca com debounce
        ├── ProgressBar.tsx       Metas de frete grátis / brinde
        ├── ProductImage.tsx      Imagem com placeholder neutro
        ├── ProductBottomSheet.tsx Detalhe do produto + quantidade + observação
        └── WhatsAppIcon.tsx      Glifo do canal
```

Os três arquivos marcados com ◆ são os únicos que precisam ser editados para
publicar uma loja nova.

---

## 2. Ordem da página

| # | Seção | `id` | Oculta quando |
|---|-------|------|---------------|
| 1 | Hero | — | nunca |
| 2 | Cardápio (busca, filtros, grade) | `cardapio` | nunca |
| 3 | Combos | `combos` | `combos` é `[]` |
| 4 | Avaliações | `avaliacoes` | `reviews` é `[]` |
| 5 | Sobre | `sobre` | nunca |
| 6 | FAQ | `faq` | `faqs` é `[]` |
| 7 | Rodapé | `contato` | nunca |

Sobrepostos: `Header` (fixo, topo), `CartDrawer` (lateral direita),
`FloatingCTA` (barra inferior, só com itens no carrinho), `FloatingWhatsApp`
(canto inferior direito, oculto se não houver número configurado).

---

## 3. Fluxo de compra

```
                    ┌─ botão "Adicionar" no card ──→ +1 no pedido
   Cardápio ────────┤
                    └─ toque no card ──→ bottom sheet
                                          ├─ quantidade
                                          ├─ observação (texto livre)
                                          └─ "Adicionar" (SOMA ao pedido)

   Combos ──────────── "Adicionar combo" ──→ 1 linha, pelo preço do combo

                              ↓
        badge no header  +  barra flutuante "Ver pedido R$ X"
                              ↓
                    ┌─────────────────────────┐
                    │  ETAPA 1 — Seu pedido   │
                    │  itens, ± quantidade,   │
                    │  remover, sugestões,    │
                    │  metas, subtotal        │
                    │  [ Continuar ]          │  ← bloqueado abaixo do mínimo
                    └───────────┬─────────────┘
                                ↓
                    ┌─────────────────────────┐
                    │  ETAPA 2 — Seus dados   │
                    │  nome*, telefone*,      │
                    │  entrega|retirada,      │
                    │  endereço*, pagamento,  │
                    │  troco                  │
                    │  [ Enviar pelo WhatsApp ]│
                    └───────────┬─────────────┘
                                ↓
          wa.me com a mensagem do pedido + carrinho limpo
```

`*` obrigatório. Endereço só é exigido na modalidade "entrega".
Os erros aparecem após a primeira tentativa de envio e somem sozinhos conforme
os campos são corrigidos.

### Regra das linhas do pedido

Uma linha é identificada por **produto + observação**, não só pelo produto.
Dois "Produto 01", um com observação e outro sem, viram **duas linhas** — igual
a uma comanda real. Adicionar o mesmo item com a mesma observação soma a
quantidade.

---

## 4. Mensagem de WhatsApp

Gerada por `src/lib/whatsapp.ts`. Cabeçalho com o nome da loja, uma linha com
marcador por item e o bloco de valores prefixado por emoji. O WhatsApp não
renderiza tabela, e texto em colunas quebra na tela do celular — por isso o
formato é em lista.

```
🛒 *Pedido — Nome da Loja*

• 2x Produto 01 — R$ 20,00
  _obs: sem cebola, entregar 15h_
• 1x Combo 01 — R$ 45,00

📦 Subtotal: R$ 65,00
🚚 Entrega: Grátis
💰 *Total: R$ 65,00*

👤 Maria Silva
📱 (11) 98888-7777
📍 Rua Exemplo, 100 - Centro
💳 Dinheiro (troco para R$ 100,00)

Obrigado!
```

- **Valor por linha:** o total da linha (preço × quantidade), não o unitário.
- **Blocos condicionais:** `obs:` só se houver observação; o bloco do cliente
  inteiro só aparece se algum dado foi preenchido; `📍` só na entrega; o troco
  só quando informado. Um pedido simples fica tão curto quanto era antes.
- **Entrega:** mostra `Retirada no local`, `Grátis` ou o valor.

---

## 5. Sistema de design

Todos os tokens ficam em `src/app/globals.css`. As classes do Tailwind são
**semânticas**, nunca literais — `bg-surface`, `text-ink`, `bg-brand`, e não
`bg-white`/`text-gray-900`.

| Token | Papel |
|---|---|
| `surface`, `surface-2`, `surface-3` | fundos: card, seção alternada, campo |
| `ink`, `ink-2`, `ink-3` | texto: principal, apoio, legenda |
| `line`, `line-strong` | bordas |
| `brand`, `brand-hover`, `brand-soft`, `on-brand` | CTA principal |
| `accent`, `accent-soft` | ênfases, eyebrow, selos |
| `success`/`warning`/`info`/`danger` (+ `-soft`) | estados |
| `overlay`, `on-overlay` | véu do hero sobre foto e seu texto |
| `whatsapp`, `whatsapp-hover`, `on-whatsapp` | cor do canal, não da loja |
| `rounded-control`, `rounded-card`, `rounded-sheet` | raios |

**Modo escuro sai de graça.** As variáveis são redefinidas em
`@media (prefers-color-scheme: dark)` e o bloco `@theme inline` faz os
utilitários apontarem para a variável em tempo de execução. Nenhum componente
usa `dark:`.

> ⚠️ **Tailwind v4 não lê `tailwind.config.ts`.** Cores declaradas num arquivo
> JS são ignoradas em silêncio e as classes não geram CSS nenhum. Toda cor nova
> entra em `globals.css`. Foi exatamente esse o defeito que deixava a versão
> anterior sem identidade visual em produção.

### Tipografia

Fonte do sistema por padrão. Para aplicar a fonte da loja, importe de
`next/font/google` em `layout.tsx` e exponha as variáveis `--font-app-sans` e
`--font-app-display` no `<html>` — `globals.css` já as consome. As instruções
estão no comentário do topo de `layout.tsx`.

---

## 6. Contrato de dados

### `config.ts` — a loja

| Campo | Tipo | Observação |
|---|---|---|
| `name`, `tagline`, `description` | `string` | header, hero, rodapé, SEO |
| `whatsapp` | `string` | só dígitos, com país+DDD. Vazio desabilita os botões |
| `phoneDisplay` | `string` | formatado, só para exibir |
| `address`, `city` | `string` | vazio oculta |
| `hours` | `{day, time}[]` | `time: null` = "Fechado" |
| `social` | `{label, url}[]` | `[]` oculta |
| `heroImage` | `string \| null` | `null` = hero neutro |
| `shippingFee` | `number` | `0` = sempre grátis |
| `freeShippingThreshold` | `number \| null` | `null` desativa a barra |
| `freeGiftThreshold` | `number \| null` | `null` desativa a barra |
| `minimumOrder` | `number` | `0` = sem mínimo |
| `paymentMethods` | `string[]` | popula o select do checkout |

### `data.ts` — o catálogo

**Product** — `id` (único e estável), `name`, `description`, `price`,
`originalPrice?`, `image` (`/public/...` ou `null`), `category` (slug),
`badge?` (`{label, tone}`), `servings?`, `available`.

**Category** — `slug`, `name`, `emoji`. A categoria `todos` é obrigatória e
sempre a primeira.

**Combo** — `id`, `name`, `description`, `productIds[]`, `comboPrice`.
Entra no pedido como **uma linha**, pelo preço do combo. Fica indisponível se
qualquer item componente estiver indisponível.

**Review** — `id`, `name`, `initials`, `rating` (1-5), `text`, `date`.

**FAQ** — `question`, `answer`.

**Badge tones** — `neutral` · `accent` · `success` · `warning` · `info`.
O rótulo vem dos dados, então criar um selo novo não exige tocar em código.

---

## 7. Imagens

O template não traz imagem nenhuma. `ProductImage` renderiza um placeholder
xadrez neutro quando `image` é `null`, preservando a proporção do card — o
layout nunca colapsa, nem se uma imagem real falhar em produção.

Ao preencher:

1. Salve em `public/produtos/` com nome derivado do produto
   (ex.: `public/produtos/produto-01.webp`).
2. Aponte `image: '/produtos/produto-01.webp'` em `data.ts`.
3. Prefira `.webp`, lado maior ~1200px, recorte 4:5 (grade) ou 16:10 (detalhe).

Use caminhos locais, não URLs externas: um CDN de terceiro fora do ar derruba o
cardápio inteiro. Para servir de domínio externo, declare o host em
`next.config.ts` → `images.remotePatterns`.

---

## 8. Acessibilidade e mobile

- Todo controle interativo tem no mínimo **44×44px**
- Cards de produto usam `<button>` reais — navegáveis por Tab, com `aria-label`
- O atalho "Adicionar" é **visível por padrão no toque**; no desktop aparece no
  hover ou no foco de teclado
- Modais têm `role="dialog"`, `aria-modal`, fecham com `Esc` e movem o foco
- Filtros: `aria-pressed`; FAQ: `aria-expanded` + `aria-controls`
- Contraste dos pares de token acima de 4.5:1 (AA) nos dois temas
- `prefers-reduced-motion` desliga a rolagem suave
- Sem overflow horizontal em 390px

---

## 9. Como publicar uma loja nova

1. **Identidade** — em `globals.css`, troque os valores marcados «PREENCHER»:
   `--brand`, `--brand-hover`, `--brand-soft`, `--accent`, `--accent-soft`.
   Confira o contraste de `on-brand` sobre `brand`.
2. **Fonte** — se houver fonte de marca, siga o comentário em `layout.tsx`.
3. **Loja** — preencha `config.ts` inteiro. O `whatsapp` é o campo crítico:
   sem ele, os botões de pedido não aparecem.
4. **Catálogo** — substitua `categories`, `products` e, se houver, `combos`,
   `reviews`, `faqs` e `about` em `data.ts`.
5. **Imagens** — salve em `public/produtos/` e referencie em `data.ts`.
6. **Conferir** — `npm run lint && npm run build`, depois testar o fluxo de
   compra ponta a ponta e a mensagem gerada no WhatsApp.

### Checklist antes de publicar

- [ ] `whatsapp` preenchido e testado com um pedido real
- [ ] Nenhum texto «PREENCHER» restante em `config.ts` e `data.ts`
- [ ] Preços conferidos contra a fonte oficial
- [ ] Toda imagem de produto carrega (ou é `null` intencionalmente)
- [ ] Contraste verificado nos modos claro e escuro
- [ ] Fluxo testado em celular real, não só no emulador
- [ ] `shippingFee`, limites e `minimumOrder` batendo com a regra da loja

---

## 10. Limites conhecidos

- **Sem estoque em tempo real.** `available` é estático; itens esgotados exigem
  editar `data.ts` e publicar de novo.
- **Sem pagamento online.** O acerto acontece na conversa do WhatsApp.
- **Numeração do pedido é local.** Cada navegador tem seu contador; dois
  clientes podem gerar o mesmo número. Serve como referência, não como
  documento fiscal.
- **Carrinho não sincroniza entre dispositivos.** É `localStorage`, por origem.
- **Preço do carrinho é revalidado contra o catálogo** ao restaurar do
  `localStorage` — um preço que mudou desde a última visita nunca entra na nota.
