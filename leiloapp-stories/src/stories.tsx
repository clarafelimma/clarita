import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Freeze,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {BrandChip, Card} from './components';
import {COLORS, SAFE_TOP, SERIF} from './brand';

/*
 * Fontes (cópias locais dos arquivos do Drive):
 *  - campo.mp4    = "Calculadora no campo - final aprovado.mp4" (30,72 s, legendas já gravadas)
 *  - historia.mp4 = "História - cadastro do valor do quilo - final aprovado.mp4" (85,37 s)
 * Todos os números abaixo são frames a 30 fps da fonte, escolhidos nas trocas de
 * legenda / cortes de cena e em pausas da fala (medidas no áudio).
 *
 * Legendas originais ocupam a faixa y≈1460–1580. Nenhum texto novo entra nessa faixa.
 */
const CAMPO = staticFile('media/campo.mp4');
const HISTORIA = staticFile('media/historia.mp4');

// Faixa dos cartões quando o homem está em cena: entre o título original
// ("Pesou o gado...", y≈900–1020) e as legendas originais (y≥1460)
const LOWER_CARD_TOP = 1175;

/* ------------------------------------------------------------------ */
/* STORY 1 — A pesagem terminou, mas o serviço ficou (0 → 9,07 s)      */
/* ------------------------------------------------------------------ */
export const S1_DURATION = 272;

export const Story1: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    {/* "E no final, passou o último gado, não tem problema. Acabou, acabou.
         Então você já pode ir pra casa. Não precisa sentar, ficar refazendo a conta.
         Conforme cê for registrando aqui o gado," */}
    <OffthreadVideo src={CAMPO} startFrom={0} endAt={S1_DURATION} />
    <Card from={8} to={92} top={LOWER_CARD_TOP}>
      O último animal passou na balança.
    </Card>
    <Card from={98} to={190} top={LOWER_CARD_TOP} size={50}>
      E aí? Ainda falta somar os pesos, conferir o caderno e mandar o romaneio?
    </Card>
    {/* corte para a tela real da CDP (frame 192): apresenta o produto */}
    <BrandChip from={200} to={S1_DURATION + 10} top={SAFE_TOP} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* STORY 2 — Outra forma de fazer (9,07 → 21,76 s, pausa de 0,8 s removida) */
/* ------------------------------------------------------------------ */
const S2_A = {from: 272, to: 335}; // "ele vai aparecendo..."
const S2_B = {from: 359, to: 653}; // "o valor de cada um. E você tem o romaneio... pra moçada, né?"
export const S2_DURATION = S2_A.to - S2_A.from + (S2_B.to - S2_B.from); // 357

export const Story2: React.FC = () => {
  const aLen = S2_A.to - S2_A.from;
  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      <Sequence durationInFrames={aLen}>
        <OffthreadVideo src={CAMPO} startFrom={S2_A.from} endAt={S2_A.to} />
      </Sequence>
      <Sequence from={aLen}>
        <OffthreadVideo src={CAMPO} startFrom={S2_B.from} endAt={S2_B.to} />
      </Sequence>
      <Card from={6} to={124} top={SAFE_TOP} size={48}>
        Na Calculadora LeiloApp, você vai lançando os pesos enquanto o gado passa.
      </Card>
      {/* tela do romaneio entra no frame 129 */}
      <Card from={136} to={300} top={SAFE_TOP} size={48}>
        Quando termina o lote, as contas já estão ali pra conferir.
      </Card>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* STORY 3 — Quem já usa (prints originais do Google)                  */
/* ------------------------------------------------------------------ */
export const S3_DURATION = 360;

type PrintSpec = {
  file: string;
  w: number; // largura do arquivo (px)
  h: number;
  highlight: [number, number]; // janela em destaque
  slot: number; // y do topo na colagem
};

// Prints originais do Google, ampliados 3x (Lanczos), sem cortes nem retoques.
const PRINTS: PrintSpec[] = [
  // utilidade na rotina — "ferramenta muito útil no meu dia dia"
  {file: 'prints/raylson_andrade.png', w: 1206, h: 411, highlight: [40, 112], slot: 446},
  // praticidade no manejo de peso
  {file: 'prints/kelli_santana.png', w: 1206, h: 474, highlight: [112, 196], slot: 790},
  // atendimento
  {file: 'prints/ogener_amaral.png', w: 1206, h: 411, highlight: [196, 268], slot: 1186},
];
const COLLAGE_AT = 268;
const HIGHLIGHT_W = 1020;
const COLLAGE_W = 940;

const PrintCard: React.FC<{p: PrintSpec; index: number}> = ({p, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const [hIn, hOut] = p.highlight;

  const enter = spring({frame: frame - hIn, fps, config: {damping: 200}, durationInFrames: 16});
  const leave = spring({frame: frame - hOut, fps, config: {damping: 200}, durationInFrames: 12});
  const gather = spring({
    frame: frame - (COLLAGE_AT + index * 5),
    fps,
    config: {damping: 200},
    durationInFrames: 18,
  });

  const hH = (p.h / p.w) * HIGHLIGHT_W;
  const cH = (p.h / p.w) * COLLAGE_W;
  const centerTop = 960 - hH / 2;

  let opacity: number;
  let top: number;
  let width: number;

  if (frame < COLLAGE_AT) {
    // destaque: entra de baixo, sai para cima
    const isLast = index === PRINTS.length - 1;
    const out = isLast ? 0 : leave;
    opacity = frame < hIn ? 0 : enter * (1 - out);
    top = centerTop + (1 - enter) * 80 - out * 90;
    width = HIGHLIGHT_W;
  } else {
    // colagem: os três se reúnem
    const isLast = index === PRINTS.length - 1;
    if (isLast) {
      opacity = 1;
      top = interpolate(gather, [0, 1], [centerTop, p.slot]);
      width = interpolate(gather, [0, 1], [HIGHLIGHT_W, COLLAGE_W]);
    } else {
      opacity = gather;
      top = p.slot + (1 - gather) * 60;
      width = COLLAGE_W;
    }
  }
  if (opacity <= 0) return null;
  const height = width === COLLAGE_W ? cH : (p.h / p.w) * width;

  return (
    <div
      style={{
        position: 'absolute',
        left: (1080 - width) / 2,
        top,
        width,
        height,
        opacity,
        borderRadius: 22,
        overflow: 'hidden',
        background: 'white',
        boxShadow: '0 22px 60px rgba(0,0,0,0.5)',
      }}
    >
      <Img src={staticFile(p.file)} style={{width: '100%', height: '100%', display: 'block'}} />
    </div>
  );
};

const Header: React.FC<{from: number; to: number; children: React.ReactNode}> = ({
  from,
  to,
  children,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - from, fps, config: {damping: 200}, durationInFrames: 14});
  const exit = interpolate(frame, [to - 8, to], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (frame < from || frame > to) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: 252,
        left: 50,
        right: 50,
        textAlign: 'center',
        opacity: Math.min(enter, exit),
        transform: `translateY(${(1 - enter) * 20}px)`,
        fontFamily: SERIF,
        fontWeight: 700,
        fontSize: 60,
        lineHeight: 1.12,
        color: COLORS.cream,
        textShadow: '0 4px 24px rgba(0,0,0,0.55)',
      }}
    >
      {children}
    </div>
  );
};

