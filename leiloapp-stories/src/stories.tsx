import React from 'react';
import {
  AbsoluteFill,
  Freeze,
  Img,
  interpolate,
  OffthreadVideo,
  random,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {StoryText} from './components';

/*
 * ROTEIRO (início → meio → fim)
 *  1. A dor: a pesagem acabou, mas um ainda vai somar no papel ("mais uns 30 minutos").
 *  2. A virada: o outro já terminou ("agora é só emitir nota e viajar") e a tela real da CDP.
 *  3. A prova: chuva de avaliações reais do Google (20 prints originais) sobre a demonstração.
 *  4. O fechamento: "todo mundo erra, ninguém está te reconferindo". Convite para assinar.
 *
 * Trechos (cópias locais dos vídeos do Drive, cortados em pausas da fala; áudio normalizado):
 *  n1 = "NINGUÉM TEM 30 MINUTOS - RAFA COLANDO"  0,00–10,90 s
 *  n2 = idem                                     36,25–42,80 s
 *  c12 = "Calculadora no campo - final aprovado"  6,40–14,10 s (frase inteira, sem cortes)
 *  c3 = idem                                     21,76–30,72 s
 *  k1 = "CÁLCULO NA CAÇAMBA"                     31,85–45,72 s
 */
const v = (name: string) => staticFile(`media/${name}.mp4`);

/* ------------------------------------------------------------------ */
/* STORY 1 — A dor                                                     */
/* "Que que ele vai ter que fazer aqui, ó? Somar um por um para fazer o total,
    depois ver se bate com o meu. No final é bater. E o meu eu gastei o quê?
    Só o tempo de pesar. E o dele vai ter que gastar mais uns 30 minutos aqui ainda." */
export const S1_DURATION = 327;

export const Story1: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    <OffthreadVideo src={v('n1')} />
    {/* entra depois que o letreiro original sai; fica acima da cabeça dele */}
    <StoryText from={196} to={S1_DURATION} top={236} lines={['qual dos dois', 'é você? 👀']} size={56} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* STORY 2 — A virada                                                  */
/* "E eu sei disso aqui tudo, ó, que eu tô usando a calculadora, muito mais rápido.
    Agora é só emitir nota e viajar." → (tela real da CDP, trecho contínuo)
    "Conforme cê for registrando aqui o gado, ele vai aparecendo... o valor de cada um." */
const N2 = 198;
const C12 = 231;
export const S2_DURATION = N2 + C12;

export const Story2: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    <Sequence durationInFrames={N2}>
      <OffthreadVideo src={v('n2')} />
    </Sequence>
    <Sequence from={N2}>
      <OffthreadVideo src={v('c12')} />
    </Sequence>
    <StoryText from={N2 + 2} to={N2 + 120} top={236} lines={['na Calculadora LeiloApp', 'é assim 👇']} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* STORY 3 — A prova                                                   */
/* Fundo e áudio: "E, obviamente, você sabe em tempo real, sem precisar esperar a
   pesagem acabar, qual é a média dos seus animais enquanto a pesagem está sendo feita." */
const C3 = 268;
export const S3_DURATION = 300;

type Review = {file: string; w: number; h: number};
// Prints originais do Google ampliados 2x (Lanczos). Nos JPGs só sai a margem
// branca da direita e o ícone de denúncia; texto, nome, estrelas e foto intactos.
const REVIEWS: Review[] = [
  {file: 'reviews/22_joao_raimundo_r_marques.png', w: 1246, h: 292},
  {file: 'reviews/04_raylson_andrade.png', w: 804, h: 274},
  {file: 'reviews/24_everson_barros.png', w: 948, h: 252},
  {file: 'reviews/07_amanda.png', w: 804, h: 274},
  {file: 'reviews/13_patricio_evangelista.png', w: 1246, h: 252},
  {file: 'reviews/03_ogener_amaral.png', w: 804, h: 274},
  {file: 'reviews/26_yandro_raphael_ribeiro.png', w: 970, h: 252},
  {file: 'reviews/06_joao_pedro.png', w: 804, h: 274},
  {file: 'reviews/31_nelsonlss.png', w: 1150, h: 252},
  {file: 'reviews/01_jorge_goes.png', w: 804, h: 278},
  {file: 'reviews/16_juliano_terra.png', w: 778, h: 252},
  {file: 'reviews/05_janaina_anjos.png', w: 804, h: 274},
  {file: 'reviews/37_tamara_vieira_de_jesus.png', w: 1044, h: 252},
  {file: 'reviews/32_rafael_medeiros_sanches.png', w: 1246, h: 332},
  {file: 'reviews/21_joao_alfredo.png', w: 700, h: 252},
  {file: 'reviews/38_leticia_venero_da_cunha.png', w: 1226, h: 252},
  {file: 'reviews/12_adail_hemerich.png', w: 778, h: 252},
  {file: 'reviews/20_fernando_lira_zap_empreendimentos.png', w: 702, h: 292},
  {file: 'reviews/34_renato_urban_urban.png', w: 838, h: 252},
  {file: 'reviews/08_kelli_santana.png', w: 804, h: 316}, // último: vira destaque
];
const WALL_START = 52; // antes disso, a frase de contexto fica sozinha na tela
const WALL_STEP = 6; // um print novo a cada 0,2 s
const HIGHLIGHT_IN = WALL_START + WALL_STEP * REVIEWS.length + 8; // 180
const HIGHLIGHT_OUT = 250;
const WALL_SCALE = 0.62;

const slot = (i: number) => {
  // espalha os cards pela tela, alternando lados, de cima para baixo
  const row = i % 10;
  const left = (i + Math.floor(i / 10)) % 2 === 0;
  return {
    x: (left ? 380 : 700) + (random(`x${i}`) - 0.5) * 120,
    y: 470 + row * 108 + (i >= 10 ? 54 : 0) + (random(`y${i}`) - 0.5) * 40,
    rot: (random(`r${i}`) - 0.5) * 10,
  };
};

const ReviewCard: React.FC<{r: Review; i: number}> = ({r, i}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const appear = WALL_START + i * WALL_STEP;
  if (frame < appear) return null;
  const pop = spring({frame: frame - appear, fps, config: {damping: 12, stiffness: 200}, durationInFrames: 14});
  const s = slot(i);
  const isHero = i === REVIEWS.length - 1;

  let w = r.w * WALL_SCALE;
  // mantém o card inteiro dentro do quadro
  s.x = Math.min(Math.max(s.x, w / 2 + 24), 1080 - w / 2 - 24);
  let x = s.x;
  let y = s.y;
  let rot = s.rot;
  let dim = 0;

  const hl = spring({frame: frame - HIGHLIGHT_IN, fps, config: {damping: 200}, durationInFrames: 16});
  const back = spring({frame: frame - HIGHLIGHT_OUT, fps, config: {damping: 200}, durationInFrames: 14});
  const focus = frame >= HIGHLIGHT_IN ? hl * (1 - back) : 0;
  if (isHero) {
    w = interpolate(focus, [0, 1], [w, 1010]);
    x = interpolate(focus, [0, 1], [s.x, 540]);
    y = interpolate(focus, [0, 1], [s.y, 980]);
    rot = interpolate(focus, [0, 1], [s.rot, 0]);
  } else {
    dim = focus * 0.55;
  }
  const h = (r.h / r.w) * w;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - w / 2,
        top: y - h / 2,
        width: w,
        height: h,
        transform: `rotate(${rot}deg) scale(${0.5 + 0.5 * pop})`,
        opacity: Math.min(1, pop * 1.5),
        borderRadius: 16,
        overflow: 'hidden',
        background: 'white',
        boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
        zIndex: isHero && focus > 0 ? 100 : i,
      }}
    >
      <Img src={staticFile(r.file)} style={{width: '100%', height: '100%', display: 'block'}} />
      {dim > 0 ? <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${dim})`}} /> : null}
    </div>
  );
};

export const Story3: React.FC = () => {
  const frame = useCurrentFrame();
  const shown = Math.max(0, Math.min(REVIEWS.length, Math.floor((frame - WALL_START) / WALL_STEP) + 1));
  const blur = interpolate(frame, [20, 50], [0, 12], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const bright = interpolate(frame, [20, 50], [1, 0.45], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      <AbsoluteFill style={{filter: `blur(${blur}px) brightness(${bright})`, transform: `scale(${1 + blur / 200})`}}>
        <Sequence durationInFrames={C3}>
          <OffthreadVideo src={v('c3')} />
        </Sequence>
        <Sequence from={C3}>
          <Freeze frame={C3 - 1}>
            <OffthreadVideo src={v('c3')} muted />
          </Freeze>
        </Sequence>
      </AbsoluteFill>

      {/* ponte com o story 2 (o produtor que já usa) e contexto dos prints */}
      <StoryText from={0} to={WALL_START + 2} top={236} lines={['não é só ele que fala isso 👀', 'olha as avaliações no Google 👇']} size={48} />
      {frame > WALL_START && frame < HIGHLIGHT_OUT ? (
        <StoryText
          from={WALL_START + 1}
          to={HIGHLIGHT_OUT}
          top={236}
          lines={[`⭐⭐⭐⭐⭐  ${shown} ${shown === 1 ? 'avaliação' : 'avaliações'} no Google`]}
          size={46}
        />
      ) : null}
      <StoryText from={HIGHLIGHT_OUT + 2} to={S3_DURATION} top={236} lines={['e tem mais de 30 assim,', 'todas com 5 estrelas ⭐']} />

      {REVIEWS.map((r, i) => (
        <ReviewCard key={r.file} r={r} i={i} />
      ))}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* STORY 4 — O fechamento                                              */
/* "Então, pra você que acha que não erra, ou você não está sendo reconferido,
    porque todo mundo erra! Então, ninguém está te reconferindo. Então, pra você
    não precisar de reconferência, use, vem profissionalizar sua pesagem com a
    calculadora digital de pesagem da LeiloApp." */
const K1 = 416;
export const S4_DURATION = K1 + 30;

export const Story4: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    <Sequence durationInFrames={K1}>
      <OffthreadVideo src={v('k1')} />
    </Sequence>
    <Sequence from={K1}>
      <Freeze frame={K1 - 1}>
        <OffthreadVideo src={v('k1')} muted />
      </Freeze>
    </Sequence>
    {/* Cobre o letreiro original (x 94–987, y 242–458) durante todo o story */}
    <CtaBox />
    {/* espaço livre para o sticker de link: y≈1160–1460 (acima das legendas originais, y≈1500) */}
  </AbsoluteFill>
);

const CtaBox: React.FC = () => {
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Inter", system-ui, sans-serif',
        fontWeight: 700,
        fontSize: 60,
        lineHeight: 1.12,
        color: '#111111',
        letterSpacing: -0.6,
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
        transform: `scale(${0.96 + 0.04 * pop})`,
      }}
    >
      <span>fale com nosso time</span>
      <span>nesse link e agilize</span>
      <span>sua lida 🤠</span>
    </div>
  );
};
