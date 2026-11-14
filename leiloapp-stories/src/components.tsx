import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {SANS} from './brand';

/**
 * Texto no estilo da ferramenta de texto do Instagram: cada linha numa caixa
 * branca arredondada, letra preta. Entra com um "pop" curto, sai com fade.
 */
export const StoryText: React.FC<{
  from: number;
  to: number;
  top: number;
  lines: string[];
  size?: number;
  tone?: 'white' | 'green';
}> = ({from, to, top, lines, size = 50, tone = 'white'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < from || frame > to) return null;
  const pop = spring({frame: frame - from, fps, config: {damping: 14, stiffness: 180}, durationInFrames: 16});
  const exit = interpolate(frame, [to - 6, to], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const bg = tone === 'white' ? '#FFFFFF' : '#0D5749';
  const fg = tone === 'white' ? '#111111' : '#FFFFFF';
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 40,
        right: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: Math.min(1, pop * 1.4) * exit,
        transform: `scale(${0.85 + 0.15 * pop})`,
        transformOrigin: 'center top',
      }}
    >
      {lines.map((l, i) => (
        <span
          key={i}
          style={{
            background: bg,
            color: fg,
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: size,
            lineHeight: 1.18,
            padding: '6px 20px 8px',
            borderRadius: 14,
            marginTop: i === 0 ? 0 : -4,
            whiteSpace: 'nowrap',
            letterSpacing: -0.5,
          }}
        >
          {l}
        </span>
      ))}
    </div>
  );
};
