# Stories: Calculadora LeiloApp (CDP), versão 4

São cinco stories em 1080×1920, 30 fps, H.264 + AAC, montados em Remotion. A história é uma só, contada pelo Germano do começo ao fim. Os vídeos de origem são dois, os dois com ele: "Cálculo na caçamba" e "Calculadora no campo".

## Roteiro

| Story | Duração | O que acontece | Texto na tela |
|---|---|---|---|
| **1. O erro** | 16,8 s | "Você que acha que não erra, vem cá. Estamos aqui, terminamos o manejo… mandei pro vendedor 5.529,50. O vendedor escreveu na conta dele, em 38 cabeça, esse valor aqui. Que que ele fez?" | *terminou a pesagem, foi fazer a conta na calculadora do celular… 😬* e, no fim, *toca pra ver o que deu 👉* |
| **2. A revelação** | 12,4 s | "Estava esperando um Pix de 198. Porém, não é 198, é 209. Ele ia perder R$ 11.000,00 porque ele digitou errado na calculadora do celular dele." | *R$ 11 mil quase foram embora por um número digitado errado 💸* |
| **3. A solução** | 18,7 s | "E no final, passou o último gado… não precisa sentar, ficar refazendo a conta. Conforme cê for registrando aqui o gado, ele vai aparecendo o valor de cada um. E você tem o romaneio sendo gerado…" Tudo na tela real da CDP. | *na Calculadora LeiloApp, a conta vai saindo pronta 👇* |
| **4. A prova** | 13,3 s | Rolagem por 20 avaliações reais do Google, que para no print da Kelli Santana ("manejo de peso do gado com rapidez"). A voz do Germano continua do story 3. | *e quem já usa no dia a dia, fala o quê? 👇* → *é nota máxima atrás de nota máxima ⭐⭐⭐⭐⭐* |
| **5. O convite** | 14,9 s | "Pra você que acha que não erra… todo mundo erra! Ninguém está te reconferindo… vem profissionalizar sua pesagem com a calculadora digital de pesagem da LeiloApp." | *fale com nosso time nesse link e agilize sua lida 🤠* |

Como um story puxa o outro:
- O 1 termina num gancho ("Que que ele fez?"), e o 2 entrega a resposta.
- O 3 mostra como evitar esse erro.
- No 4, a voz é a mesma do 3, e as avaliações confirmam o que ele mostrou.
- O 5 retoma a frase do começo ("você que acha que não erra") e fecha no convite.

## Decisões

- O letreiro verde original "Um botão clicado errado…" fica coberto o tempo todo pela caixa branca com o texto do story.
- Nenhum texto cita quantidade de avaliações.
- Os vídeos "Ninguém tem 30 minutos" e "Flávia" saíram para manter um apresentador só. "Germano em cima da cerca" foi avaliado e ficou de fora: as legendas automáticas dele têm erros ("nova paisagem", "angos") e a fala picotada palavra por palavra.
- A referência de estilo foi o prompt-motion.com: cortes de edição de "talking head", tipografia curta e uma rolagem de cards como prova social.
- Cada corte cai numa pausa da fala, medida no áudio. O áudio da caçamba era bem baixo e foi normalizado (todos os trechos ficam em torno de −15 LUFS).
- Prints: os 20 originais estão em `prints_originais/`.
  - Foram ampliados 2× sem retoque. Nos JPGs, só saiu a margem branca da direita e o ícone de denúncia.
  - Ficaram de fora a avaliação de GMD, a da Tiago Ecoservice (assessoria), a do "Armario Hookah" e as que só têm estrelas.
- Sticker de link: espaço livre no story 5, em y≈1160–1460, acima das legendas originais. Não há URL, QR code nem botão no vídeo.

## Trechos

Ficam em `public/media`, fora do git:

| Arquivo | Origem | Intervalo |
|---|---|---|
| `k_a` | Cálculo na caçamba | 0–2,2 s |
| `k_b` | Cálculo na caçamba | 4,62–19,24 s |
| `k_c` | Cálculo na caçamba | 19,24–31,6 s |
| `k_d` | Cálculo na caçamba | 31,85–45,72 s |
| `g_a` | Calculadora no campo | 0–18,66 s |
| `g_b` | Calculadora no campo | 18,66–30,72 s |

```bash
npm install
npx remotion studio src/index.ts
npx remotion render src/index.ts Sequencia-Completa out/00_sequencia_completa.mp4
```
