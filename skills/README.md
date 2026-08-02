# Skills

Cópia versionada das skills geradas a partir deste projeto.

A cópia **executável** vive em `~/.claude/skills/<nome>/SKILL.md` — é de lá que
o Claude Code carrega. Esta pasta é backup e referência: skill em disco, fora
de repo, é trabalho sem cópia.

Para instalar numa máquina nova:

```bash
mkdir -p ~/.claude/skills/clone-das-sombras
cp skills/clone-das-sombras/SKILL.md ~/.claude/skills/clone-das-sombras/
```

## clone-das-sombras

Do link de uma loja ao site publicado. Escrita a partir de seis lojas reais do
Tatuapé — **quatro publicadas** (Caracol, Kokedami, Istambul, TBT Lounge), uma
cancelada e uma que parou na coleta por falta de fonte. Cada regra ali custou
um erro medido.

Material de origem: os registros de procedência em `scraped-stores/`.
`docs/APRENDIZADOS-PARA-SKILL.md`, citado aqui antes, foi absorvido pela skill
e removido do repositório — não procure por ele.

### Como manter em dia

A executável em `~/.claude/skills/` é a que evolui durante o trabalho; esta
cópia só existe se alguém trouxer. Já divergiram em 152 linhas uma vez.
Antes de fechar uma sessão que mexeu na skill:

```bash
diff ~/.claude/skills/clone-das-sombras/SKILL.md skills/clone-das-sombras/SKILL.md
```