export const Story3: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.greenDeep}}>
      {/* Fundo: filmagem real do curral (História — CDP), escurecida, sem som */}
      <AbsoluteFill style={{filter: 'blur(14px) brightness(0.5) saturate(0.9)', transform: 'scale(1.08)'}}>
        <Sequence durationInFrames={164}>
          <OffthreadVideo src={HISTORIA} startFrom={852} endAt={1016} muted />
        </Sequence>
        <Sequence from={164}>
          <OffthreadVideo src={HISTORIA} startFrom={1350} endAt={1546} muted />
        </Sequence>
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(10,69,57,0.55) 0%, rgba(10,69,57,0.15) 45%, rgba(10,69,57,0.55) 100%)'}} />
      {/* Ambiente do próprio curral (trechos sem fala do vídeo "Calculadora no campo") */}
      <Audio src={staticFile('media/ambiente_curral.wav')} volume={1.8} endAt={S3_DURATION} />

      <Header from={4} to={COLLAGE_AT - 2}>
        E no dia a dia, ajuda mesmo?
      </Header>
      <Header from={COLLAGE_AT + 4} to={S3_DURATION + 20}>
        Olha o que o pessoal
        <br />
        que usa conta.
      </Header>

      {PRINTS.map((p, i) => (
        <PrintCard key={p.file} p={p} index={i} />
      ))}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* STORY 4 — Decisão para a próxima pesagem (21,76 → 30,72 s)          */
/* ------------------------------------------------------------------ */
// A fala "E, obviamente..." começa 5 frames antes do corte de cena (658):
// o áudio começa em 653 e a imagem segura o primeiro frame da cena nova.
const S4_AUDIO_FROM = 653;
const S4_VIDEO_FROM = 658;
export const S4_DURATION = 268;
const HOLD = S4_VIDEO_FROM - S4_AUDIO_FROM;

export const Story4: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    <Sequence durationInFrames={HOLD}>
      <Freeze frame={0}>
        <OffthreadVideo src={CAMPO} startFrom={S4_VIDEO_FROM} muted />
      </Freeze>
    </Sequence>
    <Sequence from={HOLD}>
      <OffthreadVideo src={CAMPO} startFrom={S4_VIDEO_FROM} endAt={S4_AUDIO_FROM + S4_DURATION} muted />
    </Sequence>
    {/* "E, obviamente, você sabe em tempo real, sem precisar esperar a pesagem acabar,
         qual é a média dos seus animais enquanto a pesagem está sendo feita." */}
    <Audio src={CAMPO} startFrom={S4_AUDIO_FROM} endAt={S4_AUDIO_FROM + S4_DURATION} />

    <Card from={12} to={124} top={SAFE_TOP} size={50}>
      Na próxima pesagem, você já pode fazer assim também.
    </Card>
    {/* CTA logo acima do espaço do sticker; fica abaixo do rosto no plano 127–185 */}
    <Card from={132} to={S4_DURATION + 10} top={880} size={48} icon>
      Quer assinar a Calculadora LeiloApp? Toque no link.
    </Card>
    {/* Espaço livre para o sticker de link (y≈1150–1430): nenhum elemento novo aqui. */}
  </AbsoluteFill>
);
