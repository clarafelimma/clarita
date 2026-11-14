import React from 'react';
import {Composition, Series} from 'remotion';
import './brand';
import {FPS, HEIGHT, WIDTH} from './brand';
import {
  S1_DURATION,
  S2_DURATION,
  S3_DURATION,
  S4_DURATION,
  Story1,
  Story2,
  Story3,
  Story4,
} from './stories';

const Sequencia: React.FC = () => (
  <Series>
    <Series.Sequence durationInFrames={S1_DURATION}>
      <Story1 />
    </Series.Sequence>
    <Series.Sequence durationInFrames={S2_DURATION}>
      <Story2 />
    </Series.Sequence>
    <Series.Sequence durationInFrames={S3_DURATION}>
      <Story3 />
    </Series.Sequence>
    <Series.Sequence durationInFrames={S4_DURATION}>
      <Story4 />
    </Series.Sequence>
  </Series>
);

const base = {fps: FPS, width: WIDTH, height: HEIGHT};

export const Root: React.FC = () => (
  <>
    <Composition id="Story1-PesagemTerminou" component={Story1} durationInFrames={S1_DURATION} {...base} />
    <Composition id="Story2-OutraForma" component={Story2} durationInFrames={S2_DURATION} {...base} />
    <Composition id="Story3-QuemUsa" component={Story3} durationInFrames={S3_DURATION} {...base} />
    <Composition id="Story4-ProximaPesagem" component={Story4} durationInFrames={S4_DURATION} {...base} />
    <Composition
      id="Sequencia-Completa"
      component={Sequencia}
      durationInFrames={S1_DURATION + S2_DURATION + S3_DURATION + S4_DURATION}
      {...base}
    />
  </>
);
