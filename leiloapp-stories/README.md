# Stories: Calculadora LeiloApp (CDP), versão 2

Quatro stories em 1080×1920, 30 fps, H.264 + AAC. São montados em Remotion com filmagem real do Drive e 20 prints originais de avaliações do Google. O visual é de story nativo: o vídeo ocupa a tela e os textos seguem o estilo do Instagram (caixa branca, letra preta).

## Roteiro

| Story | Duração | Trecho | Texto na tela |
|---|---|---|---|
| **1. A dor** | 10,9 s | "Ninguém tem 30 minutos": a prancheta e a fala "somar um por um… depois ver se bate com o meu… E o meu eu gastei o quê? Só o tempo de pesar. E o dele vai ter que gastar mais uns 30 minutos aqui ainda." | *qual dos dois é você? 👀* |
| **2. A virada** | 13,8 s | Mesmo vídeo: "tô usando a calculadora, muito mais rápido. Agora é só emitir nota e viajar." Depois a tela real da CDP ("Conforme cê for registrando aqui o gado… E você tem o romaneio sendo gerado, que você pode exportar pra enviar.") | *na Calculadora LeiloApp é assim 👇* |
| **3. A prova** | 10,0 s | Chuva com 20 prints do Google, com contador de 1 a 20. O print da Kelli Santana sobe em destaque. Fundo e áudio são da demonstração: "você sabe em tempo real… qual é a média dos seus animais enquanto a pesagem está sendo feita." | *e quem já usa, o que acha? 👇* → *⭐⭐⭐⭐⭐ N avaliações* → *e tem mais de 30 assim 👀* |
| **4. O convite** | 14,9 s | "Cálculo na caçamba", com o letreiro original "Um botão clicado errado gerou um prejuízo de 11.400,00" e a fala "pra você que acha que não erra… todo mundo erra! Ninguém está te reconferindo… vem profissionalizar sua pesagem com a calculadora digital de pesagem da LeiloApp." | *sua próxima pesagem já pode ser assim* / *toque no link e assina 👇* |

O arco é tempo perdido → quem já usa ganha esse tempo → mais de 30 avaliações 5 estrelas → o risco de errar sem conferência → link.

## Fontes (Drive)

- `NINGUÉM TEM 30 MINUTOS - RAFA COLANDO`: 0–10,9 s e 36,25–42,8 s
- `Calculadora no campo - final aprovado.mp4`: 6,4–9,07 s, 14,17–18,7 s e 21,76–30,72 s
- `CÁLCULO NA CAÇAMBA`: 31,85–45,72 s
- Pasta de prints: 20 avaliações com texto, em `prints_originais/`. Ficaram de fora a avaliação de GMD (andre caetano), a da Tiago Ecoservice (fala de assessoria, não da calculadora), a do "Armario Hookah" e as que só têm estrelas.

O vídeo "FLAVIA NÃO ERRA" não entra porque a pessoa aparece com a camisa da LeiloApp. O vídeo "História — CDP" também ficou de fora.

## Detalhes técnicos

- Cada corte cai numa pausa da fala, medida no áudio, e numa troca de legenda já gravada no vídeo.
- O áudio de "Ninguém tem 30 minutos" e de "Caçamba" era bem mais baixo. Os quatro trechos foram normalizados para cerca de −15 LUFS.
- Os prints foram ampliados 2× sem retoque. Nos JPGs só foi removida a margem branca da direita e o ícone de denúncia do Google.
- O espaço do sticker de link fica no story 4, em y≈1160–1460: abaixo do convite e acima das legendas originais. Não há URL, QR code nem botão no vídeo.

## Rodar

```bash
npm install
# os trechos já cortados ficam em public/media (n1, n2, c1, c2, c3, k1), fora do git
npx remotion studio src/index.ts
npx remotion render src/index.ts Sequencia-Completa out/00_sequencia_completa.mp4
```
