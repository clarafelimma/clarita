import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, SERIF} from './brand';

/**
 * Entrada/saída suave para textos: sobe 24px e aparece; some com fade.
 */
export const useInOut = (from: number, to: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - from, fps, config: {damping: 200}, durationInFrames: 14});
  const exit = interpolate(frame, [to - 8, to], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const visible = frame >= from && frame <= to;
  return {opacity: visible ? Math.min(enter, exit) : 0, y: (1 - enter) * 24};
};

type CardProps = {
  from: number;
  to: number;
  /** posição vertical do topo do cartão (px no quadro 1080x1920) */
  top: number;
  children: React.ReactNode;
  size?: number;
  icon?: boolean;
};

/**
 * Cartão de texto compacto na identidade LeiloApp: creme, texto verde em serifa,
 * filete laranja. Pequeno o bastante para não cobrir a filmagem.
 */
export const Card: React.FC<CardProps> = ({from, to, top, children, size = 52, icon}) => {
  const {opacity, y} = useInOut(from, to);
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top,
        display: 'flex',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 930,
          margin: '0 48px',
          background: 'rgba(255,250,241,0.96)',
          borderRadius: 26,
          borderLeft: `10px solid ${COLORS.orange}`,
          padding: '24px 36px 26px 32px',
          boxShadow: '0 14px 40px rgba(0,0,0,0.28)',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {icon ? (
          <Img
            src={staticFile('brand/leiloapp_icon.png')}
            style={{width: 96, height: 'auto', borderRadius: 14, flexShrink: 0}}
          />
        ) : null}
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: size,
            lineHeight: 1.2,
            color: COLORS.green,
            letterSpacing: -0.3,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/** Selo pequeno com o nome do produto (ícone oficial do logo LeiloApp). */
export const BrandChip: React.FC<{from: number; to: number; top: number}> = ({from, to, top}) => {
  const {opacity, y} = useInOut(from, to);
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          background: 'rgba(255,250,241,0.96)',
          borderRadius: 999,
          padding: '12px 30px 12px 14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        }}
      >
        <Img src={staticFile('brand/leiloapp_icon.png')} style={{width: 74, borderRadius: 999}} />
        <span style={{fontFamily: SERIF, fontWeight: 700, fontSize: 44, color: COLORS.green}}>
          Calculadora LeiloApp
        </span>
      </div>
    </div>
  );
};
