import React from 'react';
import {
  AbsoluteFill,
  Easing,
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
import {StoryText} from './components';
import {SANS} from './brand';

/*
 * ROTEIRO — uma história só, contada pelo Germano do começo ao fim
 *  1. O erro (gancho): "Você que acha que não erra…" terminaram o manejo, mandaram
 *     o valor pro vendedor… "Que que ele fez?"  → toca pra ver
 *  2. A revelação: era 209 e não 198 — "ele ia perder R$ 11.000,00 porque digitou
 *     errado na calculadora do celular dele."
 *  3. A solução: "passou o último gado… não precisa sentar, ficar refazendo a conta"
 *     + a tela real da CDP lançando os pesos e gerando o romaneio.
 *  4. A prova: rolagem com 20 avaliações reais do Google, com a voz dele seguindo.
 *  5. O convite: "pra você que acha que não erra… todo mundo erra" → fale com o time.
 *
 * Trechos (cortes em pausas da fala; áudio normalizado):
 *  k_a = "CÁLCULO NA CAÇAMBA"               0,00–2,20 s
 *  k_b = idem                               4,62–19,24 s
 *  k_c = idem                              19,24–31,60 s
 *  k_d = idem                              31,85–45,72 s
 *  g_a = "Calculadora no campo - final aprovado"  0,00–18,66 s
 *  g_b = idem                              18,66–30,72 s
 */
const v = (name: string) => staticFile(`media/${name}.mp4`);

/**
 * Caixa branca que cobre o letreiro verde original do vídeo da caçamba
 * (x 94–987, y 242–458) e leva o nosso texto no lugar.
 */
const CoverBox: React.FC<{lines: string[]; size?: number}> = ({lines, size = 60}) => {
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
        fontFamily: SANS,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.12,
        color: '#111111',
        letterSpacing: -0.6,
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
        transform: `scale(${0.96 + 0.04 * pop})`,
      }}
    >
      {lines.map((l) => (
        <span key={l}>{l}</span>
      ))}
    </div>
  );
};

const Hold: React.FC<{src: string; at: number}> = ({src, at}) => (
  <Freeze frame={at}>
    <OffthreadVideo src={src} muted />
  </Freeze>
);

/* ------------------------------------------------------------------ */
/* STORY 1 — O erro                                                    */
/* "Você que acha que não erra, vem cá. | Estamos aqui, terminamos o manejo. Fui mandar
    ao comprador enviar o Pix, mandei pro vendedor 5.529,50. O vendedor escreveu na conta
    dele, em 38 cabeça, esse valor aqui. Que que ele fez?" */
const KA = 66;
const KB = 436; // termina antes da legenda seguinte ("Estava esperando…") aparecer
export const S1_DURATION = KA + KB;

export const Story1: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    <Sequence durationInFrames={KA}>
      <OffthreadVideo src={v('k_a')} />
    </Sequence>
    <Sequence from={KA}>
      <OffthreadVideo src={v('k_b')} />
    </Sequence>
    <CoverBox lines={['terminou a pesagem,', 'foi fazer a conta na', 'calculadora do celular… 😬']} size={56} />
    {/* "Que que ele fez?" → convite pra tocar e ver o próximo */}
    <StoryText from={S1_DURATION - 26} to={S1_DURATION} top={1330} lines={['toca pra ver o que deu 👉']} size={50} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* STORY 2 — A revelação                                               */
/* "Estava esperando 38 cabeças, estava esperando um Pix de 198. Porém, não é 198,
    é 209. Ele ia perder R$ 11.000,00 porque ele digitou errado na calculadora do
    celular dele." */
export const S2_DURATION = 371;

export const Story2: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    <OffthreadVideo src={v('k_c')} />
    <CoverBox lines={['R$ 11 mil quase foram', 'embora por um número', 'digitado errado 💸']} size={58} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* STORY 3 — A solução                                                 */
/* "E no final, passou o último gado, não tem problema. Acabou, acabou. Então você já
    pode ir pra casa. Não precisa sentar, ficar refazendo a conta. Conforme cê for
    registrando aqui o gado, ele vai aparecendo... o valor de cada um. E você tem o
    romaneio sendo gerado, que você pode exportar pra enviar." */
export const S3_DURATION = 560;

export const Story3: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    <OffthreadVideo src={v('g_a')} />
    {/* entra quando a tela da CDP aparece (corte em 6,4 s) */}
    <StoryText from={194} to={330} top={236} lines={['na Calculadora LeiloApp,', 'a conta vai saindo pronta 👇']} size={48} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* STORY 4 — A prova                                                   */
/* Voz e fundo seguem do story 3: "Bater um print aqui pra enviar pra moçada, né? E,
   obviamente, você sabe em tempo real, sem precisar esperar a pesagem acabar, qual é a
   média dos seus animais enquanto a pesagem está sendo feita." */
const GB = 362;
export const S4_DURATION = GB + 36;

