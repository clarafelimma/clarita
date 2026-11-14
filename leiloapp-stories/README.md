# Stories — Calculadora LeiloApp (CDP)

Quatro stories em 1080×1920, 30 fps, H.264 + AAC, montados em Remotion a partir de filmagem real e de prints originais de avaliações do Google.

| Arquivo | Duração | O que conta |
|---|---|---|
| `out/01_story1_pesagem_terminou.mp4` | 9,07 s | O último animal passou. O que sobra depois da pesagem? |
| `out/02_story2_outra_forma.mp4` | 11,90 s | Lançar os pesos na CDP enquanto o gado passa, depois a tela do romaneio |
| `out/03_story3_quem_usa.mp4` | 12,00 s | "E no dia a dia, ajuda mesmo?" Três prints originais, um por vez, depois juntos |
| `out/04_story4_proxima_pesagem.mp4` | 8,93 s | De volta à demonstração. "Na próxima pesagem..." e convite para assinar |
| `out/00_sequencia_completa.mp4` | 41,90 s | Os quatro em sequência |

## Fontes

- **Calculadora no campo - final aprovado.mp4** (Drive): usado nos stories 1, 2 e 4, em ordem e sem repetir nenhum trecho (0–9,07 s / 9,07–21,76 s / 21,76–30,72 s).
- **História - cadastro do valor do quilo - final aprovado.mp4** (Drive): aparece só como fundo escurecido e sem som no story 3. A fala desse vídeo fica de fora: o assunto dele é o valor do quilo e a média negociada, e ele termina falando de preço e de "promoção de novembro", que não entram no briefing.
- **Prints** (pasta do Drive, 39 arquivos lidos): Raylson Andrade (uso no dia a dia), Kelli Santana (praticidade no manejo de peso) e Ogener Amaral (atendimento). Os três são PNGs originais, só ampliados 3× com Lanczos, sem corte e sem retoque. As cópias originais estão em `prints_originais/`.
- **Identidade**: as cores e o ícone vêm do logo oficial `Logo branca - Copia.png` (verde #0D5749, laranja #F39836, creme #FFFAF1). A fonte é Lora, a mesma família serifada do logo.

## Decisões

- **Cortes**: cada corte cai numa troca de legenda já gravada no vídeo e numa pausa da fala, medida no áudio. Assim nenhuma frase fica cortada no meio da palavra. No story 2 saiu uma pausa de 0,8 s no meio de "ele vai aparecendo...". No story 4 a fala "E, obviamente..." começa 5 frames antes do corte de cena, então o primeiro frame da cena nova fica parado por 5 frames, com o áudio contínuo.
- **Story 1, texto 2**: o homem do vídeo diz "não tem problema... não precisa sentar, ficar refazendo a conta". Uma afirmação ("Agora falta somar...") contradiria a fala dele. Por isso o texto virou pergunta: *"E aí? Ainda falta somar os pesos, conferir o caderno e mandar o romaneio?"*. A fala dele responde. Nada é apresentado como experiência pessoal dele.
- **Story 1 e 2**: o story 1 termina com o corte para a tela real e a fala "Conforme cê for registrando aqui o gado,". O story 2 continua com "ele vai aparecendo... o valor de cada um", e o texto do story 2 dá o sujeito da frase para quem vê o story sozinho.
- **Textos novos** ficam fora da faixa das legendas originais (y≈1460–1580) e dentro da zona segura. Com o homem em cena, ficam entre o título original e a legenda. Nos planos de tela, ficam no topo.
- **Story 3, prints**: o print do Éverson Barros ("sem caderno em curral") seria ideal para a história, mas o arquivo tem letra pequena demais para ser lido em story. Foi trocado por prints que ficam legíveis. Ficaram de fora o print sobre GMD (andre caetano) e os prints sem texto. O som é o ambiente do próprio curral, tirado das pausas sem fala do vídeo do campo.
- **Story 4, sticker**: a área y≈1150–1430 (entre o cartão do convite e as legendas) fica livre para o sticker de link. Não há URL, QR code, botão nem WhatsApp.

## Rodar

```bash
npm install
# copie os dois vídeos do Drive para public/media/campo.mp4 e public/media/historia.mp4
npx remotion studio src/index.ts
npx remotion render src/index.ts Sequencia-Completa out/00_sequencia_completa.mp4
```

O Remotion está configurado para usar o Chromium já instalado no ambiente (`remotion.config.ts`).
