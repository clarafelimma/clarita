import React from 'react';
import {
  AbsoluteFill,
  Freeze,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {StoryText} from './components';
import {SANS} from './brand';

/*
 * Só o vídeo "CÁLCULO NA CAÇAMBA" (Germano na caminhonete), em 3 stories:
 *  1. O gancho  — o manejo acabou… e o problema veio na conta. "Que que ele fez?"
 *  2. O susto   — a conta da calculadora do celular: um número trocado, quase R$ 11 mil.
 *  3. A virada  — todo mundo erra; quem confere a sua conta? → fale com nosso time.
 *
 * Trechos (cortes em pausas da fala; áudio normalizado):
 *  k_a  0,00–2,20 s   "Você que acha que não erra, vem cá."
 *  k_b  4,62–19,14 s  "Estamos aqui, terminamos o manejo… Que que ele fez?"
 *  k_c 19,24–31,60 s  "Estava esperando 38 cabeças… digitou errado na calculadora do celular dele."
 *  k_d 31,85–45,72 s  "Então, pra você que acha que não erra… calculadora digital de pesagem da LeiloApp."
 *
 * O letreiro verde original (x 94–987, y 242–458) fica sempre coberto pela caixa branca.
 */
const v = (name: string) => staticFile(`media/${name}.mp4`);

type Phase = {from: number; lines: string[]; size?: number};

/** Caixa branca fixa sobre o letreiro original; o texto troca a cada fase da fala. */
const CoverBox: React.FC<{phases: Phase[]}> = ({phases}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 14, stiffness: 180}, durationInFrames: 14});
  return (
    <div
      style={{
        position: 'absolute',
        left: 66,
        top: 226,
        width: 948,
        height: 250,
        background: '#FFFFFF',
        borderRadius: 26,
        boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
        transform: `scale(${0.96 + 0.04 * pop})`,
        overflow: 'hidden',
      }}
    >
      {phases.map((p, i) => {
        const end = i < phases.length - 1 ? phases[i + 1].from : 1e6;
        if (frame < p.from - 1 || frame > end + 8) return null;
        const inP = i === 0 ? 1 : interpolate(frame, [p.from, p.from + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const outP = interpolate(frame, [end, end + 6], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: p.size ?? 60,
              lineHeight: 1.12,
              color: '#111111',
              letterSpacing: -0.6,
              textAlign: 'center',
              opacity: Math.min(inP, outP),
              transform: `translateY(${(1 - inP) * 18 - (1 - outP) * 18}px)`,
            }}
          >
            {p.lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* STORY 1 — O gancho                                                  */
/* "Você que acha que não erra, vem cá. | Estamos aqui, terminamos o manejo. Fui mandar
    ao comprador enviar o Pix, mandei pro vendedor 5.529,50. O vendedor escreveu na conta
    dele, em 38 cabeça, esse valor aqui. Que que ele fez?" */
const KA = 66;
const KB = 436;
export const S1_DURATION = KA + KB;

export const Story1: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    <Sequence durationInFrames={KA}>
      <OffthreadVideo src={v('k_a')} />
    </Sequence>
    <Sequence from={KA}>
      <OffthreadVideo src={v('k_b')} />
    </Sequence>
    <CoverBox phases={[{from: 0, lines: ['o manejo acabou bem…', 'o problema veio', 'na hora da conta 😬']}]} />
    {/* "Que que ele fez?" (frame 479) */}
    <StoryText from={474} to={S1_DURATION} top={1330} lines={['toca pra ver o que deu 👉']} size={50} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* STORY 2 — O susto                                                   */
/* "Estava esperando 38 cabeças, estava esperando um Pix de 198. Porém, não é 198,
    é 209. | Ele ia perder R$ 11.000,00 porque ele digitou errado na calculadora do
    celular dele." */
export const S2_DURATION = 371;

export const Story2: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    <OffthreadVideo src={v('k_c')} />
    <CoverBox
      phases={[
        {from: 0, lines: ['a conta foi feita', 'na calculadora', 'do celular…']},
        // "Ele ia perder R$ 11.000,00" começa no frame 227
        {from: 224, lines: ['um número trocado', 'e quase R$ 11 mil', 'ficaram pelo caminho 💸']},
      ]}
    />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* STORY 3 — A virada                                                  */
/* "Então, pra você que acha que não erra, ou você não está sendo reconferido, porque
    todo mundo erra! | Então, ninguém está te reconferindo. Então, pra você não precisar
    de reconferência, | use, vem profissionalizar sua pesagem com a calculadora digital
    de pesagem da LeiloApp." */
const KD = 416;
export const S3_DURATION = KD + 36;

export const Story3: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    <Sequence durationInFrames={KD}>
      <OffthreadVideo src={v('k_d')} />
    </Sequence>
    <Sequence from={KD}>
      <Freeze frame={KD - 1}>
        <OffthreadVideo src={v('k_d')} muted />
      </Freeze>
    </Sequence>
    <CoverBox
      phases={[
        {from: 0, lines: ['todo mundo erra.', 'o problema é quando', 'ninguém confere 👀']},
        // "Então, ninguém está te reconferindo" (frame 160)
        {from: 158, lines: ['na Calculadora LeiloApp,', 'você lança o peso', 'e o app faz a conta ✅']},
        // "use, vem profissionalizar sua pesagem…" (frame 280)
        {from: 278, lines: ['fale com nosso time', 'nesse link e agilize', 'sua lida 🤠']},
      ]}
    />
    {/* aponta para o sticker de link, que vai logo abaixo (y≈1180–1460) */}
    <StoryText from={300} to={S3_DURATION} top={1066} lines={['antes da próxima pesagem 👇']} size={46} tone="green" />
  </AbsoluteFill>
);