type Review = {file: string; w: number; h: number};
// Prints originais do Google, ampliados 2x sem retoque (nos JPGs saiu só a margem
// branca da direita e o ícone de denúncia).
const REVIEWS: Review[] = [
  {file: 'reviews/24_everson_barros.png', w: 948, h: 252},
  {file: 'reviews/04_raylson_andrade.png', w: 804, h: 274},
  {file: 'reviews/22_joao_raimundo_r_marques.png', w: 1246, h: 292},
  {file: 'reviews/07_amanda.png', w: 804, h: 274},
  {file: 'reviews/13_patricio_evangelista.png', w: 1246, h: 252},
  {file: 'reviews/03_ogener_amaral.png', w: 804, h: 274},
  {file: 'reviews/26_yandro_raphael_ribeiro.png', w: 970, h: 252},
  {file: 'reviews/06_joao_pedro.png', w: 804, h: 274},
  {file: 'reviews/16_juliano_terra.png', w: 778, h: 252},
  {file: 'reviews/01_jorge_goes.png', w: 804, h: 278},
  {file: 'reviews/31_nelsonlss.png', w: 1150, h: 252},
  {file: 'reviews/05_janaina_anjos.png', w: 804, h: 274},
  {file: 'reviews/37_tamara_vieira_de_jesus.png', w: 1044, h: 252},
  {file: 'reviews/21_joao_alfredo.png', w: 700, h: 252},
  {file: 'reviews/32_rafael_medeiros_sanches.png', w: 1246, h: 332},
  {file: 'reviews/38_leticia_venero_da_cunha.png', w: 1226, h: 252},
  {file: 'reviews/12_adail_hemerich.png', w: 778, h: 252},
  {file: 'reviews/20_fernando_lira_zap_empreendimentos.png', w: 702, h: 292},
  {file: 'reviews/34_renato_urban_urban.png', w: 838, h: 252},
  {file: 'reviews/08_kelli_santana.png', w: 804, h: 316}, // a rolagem para aqui
];
const CARD_W = 940;
const GAP = 22;
const FEED_TOP = 430; // área da rolagem: y 430–1560
const FEED_BOTTOM = 1560;
const SCROLL_FROM = 34;
const SCROLL_TO = 318;

const layout = (() => {
  let y = 0;
  return REVIEWS.map((r) => {
    const h = (r.h / r.w) * CARD_W;
    const top = y;
    y += h + GAP;
    return {top, h};
  });
})();

export const Story4: React.FC = () => {
  const frame = useCurrentFrame();
  const blur = interpolate(frame, [10, 40], [0, 14], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const bright = interpolate(frame, [10, 40], [1, 0.42], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // começa com o 1º card entrando por baixo e termina com o último centralizado
  const last = layout[layout.length - 1];
  const startOffset = FEED_BOTTOM;
  const endOffset = 995 - (last.top + last.h / 2);
  const p = interpolate(frame, [SCROLL_FROM, SCROLL_TO], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.45, 0, 0.2, 1),
  });
  const offset = interpolate(p, [0, 1], [startOffset, endOffset]);
  const settled = frame > SCROLL_TO;
  const zoom = spring({frame: frame - SCROLL_TO, fps: 30, config: {damping: 200}, durationInFrames: 14});

  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      <AbsoluteFill style={{filter: `blur(${blur}px) brightness(${bright})`, transform: `scale(${1 + blur / 220})`}}>
        <Sequence durationInFrames={GB}>
          <OffthreadVideo src={v('g_b')} />
        </Sequence>
        <Sequence from={GB}>
          <Hold src={v('g_b')} at={GB - 1} />
        </Sequence>
      </AbsoluteFill>

      {/* rolagem das avaliações, com esmaecimento nas bordas */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: FEED_TOP,
          height: FEED_BOTTOM - FEED_TOP,
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 9%, black 91%, transparent 100%)',
        }}
      >
        {REVIEWS.map((r, i) => {
          const L = layout[i];
          const y = offset + L.top - FEED_TOP;
          if (y > FEED_BOTTOM || y + L.h < -40) return null;
          const isLast = i === REVIEWS.length - 1;
          const s = isLast && settled ? 1 + 0.08 * zoom : 1;
          const dim = !isLast && settled ? 0.5 * zoom : 0;
          return (
            <div
              key={r.file}
              style={{
                position: 'absolute',
                left: (1080 - CARD_W) / 2,
                top: y,
                width: CARD_W,
                height: L.h,
                borderRadius: 18,
                overflow: 'hidden',
                background: 'white',
                boxShadow: '0 14px 36px rgba(0,0,0,0.45)',
                transform: `scale(${s})`,
                zIndex: isLast ? 10 : 1,
              }}
            >
              <Img src={staticFile(r.file)} style={{width: '100%', height: '100%', display: 'block'}} />
              {dim > 0 ? <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${dim})`}} /> : null}
            </div>
          );
        })}
      </div>

      <StoryText from={0} to={SCROLL_TO + 4} top={236} lines={['e quem já usa no dia a dia,', 'fala o quê? 👇']} size={50} />
      <StoryText from={SCROLL_TO + 6} to={S4_DURATION} top={236} lines={['é nota máxima atrás', 'de nota máxima ⭐⭐⭐⭐⭐']} size={50} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* STORY 5 — O convite                                                 */
/* "Então, pra você que acha que não erra, ou você não está sendo reconferido, porque
    todo mundo erra! Então, ninguém está te reconferindo. Então, pra você não precisar
    de reconferência, use, vem profissionalizar sua pesagem com a calculadora digital
    de pesagem da LeiloApp." */
const KD = 416;
export const S5_DURATION = KD + 30;

export const Story5: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    <Sequence durationInFrames={KD}>
      <OffthreadVideo src={v('k_d')} />
    </Sequence>
    <Sequence from={KD}>
      <Hold src={v('k_d')} at={KD - 1} />
    </Sequence>
    <CoverBox lines={['fale com nosso time', 'nesse link e agilize', 'sua lida 🤠']} />
    {/* espaço livre para o sticker de link: y≈1160–1460 (acima das legendas originais, y≈1500) */}
  </AbsoluteFill>
);
