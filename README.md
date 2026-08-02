# Template Padrão — Cardápio Digital com Pedido no WhatsApp

Template em branco para cardápios digitais de loja. Página única, com o pedido
finalizado no WhatsApp — o cliente cai na conversa com a mensagem já montada.

Neutro por padrão: escala de cinza, tipografia de sistema, produtos de exemplo
sem imagem. Sem cadastro de usuário, sem login, sem cupom, sem programa de
pontos.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

## Preencher uma loja nova

Três arquivos, nesta ordem:

| Arquivo | O que preencher |
|---|---|
| `src/app/globals.css` | Cores da marca e fontes (bloco IDENTIDADE VISUAL) |
| `src/lib/config.ts` | Nome, WhatsApp, endereço, horários, frete, pagamento |
| `src/lib/data.ts` | Categorias, produtos, combos, avaliações, FAQ, sobre |

Imagens de produto vão em `public/produtos/` e são referenciadas por caminho
local em `data.ts`. O campo `image: null` renderiza um placeholder neutro — o
layout funciona sem nenhuma imagem.

O campo `whatsapp` em `config.ts` é obrigatório: enquanto estiver vazio, os
botões de pedido não aparecem e o checkout avisa que falta configurar.

## Documentação

- **[docs/ESPECIFICACAO-TEMPLATE.md](docs/ESPECIFICACAO-TEMPLATE.md)** —
  estrutura de arquivos, ordem das seções, fluxo de compra, formato da mensagem,
  sistema de tokens, contrato de dados, acessibilidade e checklist de publicação.
- **[docs/PROCESSO-CLONAGEM-LOJA.md](docs/PROCESSO-CLONAGEM-LOJA.md)** — o fluxo
  de trabalho do link da loja até o cardápio publicado: coleta de identidade e
  produtos, catalogação de imagens, suíte de testes e o checklist de armadilhas
  já encontradas na prática.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
framer-motion · lucide-react. Sem backend e sem banco: o pedido sai por link
`wa.me` e o carrinho vive no `localStorage`.
