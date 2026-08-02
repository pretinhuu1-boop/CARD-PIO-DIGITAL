---
schema_version: 1
scraped_at: "YYYY-MM-DDTHH:MM:SSZ"
store:
  name: ""
  category: ""            # ex: pizzaria, hamburgueria, açaí, farmácia
  phone: ""
  whatsapp: ""
  address: ""
  city: ""
  state: ""
  hours: ""
  rating: null            # ex: 4.7
  reviews_count: null
sources:                  # todas as fontes consultadas, com status
  - type: google_maps     # google_maps | ifood | keeta | instagram | site | outro
    url: ""
    status: found         # found | not_found | blocked | no_products
  - type: ifood
    url: ""
    status: not_found
products_count: 5
---

# {{NOME DA LOJA}}

> Fonte primária dos produtos: `{{tipo_da_fonte}}` — {{url}}
> Fontes secundárias consultadas: {{lista}}

## Resumo da loja

{{2-4 linhas: o que vende, ticket médio percebido, diferencial, faixa de preço}}

---

## Produtos

### 1. {{Nome do produto}}

| Campo | Valor |
|---|---|
| **Nome** | {{nome exato como na fonte}} |
| **Preço** | R$ 00,00 |
| **Categoria** | {{seção do cardápio/catálogo}} |
| **Imagem** | `images/01-slug-do-produto.jpg` |
| **Imagem (URL original)** | {{url}} |
| **Fonte** | {{url do item}} |

**Descrição (original da fonte):**
{{texto exatamente como publicado; se não houver, escrever `— sem descrição na fonte —`}}

**Descrição (reescrita para cardápio digital):**
{{1-2 frases vendedoras, sem inventar ingrediente que não está na fonte}}

---

### 2. {{...}}

<!-- repetir o mesmo bloco até o produto 5 -->

---

## Notas de coleta

- {{o que não foi encontrado, o que foi inferido, o que está incerto}}
- {{imagens que falharam no download e por quê}}
