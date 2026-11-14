# Stories: Calculadora LeiloApp (CDP), versão 5

São três stories em 1080×1920, 30 fps, H.264 + AAC, montados em Remotion. Usam só o vídeo **"CÁLCULO NA CAÇAMBA"**, com o Germano sentado na caminhonete. Nesta versão não entram avaliações nem outros vídeos.

## Roteiro e copy

A caixa branca no topo cobre o letreiro verde original o tempo todo. O texto dentro dela muda junto com a fala.

| Story | Duração | Fala do Germano | Copy na tela |
|---|---|---|---|
| **1. O gancho** | 16,7 s | "Você que acha que não erra, vem cá. Estamos aqui, terminamos o manejo… mandei pro vendedor 5.529,50. O vendedor escreveu na conta dele, em 38 cabeça, esse valor aqui. Que que ele fez?" | *o manejo acabou bem… o problema veio na hora da conta 😬* → no "Que que ele fez?": *toca pra ver o que deu 👉* |
| **2. O susto** | 12,4 s | "Estava esperando um Pix de 198. Porém, não é 198, é 209. Ele ia perder R$ 11.000,00 porque ele digitou errado na calculadora do celular dele." | *a conta foi feita na calculadora do celular…* → em "Ele ia perder": *um número trocado e quase R$ 11 mil ficaram pelo caminho 💸* |
| **3. A virada** | 15,1 s | "Pra você que acha que não erra… todo mundo erra! Ninguém está te reconferindo… pra você não precisar de reconferência, use, vem profissionalizar sua pesagem com a calculadora digital de pesagem da LeiloApp." | *todo mundo erra. o problema é quando ninguém confere 👀* → *na Calculadora LeiloApp, você lança o peso e o app faz a conta ✅* → *fale com nosso time nesse link e agilize sua lida 🤠* + *antes da próxima pesagem 👇* |

Como a história anda:
- O story 1 levanta a curiosidade e para no "Que que ele fez?".
- O story 2 entrega o susto de R$ 11 mil.
- O story 3 vira a chave: todo mundo erra, então deixe o app fazer a conta, e fale com o time antes da próxima pesagem.

## Detalhes

- Os cortes caem em pausas da fala. Saiu só a repetição "você que acha que é perfeito" (2,2–4,6 s), para o gancho ficar mais rápido.
- O áudio foi normalizado, e os trechos ficam entre −14 e −15,5 LUFS.
- O espaço do sticker de link fica no story 3, em y≈1160–1460: logo abaixo de "antes da próxima pesagem 👇" e acima das legendas originais. Não há URL, QR code nem botão no vídeo.
- Os valores citados (5.529,50, 198, 209, R$ 11 mil) são só os que o Germano fala no vídeo.

## Trechos

Ficam em `public/media`, fora do git:

| Arquivo | Intervalo no vídeo original |
|---|---|
| `k_a` | 0–2,2 s |
| `k_b` | 4,62–19,24 s |
| `k_c` | 19,24–31,6 s |
| `k_d` | 31,85–45,72 s |

```bash
npm install
npx remotion studio src/index.ts
npx remotion render src/index.ts Sequencia-Completa out/00_sequencia_completa.mp4
```
